import * as React from "react";
import "../styles/popups.css";
import { Copy } from "lucide-react";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";

type ExportPopupProps = {
  language: string;
  exportData: string; // Data generated in index.tsx and passed onto this component
  onClose: () => void;
};

const ExportPopup: React.FC<ExportPopupProps> = ({
  language,
  onClose,
  exportData,
}) => {
  const exportDataRef = React.useRef<HTMLInputElement>(null);

  // Close the popup if the overlay is clicked
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Copy the export data to the clipboard
  const handleCopy = () => {
    if (exportDataRef.current) {
      exportDataRef.current.select();
      document.execCommand("copy");

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
          {language === "JP" ? "エクスポート" : "Export"}
        </div>
        <div className="popup-content">
          <div className="subtitle">
            {language === "JP" ? (
              <>
                <p>このセーブコードをコピーして他のデバイスに</p>
                <p>インポートすることでデータを引き継ぐことができます。</p>
              </>
            ) : (
              <>
                <p>Copy this save code and import it on another device </p>
                <p>to transfer your data.</p>
              </>
            )}
          </div>
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
          {language === "JP" ? "閉じる" : "Close"}
        </button>
      </div>
    </div>
  );
};

export default ExportPopup;
