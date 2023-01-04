import React, { Dispatch } from "react";
import { ActionType, BlogDataType } from "../../pages/admin/edit";

type Props = {
  state: BlogDataType;
  dispatch: Dispatch<ActionType<Partial<BlogDataType>>>;
};

function TitleAndMeta({ state, dispatch }: Props) {

  function updateBlogData(data: Partial<BlogDataType>) {
    dispatch({ type: "update", payload: { ...data } });
  }

  return (
    <main className="title-frm-wrapper">
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
