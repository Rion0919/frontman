import { useRouter } from "next/router";
import React, { memo, useRef, useState } from "react";
import styles from "src/styles/menubutton.module.css";

const MenuButton = ({ label, href, as, children, hoverMsg }) => {
  const route = useRouter();
  const [hover, setHover] = useState(false);
  const ref = useRef(children);
  const handleRoute = () => {
    route.push({ pathname: href, query: { loginId: children } }, as);
  };
  return (
    <>
    {hover && <div className={styles.hoverMsg}>{hoverMsg}</div>}
      <button
        className={styles.btnLayout}
        onClick={handleRoute}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
      >
        {label}
      </button>
    </>
  );
};

export default memo(MenuButton);
