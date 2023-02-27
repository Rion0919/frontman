import Header from "components/Header";
import { Layout } from "components/Layout";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "src/styles/adduser.module.css";
import db, { auth } from "../api/firebase";
import { getAuth, updateEmail, updatePassword, deleteUser } from "firebase/auth";

export default function UpdateUser() {
  const router = useRouter();
  const ref = useRef(router.query.userId);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date().getDate());
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: "",
    kana: "",
    year: "",
    month: "",
    date: "",
    email: "",
    password: "",
    permission: "",
  });

  // dataステートに値を保存
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // 選択した日付を取得
  const onSelectedYear = (e) => {
    setYear(e.target.value);
    const str = document.getElementById("birthyear").value;
    setData({ ...data, year: str });
  };
  const onSelectedMonth = (e) => {
    setMonth(e.target.value);
    const str = document.getElementById("birthmonth").value;
    setData({ ...data, month: str });
  };
  const onSelectedDate = (e) => {
    setDate(e.target.value);
    const str = document.getElementById("birthdate").value;
    setData({ ...data, date: str });
  };

  // selectタグの子要素（optionタグ）追加
  const createYear = () => {
    const selector = document.getElementById("birthyear");
    while (selector.hasChildNodes()) {
      selector.removeChild(selector.firstChild);
    }
    const intOption = document.createElement("option");
    intOption.value = "年";
    intOption.text = "年";
    selector.appendChild(intOption);
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      let op = document.createElement("option");
      op.value = i;
      op.text = i;
      selector.appendChild(op);
    }
  };
  const createMonth = () => {
    const selector = document.getElementById("birthmonth");
    while (selector.hasChildNodes()) {
      selector.removeChild(selector.firstChild);
    }
    const intOption = document.createElement("option");
    intOption.value = "月";
    intOption.text = "月";
    selector.appendChild(intOption);
    for (let i = 1; i <= 12 + 1; i++) {
      let op = document.createElement("option");
      op.value = i;
      op.text = i;
      selector.appendChild(op);
    }
  };
  const createDate = useCallback(() => {
    const selector = document.getElementById("birthdate");
    while (selector.hasChildNodes()) {
      selector.removeChild(selector.firstChild);
    }
    const intOption = document.createElement("option");
    intOption.value = "日";
    intOption.text = "日";
    selector.appendChild(intOption);
    const lastDate = new Date(year, month, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      let op = document.createElement("option");
      op.value = i;
      op.text = i;
      selector.appendChild(op);
    }
  }, [year, month]);

  // エラーメッセージを非表示
  const onClickHiddenError = () => {
    setError(false);
  };

  // 一般ユーザーか管理者ユーザーかを取得
  const onSelectPermission = (val) => {
    setData({ ...data, permission: val });
  };

  // ユーザーを新規登録＆データベースに保存
  const onClickUpdateUser = async () => {
    console.log(error);
    if (
      data.name === "" ||
      data.kana === "" ||
      data.email === "" ||
      data.password === "" ||
      data.month === "" ||
      data.date === "" ||
      data.year === "" ||
      data.permission === ""
    ) {
      console.log("error");
      return;
    }
    try {
      const docRef = doc(db, "users", ref.current);
      await updateDoc(docRef, {
        email: data.email,
        password: data.password,
        name: data.name,
        kana: data.kana,
        birth: `${data.year}/${data.month}/${data.date}`,
        permission: data.permission,
        userId: data.email.substring(0, data.email.indexOf("@")),
        update_at: serverTimestamp(),
      });
      await updateEmail(router.query.userId, data.email)
      await updatePassword(router.query.userId, data.password)
      router.push("/user");
    } catch (e) {
      console.log("--Register error--");
      setError(true);
      console.log(e);
    }
  };

  useEffect(() => {
    createYear();
    createMonth();
    createDate();
    const fetch = async () => {
      const docRef = doc(db, "users", ref.current);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setData({
          name: data.name,
          kana: data.kana,
          year: data.birth.split("/")[0],
          month: data.birth.split("/")[1],
          date: data.birth.split("/")[2],
          email: data.email,
          password: data.password,
          permission: data.permission,
        });
        console.log(data.birth.split("/")[0]);
      } else {
        console.log("No document");
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createDate();
  }, [year, month, createDate]);
  return (
    <Layout>
      <Header user={router.query.loginId} back title="ユーザー更新" />
      <div className={styles.container}>
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorMsg}>
              すでに登録済みのメールアドレスです
            </p>
            <button className={styles.errorBtn} onClick={onClickHiddenError}>
              X
            </button>
          </div>
        )}
        <div className={styles.formContainer}>
          <div className={styles.inputStyle}>
            <span>氏名：</span>
            <input
              className={styles.nameStyle}
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>フリガナ：</span>
            <input
              className={styles.kanaStyle}
              type="text"
              name="kana"
              value={data.kana}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>生年月日：</span>
            <select
              className={styles.selectStyle}
              id="birthyear"
              value={data.year}
              onChange={onSelectedYear}
            ></select>
            <label className={styles.birthLabelStyle}>年</label>
            <select
              className={styles.birthStyle}
              id="birthmonth"
              value={data.month}
              onChange={onSelectedMonth}
            ></select>
            <label className={styles.birthLabelStyle}>月</label>
            <select
              id="birthdate"
              value={data.date}
              onChange={onSelectedDate}
            ></select>
            <label className={styles.birthLabelStyle}>日</label>
          </div>
          <div className={styles.inputStyle}>
            <span>メールアドレス：</span>
            <input
              className={styles.emailStyle}
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>パスワード：</span>
            <input
              className={styles.passwordStyle}
              type="text"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span className={styles.permissionSpanStyle}>権利：</span>
            <input
              type="radio"
              id="common"
              name="permission"
              value="一般"
              checked={data.permission === "一般"}
              onChange={(e) => onSelectPermission(e.target.value)}
            />
            <label htmlFor="common" className={styles.permissionLabelStyle}>
              ：一般
            </label>
            <input
              type="radio"
              id="root"
              name="permission"
              value="管理者"
              checked={data.permission === "管理者"}
              onChange={(e) => onSelectPermission(e.target.value)}
            />
            <label htmlFor="root">：管理者</label>
          </div>
          <button onClick={onClickUpdateUser} className={styles.submitBtn}>
            登録
          </button>
        </div>
      </div>
    </Layout>
  );
}
