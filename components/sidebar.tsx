"use client";
import * as React from "react";
import ImportPopup from "../components/importpopup";
import ExportPopup from "../components/exportpopup";
import DeletePopup from "../components/deletepopup";
import { Noto_Sans_JP } from "next/font/google";
import "../styles/sidebar.css";

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" });

const Sidebar: React.FC = () => {
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
    setExportPopupOpen(!exportPopupOpen);
  };

  const handleToggleDeletePopup = () => {
    setDeletePopupOpen(!deletePopupOpen);
  };

  const handleImportData = (data: string) => {
    console.log("Importing data:", data);
    setImportPopupOpen(false); // Close popup after import
  };

  const handleExportData = () => {
    console.log("Exporting data");
    setExportPopupOpen(false); // Close popup after export
  };

  const handleDeleteData = () => {
    console.log("Deleting data");
    setDeletePopupOpen(false); // Close popup after delete
  };

  return (
    <div className={`sidebar ${notosansjp_regular.className}`}>
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
          onExport={handleExportData}
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
  );
};

export default Sidebar;
