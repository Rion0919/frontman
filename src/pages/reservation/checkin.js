import Header from "components/Header";
import dynamic from "next/dynamic";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/checkin.module.css";
import CustomerRef from "components/CustomerRef";
import { doc, updateDoc } from "firebase/firestore";
import db from "../api/firebase";

export default function Checkin() {
  const route = useRouter();
  const [customerRef, setCustomerRef] = useState({ name: "", selected: false });
  const [stay, setStay] = useState(true);
  const [roomNum, setRoomNum] = useState("");
  const [data, setData] = useState({
    checkin_month: "",
    checkin_date: "",
    checkin_hour: "",
    checkin_min: "",
    checkout_month: "",
    checkout_date: "",
    checkout_hour: "",
    checkout_min: "",
    adult_num: "",
    child_num: "",
    room_type: "",
    breakfast: false,
    customer: "",
  });

  // dataステートに値を保存
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
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
  const onClickCheckIn = async (roomNum) => {
    const docRef = doc(db, "rooms", roomNum)
    await updateDoc(docRef, {
      checkin: `${data.checkin_month}/${data.checkin_date} ${data.checkin_hour}:${data.checkin_min}`,
      checkout: `${data.checkout_month}/${data.checkout_date} ${data.checkout_hour}:${data.checkout_min}`,
      adult_num: data.adult_num,
      child_num: data.child_num,
      room_type: data.room_type,
      breakfast: data.breakfast,
      customer: data.customer,
      stay: stay
    });
    route.push("/reservation");
  };

  useEffect(() => {
    setRoomNum(localStorage.getItem("roomNum"));
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
            <input
              className={styles.checkinStyle}
              type="text"
              name="checkin_month"
              value={data.checkin_month}
              onChange={handleChange}
            />
            <label>月</label>
            <input
              className={styles.checkinStyle}
              type="text"
              name="checkin_date"
              value={data.checkin_date}
              onChange={handleChange}
            />
            <label>日</label>
            <input
              className={styles.checkinStyle}
              type="text"
              name="checkin_hour"
              value={data.checkin_hour}
              onChange={handleChange}
            />
            <label>時</label>
            <input
              className={styles.checkinStyle}
              type="text"
              name="checkin_min"
              value={data.checkin_min}
              onChange={handleChange}
            />
            <label>分〜</label>
          </div>
          <div className={styles.inputContainer}>
            <span>チェックアウト日時：</span>
            <input
              className={styles.checkoutStyle}
              type="text"
              name="checkout_month"
              value={data.checkout_month}
              onChange={handleChange}
            />
            <label>月</label>
            <input
              className={styles.checkoutStyle}
              type="text"
              name="checkout_date"
              value={data.checkout_date}
              onChange={handleChange}
            />
            <label>日</label>
            <input
              className={styles.checkoutStyle}
              type="text"
              name="checkout_hour"
              value={data.checkout_hour}
              onChange={handleChange}
            />
            <label>時</label>
            <input
              className={styles.checkoutStyle}
              type="text"
              name="checkout_min"
              value={data.checkout_min}
              onChange={handleChange}
            />
            <label>分</label>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.numSpanStyle}>宿泊人数：</span>
            <label>大人</label>
            <input
              className={styles.numStyle}
              type="text"
              name="adult_num"
              value={data.adult_num}
              onChange={handleChange}
            />
            <label>人</label>
            <label>子供（0〜17歳まで）</label>
            <input
              className={styles.numStyle}
              type="text"
              name="child_num"
              value={data.child_num}
              onChange={handleChange}
            />
            <label>人</label>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.roomTypeSpanStyle}>
              部屋タイプ（全室禁煙）：
            </span>
            <select
              id="roomType"
              className={styles.roomTypeStyle}
              onChange={onSelectRoomType}
            >
              <option value="">部屋タイプ</option>
              <option value="シングル">シングル</option>
              <option value="ツイン">ツイン</option>
            </select>
          </div>
          <div className={styles.radioInputContainer}>
            <span className={styles.breakfastSpanStyle}>朝食：</span>
            <input
              className={styles.radioStyle}
              name="breakfast"
              id="yes"
              type="radio"
              value={true}
              onChange={(e) => onSelectBreakfast(e)}
            />
            <label htmlFor="yes">あり</label>
            <input
              className={styles.radioStyle}
              name="breakfast"
              id="no"
              type="radio"
              value={false}
              onChange={(e) => onSelectBreakfast(e)}
            />
            <label htmlFor="no">なし</label>
          </div>
          <div className={styles.radioInputContainer}>
            <span className={styles.customerSpanStyle}>顧客情報：</span>
            <button
              className={styles.customerRefBtn}
              onClick={onClickCustomerRef}
            >
              顧客情報参照
            </button>
            <label>
              {customerRef.name !== ""
                ? `：${customerRef.name}様`
                : "：登録済み"}
            </label>
            <input name="customer" id="noRegister" type="radio" />
            <label htmlFor="noRegister">：登録しない</label>
            <input name="customer" id="register" type="radio" />
            <label htmlFor="register">：チェックイン時に登録</label>
          </div>
        </div>
        <div className={styles.price_checkInContainer}>
          <div className={styles.price}>料金：24,000円</div>
          <button
            onClick={() => onClickCheckIn(roomNum)}
            className={styles.checkinBtn}
          >
            チェックイン
          </button>
        </div>
      </div>
    </Layout>
  );
}

const RoomNumComponent = () => {
  if (typeof window === "undefined") return null;

  const roomNum = localStorage.getItem("roomNum");

  // component logic

  return <h1>{roomNum}</h1>;
};