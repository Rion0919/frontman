import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import db from "../api/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import styles from "src/styles/updatecustomer.module.css";

export default function AddCustomer() {
  const route = useRouter();
  const ref = useRef(route.query.customerId);
  const [japanese, setJapanese] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date().getDate());
  const [error, setError] = useState(false);
  const [dataArry, setDataArry] = useState({
    japanese: true,
    name: "",
    kana: "",
    year: 0,
    month: 0,
    date: 0,
    age: 0,
    gender: "",
    prefecture: "",
    zip: "",
    address_1: "",
    address_2: "",
    tel: "",
    email: "",
    country: "",
    passport_id: "",
    passport_img: "",
  });

  const onClickDeleteError = () => {
    setError(false);
  };

  const onClickBack = () => {
    route.push("/customer");
  };

  // dataステートに値を保存
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataArry({ ...dataArry, [name]: value });
  };

  // 選択した日付を取得
  const onSelectedYear = (e) => {
    setYear(e.target.value);
    const str = document.getElementById("birthyear").value;
    setDataArry({ ...dataArry, year: str });
  };
  const onSelectedMonth = (e) => {
    setMonth(e.target.value);
    const str = document.getElementById("birthmonth").value;
    setDataArry({ ...dataArry, month: str });
  };
  const onSelectedDate = (e) => {
    setDate(e.target.value);
    const str = document.getElementById("birthdate").value;
    setDataArry({ ...dataArry, date: str });
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
  }, [month, year]);

  // 出身が日本か日本以外かを取得
  const onSelectJapanese = (e) => {
    if (e.target.value) {
      setDataArry({ ...dataArry, country: "日本" });
    }
    setDataArry({ ...dataArry, japanese: e.target.value });
  };

  // 選択した性別を取得
  const onSelectGender = () => {
    const str = document.getElementById("gender").value;
    setDataArry({ ...dataArry, gender: str });
  };

  // 選択した都道府県を取得
  const onSelectPrefecture = () => {
    const str = document.getElementById("prefecture").value;
    setDataArry({ ...dataArry, prefecture: str });
  };

  // 選択した国籍を取得
  const onSelectCountry = () => {
    const str = document.getElementById("country").value;
    setDataArry({ ...dataArry, country: str });
  };

  // 選択した画像ファイルを取得
  const onSelectImg = (e) => {
    const str = document.getElementById("passport_img").value;
    setDataArry({ ...dataArry, passport_img: str });
  };

  // 入力した顧客データをデータベースに保存
  const onClickPush = async () => {
    if (japanese) {
      if (
        data.name === "" ||
        data.kana === "" ||
        data.year === 0 ||
        data.month === 0 ||
        data.date === 0 ||
        data.age === 0 ||
        data.prefecture === "" ||
        data.zip === "" ||
        data.address_1 === "" ||
        data.tel === "" ||
        (data.email && !data.email.includes("@"))
      ) {
        setError(true);
        return;
      } else {
        const docRef = doc(db, "customers", ref.current);
        await updateDoc(docRef, {
          japanese: dataArry.japanese,
          name: dataArry.name,
          kana: dataArry.kana,
          year: dataArry.year,
          month: dataArry.month,
          date: dataArry.date,
          age: dataArry.age,
          gender: dataArry.gender,
          prefecture: dataArry.prefecture,
          zip: dataArry.zip,
          address_1: dataArry.address_1,
          address_2: dataArry.address_2,
          tel: dataArry.tel,
          email: dataArry.email,
          country: dataArry.country,
          passport_id: dataArry.passport_id,
          passport_img: dataArry.passport_img,
          update_at: serverTimestamp(),
        });
        route.push("/customer");
      }
    } else if (!japanese) {
      if (
        data.name === "" ||
        data.kana === "" ||
        data.year === 0 ||
        data.month === 0 ||
        data.date === 0 ||
        data.age === 0 ||
        data.prefecture === "" ||
        data.zip === "" ||
        data.address_1 === "" ||
        data.tel === "" ||
        (data.email && !data.email.includes("@"))
      ) {
        setError(true);
        console.log(data.email.includes("@"));
        return;
      } else {
        const docRef = doc(db, "customers", ref.current);
        await updateDoc(docRef, {
          japanese: dataArry.japanese,
          name: dataArry.name,
          kana: dataArry.kana,
          year: dataArry.year,
          month: dataArry.month,
          date: dataArry.date,
          age: dataArry.age,
          gender: dataArry.gender,
          prefecture: dataArry.prefecture,
          zip: dataArry.zip,
          address_1: dataArry.address_1,
          address_2: dataArry.address_2,
          tel: dataArry.tel,
          email: dataArry.email,
          country: dataArry.country,
          passport_id: dataArry.passport_id,
          passport_img: dataArry.passport_img,
          update_at: serverTimestamp(),
        });
        route.push("/customer");
      }
    }
  };

  useEffect(() => {
    createYear();
    createMonth();
    createDate();
    const fetch = async () => {
      const docRef = await doc(db, "customers", ref.current);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (docSnap.exists()) {
        setDataArry({
          japanese: data.japanese,
          name: data.name,
          kana: data.kana,
          year: data.year,
          month: data.month,
          date: data.date,
          age: data.age,
          gender: data.gender,
          prefecture: data.prefecture,
          zip: data.zip,
          address_1: data.address_1,
          address_2: data.address_2,
          tel: data.tel,
          email: data.email,
          country: data.country,
          passport_id: data.passport_id,
          passport_img: data.passport_img,
        });
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
      <Header user={route.query.loginId} back title="顧客更新" />
      <div
        className={styles.container}
        onClick={() => {
          if (error) onClickDeleteError();
        }}
      >
        <h1 className={styles.title}>顧客更新</h1>
        {error && (
          <span className={styles.errorMsg}>入力内容に誤りがあります</span>
        )}
        <div className={styles.formContainer}>
          <div className={styles.inputStyle}>
            <span>国籍：</span>
            <input
              className={styles.radioStyle}
              type="radio"
              name="japanese"
              id="日本"
              checked={dataArry.japanese}
              value={true}
              onChange={(e) => {
                setJapanese(true);
                onSelectJapanese(e);
              }}
            />
            <label htmlFor="日本">日本</label>
            <input
              className={styles.radioStyle}
              type="radio"
              name="japanese"
              checked={!dataArry.japanese}
              id="日本以外"
              value={false}
              onChange={(e) => {
                setJapanese(false);
                onSelectJapanese(e);
              }}
            />
            <label htmlFor="日本以外">日本以外</label>
          </div>
          <div className={styles.inputStyle}>
            <span>氏名：</span>
            <input
              className={styles.nameStyle}
              type="text"
              name="name"
              value={dataArry.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>フリガナ：</span>
            <input
              className={styles.kanaStyle}
              type="text"
              name="kana"
              value={dataArry.kana}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>生年月日：</span>
            <select
              id="birthyear"
              value={dataArry.year}
              onChange={onSelectedYear}
            ></select>
            <select
              className={styles.birthStyle}
              id="birthmonth"
              value={dataArry.month}
              onChange={onSelectedMonth}
            ></select>
            <select
              id="birthdate"
              value={dataArry.date}
              onChange={onSelectedDate}
            ></select>
          </div>
          <div className={styles.inputStyle}>
            <span>年齢：</span>
            <input
              className={styles.ageStyle}
              type="number"
              name="age"
              value={dataArry.age}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>性別：</span>
            <select
              className={styles.genderStyle}
              id="gender"
              onChange={onSelectGender}
              value={dataArry.gender}
            >
              <option value=""></option>
              <option value="男性">男性</option>
              <option value="女性">女性</option>
            </select>
          </div>
          <div>----お住まいの地域----</div>
          <div className={styles.inputStyle}>
            <span>都道府県：</span>
            <select
              id="prefecture"
              value={dataArry.prefecture}
              onChange={onSelectPrefecture}
            >
              <option value="">都道府県</option>
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="宮城県">宮城県</option>
              <option value="秋田県">秋田県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="千葉県">千葉県</option>
              <option value="東京都">東京都</option>
              <option value="神奈川県">神奈川県</option>
              <option value="新潟県">新潟県</option>
              <option value="富山県">富山県</option>
              <option value="石川県">石川県</option>
              <option value="福井県">福井県</option>
              <option value="山梨県">山梨県</option>
              <option value="長野県">長野県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="静岡県">静岡県</option>
              <option value="愛知県">愛知県</option>
              <option value="三重県">三重県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="京都府">京都府</option>
              <option value="大阪府">大阪府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="岡山県">岡山県</option>
              <option value="広島県">広島県</option>
              <option value="山口県">山口県</option>
              <option value="徳島県">徳島県</option>
              <option value="香川県">香川県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="高知県">高知県</option>
              <option value="福岡県">福岡県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
            </select>
          </div>
          <div className={styles.inputStyle}>
            <span>郵便番号：</span>
            <input
              type="text"
              placeholder="ハイフンを含む"
              name="zip"
              value={dataArry.zip}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputStyle}>
            <span>住所1：</span>
            <input
              className={styles.addressStyle}
              type="text"
              name="address_1"
              value={dataArry.address_1}
              onChange={handleChange}
              placeholder="市区町村番地"
            />
          </div>
          <div className={styles.inputStyle}>
            <span>住所2：</span>
            <input
              className={styles.addressStyle}
              type="text"
              name="address_2"
              value={dataArry.address_2}
              onChange={handleChange}
              placeholder="建物名、号室など"
            />
          </div>
          <div className={styles.inputStyle}>
            <span>電話番号：</span>
            <input
              className={styles.telStyle}
              type="text"
              name="tel"
              value={dataArry.tel}
              onChange={handleChange}
              placeholder="固定電話、携帯電話（ハイフンを含む）"
            />
          </div>
          <div className={styles.inputStyle}>
            <span>メールアドレス：</span>
            <input
              className={styles.mailStyle}
              type="text"
              name="email"
              value={dataArry.email}
              onChange={handleChange}
              placeholder="任意"
            />
          </div>
          <div>以下は外国籍の方専用欄です</div>
          <div
            className={japanese ? styles.japaneseCustomer : styles.foreigner}
          >
            <div className={styles.inputStyle}>
              <span>国籍：</span>
              <select
                className={styles.countryStyles}
                id="country"
                value={dataArry.country}
                onChange={onSelectCountry}
              >
                <option value="">Country...</option>
                <option value="Afganistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antigua &amp; Barbuda">
                  Antigua &amp; Barbuda
                </option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire">Bonaire</option>
                <option value="Bosnia &amp; Herzegovina">
                  Bosnia &amp; Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Ter">
                  British Indian Ocean Ter
                </option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Canary Islands">Canary Islands</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Channel Islands">Channel Islands</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Island">Cocos Island</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote DIvoire">Cote D&lsquo;Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curaco">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Ter">French Southern Ter</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea North">Korea North</option>
                <option value="Korea Sout">Korea South</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Malawi">Malawi</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Midway Islands">Midway Islands</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nambia">Nambia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherland Antilles">Netherland Antilles</option>
                <option value="Netherlands">
                  Netherlands (Holland, Europe)
                </option>
                <option value="Nevis">Nevis</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau Island">Palau Island</option>
                <option value="Palestine">Palestine</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Phillipines">Philippines</option>
                <option value="Pitcairn Island">Pitcairn Island</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Republic of Montenegro">
                  Republic of Montenegro
                </option>
                <option value="Republic of Serbia">Republic of Serbia</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="St Barthelemy">St Barthelemy</option>
                <option value="St Eustatius">St Eustatius</option>
                <option value="St Helena">St Helena</option>
                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                <option value="St Lucia">St Lucia</option>
                <option value="St Maarten">St Maarten</option>
                <option value="St Pierre &amp; Miquelon">
                  St Pierre &amp; Miquelon
                </option>
                <option value="St Vincent &amp; Grenadines">
                  St Vincent &amp; Grenadines
                </option>
                <option value="Saipan">Saipan</option>
                <option value="Samoa">Samoa</option>
                <option value="Samoa American">Samoa American</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome &amp; Principe">
                  Sao Tome &amp; Principe
                </option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tahiti">Tahiti</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad &amp; Tobago">
                  Trinidad &amp; Tobago
                </option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks &amp; Caicos Is">
                  Turks &amp; Caicos Is
                </option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Erimates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States of America">
                  United States of America
                </option>
                <option value="Uraguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City State">Vatican City State</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Virgin Islands (Brit)">
                  Virgin Islands (Brit)
                </option>
                <option value="Virgin Islands (USA)">
                  Virgin Islands (USA)
                </option>
                <option value="Wake Island">Wake Island</option>
                <option value="Wallis &amp; Futana Is">
                  Wallis &amp; Futana Is
                </option>
                <option value="Yemen">Yemen</option>
                <option value="Zaire">Zaire</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
            <div className={styles.inputStyle}>
              <span>旅券番号：</span>
              <input
                type="text"
                name="passport_id"
                value={dataArry.passport_id}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputStyle}>
              <span>パスポート写真：</span>
              <input
                type="file"
                name="passport_img"
                onChange={onSelectImg}
                id="passport_img"
              />
            </div>
          </div>

          <button className={styles.submitBtn} onClick={onClickPush}>
            更新
          </button>

          <button className={styles.backBtn} onClick={onClickBack}>
            戻る
          </button>
        </div>
      </div>
    </Layout>
  );
}
