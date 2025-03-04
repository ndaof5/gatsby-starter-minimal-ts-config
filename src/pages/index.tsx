import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Editor from "@monaco-editor/react";
import { Layout } from "@emerald/react";
import styled from "styled-components";
import { configureMonacoYaml} from "monaco-yaml";
import configmap from "./configmap.png";

// @ts-ignore
window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case 'editorWorkerService':
        return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url))
      case 'css':
      case 'less':
      case 'scss':
        return new Worker(new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url))
      case 'handlebars':
      case 'html':
      case 'razor':
        return new Worker(
          new URL('monaco-editor/esm/vs/language/html/html.worker', import.meta.url)
        )
      case 'json':
        return new Worker(
          new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url)
        )
      case 'javascript':
      case 'typescript':
        return new Worker(
          new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url)
        )
      case 'yaml':
        return new Worker(new URL('monaco-yaml/yaml.worker', import.meta.url))
      default:
        throw new Error(`Unknown label ${label}`)
    }
  }
}
const IndexPage: React.FC<PageProps> = () => {
  const handleMount = (monaco) => {
    if (monaco) {
      configureMonacoYaml(monaco, {
        enableSchemaRequest: true,
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
                  description: 9999,
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
            uri: "https://github.com/remcohaszing/monaco-yaml#usage",
          },
        ],
      });

     const model =  monaco.editor.createModel(
        "name: John Doe\nage: ee\noccupation: Pirate\n",
        undefined,
        monaco.Uri.parse("file://person.yaml")
      );
    }
  };

  return (
    <Layout
      sidebar={
       <Editor value={"123"} language={"yaml"} beforeMount={handleMount} path={"person.yaml"}></Editor>
      }
      sidebarWidth={700}
      padSidebarVertical={20}
      padSidebarHorizontal={20}
      padWorkspaceVertical={20}
      padWorkspaceHorizontal={20}
      sidebarHeader={
        <div style={{ height: "100%" }}>F5 AI Gate Way Config Editor</div>
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
      <div style={{ height: "100%", paddingTop: "60px" }}><img src={configmap} height={"80%"} width={"100%"}></img></div>
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
