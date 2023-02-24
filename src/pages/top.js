import Header from "components/Header";
import { Layout } from "components/Layout";
import MenuButton from "components/MenuButton";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "src/styles/top.module.css";

export default function Top() {
  const router = useRouter();
  const ref = useRef(router.query.loginId)
  return (
    <Layout>
      <Header user={router.query.loginId} />
      <div className={styles.container}>
        <MenuButton label="顧客管理" href="/customer" as="/customer">{ref.current}</MenuButton>
        <MenuButton
          label="予約管理"
          href="/reservation"
          as="reservation"
        >{ref.current}</MenuButton>
        <MenuButton label="宿泊履歴" href="/room" as="/history" >{ref.current}</MenuButton>
        <MenuButton label="ユーザー管理" href="/user" as="/user" >{ref.current}</MenuButton>
      </div>
    </Layout>
  );
}
