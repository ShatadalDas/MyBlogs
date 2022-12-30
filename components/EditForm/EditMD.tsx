import React, { Dispatch, SetStateAction } from "react";
import Editor from "./Editor";
import Preview from "./Preview";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

function EditMD({ content, setContent }: Props) {
  return (
    <>
      <div className="editmd">
        <Editor content={content} setContent={setContent} />
        <Preview content={content} />
      </div>
    </>
  );
}

export default EditMD;
