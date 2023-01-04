import React, { Dispatch } from "react";
import { ActionType, BlogDataType } from "../../pages/admin/edit";
import Editor from "./Editor";
import Preview from "./Preview";

type Props = {
  content: string;
  dispatch: Dispatch<ActionType<Partial<BlogDataType>>>;
};

function EditMD({ content, dispatch }: Props) {
  return (
    <>
      <div className="editmd">
        <Editor content={content} dispatch={dispatch} />
        <Preview content={content} />
      </div>
    </>
  );
}

export default EditMD;
