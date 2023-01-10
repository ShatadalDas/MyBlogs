import { Work_Sans, Ubuntu, Lato, Roboto, Inria_Serif, Inconsolata } from "@next/font/google";
import LocalFont from "@next/font/local"

const consolas = LocalFont({
  src: [
    {
      path: "../../fonts/consola.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../fonts/consolab.ttf",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../fonts/consolai.ttf",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../../fonts/consolaz.ttf",
      weight: "bold",
      style: "italic",
    },
  ],
  variable: "--fnt-consolas"
});

const work_sans = Work_Sans({
  variable: "--fnt-work-sans",
});

const ubuntu = Ubuntu({
  weight: ["400", "300", "500", "700"],
  variable: "--fnt-ubuntu",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--fnt-lato",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--fnt-roboto"
});

const inria_serif = Inria_Serif({
  weight: ["300", "400", "700"],
  variable: "--fnt-inria-serif"
});

const inconsolata = Inconsolata({
  variable: "--fnt-inconsolata",
});



function useFont() {
  return {
    work_sans,
    ubuntu,
    lato,
    consolas,
    roboto,
    inria_serif,
    inconsolata
  };
}

export default useFont;
