"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ trigger, title, children, className }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("max-h-[90vh] overflow-y-auto", className)}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

// Helper function to merge class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
