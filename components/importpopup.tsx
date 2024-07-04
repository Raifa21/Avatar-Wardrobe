import * as React from "react";
import { Button } from "@/components/ui/button";
import "./popups.css";

type ImportPopupProps = {
  onImport: (data: string) => void;
};

const ImportPopup: React.FC<ImportPopupProps> = ({ onImport }) => {
  const [importedData, setImportedData] = React.useState("");

  const handleImport = () => {
    onImport(importedData);
    setImportedData(""); // Clear the input after import
  };

  return (
    <>
      <div className="popup-overlay active" />
      <div className="popup flex">
        <div className="title">インポート</div>
        <div className="content">
          <input
            value={importedData}
            onChange={(e) => setImportedData(e.target.value)}
            placeholder="ここにインポートするデータを貼り付けてください"
            className="input"
          />
        </div>
        <div className="footer">
          <Button onClick={handleImport}>インポート</Button>
          <Button variant="outline">キャンセル</Button>
        </div>
      </div>
    </>
  );
};

export default ImportPopup;
