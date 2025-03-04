import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Editor, { Monaco } from "@monaco-editor/react";
import { Layout } from "@emerald/react";
import styled from "styled-components";
import { configureMonacoYaml } from "monaco-yaml";
import configmap from "./configmap.png";
import gheader from "./sideheader.png";

// @ts-ignore
window.MonacoEnvironment = {
  getWorker(moduleId, label) {
      if (label === "yaml") {
        return new Worker("../../node_modules/monaco-yaml/yaml.worker.js");
      }
  },
};
const IndexPage: React.FC<PageProps> = () => {
  const handleMount = (monaco: Monaco) => {
    if (monaco) {
      configureMonacoYaml(monaco, {
        enableSchemaRequest: false,
        schemas: [
          {
            // If YAML file is opened matching this glob
            fileMatch: ["**/person.yaml"],
            // The following schema will be applied
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "awesome",
                },
                age: {
                  type: "integer",
                  description: "How old is the person in years?",
                },
                occupation: {
                  enum: ["Delivery person", "Software engineer", "Astronaut"],
                },
              },
            },
            uri: "https://google.com",
          },
        ],
      });
      console.log(monaco.Uri.parse("file:///person.yaml"));

      monaco.editor.createModel(
        'name: John Doe\nage: 42\noccupation: Pirate\n',
        undefined,
        monaco.Uri.parse('file:///person.yaml')
      )
    }
  };

  return (
    <Layout
      sidebar={
        <div style={{ marginTop: "-30px", height: "100%" }}>
          <Editor
            value={"123"}
            language={"yaml"}
            beforeMount={handleMount}
            path={"person.yaml"}
          ></Editor>
        </div>
      }
      sidebarWidth={700}
      padSidebarVertical={20}
      padSidebarHorizontal={20}
      padWorkspaceVertical={20}
      padWorkspaceHorizontal={20}
      sidebarHeader={
        <div style={{ height: "100%" }}>
          <img src={gheader} style={{ height: "100%", width: "100%" }} />
        </div>
      }
      footer={<span>Footer</span>}
      themeOverride={{
        color: {
          sidebar: { ink: "#0f1e57", fill: "#f3f4f9" },
          header: { ink: "#0f1e57", fill: "#f7f8fa" },
          content: { ink: "#0f1e57", fill: "#f7f8fa" },
          aside: { ink: "#0f1e57", fill: "#ffffff" },
          footer: { ink: "#0f1e57", fill: "#e6e9f3" },
          edges: "#e6e9f3",
        },
      }}
    >
      <div style={{ height: "100%", paddingTop: "60px" }}>
        <img src={configmap} height={"80%"} width={"100%"}></img>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

const Wrapper = styled.div`
  [data-selector="Layout.Styled.Sidebar"] {
  borderTop: "0.5px solid grey"
  borderBottom: "0.5px solid grey"
}
`;
