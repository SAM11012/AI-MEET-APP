"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueries,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import AgentIdHeaderView from "../components/agent-id-header";
import GeneratedAvatar from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { error } from "console";
import { useRouter } from "next/navigation";
import { UseConfirm } from "../../hooks/use-confirm";
import UpdateAgentsDialog from "../components/update-agents-dialog";
interface Props {
  agentId: string;
}
const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const [updateAgentDialog, setUpdateAgentDialog] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.agents.getOneAgent.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.agents.queryOptions({})
        );
        router.push("/agents");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    })
  );

  const [ConfirmationDialog, confirmRemove] = UseConfirm(
    "Are Your Sure",
    `The following action will remove ${data.meetingCount} associated meetings`
  );
  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeAgent.mutateAsync({ id: agentId });
  };
  return (
    <>
      {" "}
      <ConfirmationDialog />
      <UpdateAgentsDialog
        open={updateAgentDialog}
        onOpenChange={setUpdateAgentDialog}
        initilValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdHeaderView
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialog(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant={"outline"}
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon />
              {data.meetingCount}
              {data.meetingCount === 1 ? " Meeting" : " Meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800"> {data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentIdView;
