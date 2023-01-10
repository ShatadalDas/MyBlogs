import React from "react";
import useFont from "../hooks/useFont";

const { inconsolata } = useFont();

function Footer() {
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
