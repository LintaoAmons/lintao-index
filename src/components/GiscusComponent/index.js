import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  const { pathname } = useLocation();

  return pathname.includes(pathname) ? undefined : (
    <Giscus
      repo="LintaoAmons/lintao-index"
      repoId="R_kgDOKcy8Bw"
      category="General"
      categoryId="DIC_kwDOKcy8B84CZ71z" // E.g. id of "General"
      mapping="url" // Important! To map comments to URL
      term="Welcome to @giscus/react component!"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="lazy"
      crossorigin="anonymous"
      async
    />
  );
}
