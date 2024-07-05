"use client";
import * as React from "react";
import ImportPopup from "../components/importpopup";
import ExportPopup from "../components/exportpopup";
import DeletePopup from "../components/deletepopup";
import { Noto_Sans_JP } from "next/font/google";
import "../styles/sidebar.css";
import closeoutline from "../lib/eva-icons/outline/svg/close-outline.svg";

type sidebarProps = {
  onImport: (jsonString: string) => void;
  onExport: () => string;
  onDelete: () => void;
  onClose: () => void;
};

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" });

const Sidebar: React.FC<sidebarProps> = ({
  onImport,
  onExport,
  onDelete,
  onClose,
}) => {
  const [importPopupOpen, setImportPopupOpen] = React.useState(false);
  const [exportPopupOpen, setExportPopupOpen] = React.useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("JP"); // Default language set to Japanese
  const [exportData, setExportData] = React.useState("");

  const handleLanguageChange = (selectedLanguage: string) => {
    console.log(`Switching language to ${selectedLanguage}`);
    setLanguage(selectedLanguage);
  };

  const handleToggleImportPopup = () => {
    setImportPopupOpen(!importPopupOpen);
  };

  const handleToggleExportPopup = () => {
    setExportData(onExport());
    setExportPopupOpen(!exportPopupOpen);
  };

  const handleToggleDeletePopup = () => {
    setDeletePopupOpen(!deletePopupOpen);
  };

  const handleImportData = (data: string) => {
    onImport(data);
    setImportPopupOpen(false); // Close popup after import
  };

  const handleDeleteData = () => {
    onDelete();
    setDeletePopupOpen(false); // Close popup after delete
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="sidebar-overlay active" onClick={handleOverlayClick}>
      <div className={`sidebar ${notosansjp_regular.className}`}>
        <img
          className="closeIcon"
          src={closeoutline.src}
          alt="close"
          onClick={onClose}
        />
        <h1>設定</h1>
        <div className="language">
          <h2>言語設定</h2>
          <label>
            <input
              type="radio"
              name="language"
              value="JP"
              checked={language === "JP"}
              onChange={() => handleLanguageChange("JP")}
            />
            &nbsp; 日本語
          </label>
          <label>
            <input
              type="radio"
              name="language"
              value="ENG"
              checked={language === "ENG"}
              onChange={() => handleLanguageChange("ENG")}
            />
            &nbsp; English
          </label>
        </div>
        <div className="data">
          <h2>データ管理</h2>
          <button className="sidebar-button" onClick={handleToggleImportPopup}>
            データをインポート
          </button>
          <button className="sidebar-button" onClick={handleToggleExportPopup}>
            データをエクスポート
          </button>
        </div>
        <div>
          <button className="sidebar-button" onClick={handleToggleDeletePopup}>
            データをリセット
          </button>
        </div>
        {importPopupOpen && (
          <ImportPopup
            onImport={handleImportData}
            onClose={() => setImportPopupOpen(false)}
          />
        )}
        {exportPopupOpen && (
          <ExportPopup
            exportData={exportData}
            onClose={() => setExportPopupOpen(false)}
          />
        )}
        {deletePopupOpen && (
          <DeletePopup
            onDelete={handleDeleteData}
            onClose={() => setDeletePopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
