import Header from "components/Header";
import dynamic from "next/dynamic";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "src/styles/checkout.module.css";
import CustomerRef from "components/CustomerRef";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../api/firebase";

//宿泊料金プログラム
//・一泊6000円（大人1人、シングル）
//・一泊10000円（大人一人、ツイン）
//・大人一人追加で＋4000円（一泊ごと）、子供一人当たり＋2000円
//・朝食あり：2000円
//例）
//2泊3日　大人2人　朝食あり、ツイン
//(10000 + 4000) * 2 + 2000 = 30,000円
//
//1泊2日　大人2人　子供1人、朝食あり、ツイン
//(10000 + 4000) * 1 + 2000 + 2000 = 18,000円

export default function Checkout() {
  const route = useRouter();
  const [customerRef, setCustomerRef] = useState({ name: "", selected: false });
  const [stay, setStay] = useState(true);
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
  });
  const [price, setPrice] = useState(0);
  const [stayCount, setStayCount] = useState("");

  // dataステートに値を保存
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // 何泊するのか計算
  const calcStay = (e) => {
    const _name = e.target.name;
    let num = e.target.value;
    setData({ ...data, [_name]: num });
  };

  // 選択した部屋タイプを取得
  const onSelectRoomType = () => {
    const str = document.getElementById("roomType").value;
    setData({ ...data, room_type: str });
  };

  // 朝食がありかなしか取得
  const onSelectBreakfast = (e) => {
    setData({ ...data, breakfast: e.target.value });
  };

  // 顧客情報参照画面表示
  const onClickCustomerRef = () => {
    document.getElementById("noRegister").checked = false;
    document.getElementById("register").checked = false;
    setCustomerRef({ name: "", selected: true });
  };

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
    });
    route.push(
      {
        pathname: "./checkoutConfirm",
        query: {
          roomNum: roomNum,
          customer: data.customer,
          checkin: data.checkin,
          checkout: data.checkout,
        }
      },
      "/reservation/checkoutconfirm"
    );
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
      });
    };
    fetch();
  }, []);

  return (
    <Layout>
      <Header user={route.query.loginId} back />
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
          <div className={styles.radioInputContainer}>
            <span className={styles.breakfastSpanStyle}>朝食：</span>
            <input
              className={styles.radioStyle}
              name="breakfast"
              id="yes"
              type="radio"
              value={true}
              checked={data.breakfast}
              onChange={(e) => onSelectBreakfast(e)}
            />
            <label htmlFor="yes">あり</label>
            <input
              className={styles.radioStyle}
              name="breakfast"
              id="no"
              type="radio"
              value={false}
              defaultChecked={!data.breakfast}
              onChange={(e) => onSelectBreakfast(e)}
            />
            <label htmlFor="no">なし</label>
          </div>
          <div className={styles.radioInputContainer}>
            <span className={styles.customerSpanStyle}>顧客情報：</span>
            <label>
              {data.customer !== "" ? `登録済み：${data.customer}様` : "登録しない"}
            </label>
          </div>
        </div>
        <div className={styles.price_checkInContainer}>
          <div className={styles.price}>{`料金：${price}円`}</div>
          <button
            onClick={() => onClickCheckOut(roomNum)}
            className={styles.checkinBtn}
          >
            チェックアウト
          </button>
        </div>
      </div>
    </Layout>
  );
}

const RoomNumComponent = () => {
  if (typeof window === "undefined") return null;

  const roomNum = localStorage.getItem("roomNum");

  return <h1>{roomNum}</h1>;
};
