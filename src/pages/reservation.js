import Header from "components/Header";
import { Layout } from "components/Layout";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "src/styles/reservation.module.css";
import db from "./api/firebase";

export default function Reservation() {
  const [resInfo, setResInfo] = useState("ここに予約情報が表示");
  const [rooms, setRooms] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [clickedRoom, setClickedRoom] = useState(0);
  const [btnText, setBtnText] = useState('チェックイン')
  const router = useRouter();

  const toCheckIn = (roomNum) => {
    router.push(
      {
        pathname: "./reservation/checkin",
        query: { roomNum: roomNum },
      },
      "/reservation/checkin"
    );
  };

  const clickRoom = (room, customer, checkin, checkout, roomType, stay) => {
    // if(stay) {
    //   setBtnText('チェックアウト')
    // } else if(stay === undefined){
    //   setBtnText('チェックアウト')
    // }
    setResInfo(
      customer !== undefined &&
        checkin !== undefined &&
        checkout !== undefined &&
        roomType !== undefined
        ? `${room}号室 ${customer}様 ${checkin}~${checkout} 部屋タイプ：${roomType}`
        : `${room}号室`
    );
    setClickedRoom(room);
    setClicked((prev) => !prev);
    localStorage.setItem("roomNum", room);
  };

  useEffect(() => {
    const dataAry = [];
    const fetch = async () => {
      const roomRef = await getDocs(collection(db, "rooms"));
      roomRef.forEach((r) => {
        dataAry.push(r.data());
      });
      setRooms(dataAry);
    };
    fetch();
  }, []);
  return (
    <Layout>
      <Header user={router.query.loginId} back />
      <div className={styles.container}>
        <div className={styles.reservationInfo}>
          <div className={styles.infoWindow}>{resInfo}</div>
          <button
            className={styles.checkoutBtn}
            onClick={() => toCheckIn(clickedRoom)}
          >
            チェックイン/アウト
          </button>
        </div>
        <div className={styles.rooms}>
          {rooms.map((r, i) => (
            <div
              onClick={() =>
                clickRoom(
                  r.room,
                  r.customer,
                  r.checkin,
                  r.checkout,
                  r.room_type,
                  r.stay
                )
              }
              className={r.stay ? styles.noEmpty : styles.room}
              key={i}
            >
              {r.room}
              {r.stay ? <p>{`${r.customer}様`}</p> : <p>空き</p>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
