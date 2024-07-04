import * as React from "react";
import "./popups.css";
import { Copy } from "lucide-react";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";

type ExportPopupProps = {
  exportData: string;
  onExport: () => void;
  onClose: () => void;
};

const ExportPopup: React.FC<ExportPopupProps> = ({
  onExport,
  onClose,
  exportData,
}) => {
  const handleExport = () => {
    onExport();
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
        <div className="title">エクスポート</div>
        <div className="content">
          <div className="subtitle">現在のデータをエクスポートしますか？</div>
        </div>
        <div className="exportcontent">
          <input className="exportdata" readOnly value={exportData} />
          <button className="exportbutton" onClick={handleExport}>
            <Copy className="copyIcon" />
          </button>
        </div>
        <button className="button" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ExportPopup;
