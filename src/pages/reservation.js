import Header from "components/Header";
import { Layout } from "components/Layout";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "src/styles/reservation.module.css";
import db from "./api/firebase";

export default function Reservation() {
  const [resInfo, setResInfo] = useState("");
  const [rooms, setRooms] = useState([]);
  const [stayed, setStayed] = useState(false);
  const [clickedRoom, setClickedRoom] = useState(0);
  const router = useRouter();

  const toCheck = (roomNum) => {
    if (stayed) {
      router.push(
        {
          pathname: "./reservation/checkout",
          query: { roomNum: roomNum },
        },
        "/reservation/checkout"
      );
    } else {
      router.push(
        {
          pathname: "./reservation/checkin",
          query: { roomNum: roomNum },
        },
        "/reservation/checkin"
      );
    }
  };

  const clickRoom = (room, customer, checkin, checkout, roomType, stay, price) => {
    setResInfo(
      customer !== "" &&
        checkin !== "" &&
        checkout !== "" &&
        roomType !== ""
        ? `${room}号室 ${customer}様 ${checkin}~${checkout} 部屋タイプ：${roomType}`
        : `${room}号室`
    );
    setClickedRoom(room);
    if (stay) {
      setStayed(true);
      console.log(stayed);
    } else {
      setStayed(false);
      console.log(stayed);
    }
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
          <div className={styles.infoWindow}>
            {resInfo}
            </div>
          <button
            className={styles.checkoutBtn}
            onClick={() => toCheck(clickedRoom)}
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
                  r.stay,
                  r.price
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
