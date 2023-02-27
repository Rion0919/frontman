import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/history.module.css";
import db from "./api/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default function History() {
  const router = useRouter();
  const [histories, setHistories] = useState([]);
  const [words, setWords] = useState('')
  const ref = useRef(router.query.loginId);
  
  // 履歴詳細ページに遷移
  const toShowDetail = (e) => {
    router.push(
      {
        pathname: "/history/historyconfirm",
        query: { historyId: e.target.value },
      },
      "/history/historyconfirm"
      );
  };
  
  // 顧客名から検索
  const onClickSearch = async (name) => {
    let filtered = []
    if(name!=='') {
      const historiesRef = collection(db, "roomhistory")
      const q = query(historiesRef, where("customer", "==", name))
      const querySnap = await getDocs(q)
      querySnap.forEach((d) => {
        filtered.push({
          id: d.id,
          customer: d.data().customer,
          checkin: d.data().checkin.split(' ')[0],
          checkout: d.data().checkout,
          room_type: d.data().room_type
        })
        setHistories(filtered)
      })
    } else {
      const fetched = await getDocs(collection(db, "roomhistory"));
      fetched.forEach((d) => {
        filtered.push({
          id: d.id,
          customer: d.data().customer,
          checkin: d.data().checkin.split(' ')[0],
          checkout: d.data().checkout,
          room_type: d.data().room_type
        });
      });
      setHistories(filtered)
    }
  }
    
  useEffect(() => {
    const dataAry = [];
    const fetch = async () => {
      const fetched = await getDocs(collection(db, "roomhistory"));
      fetched.forEach((d) => {
        dataAry.push({
          id: d.id,
          customer: d.data().customer,
          checkin: d.data().checkin.split(' ')[0],
          checkout: d.data().checkout,
          room_type: d.data().room_type
        });
      });
      if (histories !== null) {
        setHistories(dataAry);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Header user={ref.current} back title="宿泊履歴" />
      <div className={styles.container}>
        <div className={styles.searchForm}>
          <input type="text" placeholder="宿泊者名から検索" value={words} onChange={(e) => setWords(e.target.value)} />
          <button onClick={() => onClickSearch(words)} className={styles.searchBtn}>検索</button>
        </div>
        <div className={styles.historyList}>
          <div className={styles.listHeader}>
            <div>宿泊者</div>
            <div>チェックイン日</div>
            <div>チェックアウト日</div>
            <div>部屋タイプ</div>
          </div>
          <ul>
            {histories.length !== 0 ? (
              histories.map((history, i) => 
                (
                <li key={i}>
                  <div className={styles.historyName}>{`${history.customer}様`}</div>
                  <div className={styles.historyCheckin}>{history.checkin}</div>
                  <div className={styles.historyCheckout}>{history.checkout}</div>
                  <div className={styles.historyRoomType}>{history.room_type}</div>
                  <button onClick={toShowDetail} value={history.id}>
                    詳細
                  </button>
                </li>
              )
            )
            ) : (
              <li>宿泊履歴がありません</li>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
