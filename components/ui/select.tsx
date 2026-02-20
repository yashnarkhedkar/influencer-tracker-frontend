"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type React from "react";

export const SelectRoot = Select.Root;
export const SelectValue = Select.Value;
export const SelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Select.Trigger>) => (
  <Select.Trigger
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-border bg-surface-2 px-3 text-sm text-text shadow-sm",
      className
    )}
    {...props}
  >
    {children}
    <Select.Icon>
      <ChevronDown size={16} className="text-text-dim" />
    </Select.Icon>
  </Select.Trigger>
);

export const SelectContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Select.Content>) => (
  <Select.Portal>
    <Select.Content
      className={cn(
        "z-50 overflow-hidden rounded-md border border-border bg-surface-2 shadow-lg",
        className
      )}
      {...props}
    />
  </Select.Portal>
);

export const SelectItem = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Select.Item>) => (
  <Select.Item
    className={cn(
      "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-text outline-none focus:bg-surface-3",
      className
    )}
    {...props}
  >
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
);

export const SelectGroup = Select.Group;
export const SelectLabel = Select.Label;
