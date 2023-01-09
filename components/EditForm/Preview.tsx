import React, { useContext } from "react";
import { StateContext } from "../../pages/admin/edit";
import { RenderMarkDown } from "../../utils/components";

function Preview() {
  const state = useContext(StateContext);
  return (
    <div className="preview">
      <RenderMarkDown content={state.content} className="half" />
    </div>
  );
}

export default Preview;
