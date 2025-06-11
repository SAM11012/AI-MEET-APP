"use client";
import React from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Loading from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.agents.queryOptions());
  return (
    <div>
      <ResponsiveDialog
        open
        title="Responsive Test"
        description="Responsive Descriptiom"
        onOpenChange={() => {}}
      >
        <Button>Some Action</Button>
      </ResponsiveDialog>
      {JSON.stringify(data)}
    </div>
  );
};

export default AgentsView;
