'use client'
import React from "react";
import { useTRPC } from '@/trpc/client'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import Loading from "@/components/loading-state";
import ErrorState from "@/components/error-state";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.agents.queryOptions());
  return <div>{JSON.stringify(data)}</div>;
};

export default AgentsView;
