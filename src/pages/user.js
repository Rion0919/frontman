import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/user.module.css";
import db from 'src/pages/api/firebase'
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import DeleteUser from "components/DeleteUser";

export default function User() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [deleteClick, setDeleteClick] = useState(false);
  const [userInfo, setUserInfo] = useState({id: null, name: ""});
  const [deleted, setDeleted] = useState(false);
  const [words, setWords] = useState('')

  // ユーザー登録ページに遷移
  const toAddUser = () => {
    router.push(
      {
        pathname: "/user/adduser"
      },
      "/user/adduser"
      )
  }

  // ユーザー情報更新ページに遷移
  const toUpdateUser = (e) => {
    router.push(
      {
        pathname: "/user/updateuser",
        query: { userId: e.target.value }
      },
      "user/updateuser"
    )
  }

  // ユーザー削除ダイアログ表示
  const deleteUser = async (id) => {
    const userRef = doc(db, "users", id)
    const snap = await getDoc(userRef)
    setDeleteClick((prev) => !prev);
    setUserInfo({id: id, name: snap.data().name});
  }


  // ユーザー名から検索
  const onClickSearch = async (name) => {
    let filtered = []
    if(name!=='') {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("name", "==", name))
      const querySnap = await getDocs(q)
      querySnap.forEach((d) => {
        filtered.push({
          id: d.id,
          name: d.data().name,
          permission: d.data().permission,
          userId: d.data().userId
        })
        setUsers(filtered)
      })
    } else {
      const fetched = await getDocs(collection(db, "users"));
      fetched.forEach((d) => {
        filtered.push({
          id: d.id,
          name: d.data().name,
          permission: d.data().permission,
          userId: d.data().userId
        });
      });
      setUsers(filtered)
    }
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
          userId: d.data().userId
        })
      })
      setUsers(dataAry)
    }
    fetch()
  }, [deleted])
  return (
    <Layout>
      <Header user={router.query.loginId} back  title="ユーザー管理"/>
      {deleteClick && (
        <DeleteUser
          setDeleteClick={setDeleteClick}
          userInfo={userInfo}
          setDeleted={setDeleted}
        />
      )}
      <div className={styles.container}>
        <div className={styles.searchForm}>
          <input type="text" placeholder="ユーザー検索" value={words} onChange={(e) => setWords(e.target.value)} />
          <button onClick={() => onClickSearch(words)} className={styles.searchBtn}>検索</button>
        </div>
        <div className={styles.userList}>
          <div className={styles.listHeader}>
            <div>ユーザー番号</div>
            <div>氏名</div>
            <div>ユーザーID</div>
            <div>権利</div>
          </div>
          <ul>
            {users.length !== 0 ? (
              users.map((user, i) => 
                (
                <li key={i}>
                  <div className={styles.userId}>{user.id}</div>
                  <div className={styles.userName}>{user.name}</div>
                  <div className={styles.userId}>{user.userId}</div>
                  <div className={styles.userPermission}>{user.permission}</div>
                </li>
              )
            )
            ) : (
              <li>顧客がいません</li>
            )}
          </ul>
        </div>
        <button onClick={toAddUser} className={styles.addUser}>
          ユーザー登録
        </button>
      </div>
    </Layout>
  );
}
