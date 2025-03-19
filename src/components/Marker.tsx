import { MapMarker } from "react-kakao-maps-sdk";
import { Restaurant } from "./Kakao";

type Props = {
  restaurant: Restaurant;
};

function Marker(props: Props) {
  return (
    <MapMarker
      position={{ lat: props.restaurant.x, lng: props.restaurant.y }}
      clickable={true}
    >
      <div>
        <div>이름: {props.restaurant.name}</div>
      </div>
    </MapMarker>
  );
}

export default Marker;
