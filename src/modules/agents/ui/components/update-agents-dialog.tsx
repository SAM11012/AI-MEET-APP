import ResponsiveDialog from "@/components/responsive-dialog";
import { ResponsiveCommandDialog } from "@/components/ui/command";
import React from "react";
import AgentsForm from "./agents-form";
import { AgentsGetOne } from "../../types";
interface UpdateAgentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initilValues: AgentsGetOne;
}
const UpdateAgentsDialog = ({
  onOpenChange,
  open,
  initilValues,
}: UpdateAgentsDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initilValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentsDialog;
