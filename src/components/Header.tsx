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
            <Link to="/random">
              <div className={styles.link}>test</div>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.spacer} />
    </>
  );
}
