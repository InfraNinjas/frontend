import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.scss";
import KakaoMap from "./components/Kakao";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<any>();

  const onClickButton = async () => {
    const res = await fetch("/api/test");
    if (res.status < 400) {
      const json = await res.json();
      //console.log(json)
      setData(json);
    } else setData(null);
  };

  return (
    <div className={styles.app}>
      <KakaoMap />
    </div>
  );
}

export default App;
