import React, { Dispatch } from "react";
import { ActionType, BlogDataType } from "../../pages/admin/edit";

type Props = {
  content: string;
  dispatch: Dispatch<ActionType<Partial<BlogDataType>>>;
};

function Editor({ content, dispatch }: Props) {
  return (
    <div className="editor">
      <label htmlFor="blgCnt" className="sr-only">
        Blog Content
      </label>
      <textarea
        className="editor__textarea"
        id="blgCnt"
        placeholder="write the content in markdown language"
        onChange={(e) =>
          dispatch({ type: "update", payload: { content: e.target.value } })
        }
        value={content}
        spellCheck={false}
      />
    </div>
  );
}

export default Editor;
