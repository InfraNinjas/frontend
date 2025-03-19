import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import CreateMarker from "./CreateMarker";
import Marker from "./Marker";

export interface Position {
  lat: number;
  lng: number;
}

export interface Restaurant {
  id: number;
  name: string;
  x: number;
  y: number;
}

function KakaoMap() {
  const [position, setPosition] = useState<Position | null>();
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>();

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <Map
        center={{ lat: 37.56945845794429, lng: 126.98596104532344 }}
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
          <CreateMarker position={position} setPosition={setPosition} />
        ) : null}
        {restaurants?.map((restaurant, index) => (
          <Marker restaurant={restaurant} key={index} />
        ))}
      </Map>
    </>
  );
}

export default KakaoMap;
