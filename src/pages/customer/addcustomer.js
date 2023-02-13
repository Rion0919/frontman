import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/addcustomer.module.css"

export default function AddCustomer() {
  const router = useRouter()
  return (
    <Layout>
      <Header user={router.query.loginId}/>
      <div>
        hi, this is addcustomer page
      </div>
    </Layout>
  );
}
