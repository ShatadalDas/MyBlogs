import React from "react";
import Editor from "./Editor";
import Preview from "./Preview";

function EditMD() {
  return (
    <>
      <div className="editmd">
        <Editor />
        <Preview />
      </div>
    </>
  );
}

export default EditMD;
