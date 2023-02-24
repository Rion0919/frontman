import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/history.module.css";

export default function History() {
  const router = useRouter();
  return (
    <Layout>
      <Header user={router.query.loginId} />
      <div>hi, this is history page</div>
    </Layout>
  );
}
