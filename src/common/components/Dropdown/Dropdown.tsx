import React, { ComponentPropsWithoutRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { ElementRef } from "react";
import { ReactNode } from "react";

type DropdownProps = {
  trigger?: ReactNode
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  children: ReactNode
  stayOpen?:boolean
  sideOffset?: number
  style?:string
}  & ComponentPropsWithoutRef<typeof DropdownMenu.Root>

export const Dropdown = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, DropdownProps>(
  (
    {
      trigger,
      align,
      side = 'bottom',
      children,
      sideOffset = 8,
      stayOpen = false,
      style
    }: DropdownProps,
    ref
) => {

    const [open, setOpen] = useState(false);

    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild ref={ref}>
          {trigger}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align={align} side={side} onClick={e=>{
            e.stopPropagation()
            stayOpen ? setOpen(true) : setOpen(false)
          }}>
            <div>{children}</div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
     </DropdownMenu.Root>
    );
  }
)



type ItemProps = {
  children: ReactNode;
  disabled?: boolean;
  title?: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropdownItem = ({ children, disabled, onSelect, title, ...restProps }: ItemProps) => {
  return (
    <DropdownMenu.Item onSelect={onSelect} disabled={disabled } title={title} {...restProps}  >
      {children}
    </DropdownMenu.Item>
  );
};

