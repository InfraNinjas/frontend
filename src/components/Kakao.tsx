import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import Marker from "./Marker";

export interface Position {
  lat: number;
  lng: number;
}

function KakaoMap() {
  const [position, setPosition] = useState<Position | null>();

  return (
    <>
      <Map
        center={{ lat: 37.56949449709, lng: 126.98595537882869 }}
        style={{ width: "100%", height: "100%" }}
        level={2}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
        }}
      >
        {position ? (
          <Marker position={position} setPosition={setPosition} />
        ) : null}
      </Map>
    </>
  );
}

export default KakaoMap;
