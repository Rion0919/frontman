import React from "react";
import styles from "../src/styles/deletecustomer.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import db, { auth } from "@/pages/api/firebase";
import { getAuth } from "firebase/auth";

const DeleteUser = ({ setDeleteClick, userInfo, setDeleted }) => {
  const clickCansel = () => {
    setDeleteClick((prev) => !prev);
  };
  const deleteUser = async (id) => {
    try {
      console.log("delete", id);
      setDeleteClick((prev) => !prev);
      setDeleted(true);
      await deleteUser(id);
      await deleteDoc(doc(db, "users", `/${id}`));
    } catch (e) {
      console.log("delete error");
      console.log(e);
    }
  };
  return (
    <div className={styles.backContainer}>
      <div className={styles.confirmDialog}>
        <h3 className={styles.dialogText}>
          {`ユーザー番号:${userInfo.id}, ${userInfo.name}のユーザーデータを削除します。\n
          よろしいですか？`}
        </h3>
        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={clickCansel}>
            キャンセル
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteUser(userInfo.id)}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
