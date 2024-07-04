import * as React from "react";
import { Button } from "@/components/ui/button";
import "./popups.css";

type ImportPopupProps = {
  onImport: () => void;
};

const ImportPopup: React.FC<ImportPopupProps> = ({ onImport }) => {
  const [importedData, setImportedData] = React.useState("");

  const handleImport = () => {
    onImport();
  };

  return (
    <div className="popup">
      <div className="title">データをインポート</div>
      <div className="content">
        ここにインポートするデータを貼り付けてください。
        <textarea
          value={importedData}
          onChange={(e) => setImportedData(e.target.value)}
          placeholder="ここにインポートするデータを貼り付けてください"
          rows={5}
          className="w-full p-2 border rounded-md"
        />
        <div className="footer">
          <Button onClick={handleImport}>インポート</Button>
        </div>
      </div>
    </div>
  );
};

export default ImportPopup;
