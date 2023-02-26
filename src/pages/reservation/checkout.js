import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "src/styles/checkout.module.css";
import CustomerRef from "components/CustomerRef";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import db from "../api/firebase";

export default function Checkout() {
  const route = useRouter();
  const [customerRef, setCustomerRef] = useState({ name: "", selected: false });
  const [roomNum, setRoomNum] = useState("");
  const [data, setData] = useState({
    checkin: "",
    checkout: "",
    stay_count: "",
    adult_num: "",
    child_num: "",
    room_type: "",
    breakfast: false,
    customer: "",
    price: 0,
  });

  // 予約を確定
  const onClickCheckOut = async () => {
    const docRef = await addDoc(collection(db, "roomhistory"), {
      checkin: data.checkin,
      checkout: data.checkout,
      stay_count: data.stay_count,
      adult_num: data.adult_num,
      child_num: data.child_num,
      room_type: data.room_type,
      breakfast: data.breakfast,
      customer: data.customer,
      price: data.price,
    });
    route.push(
      {
        pathname: "./checkoutConfirm",
        query: {
          roomNum: roomNum,
          customer: data.customer,
          checkin: data.checkin,
          checkout: data.checkout,
        },
      },
      "/reservation/checkoutconfirm"
    );
  };

  // 予約一覧ページ戻る
  const onClickBack = () => {
    route.push("/reservation");
  };

  useEffect(() => {
    setRoomNum(localStorage.getItem("roomNum"));
    const fetch = async () => {
      const docRef = await doc(db, "rooms", route.query.roomNum);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      console.log(data.adult_num);
      setData({
        checkin: data.checkin,
        checkout: data.checkout,
        stay_count: data.stay_count,
        adult_num: data.adult_num,
        child_num: data.child_num,
        room_type: data.room_type,
        breakfast: data.breakfast,
        customer: data.customer,
        price: data.price,
      });
    };
    fetch();
  }, [route.query.roomNum]);

  return (
    <Layout>
      <Header user={route.query.loginId} back title="チェックアウト確認" />
      {customerRef.selected && (
        <CustomerRef
          setCustomerRef={setCustomerRef}
          data={data}
          setData={setData}
        />
      )}
      <div className={styles.container}>
        <h1>{`${roomNum}号室`}</h1>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <span className={styles.checkinSpanStyle}>チェックイン日時：</span>
            <span>{data.checkin}</span>
          </div>
          <div className={styles.inputContainer}>
            <span>泊数：</span>
            <span className={styles.stayCount}>{data.stay_count}</span>
            <label>泊</label>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.numSpanStyle}>宿泊人数：</span>
            <label>大人</label>
            <span>{data.adult_num}</span>
            <label>人、</label>
            <label>子供（0〜17歳まで）</label>
            <span>{data.child_num}</span>
            <label>人</label>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.roomTypeSpanStyle}>
              部屋タイプ（全室禁煙）：
            </span>
            <span>{data.room_type}</span>
          </div>
          <div className={styles.customerContainer}>
            <span className={styles.breakfastSpanStyle}>朝食：</span>
            {data.breakfast ? (
              <span className={styles.breakfast}>あり</span>
            ) : (
              <span className={styles.breakfast}>なし</span>
            )}
          </div>
          <div className={styles.customerContainer}>
            <span className={styles.customerSpanStyle}>顧客情報：</span>
            <label>
              {data.customer === "ゲスト"
                ? `${data.customer}様`
                : `登録済み：${data.customer}様`}
            </label>
          </div>
        </div>
        <div className={styles.price_checkOutContainer}>
          <div className={styles.price}>{`料金：${data.price}円`}</div>
          <button className={styles.backBtn} onClick={onClickBack}>
            戻る
          </button>

          <button
            onClick={() => onClickCheckOut(roomNum)}
            className={styles.checkoutBtn}
          >
            チェックアウト
          </button>
        </div>
      </div>
    </Layout>
  );
}
