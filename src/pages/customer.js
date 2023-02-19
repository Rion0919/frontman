import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/customer.module.css";
import db from "./api/firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import DeleteCustomer from "components/DeleteCustomer";

export default function Customer() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [deleteClick, setDeleteClick] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const ref = useRef(router.query.loginId);
  
  const toAddCustomer = () => {
    router.push({ pathname: "/customer/addcustomer" }, "/customer/addcustomer");
  };
  
  const toUpdateCustomer = (e) => {
    console.log(typeof e.target.value);
    router.push(
      {
        pathname: "/customer/updatecustomer",
        query: { customerId: e.target.value },
      },
      "/customer/updatecustomer"
      );
    };
    
    const deleteCustomer = (id) => {
      console.log("delete", id);
      setDeleteClick((prev) => !prev);
      setCustomerId(id);
    };
    
    useEffect(() => {
      console.log("customer page render");
      setDeleted(false)
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
          created_at: d.data().created_at,
          update_at: d.data().update_at,
        });
      });
      if (customers !== null) {
        setCustomers(dataAry);
      }
    };
    fetch();
  }, [deleted]);
  
  // const fetched = getDocs(collection(db, "customers"))
  // fetched.forEach((d) => {
  //   dataAry.push({
  //     id: d.id,
  //     japanese: d.data().japanese,
  //     name: d.data().name,
  //     kana: d.data().kana,
  //     year: d.data().year,
  //     month: d.data().month,
  //     date: d.data().date,
  //     age: d.data().age,
  //     gender: d.data().gender,
  //     prefecture: d.data().prefecture,
  //     zip: d.data().zip,
  //     address_1: d.data().address_1,
  //     address_2: d.data().address_2,
  //     tel: d.data().tel,
  //     email: d.data().email,
  //     country: d.data().country,
  //     passport_id: d.data().passport_id,
  //     passport_img: d.data().passport_img,
  //     created_at: d.data().created_at,
  //     update_at: d.data().update_at,
  //   })
  // })

  return (
    <Layout>
      <Header user={ref.current} />
      {deleteClick && (
        <DeleteCustomer
          setDeleteClick={setDeleteClick}
          customerId={customerId}
          setDeleted={setDeleted}
        />
      )}
      <div className={styles.container}>
        <div className={styles.searchForm}>
          <input type="text" placeholder="顧客検索" />
          <button className={styles.searchBtn}>検索</button>
        </div>
        <div className={styles.customerList}>
          <div className={styles.listHeader}>
            <div>顧客番号</div>
            <div>氏名</div>
            <div>登録日</div>
            <div>最近の宿泊日</div>
          </div>
          <ul>
            {customers.length !== 0 ? (
              customers.map((customer, i) => 
                (
                <li key={i}>
                  <div className={styles.customerId}>{customer.id}</div>
                  <div className={styles.customerName}>{customer.name}</div>
                  <div>{`${customer.year}/${customer.month}/${customer.date}`}</div>
                  <div>{`${customer.year}/${customer.month}/${customer.date}`}</div>
                  <button onClick={toUpdateCustomer} value={customer.id}>
                    更新
                  </button>
                  <button onClick={() => deleteCustomer(customer.id)}>
                    削除
                  </button>
                </li>
              )
            )
            ) : (
              <li>顧客がいません</li>
            )}
          </ul>
        </div>
        <button className={styles.addCustomer} onClick={toAddCustomer}>
          顧客登録
        </button>
      </div>
    </Layout>
  );
}
