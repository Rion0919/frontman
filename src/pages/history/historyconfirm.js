import Header from "components/Header";
import { Layout } from "components/Layout";
import { collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import db from "../api/firebase";
import styles from "src/styles/historyconfirm.module.css";

export default function HistoryConfirm() {
  const route = useRouter();
  const [data, setData] = useState({
    id: route.query.historyId,
    customer: "",
    checkin_month: "",
    checkin_date: "",
    checkin_hour: "",
    checkin_min: "",
    checkout_month: "",
    checkout_date: "",
    room_type: "",
    breakfast: "",
    adult_num: "",
    child_num: "",
    stay_count: "",
  });
  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(db, "roomhistory", route.query.historyId);
      const snap = await getDoc(docRef);
      const list = snap.data();
      setData({
        customer: list.customer,
        checkin_month: list.checkin.split(" ")[0].split("/")[0],
        checkin_date: list.checkin.split(" ")[0].split("/")[1],
        checkin_hour: list.checkin.split(" ")[1].split(":")[0],
        checkin_min: list.checkin.split(" ")[1].split(":")[1],
        checkout_month: list.checkout.split("/")[0],
        checkout_date: list.checkout.split("/")[1],
        room_type: list.room_type,
        breakfast: list.breakfast,
        adult_num: list.adult_num,
        child_num: list.child_num,
        stay_count: list.stay_count,
      });
    };
    fetch();
  }, [route.query.historyId]);
  return (
    <Layout>
      <Header back userId={route.query.userId} title="宿泊履歴詳細" />
      <div className={styles.container}>
        <h1>{data.id}</h1>
        <div className={styles.dataContainer}>
          <span>宿泊者：</span>
          <p>{`${data.customer}様`}</p>
        </div>
        <div className={styles.dataContainer}>
          <span>チェックイン日時：</span>
          <p>{`${data.checkin_month}月${data.checkin_date}日 ${data.checkin_hour}:${data.checkin_min}`}</p>
        </div>
        <div className={styles.dataContainer}>
          <span>チェックアウト日：</span>
          <p>{`${data.checkout_month}月${data.checkout_date}日`}</p>
        </div>
        <div className={styles.dataContainer}>
          <span>宿泊日数：</span>
          <p>{`${data.stay_count}日`}</p>
        </div>
        <div className={styles.dataContainer}>
          <span>大人：</span>
          <p>{`${data.adult_num}人`}</p>
        </div>
        <div className={styles.dataContainer}>
          <span>子供：</span>
          <p>{`${data.child_num}人`}</p>
        </div>
        <div className={styles.dataContainer}>
          <span>部屋タイプ：</span>
          <p>{data.room_type}</p>
        </div>
        <div className={styles.dataContainer}>
          <span>朝食：</span>
          <p>{data.breakfast ? "あり" : "なし"}</p>
        </div>
      </div>
    </Layout>
  );
}
