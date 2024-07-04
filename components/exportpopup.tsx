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
import { Copy } from "lucide-react";

type ExportPopupProps = {
  open: boolean;
  onExport: () => void;
};

const ExportPopup: React.FC<ExportPopupProps> = ({ open, onExport }) => {
  const handleExport = () => {
    onExport();
  };

  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>データをエクスポート</DialogTitle>
      </DialogHeader>
      <DialogContent className="sm:max-w-md">
        <DialogDescription>
          エクスポートしたいデータをクリップボードにコピーしてください。
        </DialogDescription>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <textarea
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
              className="w-full p-2 border rounded-md"
              rows={5}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleExport}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportPopup;
