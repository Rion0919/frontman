import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/reservation.module.css"

export default function Reservation() {
  const router = useRouter()
  return (
    <Layout>
      <Header user={router.query.loginId}/>
      <div>
        hi, this is reservation page
      </div>
    </Layout>
  );
}
