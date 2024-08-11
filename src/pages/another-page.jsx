import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";

export default function Support() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <Layout title="get-support" description="get-support">
          <header className="bg-blue-500">
            <div className="container mx-auto text-center py-24">
              <h1 className="text-4xl font-bold text-white">
                Get support
              </h1>
              <p className="text-xl py-6 text-white"> some tips </p>

              <div className="py-10">
                <Link
                  className="bg-white rounded-md text-gray-500 px-4 py-2"
                  to="/docs/intro"
                >
                  Docusaurus Tutorial - 5min ⏱️
                </Link>
              </div>
            </div>
          </header>
        </Layout>
      )}
    </BrowserOnly>
  );
}
