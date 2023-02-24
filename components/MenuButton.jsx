import { useRouter } from "next/router";
import React, { memo, useRef } from "react";
import styles from "src/styles/menubutton.module.css";

const MenuButton = ({ label, href, as, children }) => {
  const route = useRouter();
  const ref = useRef(children)
  const handleRoute = () => {
    route.push({ pathname: href, query: {loginId: children} }, as);
  };
  return (
    <button className={styles.btnLayout} onClick={handleRoute}>
      {label}
    </button>
  );
};

export default memo(MenuButton);
