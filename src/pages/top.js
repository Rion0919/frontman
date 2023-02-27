import Header from "components/Header";
import { Layout } from "components/Layout";
import MenuButton from "components/MenuButton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/top.module.css";
import db, { auth } from "./api/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Top() {
  const [permission, setPermission] = useState("");
  const router = useRouter();
  const ref = useRef([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        ref.current = [...ref.current, user.email]
        const fetch = async () => {
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnap = await getDocs(q);
          querySnap.forEach((d) => {
            ref.current = [...ref.current, d.data().permission]
            setPermission(d.data().permission);
          });
        };
        fetch();
      } else {
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Header user={router.query.loginId}/>
      <div
        className={
          permission === "管理者" ? styles.container : styles.comContainer
        }
      >
        <MenuButton label="顧客管理" href="/customer" as="/customer" hoverMsg="顧客管理：顧客情報を追加/更新/削除します" />
        <MenuButton label="予約管理" href="/reservation" as="reservation" hoverMsg="予約管理：チェックイン/アウトします">
          {ref.current}
        </MenuButton>
        <MenuButton label="宿泊履歴" href="/room" as="/history" hoverMsg="宿泊履歴：宿泊履歴を確認できます">
          {ref.current}
        </MenuButton>
        {permission === "管理者" && (
          <MenuButton label="ユーザー管理" href="/user" as="/user" hoverMsg="ユーザー管理：ユーザーを確認/追加します">
            {ref.current}
          </MenuButton>
        )}
      </div>
    </Layout>
  );
}
