import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "src/styles/adduser.module.css";

export default function AddUser() {
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date().getDate());
  const [data, setData] = useState({
    name: "",
    kana: "",
    year: "",
    month: "",
    date: "",
    email: "",
    password: "",
    permission: "",
    userId: "",
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
  const createDate = () => {
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
  };

  useEffect(() => {
    createYear();
    createMonth();
    createDate();
  }, []);

  useEffect(() => {
    createDate();
  }, [year, month]);
  return (
    <Layout>
      <Header user={router.query.loginId} back />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <span>氏名：</span>
            <input
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
              id="birthyear"
              value={year}
              onChange={onSelectedYear}
            ></select>
            <select
              className={styles.birthStyle}
              id="birthmonth"
              value={month}
              onChange={onSelectedMonth}
            ></select>
            <select
              id="birthdate"
              value={date}
              onChange={onSelectedDate}
            ></select>
          </div>
          <div className={styles.inputStyle}>
            <span>メールアドレス：</span>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>パスワード：</span>
            <input
              type="text"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>権利：</span>
            <input type="radio" id="common" name="permission" value="一般" />
            <label htmlFor="common">：一般</label>
            <input type="radio" id="root" name="permission" value="管理者" />
            <label htmlFor="root">：管理者</label>
          </div>
          <button>登録</button>
        </div>
      </div>
    </Layout>
  );
}
