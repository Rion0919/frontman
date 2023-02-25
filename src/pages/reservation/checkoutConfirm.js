import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/checkoutconfirm.module.css"
import { doc, updateDoc } from "firebase/firestore";
import db from "../api/firebase";

export default function CheckoutConfirm() {
    const route = useRouter()
    const onClickConfirm = async () => {
        const docRef = doc(db, "rooms", route.query.roomNum)
        await updateDoc(docRef, {
            adult_num: "",
            breakfast: false,
            checkin: "",
            checkout: "",
            child_num: "",
            customer: "",
            room: route.query.roomNum,
            room_type: "",
            stay: false,
            stay_count: ""
        })
        route.push(
            {
                pathname: "/reservation"
            },
            "/reservation"
        )
    }
    return (
        <Layout>
            <Header userId={route.query.loginId} back title="チェックアウト完了" />
            <div className={styles.container}>
                <p className={styles.thanks}>チェックインが完了しました。<br/>またのお越しをお待ちしております。</p>
                <div className={styles.stayInfoContainer}>
                    <span>宿泊期間：</span>
                    <div className={styles.customer}>
                        <p>{route.query.customer}様</p>
                        <p>{`${route.query.checkin}~${route.query.checkout}`}</p>
                    </div>
                </div>
                <button className={styles.confirmBtn} onClick={onClickConfirm}>完了</button>
            </div>
        </Layout>
    )
}