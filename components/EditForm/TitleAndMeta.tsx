import React, { Dispatch, SetStateAction } from "react";

type Props = {
  otherFormData: {
    title: string;
    metaDes: string;
    keywords: string;
  };

  setOtherFormData: Dispatch<
    SetStateAction<{
      title: string;
      metaDes: string;
      keywords: string;
    }>
  >;
};

function TitleAndMeta({ otherFormData, setOtherFormData }: Props) {
  return (
    <main className="title-frm-wrapper">
      <label className="sr-only" htmlFor="title">
        Title
      </label>
      <textarea
        id="title"
        onChange={(e) =>
          setOtherFormData((val) => ({ ...val, title: e.target.value }))
        }
        value={otherFormData.title}
        placeholder="enter the title here"
      />

      <label className="sr-only" htmlFor="meta">
        Meta Description
      </label>
      <textarea
        id="meta"
        onChange={(e) =>
          setOtherFormData((val) => ({ ...val, metaDes: e.target.value }))
        }
        value={otherFormData.metaDes}
        placeholder="enter the meta description here (between 50 to 160 ch)"
      />

      <label className="sr-only" htmlFor="keywords">
        Keywords
      </label>
      <textarea
        id="keywords"
        onChange={(e) =>
          setOtherFormData((val) => ({ ...val, keywords: e.target.value }))
        }
        value={otherFormData.keywords}
        placeholder="enter the keywords here"
      />
    </main>
  );
}

export default TitleAndMeta;
