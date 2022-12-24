import React from "react";
import Image from "next/image";

function BlogItemLoading() {
  return (
    <div className="blogitem blogitem--loading">
      <Image src="/loading.gif" alt="" height={100} width={100} />
    </div>
  );
}

export default BlogItemLoading;
