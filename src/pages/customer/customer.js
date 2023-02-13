import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/customer.module.css"

export default function Customer() {
  const router = useRouter()
  return (
    <Layout>
      <Header user={router.query.loginId}/>
      <div>
        hi, this is customer page
      </div>
    </Layout>
  );
}
