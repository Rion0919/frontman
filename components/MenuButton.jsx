import { useRouter } from "next/router";
import React from "react";
import styles from "src/styles/menubutton.module.css";

const MenuButton = ({ label, href, as }) => {
  const route = useRouter();
  const handleRoute = () => {
    route.push({ pathname: href }, as);
  };
  return (
    <button className={styles.btnLayout} onClick={handleRoute}>
      {label}
    </button>
  );
};

export default MenuButton;
