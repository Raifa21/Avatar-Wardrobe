import * as React from "react";
import "../styles/popups.css";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";

type DeletePopupProps = {
  language: string;
  onDelete: () => void;
  onClose: () => void;
};

const DeletePopup: React.FC<DeletePopupProps> = ({
  language,
  onDelete,
  onClose,
}) => {
  // Call callback function to delete data
  const handleDelete = () => {
    onDelete();
  };

  // Close the popup if the overlay is clicked
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay active" onClick={handleOverlayClick}>
      <div className="popup">
        <button onClick={onClose}>
          <img className="closeIcon" src={closeoutline.src} alt="close" />
        </button>
        <div className="popup-title">
          {language === "JP" ? "データのリセット" : "Reset Data"}
        </div>
        <div className="popup-content">
          <div className="subtitle">
            {language === "JP" ? (
              "本当にデータをリセットしますか？この操作は取り消せません。"
            ) : (
              <>
                Are you sure you want to reset your data?
                <br />
                This action cannot be undone.
              </>
            )}
          </div>
        </div>
        <button className="popup-button-alert" onClick={handleDelete}>
          {language === "JP" ? "リセット" : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
