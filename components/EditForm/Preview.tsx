import React from "react";
import RenderMarkDown from "../../utils/components/RenderMarkDown";

type Props = {
  content: string;
};

function Preview({ content }: Props) {
  return (
    <div className="preview">
      <RenderMarkDown content={content} className="half"/>
    </div>    
  );
}

export default Preview;
