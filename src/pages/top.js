import Header from "components/Header";
import { Layout } from "components/Layout";
import MenuButton from "components/MenuButton";
import { collection, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/top.module.css";
import db from "./api/firebase";

export default function Top() {
  const router = useRouter();
  const ref = useRef(router.query.email)
  const [permission, setPermission] = useState("")
  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "users"), where("email", "==", ref.current))
      const querySnap = await getDocs(q)
      querySnap.forEach(d => {
        setPermission(d.data().permission)
      }) 
    }
    fetch()
  }, [])
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
        {permission === "管理者" && <MenuButton label="ユーザー管理" href="/user" as="/user" >{ref.current}</MenuButton>}
      </div>
    </Layout>
  );
}
