import * as React from "react";
import "./popups.css";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";

type DeletePopupProps = {
  onDelete: () => void;
  onClose: () => void;
};

const DeletePopup: React.FC<DeletePopupProps> = ({ onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay active" onClick={handleOverlayClick}>
      <div className="popup">
        <img
          className="closeIcon"
          src={closeoutline.src}
          alt="close"
          onClick={onClose}
        />
        <div className="title">データのリセット</div>
        <div className="content">
          <div className="subtitle">
            本当にデータをリセットしますか？この操作は取り消せません。
          </div>
        </div>
        <button className="button" onClick={handleDelete}>
          リセット
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
