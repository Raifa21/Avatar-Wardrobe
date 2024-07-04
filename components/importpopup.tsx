import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ImportPopupProps = {
  open: boolean;
  onImport: (data: string) => void;
};

const ImportPopup: React.FC<ImportPopupProps> = ({ open, onImport }) => {
  const [importedData, setImportedData] = React.useState<string>("");

  const handleImport = () => {
    onImport(importedData);
    setImportedData(""); // Clear imported data after import
  };

  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>データをインポート</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <DialogDescription>
          ここにインポートするデータを貼り付けてください。
        </DialogDescription>
        <textarea
          value={importedData}
          onChange={(e) => setImportedData(e.target.value)}
          placeholder="ここにインポートするデータを貼り付けてください"
          rows={5}
          className="w-full p-2 border rounded-md"
        />
      </DialogContent>
      <DialogFooter>
        <Button onClick={handleImport}>インポート</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImportPopup;
