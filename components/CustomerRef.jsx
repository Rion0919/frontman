import React, { useEffect, useState } from "react";
import styles from "../src/styles/customerref.module.css";
import { collection, getDocs } from "firebase/firestore";
import db from "@/pages/api/firebase";
import dayjs from "dayjs";

const CustomerRef = ({ setCustomerRef, setData, data }) => {
  const [customers, setCustomers] = useState([]);

  const onClickSelect = (name) => {
    setCustomerRef({ name: name, selected: false });
    setData({...data, customer: name})
  };

  useEffect(() => {
    const dataAry = [];
    const fetch = async () => {
      const fetched = await getDocs(collection(db, "customers"));
      fetched.forEach((d) => {
        dataAry.push({
          id: d.id,
          japanese: d.data().japanese,
          name: d.data().name,
          kana: d.data().kana,
          year: d.data().year,
          month: d.data().month,
          date: d.data().date,
          age: d.data().age,
          gender: d.data().gender,
          prefecture: d.data().prefecture,
          zip: d.data().zip,
          address_1: d.data().address_1,
          address_2: d.data().address_2,
          tel: d.data().tel,
          email: d.data().email,
          country: d.data().country,
          passport_id: d.data().passport_id,
          passport_img: d.data().passport_img,
          created_at: dayjs(d.data().created_at.toDate()).format("YYYY/MM/DD"),
          update_at: d.data().update_at,
        });
      });
      setCustomers(dataAry);
    };
    fetch();
  }, []);
  return (
    <div className={styles.backContainer}>
      <div className={styles.customerListContainer}>
        <p>下記リストから顧客を選択してください</p>
        <ul className={styles.customerLists}>
          {customers.map((d) => (
            <li key={d.id} className={styles.customerList}>
              {`顧客番号：${d.id}/氏名：${d.name}様`}
              <button
                onClick={() => onClickSelect(d.name)}
                className={styles.customerSelectBtn}
              >
                選択
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerRef;
