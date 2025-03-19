import { MapMarker } from "react-kakao-maps-sdk";
import { Position } from "./Kakao";
import { Dispatch, SetStateAction } from "react";

import styles from "./CreateMarker.module.scss";
import StarRating from "./StarRating";

type Props = {
  position: Position;
  setPosition: Dispatch<SetStateAction<Position | null | undefined>>;
};

function CreateMarker(props: Props) {
  const onClickMarker = () => {
    props.setPosition(null);
  };

  return (
    <MapMarker
      position={props.position}
      clickable={true}
      onClick={onClickMarker}
    >
      <div>
        <form
          className={styles.infowindow}
          method="post"
          action="/api/restaurants"
        >
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
