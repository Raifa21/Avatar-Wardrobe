import * as React from "react";
import ImportPopup from "../components/importpopup";
import ExportPopup from "../components/exportpopup";
import DeletePopup from "../components/deletepopup";
import { Button } from "@/components/ui/button";
import { Noto_Sans_JP } from "next/font/google";
import styles from "./settings.module.css";

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" });

const SettingsPage: React.FC = () => {
  const [importPopupOpen, setImportPopupOpen] = React.useState(false);
  const [exportPopupOpen, setExportPopupOpen] = React.useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("JP"); // Default language set to Japanese

  const handleLanguageChange = (selectedLanguage: string) => {
    // Handle language change logic
    console.log(`Switching language to ${selectedLanguage}`);
    setLanguage(selectedLanguage);
    // Example: You might want to set a state for language preference here
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
    // Handle import logic here
    console.log("Importing data");
    setImportPopupOpen(false); // Close popup after import
  };

  const handleExportData = () => {
    // Handle export logic here
    console.log("Exporting data");
    setExportPopupOpen(false); // Close popup after export
  };

  const handleDeleteData = () => {
    // Handle delete logic here
    console.log("Deleting data");
    setDeletePopupOpen(false); // Close popup after delete
  };

  return (
    <div className={notosansjp_regular.className}>
      <h1>設定</h1>
      <div>
        <h2>言語設定</h2>
        <label>
          <input
            type="radio"
            name="language"
            value="JP"
            checked={language === "JP"}
            onChange={() => handleLanguageChange("JP")}
          />
          日本語
        </label>
        <label>
          <input
            type="radio"
            name="language"
            value="ENG"
            checked={language === "ENG"}
            onChange={() => handleLanguageChange("ENG")}
          />
          English
        </label>
      </div>
      <div
        className={`popup-overlay ${importPopupOpen || exportPopupOpen || deletePopupOpen ? "active" : ""}`}
      />
      <div className={styles.popup}>
        {importPopupOpen && (
          <ImportPopup
            onImport={() => {
              // Handle import logic here
              console.log("Importing data");
              setImportPopupOpen(false); // Close popup after import
            }}
            onClose={() => setImportPopupOpen(false)}
          />
        )}
        {exportPopupOpen && (
          <ExportPopup
            onExport={() => {
              // Handle export logic here
              console.log("Exporting data");
              setExportPopupOpen(false); // Close popup after export
            }}
          />
        )}
        {deletePopupOpen && (
          <DeletePopup
            onDelete={() => {
              // Handle delete logic here
              console.log("Deleting data");
              setDeletePopupOpen(false); // Close popup after delete
            }}
          />
        )}
      </div>
      <div>
        <Button onClick={handleToggleImportPopup}>データをインポート</Button>
        <Button onClick={handleToggleExportPopup}>データをエクスポート</Button>
      </div>
      <div>
        <Button onClick={handleToggleDeletePopup}>データをリセット</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
