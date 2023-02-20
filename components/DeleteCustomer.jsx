import React from "react";
import styles from "../src/styles/deletecustomer.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import db from "@/pages/api/firebase";

const DeleteCustomer = ({ setDeleteClick, customerInfo, setDeleted }) => {
  const clickCansel = () => {
    setDeleteClick((prev) => !prev);
  };
  const deleteCustomer = async (id) => {
    try {
      console.log("delete", id);
      setDeleteClick((prev) => !prev);
      setDeleted(true);
      await deleteDoc(doc(db, "customers", `/${id}`));
    } catch (e) {
      console.log("delete error");
      console.log(e);
    }
  };
  return (
    <div className={styles.backContainer}>
      <div className={styles.confirmDialog}>
        <h3 className={styles.dialogText}>
          {`顧客番号:${customerInfo.id}, ${customerInfo.name}様の顧客データを削除します。\n
          よろしいですか？`}
        </h3>
        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={clickCansel}>キャンセル</button>
          <button className={styles.deleteBtn} onClick={() => deleteCustomer(customerInfo.id)}>削除</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomer;
