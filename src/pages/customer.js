import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/customer.module.css";
import db from "./api/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Customer() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const dataAry = [];
  const ref = useRef(router.query.loginId);
  // console.log(ref.current)
  const toAddCustomer = () => {
    router.push({ pathname: "/customer/addcustomer" }, "/customer/addcustomer");
  };
  const toUpdateCustomer = () => {
    router.push(
      { pathname: "/customer/updatecustomer" },
      "/customer/updatecustomer"
    );
  };

  useEffect(() => {
    const fetch = async () => {
      await getDocs(collection(db, "customers")).then((res) => {
        res.forEach((docs) => {
          const data = docs.data().data;
          dataAry.push({
            id: docs.id,
            japanese: data.japanese,
            name: data.name,
            kana: data.kana,
            year: data.year,
            month: data.month,
            date: data.date,
            age: data.age,
            gender: data.gender,
            prefecture: data.prefecture,
            zip: data.zip,
            address_1: data.address_1,
            address_2: data.address_2,
            tel: data.tel,
            email: data.email,
            country: data.country,
            passport_id: data.passport_id,
            passport_img: data.passport_img,
          });
          setCustomers(dataAry);
        });
      });
    };
    fetch();
  }, []);
  console.log(customers);

  return (
    <Layout>
      <Header user={ref.current} />
      <div className={styles.container}>
        <div className={styles.searchForm}>
          <input type="text" placeholder="顧客検索" />
          <button className={styles.searchBtn}>検索</button>
        </div>
        <div className={styles.customerList}>
          {/* <h2>顧客がいません</h2> */}
          <div className={styles.listHeader}>
            <div>顧客番号</div>
            <div>氏名</div>
            <div>登録日</div>
            <div>最近の宿泊日</div>
          </div>
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>
                <div className={styles.customerId}>{customer.id}</div>
                <div className={styles.customerName}>{customer.name}</div>
                <div>{`${customer.year}/${customer.month}/${customer.date}`}</div>
                <div>{`${customer.year}/${customer.month}/${customer.date}`}</div>
                <button onClick={toUpdateCustomer}>更新</button>
                <button>削除</button>
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.addCustomer} onClick={toAddCustomer}>
          顧客登録
        </button>
      </div>
    </Layout>
  );
}
