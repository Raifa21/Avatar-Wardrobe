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
  onLanguageChange: (selectedLanguage: string) => void; // Callback function to change language
  currentLanguage: string; // Sent from index.tsx to keep track of current language
};

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" });

const Sidebar: React.FC<sidebarProps> = ({
  onImport,
  onExport,
  onDelete,
  onClose,
  onLanguageChange,
  currentLanguage,
}) => {
  const [importPopupOpen, setImportPopupOpen] = React.useState(false);
  const [exportPopupOpen, setExportPopupOpen] = React.useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [language, setLanguage] = React.useState(currentLanguage); // Default language set to Japanese
  const [exportData, setExportData] = React.useState("");

  const handleLanguageChange = (selectedLanguage: string) => {
    console.log(`Switching language to ${selectedLanguage}`);
    setLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
  };

  // Callback functions to open/close popups
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

  // These callback functions are required to update the Tab[] data in index.tsx
  //
  // Callback function to send imported data to index.tsx
  const handleImportData = (data: string) => {
    onImport(data);
    setImportPopupOpen(false); // Close popup after import
  };

  // Callback function to delete data
  const handleDeleteData = () => {
    onDelete();
    setDeletePopupOpen(false); // Close popup after delete
  };

  // Close sidebar when clicking outside of the sidebar
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="sidebar-overlay active" onClick={handleOverlayClick}>
      <div className={`sidebar ${notosansjp_regular.className}`}>
        <button onClick={onClose}>
          <img className="closeIcon" src={closeoutline.src} alt="close" />
        </button>
        <h1>{language === "JP" ? "設定" : "Settings"}</h1>
        <div className="language">
          <h2>{language === "JP" ? "言語設定" : "Language"}</h2>
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
          <h2>{language === "JP" ? "データ管理" : "Data Management"}</h2>
          <div>
            <button
              className="sidebar-button"
              onClick={handleToggleImportPopup}
            >
              {language === "JP" ? "データをインポート" : "Import Data"}
            </button>
          </div>
          <div>
            <button
              className="sidebar-button"
              onClick={handleToggleExportPopup}
            >
              {language === "JP" ? "データをエクスポート" : "Export Data"}
            </button>
          </div>
        </div>
        <div>
          <button
            className="sidebar-button-alert"
            onClick={handleToggleDeletePopup}
          >
            {language === "JP" ? "データをリセット" : "Reset Data"}
          </button>
        </div>
        {importPopupOpen && (
          <ImportPopup
            language={language}
            onImport={handleImportData}
            onClose={() => setImportPopupOpen(false)}
          />
        )}
        {exportPopupOpen && (
          <ExportPopup
            language={language}
            exportData={exportData}
            onClose={() => setExportPopupOpen(false)}
          />
        )}
        {deletePopupOpen && (
          <DeletePopup
            language={language}
            onDelete={handleDeleteData}
            onClose={() => setDeletePopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
