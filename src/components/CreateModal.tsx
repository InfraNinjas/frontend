import { Dispatch, SetStateAction } from "react";
import ReactModal from "react-modal";

import styles from "./CreateModal.module.scss";
import { Review } from "./ReviewModal";
import StarRating from "./StarRating";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "15",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "360px",
    height: "360px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

type Props = {
  id: number;
  name: string;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  reviews: Review[];
  setReviews: Dispatch<SetStateAction<Review[] | null>>;
};

function CreateModal({
  id,
  name,
  modalOpen,
  setModalOpen,
  reviews,
  setReviews,
}: Props) {
  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = (formData: FormData) => {
    fetch("/api/reviews", {
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
        setReviews([...reviews, data]);
        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
    >
      <div className={styles.box}>
        <div className={styles.headerbox}>
          <h2 className={styles.title}>{name}</h2>
        </div>
        <div>
          <form className={styles.infowindow} action={onSubmit}>
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
            <input type="hidden" name="restaurant_id" value={id} />
          </form>
        </div>

        <button className={styles.closebutton} onClick={closeModal}>
          닫기
        </button>
      </div>
    </ReactModal>
  );
}

export default CreateModal;
