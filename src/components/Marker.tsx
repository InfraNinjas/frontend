import { MapMarker } from "react-kakao-maps-sdk";
import { Restaurant } from "./Kakao";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

import styles from "./Marker.module.scss";

type Props = {
  restaurant: Restaurant;
};

function Marker({ restaurant }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <MapMarker
        position={{ lat: restaurant.x, lng: restaurant.y }}
        clickable={true}
        onClick={() => setModalOpen(true)}
        infoWindowOptions={{ disableAutoPan: false }}
      >
        <div className={styles.infowindow} onClick={() => setModalOpen(true)}>
          <div>{restaurant.name}</div>
        </div>
      </MapMarker>
      <ReviewModal
        id={restaurant.id}
        name={restaurant.name}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      ></ReviewModal>
    </>
  );
}

export default Marker;
