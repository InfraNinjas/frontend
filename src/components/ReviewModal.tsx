import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactModal from "react-modal";

import styles from "./ReviewModal.module.scss";
import CreateModal from "./CreateModal";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "360px",
    height: "480px",
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

export type Review = {
  id: number;
  review: string;
  star: number;
};

type Props = {
  id: number;
  name: string;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

function ReviewModal({ name, modalOpen, setModalOpen, id }: Props) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!modalOpen) return;
    fetch("/api/reviews/" + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [modalOpen]);

  return (
    <>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={false}
      >
        <div className={styles.box}>
          <div>
            <div className={styles.headerbox}>
              <h2 className={styles.title}>{name}</h2>
              <button
                className={styles.addbutton}
                onClick={() => setIsOpenCreateModal(true)}
              >
                추가
              </button>
            </div>
            {reviews?.map((review, index) => (
              <div className={styles.reviewbox} key={index}>
                <div>{review.review}</div>
                <div className={styles.star}>
                  {Array.from({ length: review.star }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className={styles.closebutton} onClick={closeModal}>
            닫기
          </button>
        </div>
      </ReactModal>
      {reviews && (
        <CreateModal
          id={id}
          name={name}
          modalOpen={isOpenCreateModal}
          setModalOpen={setIsOpenCreateModal}
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
    </>
  );
}

export default ReviewModal;
