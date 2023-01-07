import React, { PropsWithChildren, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdOutlineContentCopy, MdDoneAll } from "react-icons/md";

function CopyCode({ children }: PropsWithChildren<any>) {
  const [done, setDone] = useState(false);
  function handleCopy() {
    setDone(true);
    setTimeout(() => {
      setDone(false);
    }, 500);
  }

  return (
    <CopyToClipboard
      text={children[0].props.children[0].trim()}
      onCopy={handleCopy}
    >
      <div className="copy">
        {done ? (
          <>
            <span>Copied!</span>
            <MdDoneAll className="copy_icon copy--done" />
          </>
        ) : (
          <MdOutlineContentCopy className="copy_icon" />
        )}
      </div>
    </CopyToClipboard>
  );
}

export default CopyCode;
