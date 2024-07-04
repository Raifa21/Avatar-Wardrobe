import * as React from "react";
import ImportPopup from "../components/importpopup";
import ExportPopup from "../components/exportpopup";
import DeletePopup from "../components/deletepopup";

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

  const handleImportData = (data: string) => {
    console.log("Importing data:", data);
    // Handle import data logic here
    setImportPopupOpen(false); // Close import popup after importing data
  };

  const handleExportData = () => {
    console.log("Exporting data");
    // Handle export data logic here
    setExportPopupOpen(false); // Close export popup after exporting data
  };

  const handleDeleteData = () => {
    console.log("Deleting data");
    // Handle delete data logic here
    setDeletePopupOpen(false); // Close delete popup after deleting data
  };

  return (
    <div>
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
      <div>
        <ImportPopup open={importPopupOpen} onImport={handleImportData} />
        <ExportPopup open={exportPopupOpen} onExport={handleExportData} />
      </div>
      <div>
        <DeletePopup open={deletePopupOpen} onDelete={handleDeleteData} />
      </div>
    </div>
  );
};

export default SettingsPage;
