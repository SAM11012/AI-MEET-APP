import ErrorState from "@/components/error-state";
import Loading from "@/components/loading-state";
import AgentsView from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.agents.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {" "}
      <Suspense
        fallback={
          <Loading
            description="This may take few seconds"
            title="Loading Agents"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Failed Loading Agents"
              description="Please try Again After some time"
            />
          }
        >
          {" "}
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
