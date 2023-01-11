import React, { useContext } from "react";
import {
  BlogDataType,
  DispatchContext,
  StateContext,
} from "../../pages/admin/edit";
import { useFont } from "../../utils/hooks";

function TitleAndMeta() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { work_sans, inconsolata, ubuntu } = useFont();

  function updateBlogData(data: Partial<BlogDataType>) {
    dispatch({ type: "update", payload: { ...data } });
  }

  return (
    <main
      className={`title-frm-wrapper
    ${work_sans.variable}
    ${inconsolata.variable}
    ${ubuntu.variable}
    `}
    >
      <label className="sr-only" htmlFor="title">
        Title
      </label>
      <textarea
        id="title"
        onChange={(e) => updateBlogData({ title: e.target.value })}
        value={state.title}
        placeholder="enter the title here"
      />

      <label className="sr-only" htmlFor="meta">
        Meta Description
      </label>
      <textarea
        id="meta"
        onChange={(e) => updateBlogData({ metaDes: e.target.value })}
        value={state.metaDes}
        placeholder="enter the meta description here (between 50 to 160 ch)"
      />

      <label className="sr-only" htmlFor="keywords">
        Keywords
      </label>
      <textarea
        id="keywords"
        onChange={(e) => updateBlogData({ keywords: e.target.value })}
        value={state.keywords}
        placeholder="enter the keywords here"
      />
    </main>
  );
}

export default TitleAndMeta;
