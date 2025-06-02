import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface I_ConfirmModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  cancelButtonText: string;
  confirmButtonText: string;
  title: string;
  description: string;
}

function ConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
  title,
  description,
  confirmButtonText,
  cancelButtonText,
}: I_ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-4 rounded-xl max-w-sm"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-2.5 rounded-3xl">
          <div className="text-foreground text-center max-w-80">
            <p className="font-semibold mb-1.5">{title}</p>
            <p className="text-sm font-medium">{description}</p>
          </div>
          <div className="flex justify-end gap-2.5 w-full py-4">
            <Button
              onClick={() => onOpenChange(false)}
              variant="default"
              disabled={isLoading}
              className="cursor-pointer"
            >
              {cancelButtonText}
            </Button>
            <Button
              onClick={onConfirm}
              variant="secondary"
              disabled={isLoading}
              isLoading={isLoading}
              className="cursor-pointer"
            >
              {confirmButtonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;
