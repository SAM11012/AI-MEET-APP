"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.meetings.queryOptions({}));
  return <div>{JSON.stringify(data?.items)}</div>;
};

export default MeetingView;
