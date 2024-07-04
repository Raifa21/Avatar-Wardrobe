import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type ExportPopupProps = {
  onExport: () => void;
};

const ExportPopup: React.FC<ExportPopupProps> = ({ onExport }) => {
  const handleExport = () => {
    onExport();
  };

  return (
    <div className="popup">
      <div className="title">データをエクスポート</div>
      <div className="content">
        エクスポートしたいデータをクリップボードにコピーしてください。
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <textarea
              defaultValue=""
              readOnly
              className="w-full p-2 border rounded-md"
              rows={5}
            />
          </div>
        </div>
        <div className="footer">
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleExport}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportPopup;
