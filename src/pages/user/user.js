import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/user.module.css"

export default function User() {
  const router = useRouter()
  return (
    <Layout>
      <Header user={router.query.loginId}/>
      <div>
        hi, this is user page
      </div>
    </Layout>
  );
}
