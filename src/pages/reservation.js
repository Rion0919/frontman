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
  const router = useRouter();

  const toCheckIn = (roomNum) => {
    router.push(
      {
        pathname: "./reservation/checkin",
        query: {roomNum: roomNum},
      },
      "/reservation/checkin"
    );
  };

  const clickRoom = (room) => {
    setResInfo(`${room}号室`);
    setClickedRoom(room);
    setClicked((prev) => !prev);
  };

  useEffect(() => {
    const dataAry = [];
    const fetch = async () => {
      const roomRef = await getDocs(collection(db, "rooms"));
      roomRef.forEach((r) => {
        dataAry.push(r.data().room);
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
            <div onClick={() => clickRoom(r)} className={styles.room} key={i}>
              {r}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
