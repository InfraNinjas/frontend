import { useState } from "react";

const StarRating = () => {
  // 선택된 별점과 마우스 hover 상태를 관리합니다.
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <div>별점</div>
      <div>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="star"
                value={starValue}
                onClick={() => setRating(starValue)} // 별 클릭 시 선택된 별점을 업데이트합니다.
                style={{ display: "none" }} // 기본 라디오 버튼은 숨깁니다.
              />
              <span
                style={{
                  fontSize: "2rem",
                  color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHover(starValue)} // 마우스가 별 위에 있을 때 임시로 하이라이트합니다.
                onMouseLeave={() => setHover(0)} // 마우스가 벗어나면 원래 상태로 복귀합니다.
              >
                ★
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
