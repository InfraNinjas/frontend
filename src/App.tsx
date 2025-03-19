import styles from "./App.module.scss";
import KakaoMap from "./components/Kakao";

function App() {
  return (
    <div className={styles.app}>
      <KakaoMap />
    </div>
  );
}

export default App;
