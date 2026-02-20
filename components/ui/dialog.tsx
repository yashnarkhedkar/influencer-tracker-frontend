"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type React from "react";

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogClose = Dialog.Close;

export function DialogContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content
        className={cn(
        "fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface-1 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
        className
      )}
        {...props}
      />
    </Dialog.Portal>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 space-y-1", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return <Dialog.Title className={cn("text-lg font-semibold", className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Description>) {
  return <Dialog.Description className={cn("text-sm text-text-dim", className)} {...props} />;
}

export function DialogCloseButton() {
  return (
    <Dialog.Close className="absolute right-4 top-4 rounded-full p-1 text-text-dim hover:bg-surface-2">
      <X size={16} />
    </Dialog.Close>
  );
}
