// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "林饕 | Lintao",
  favicon: "img/logo.svg",

  // Set the production url of your site here
  url: "https://lintao-index.pages.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "oatnil", // Usually your GitHub org/user name.
  projectName: "lintao-index", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  scripts: [
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8219652153387121",
      async: true,
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // routeBasePath: '/',
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/LintaoAmons/lintao-index/tree/main/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/LintaoAmons/lintao-index/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/Lintao-social-card.jpg",
      navbar: {
        title: "Lintao | 林饕",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "筆記",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            to: "https://lintao-index.pages.dev/wordsToStory",
            label: "神奇故事背单词",
            position: "left",
          },
          {
            label: "X(Twitter)",
            href: "https://twitter.com/Lintao000",
            position: "right",
          },

          {
            href: "https://github.com/LintaoAmons",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://lintao-index.pages.dev/blog/rss.xml",
            label: "RSS",
            position: "right",
          },
        ],
      },

      footer: {
        style: "dark",
        links: [
          {
            title: "Show me the code",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/LintaoAmons",
              },
              {
                label: "Scratch.nvim",
                href: "https://github.com/LintaoAmons/scratch.nvim",
              },
              {
                label: "Undercontrol",
                href: "https://github.com/LintaoAmons/undercontrol-go",
              },
              {
                label: "筆記",
                to: "/docs/intro",
              },
            ],
          },

          {
            title: "Contact Me",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
              {
                label: "Email",
                href: "mailto://lintao.amons@gmail.com",
              },
              {
                label: "Linkedin",
                href: "https://www.linkedin.com/in/lintaozhang",
              },
              {
                label: "X(Twitter)",
                href: "https://twitter.com/Lintao000",
              },
            ],
          },

          {
            title: "Link exchange",
            items: [
              {
                label: "Mutoe's blog",
                href: "https://blog.mutoe.com/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Lintao. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
