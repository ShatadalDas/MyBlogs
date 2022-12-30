import React, { Dispatch, SetStateAction } from "react";
type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

function Editor({ content, setContent }: Props) {
  return (
    <div className="editor">
      <label htmlFor="blgCnt" className="sr-only">
        Blog Content
      </label>
      <textarea
        className="editor__textarea"
        id="blgCnt"
        placeholder="write the content in markdown language"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        spellCheck={false}
      />
    </div>
  );
}

export default Editor;
