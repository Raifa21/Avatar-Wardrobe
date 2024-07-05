import * as React from "react";
import "../styles/popups.css";
import { Copy } from "lucide-react";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";

type ExportPopupProps = {
  language: string;
  exportData: string;
  onClose: () => void;
};

const ExportPopup: React.FC<ExportPopupProps> = ({
  language,
  onClose,
  exportData,
}) => {
  const exportDataRef = React.useRef<HTMLInputElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopy = () => {
    if (exportDataRef.current) {
      exportDataRef.current.select();
      document.execCommand("copy");

      // Show confirmation message
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
          {language === "JP" ? "エクスポート" : "Export"}
        </div>
        <div className="popup-content">
          <div className="subtitle">現在のデータをエクスポートしますか？</div>
        </div>
        <div className="exportcontent">
          <input
            className="exportdata"
            ref={exportDataRef}
            readOnly
            value={exportData}
          />
          <button className="exportbutton" onClick={handleCopy}>
            <Copy className="copyIcon" />
          </button>
        </div>
        <button className="popup-button" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ExportPopup;
