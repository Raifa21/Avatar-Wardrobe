import * as React from "react";
import { Button } from "@/components/ui/button";

type DeletePopupProps = {
  onDelete: () => void;
};

const DeletePopup: React.FC<DeletePopupProps> = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="popup">
      <div className="title">データをリセット</div>
      <div className="content">本当に全てのデータを削除しますか？</div>
      <div className="footer">
        <Button onClick={handleDelete}>削除</Button>
      </div>
    </div>
  );
};

export default DeletePopup;
