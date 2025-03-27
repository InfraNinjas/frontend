import { Link } from "react-router";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.menus}>
            <Link to="/">
              <div className={styles.logo}>맛집지도</div>
            </Link>
            <Link to="https://www.kolonbenit.com/main/index.do">
              <img src="/logo.png" width="30px" className={styles.image} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.spacer} />
    </>
  );
}
