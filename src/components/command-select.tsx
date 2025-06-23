import React, { ReactNode, useState } from "react";
import { ChevronsUpDownIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  ResponsiveCommandDialog,
} from "./ui/command";
interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}
const CommandSelect = ({
  onSelect,
  options,
  value,
  className,
  isSearchable,
  onSearch,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value == value);
  return (
    <>
      <Button
      onClick={()=>setOpen(true)}
        type="button"
        variant={"outline"}
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon/>
      </Button>
      <ResponsiveCommandDialog open={open} onOpenChange={setOpen} shouldFilter={!onSearch}>
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No Options Empty
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </ResponsiveCommandDialog>
    </>
  );
};

export default CommandSelect;
