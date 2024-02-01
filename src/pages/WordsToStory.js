import React, { useState } from "react";
import Layout from "@theme/Layout";
import Markdown from "react-markdown";
import styled from "styled-components";

const Container = styled.div`
  /* Default styles for mobile */
  display: flex;
  flex-direction: column; /* Start with a vertical layout on mobile */
  justify-content: flex-start;
  width: 100vw;
  font-size: 20px;

  /* Media query for tablets and larger screens */
  @media (min-width: 768px) {
    flex-direction: row; /* Switch to horizontal layout on larger screens */
  }
`;

// TODO: remove the logic and api call here, call one lambda endpoint, and use that lambda function to call the AI endpoints
export default function WordsToStory() {
  const [token, setToken] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordMode, setWordMode] = useState("latest10");
  const [words, setWords] = useState("");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }
  const fetchPage = async (pageNumber) => {
    try {
      const url = `https://api.frdic.com/api/open/v1/studylist/words/?language=en&page=${pageNumber}&page_size=1000`;
      const response = await fetch(url, {
        method: "GET", // The method is optional since GET is the default value
        headers: {
          Authorization: token, // Replace TOKEN with your actual token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()).data;

      return data.map((it) => it.word);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLastTenWords = async () => {
    const words = await fetchPage(0);
    return words.slice(-10);
  };

  const fetchWords = async () => {
    try {
      return await fetchLastTenWords();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const generateArticleByOpenAi = async (prompt) => {
    try {
      const response = await fetch(
        "https://gateway.ai.cloudflare.com/v1/e89e6bf826104a79b5acc93775ae08f3/openai-gateway/openai/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openaiApiKey}`, // Replace XXX with your actual bearer token
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      return responseJson.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getWords = async (token) => {
    if (words && words !== "") {
      return words;
    }
    if (token && token !== "") {
      return await fetchWords();
    }
    return ["You", "didn't", "provide", "any", "words"];
  };

  const generateArticleByGemini = async (prompt) => {
    try {
      const response = await fetch("https://gemini.lintao-amons.workers.dev/", {
        method: "POST",
        headers: {
          Authorization: "Bearer bmWjLQmAUCOkfPV9UCBRKA45zENcOS_5qDy6q8Wn",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // Usage
  const handleClick = async () => {
    try {
      setLoading(true);
      const words = await getWords(token);
      console.log(words);

      const prompt = `"Please create a story of approximately 100 words, ensuring it includes the following English words: ${words}. Each word must be highlighted in **bold** within the story. Additionally, provide the Chinese translations for these words, alongside a brief explanation of their meanings. Structure your response in the markdown format provided below(response the markdown only, don't add other explanation):
\`\`\`
## Story

[Insert the English version story here, with all specified words in **bold**.]

## Chinese Translation

[Provide the Chinese translation of the story here, with all specified words in **bold**.]

## Words

- [word1]: [Chinese explanation]

- [word2]: [Chinese explanation]

[Continue with the rest of the words until all of the words are shown here...]
\`\`\`
`;

      var article;
      if (openaiApiKey != "") {
        article = await generateArticleByOpenAi(prompt);
      } else {
        article = await generateArticleByGemini(prompt);
      }

      setContent(article);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setContent("Failed to load data.");
    }
  };

  return (
    <Layout
      title="Words to story"
      description="Help you to get familiar with your words by stories"
    >
      <Container>
        <div
          className="sidebar"
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "25vw",
          }}
        >
          <div
            style={{
              display: "flex-col",
            }}
          >
            <label
              style={{
                display: "block",
              }}
            >
              OPENAI_API_KEY
            </label>
            <p
              style={{
                fontSize: "x-small",
                margin: 0,
              }}
            >
              (用 CHATGPT 获得更好地文章效果，如果不填，将使用免费的 Google
              Gemini)
            </p>
            <input
              type="text"
              placeholder="sk-xxxxxxxxxxxxxxxxxx"
              value={openaiApiKey}
              onChange={(e) => setOpenaiApiKey(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex-col",
            }}
          >
            <label
              style={{
                display: "block",
              }}
            >
              欧陆词典 Token (
              <a href="https://my.eudic.net/OpenAPI/Authorization">获取TOKEN</a>
              )
            </label>
            <p
              style={{
                fontSize: "x-small",
                margin: 0,
              }}
            >
              (从你的欧陆生词本获取单词,
              可以不填。欧陆词典是一款非常好用的工具，内置生词本，其“每日英语听力”也非常好用，并且可以很方便添加单词到生词本)
            </p>
            <input
              type="text"
              placeholder="NIS xxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          {token && token != "" ? (
            <div
              style={{
                display: "flex-col",
              }}
            >
              <label
                style={{
                  display: "block",
                }}
              >
                选词模式
              </label>

              <select onClick={(e) => setWordMode(e.target.value)}>
                <option value="latest10">最近10个</option>
                <option value="randomAmongLatest50">
                  从最近50个生词中选10个
                </option>
                <option value="randomAmongLatest100">
                  从最近100个生词中选10个
                </option>
              </select>
            </div>
          ) : undefined}

          <div
            style={{
              display: "flex-col",
            }}
          >
            <label
              style={{
                display: "block",
              }}
            >
              手动输入你的单词
            </label>
            <p
              style={{
                fontSize: "x-small",
                margin: 0,
              }}
            >
              (你可以直接在这指定你想要的单词，输入后，将不再从欧陆词典拉取单词，可以不填)
            </p>
            <input
              type="text"
              placeholder="you, didn't, provide, any, words"
              value={words}
              onChange={(e) => setWords(e.target.value)}
            />
          </div>

          <button
            style={{
              marginTop: "8px",
              fontSize: "large",
            }}
            onClick={handleClick}
          >
            点这里！生成故事
          </button>
        </div>

        <div
          className="content"
          style={{
            flexGrowZ: 1,
            margin: "5px",
            overflowY: "scroll",
          }}
        >
          {loading ? (
            <Markdown># AI is thinking, please wait for a while</Markdown>
          ) : (
            <Markdown>{content}</Markdown>
          )}
        </div>
      </Container>
    </Layout>
  );
}
