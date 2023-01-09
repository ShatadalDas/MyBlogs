import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../../pages/admin/edit";
import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  lineHeight: 1.7,
  links: true,
  mouseWheelZoom: true,
};

function Editor() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <MonacoEditor
      className="editor"
      language="markdown"
      theme="vs-dark"
      onChange={(val) =>
        dispatch({ type: "update", payload: { content: val } })
      }
      value={state.content}
      defaultValue="<!-- write the content in markdown language -->"
      width="50%"
      height="100%"
      options={MONACO_OPTIONS}
    />
  );
}

export default Editor;
