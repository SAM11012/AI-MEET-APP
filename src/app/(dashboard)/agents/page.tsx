import ErrorState from "@/components/error-state";
import Loading from "@/components/loading-state";
import { auth } from "@/lib/auth";
import AgentsHeader from "@/modules/agents/ui/components/AgentsHeader";
import AgentsView from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in')
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.agents.queryOptions());

  return (
    <>
      {" "}
      <AgentsHeader />
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
    </>
  );
};

export default Page;
