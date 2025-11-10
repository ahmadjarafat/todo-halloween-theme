"use client";

import * as React from "react";
import { useIsMobile } from "./use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./Dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./Sheet";
import { cn } from "@/lib/utils";

interface ModalWrapperProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mobileSide?: "top" | "right" | "bottom" | "left";
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function ModalWrapper({
  children,
  open,
  onOpenChange,
  mobileSide = "bottom",
  title,
  description,
  footer,
  className,
  showCloseButton = true,
}: ModalWrapperProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side={mobileSide} className={cn("px-6 pb-10", className)}>
          {(title || description) && (
            <SheetHeader className="pl-0 pb-0">
              {title && (
                <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
              )}
              {description && (
                <SheetDescription>{description}</SheetDescription>
              )}
            </SheetHeader>
          )}
          {children}
          {footer && <SheetFooter>{footer}</SheetFooter>}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("!max-w-[28rem]", className)}
        showCloseButton={showCloseButton}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
