import ResponsiveDialog from "@/components/responsive-dialog";
import { ResponsiveCommandDialog } from "@/components/ui/command";
import React from "react";
import AgentsForm from "./agents-form";
interface NewAgentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const AgentsDialog = ({ onOpenChange, open }: NewAgentsDialogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new Agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm onSuccess={()=>onOpenChange(false)} onCancel={()=>onOpenChange(false)}/>
    </ResponsiveDialog>
  );
};

export default AgentsDialog;
