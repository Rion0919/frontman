import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "./../styles/customer.module.css";
import db from "./api/firebase";
import { collection, getDocs,  getDoc, doc } from "firebase/firestore";
import DeleteCustomer from "components/DeleteCustomer";
import dayjs from "dayjs";

export default function Customer() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [deleteClick, setDeleteClick] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({id: null, name: ""});
  const [deleted, setDeleted] = useState(false);
  const ref = useRef(router.query.loginId);
  
  const toAddCustomer = () => {
    router.push({ pathname: "/customer/addcustomer" }, "/customer/addcustomer");
  };
  
  const toUpdateCustomer = (e) => {
    router.push(
      {
        pathname: "/customer/updatecustomer",
        query: { customerId: e.target.value },
      },
      "/customer/updatecustomer"
      );
  };

  const dateFormetter = (miliseconds) => {
    const time = new Date(miliseconds)
    console.log(time);
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = ("0" + time.getDate()).slice(-2)
    return `${year}/${month}/${date}`
  }
    
    const deleteCustomer = async (id) => {
      console.log("delete", id);
      const customerRef = doc(db, "customers", id)
      const snap = await getDoc(customerRef)
      setDeleteClick((prev) => !prev);
      setCustomerInfo({id: id, name: snap.data().name});
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
          created_at: dayjs(d.data().created_at.toDate()).format("YYYY/MM/DD"),
          update_at: d.data().update_at,
        });
      });
      if (customers !== null) {
        setCustomers(dataAry);
      }
    };
    fetch();
  }, [deleted]);

  return (
    <Layout>
      <Header user={ref.current} back />
      {deleteClick && (
        <DeleteCustomer
          setDeleteClick={setDeleteClick}
          customerInfo={customerInfo}
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
                  <div>{customer.created_at}</div>
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
