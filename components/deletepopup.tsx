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

type DeletePopupProps = {
  open: boolean;
  onDelete: () => void;
};

const DeletePopup: React.FC<DeletePopupProps> = ({ open, onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>データをリセット</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <DialogDescription>
          すべてのローカルデータを削除します。この操作は元に戻せません。本当に削除しますか？
        </DialogDescription>
      </DialogContent>
      <DialogFooter>
        <Button onClick={handleDelete}>はい、削除します</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeletePopup;
