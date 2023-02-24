import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/customer.module.css";
import db from "./api/firebase";
import { collection, getDocs,  getDoc, doc, query, where } from "firebase/firestore";
import DeleteCustomer from "components/DeleteCustomer";
import dayjs from "dayjs";

export default function Customer() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [deleteClick, setDeleteClick] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({id: null, name: ""});
  const [deleted, setDeleted] = useState(false);
  const [words, setWords] = useState('')
  const ref = useRef(router.query.loginId);
  
  // 顧客登録ページに遷移
  const toAddCustomer = () => {
    router.push({ pathname: "/customer/addcustomer" }, "/customer/addcustomer");
  };
  
  // 顧客更新
  const toUpdateCustomer = (e) => {
    router.push(
      {
        pathname: "/customer/updatecustomer",
        query: { customerId: e.target.value },
      },
      "/customer/updatecustomer"
      );
  };
    
  // 顧客削除
  const deleteCustomer = async (id) => {
    console.log("delete", id);
    const customerRef = doc(db, "customers", id)
    const snap = await getDoc(customerRef)
    setDeleteClick((prev) => !prev);
    setCustomerInfo({id: id, name: snap.data().name});
  };
  
  // 顧客名から検索
  const onClickSearch = async (name) => {
    let filtered = []
    if(name!=='') {
      const customersRef = collection(db, "customers")
      const q = query(customersRef, where("name", "==", name))
      const querySnap = await getDocs(q)
      querySnap.forEach((d) => {
        filtered.push({
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
        })
        setCustomers(filtered)
      })
    } else {
      const fetched = await getDocs(collection(db, "customers"));
      fetched.forEach((d) => {
        filtered.push({
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
      setCustomers(filtered)
    }
  }
    
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
          <input type="text" placeholder="顧客検索" value={words} onChange={(e) => setWords(e.target.value)} />
          <button onClick={() => onClickSearch(words)} className={styles.searchBtn}>検索</button>
        </div>
        <div className={styles.customerList}>
          <div className={styles.listHeader}>
            <div>顧客番号</div>
            <div>氏名</div>
            <div>登録日</div>
            <div>生年月日</div>
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
