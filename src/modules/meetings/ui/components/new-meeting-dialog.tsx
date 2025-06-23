import ResponsiveDialog from "@/components/responsive-dialog";
import { ResponsiveCommandDialog } from "@/components/ui/command";
import React from "react";
import MeetingForm from "./meetings-form";
import { useRouter } from "next/navigation";

interface NewAgentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const MeetingDialog = ({ onOpenChange, open }: NewAgentsDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </ResponsiveDialog>
  );
};

export default MeetingDialog;
