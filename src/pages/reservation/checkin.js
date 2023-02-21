import Header from "components/Header";
import dynamic from "next/dynamic";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/checkin.module.css";
import CustomerRef from "components/CustomerRef";
import { doc, updateDoc } from "firebase/firestore";
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
    stay_count: "",
    adult_num: "",
    child_num: "",
    room_type: "",
    breakfast: false,
    customer: "",
  });
  const [price, setPrice] = useState(0);
  const [stayCount, setStayCount] = useState('')

  // dataステートに値を保存
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // 何泊するのか計算
  const calcStay = (e) => {
    const _name = e.target.name
    let num = e.target.value
    setData({...data, [_name]: num})
    
  }

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
    let month = 0
    let date = 0
    const _date = new Date()
    const _lastDay = new Date(_date.getFullYear(), _date.getMonth() + 1, 0).getDate()
    date = +data.checkin_date + (+data.stay_count);
    month = new Date(_date.getFullYear(), _date.getMonth() + 1, 0).getMonth() + 1
    console.log(month, date);
    if(date > _lastDay){
      date = (date - _lastDay) + 1
      month = new Date(_date.getFullYear(), _date.getMonth() + 1, 0).getMonth() + 2
      console.log(month, date);
    }
    await updateDoc(docRef, {
      checkin: `${data.checkin_month}/${data.checkin_date} ${data.checkin_hour}:${data.checkin_min}`,
      checkout: `${month}/${date}`,
      stay_count: data.stay_count,
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
          {/* <div className={styles.inputContainer}>
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
          </div> */}
          <div className={styles.inputContainer}>
            <span>泊数：</span>
            <input
              className={styles.checkoutStyle}
              type="text"
              name="stay_count"
              value={data.stay_count}
              onChange={handleChange}
            />
            <label>泊</label>
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
          <div className={styles.price}>{`料金：${price}円`}</div>
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
