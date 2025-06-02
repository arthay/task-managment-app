import { type ReactNode, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface I_Props {
  open: boolean;
  title: string;
  saveText?: string;
  onClose: () => void;
  loading?: boolean;
  children?: ReactNode;
  subtitle?: string;
  headerChildren?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  scrollerClassName?: string;
}

function Modal({
  open,
  title,
  onClose,
  loading,
  children,
  subtitle,
  headerChildren,
  headerClassName,
  contentClassName,
  scrollerClassName,
}: I_Props) {
  const headerContent = useMemo(
    () =>
      title || subtitle || headerChildren ? (
        <div
          className={cn(
            "flex flex-col pb-4 px-4 border-b -mt-0.5",
            headerClassName,
          )}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              {title ? (
                <DialogTitle className="text-lg font-medium">
                  {title}
                </DialogTitle>
              ) : null}
              {subtitle ? (
                <DialogDescription
                  aria-description={subtitle}
                  aria-describedby={title}
                  className="font-normal text-sm text-muted-foreground mt-1"
                >
                  {subtitle}
                </DialogDescription>
              ) : null}
            </div>
          </div>

          {headerChildren}
        </div>
      ) : null,
    [title, subtitle, headerChildren, headerClassName],
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] flex overflow-hidden px-0 ">
        <div
          className={cn(
            "flex flex-col overflow-hidden w-full ",
            `${contentClassName || ""} ${loading ? "[&>*:not(:first-child)]:animate-loading-opacity" : ""}`,
            loading ? "!pointer-events-none" : "",
          )}
        >
          <DialogHeader className="text-left">{headerContent}</DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className={cn("p-4", scrollerClassName)}>{children}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
