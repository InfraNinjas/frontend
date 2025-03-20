import { MapMarker } from "react-kakao-maps-sdk";
import { Position, Restaurant } from "./Kakao";
import { Dispatch, SetStateAction } from "react";

import styles from "./CreateMarker.module.scss";
import StarRating from "./StarRating";

type Props = {
  position: Position;
  setPosition: Dispatch<SetStateAction<Position | null | undefined>>;
  restaurants: Restaurant[];
  setRestaurants: Dispatch<SetStateAction<Restaurant[] | null | undefined>>;
};

function CreateMarker(props: Props) {
  const onClickMarker = () => {
    props.setPosition(null);
  };

  const onSubmit = (formData: FormData) => {
    fetch("/api/restaurants", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        props.setRestaurants([...props.restaurants, data]);
        props.setPosition(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <MapMarker
      position={props.position}
      clickable={true}
      onClick={onClickMarker}
    >
      <div>
        <form className={styles.infowindow} action={onSubmit}>
          <div className={styles.inputdiv}>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.input}
            ></input>
          </div>

          <div className={styles.inputdiv}>
            <label htmlFor="review">리뷰</label>
            <input
              id="review"
              name="review"
              type="text"
              className={styles.input}
            ></input>
          </div>
          <StarRating />
          <button className={styles.button} type="submit">
            추가하기
          </button>
          <input type="hidden" name="x" value={props.position.lat} />
          <input type="hidden" name="y" value={props.position.lng} />
        </form>
      </div>
    </MapMarker>
  );
}

export default CreateMarker;
