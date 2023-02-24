import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/user.module.css";
import db from 'src/pages/api/firebase'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function User() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [deleteClick, setDeleteClick] = useState(false);
  const [userInfo, setUserInfo] = useState({id: null, name: ""});
  const [deleted, setDeleted] = useState(false);
  const [words, setWords] = useState('')

  const toAddUser = () => {
    router.push(
      {
        pathname: "/user/adduser"
      },
      "/user/adduser"
      )
  }

  useEffect(() => {
    setDeleted(false)
    const dataAry = []
    const fetch = async () => {
      const docRef = await getDocs(collection(db, "users"));
      docRef.forEach((d) => {
        dataAry.push({
          id: d.id,
          name: d.data().name,
          permission: d.data().permission,
        })
      })
      setUsers(dataAry)
    }
    fetch()
  }, [])
  return (
    <Layout>
      <Header user={router.query.loginId} back />
      <div className={styles.container}>
        <div className={styles.searchForm}>
          <input type="text" placeholder="ユーザー検索" value={words} onChange={(e) => setWords(e.target.value)} />
          <button onClick={() => onClickSearch(words)} className={styles.searchBtn}>検索</button>
        </div>
        <div className={styles.customerList}>
          <div className={styles.listHeader}>
            <div>ユーザー番号</div>
            <div>氏名</div>
            <div>登録日</div>
            <div>権利</div>
          </div>
          <ul>
            {users.length !== 0 ? (
              users.map((user, i) => 
                (
                <li key={i}>
                  <div className={styles.customerId}>{user.id}</div>
                  <div className={styles.customerName}>{user.name}</div>
                  <div>test</div>
                  <div>{user.permission}</div>
                  <button value={user.id}>
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
        <button onClick={toAddUser} className={styles.addCustomer}>
          顧客登録
        </button>
      </div>
    </Layout>
  );
}
