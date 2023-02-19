import React from "react";
import styles from "../src/styles/deletecustomer.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import db from "@/pages/api/firebase";

const DeleteCustomer = ({setDeleteClick, customerId, setDeleted}) => {
    const clickCansel = () => {
        setDeleteClick(prev => !prev)
    }
    const deleteCustomer = async (id) => {
        try {
          console.log("delete", id);
          setDeleteClick((prev) => !prev);
          setDeleted(true)
          await deleteDoc(doc(db, "customers", `/${id}`))
        } catch (e) {
          console.log("delete error");
          console.log(e);
        }
      };
  return (
    <div className={styles.backContainer}>
      <div className={styles.confirmDialog}>
        <h3>
          {`顧客番号:${customerId}, の顧客データを削除します。
          よろしいですか？`}
        </h3>
        <button onClick={clickCansel}>キャンセル</button>
        <button onClick={() => deleteCustomer(customerId)}>削除</button>
      </div>
    </div>
  );
};

export default DeleteCustomer;
