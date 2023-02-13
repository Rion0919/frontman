import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/customer.module.css";

export default function Customer() {
  const router = useRouter();
  const toAddCustomer = () => {
    router.push({ pathname: "/customer/addcustomer" }, "/customer/addcustomer");
  };
  return (
    <Layout>
      <Header user={router.query.loginId} />
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
            <li>
              <div>JP202302000011</div>
              <div>山田里温</div>
              <div>2023/02/12</div>
              <div>2023/02/12</div>
              <button>更新</button>
              <button>削除</button>
            </li>
            <li>
              <div>JP202302000011</div>
              <div>山田里温</div>
              <div>2023/02/12</div>
              <div>2023/02/12</div>
              <button>更新</button>
              <button>削除</button>
            </li>
            <li>
              <div>JP202302000011</div>
              <div>山田里温</div>
              <div>2023/02/12</div>
              <div>2023/02/12</div>
              <button>更新</button>
              <button>削除</button>
            </li>
            <li>
              <div>JP202302000011</div>
              <div>山田里温</div>
              <div>2023/02/12</div>
              <div>2023/02/12</div>
              <button>更新</button>
              <button>削除</button>
            </li>
            <li>
              <div>JP202302000011</div>
              <div>山田里温</div>
              <div>2023/02/12</div>
              <div>2023/02/12</div>
              <button>更新</button>
              <button>削除</button>
            </li>
            <li>
              <div>JP202302000011</div>
              <div>山田里温</div>
              <div>2023/02/12</div>
              <div>2023/02/12</div>
              <button>更新</button>
              <button>削除</button>
            </li>
          </ul>
        </div>
        <button className={styles.addCustomer} onClick={toAddCustomer}>
          顧客登録
        </button>
      </div>
    </Layout>
  );
}
