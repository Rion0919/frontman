import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styles from '../../styles/checkin.module.css'

export default function Checkin() {
  const route = useRouter();
  const ref = useRef(route.query.roomNum);
  const [roomNum, setRoomNum] = useState(route.query.roomNum);
  console.log(roomNum);
  console.log(route);
  return (
    <Layout>
      <Header user={route.query.loginId} back />
      <div>
        <h1>{`${ref.current}号室`}</h1>
        <div className={styles.formContainer}></div>
      </div>
    </Layout>
  );
}
