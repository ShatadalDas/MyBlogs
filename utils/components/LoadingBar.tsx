import React from "react";

type Props = {
  show: boolean;
};

function LoadingBar({ show }: Props) {
  return <div className={`loading-bar ${show ? "loading--start" : ""}`}></div>;
}

export default LoadingBar;
