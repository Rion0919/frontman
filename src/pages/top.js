import Header from "components/Header";
import { Layout } from "components/Layout";
import MenuButton from "components/MenuButton";
import { useRouter } from "next/router";
import styles from "src/styles/top.module.css";

export default function Top() {
  const router = useRouter();

  return (
    <Layout>
      <Header user={router.query.loginId} />
      <div className={styles.container}>
        <MenuButton label="顧客管理" href="/customer/customer" as="/customer" />
        <MenuButton
          label="予約管理"
          href="/reservation/reservation"
          as="reservation"
        />
        <MenuButton label="部屋管理" href="/room/room" as="/room" />
        <MenuButton label="ユーザー管理" href="/user/user" as="/user" />
      </div>
    </Layout>
  );
}
