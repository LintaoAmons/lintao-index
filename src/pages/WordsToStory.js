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

export default function WordsToStory() {
  const [token, setToken] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  // words allow user input random words
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }

  const fetchWords = async () => {
    try {
      const response = await fetch(
        "https://api.frdic.com/api/open/v1/studylist/words/?language=en&page=0&page_size=50",
        {
          method: "GET", // The method is optional since GET is the default value
          headers: {
            Authorization: token, // Replace TOKEN with your actual token
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()).data;

      const words = data.map((it) => it.word);

      // Shuffle the array of words
      const shuffledWords = shuffleArray(words);

      // Pick the first ten words
      const firstTenWords = shuffledWords.slice(0, 10);

      return firstTenWords;
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
    if (token && token !== "") {
      return await fetchWords();
    }
    return ["today", "I", "Good", "Feel"];
  };

  const generateArticleByCFWorder = async (prompt) => {
    try {
      const response = await fetch(
        "https://gateway.ai.cloudflare.com/v1/e89e6bf826104a79b5acc93775ae08f3/openai-gateway/workers-ai/@cf/meta/llama-2-7b-chat-int8",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer bmWjLQmAUCOkfPV9UCBRKA45zENcOS_5qDy6q8Wn",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.result.response;
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

      const prompt = `"Please create a story of approximately 100 words, ensuring it includes the following English words: ${words}. Each word must be highlighted in **bold** within the story. Additionally, provide the Chinese translations for these words, alongside a brief explanation of their meanings. Structure your response in the markdown format provided below:
\`\`\`
## Story

[Insert the story here, with all specified words in **bold**.]

## Chinese Translation

[Provide the Chinese translation of the story here.]

## Words

- [word1]: [Chinese explanation]

- [word2]: [Chinese explanation]

[Continue with the rest of the words...]
\`\`\`
`;

      var article;
      if (openaiApiKey != "") {
        article = await generateArticleByOpenAi(prompt);
      } else {
        article = await generateArticleByCFWorder(prompt);
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
            // backgroundColor: "red",
          }}
        >
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            OPENAI_API_KEY:
            <input
              type="text"
              value={openaiApiKey}
              onChange={(e) => setOpenaiApiKey(e.target.value)}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            EUDIT TOKEN:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />{" "}
          </label>

          <button
            style={{
              marginTop: "8px",
            }}
            onClick={handleClick}
          >
            Call API
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
