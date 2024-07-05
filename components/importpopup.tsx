import * as React from "react";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";
import "../styles/popups.css";

type ImportPopupProps = {
  language: string;
  onImport: (data: string) => void;
  onClose: () => void;
};

const ImportPopup: React.FC<ImportPopupProps> = ({
  language,
  onImport,
  onClose,
}) => {
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
        <div className="popup-title">
          {language === "JP" ? "インポート" : "Import"}
        </div>
        <div className="popup-content">
          <div className="subtitle">
            {language === "JP" ? (
              <>
                エクスポートしたセーブコードを貼り付けてください。
                <br />
                インポートすると、現在のデータは上書きされます。
              </>
            ) : (
              <>
                Paste the save code you exported.
                <br />
                Importing will overwrite the current data.
              </>
            )}
          </div>
          <input
            value={importedData}
            onChange={(e) => setImportedData(e.target.value)}
            placeholder={
              language === "JP"
                ? "ここにインポートするデータを貼り付けてください"
                : "Paste the data to import"
            }
            className="popup-input"
          />
        </div>
        <button className="popup-button" onClick={handleImport}>
          {language === "JP" ? "インポート" : "Import"}
        </button>
      </div>
    </div>
  );
};

export default ImportPopup;
