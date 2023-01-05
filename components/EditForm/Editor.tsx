import React, { Dispatch } from "react";
import { ActionType, BlogDataType } from "../../pages/admin/edit";
import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

type Props = {
  content: string;
  dispatch: Dispatch<ActionType<Partial<BlogDataType>>>;
};

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  lineHeight: 1.7,
  links: true,
  mouseWheelZoom: true,
};

function Editor({ content, dispatch }: Props) {
  return (
    <MonacoEditor
      className="editor"
      language="markdown"
      theme="vs-dark"
      onChange={(val) =>
        dispatch({ type: "update", payload: { content: val } })
      }
      value={content}
      defaultValue="<!-- write the content in markdown language -->"
      width="50%"
      height="100%"
      
      options={MONACO_OPTIONS}
    />
  );
}

export default Editor;
