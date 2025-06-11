import React, { Dispatch, SetStateAction } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ResponsiveCommandDialog,
} from "@/components/ui/command";
interface DashbaoardSearchProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashbaoardSearch = ({ open, setOpen }: DashbaoardSearchProps) => {
  return (
    <ResponsiveCommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </ResponsiveCommandDialog>
  );
};

export default DashbaoardSearch;
