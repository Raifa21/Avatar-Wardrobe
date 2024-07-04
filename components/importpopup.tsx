import * as React from "react";
import "./popups.css";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";

type ImportPopupProps = {
  onImport: (data: string) => void;
  onClose: () => void;
};

const ImportPopup: React.FC<ImportPopupProps> = ({ onImport, onClose }) => {
  const [importedData, setImportedData] = React.useState("");

  const handleImport = () => {
    onImport(importedData);
    setImportedData(""); // Clear the input after import
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
        <div className="title">インポート</div>
        <div className="content">
          <div className="subtitle">
            エクスポートしたセーブコードを貼り付けてください。
            <br />
            インポートすると、現在のデータは上書きされます。
          </div>
          <input
            value={importedData}
            onChange={(e) => setImportedData(e.target.value)}
            placeholder="ここにインポートするデータを貼り付けてください"
            className="input"
          />
        </div>
        <button className="button" onClick={handleImport}>
          インポート
        </button>
      </div>
    </div>
  );
};

export default ImportPopup;
