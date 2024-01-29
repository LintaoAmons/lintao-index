import React, { useState } from "react";
import Layout from "@theme/Layout";
import Markdown from "react-markdown";

export default function Hello() {
  const [token, setToken] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWords = async () => {
    try {
      const response = await fetch(
        "https://api.frdic.com/api/open/v1/studylist/words/?language=en&page=0&page_size=10",
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

      return (await response.json()).data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const generateArticle = async (words) => {
    try {
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

  const handleClick = async () => {
    try {
      setLoading(true);
      const data = await fetchWords();
      const words = data.map((it) => it.word);
      const article = await generateArticle(words);

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
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          height: "100vh",
          fontSize: "20px",
        }}
      >
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
            // backgroundColor: "blue",
            flexBasis: "75vw",
            margin: "5px",
          }}
        >
          {loading ? (
            <Markdown># AI is thinking, please wait for a while</Markdown>
          ) : (
            <Markdown>{content}</Markdown>
          )}
        </div>
      </div>
    </Layout>
  );
}
