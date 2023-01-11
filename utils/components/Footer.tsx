import React from "react";
import { useFont } from "../hooks";

function Footer() {
  const { inconsolata } = useFont();
  return (
    <footer
      className={`footer 
    ${inconsolata.variable}
    `}
    >
      <p className="footer__text">
        Shatdal Das
        <span className="footer__text__email">
          {" "}
          | shatadaldas.pro@gmail.com
        </span>
      </p>
    </footer>
  );
}

export default Footer;
