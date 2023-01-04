import React, { Dispatch } from "react";
import { ActionType, BlogDataType } from "../../pages/admin/edit";
import Editor from "./Editor";
import Preview from "./Preview";

type Props = {
  state: BlogDataType;
  dispatch: Dispatch<ActionType<Partial<BlogDataType>>>;
};

function EditMD({ state, dispatch }: Props) {
  return (
    <>
      <div className="editmd">
        <Editor content={state.content} dispatch={dispatch} />
        <Preview content={state.content} />
      </div>
    </>
  );
}

export default EditMD;
