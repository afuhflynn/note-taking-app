"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      isOpen,
      onClose,
      title,
      description,
      children,
      footer,
      ...props
    },
    ref
  ) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          ref={ref}
          className={cn(
            "bg-background p-6 rounded-lg shadow-lg max-w-md w-full max-h-[85vh] overflow-auto",
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          <div className="flex justify-between items-start mb-4">
            {(title || description) && (
              <div>
                {title && <h2 className="text-lg font-semibold">{title}</h2>}
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div>{children}</div>
          {footer && (
            <div className="flex justify-end space-x-2 mt-6">{footer}</div>
          )}
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";

export { Modal };
