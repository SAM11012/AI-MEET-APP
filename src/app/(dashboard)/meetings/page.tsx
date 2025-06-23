import ErrorState from "@/components/error-state";
import Loading from "@/components/loading-state";
import { auth } from "@/lib/auth";
import MeetingHeaderView from "@/modules/meetings/ui/components/meetings-header";
import MeetingView from "@/modules/meetings/ui/views/meeting-view";
import { useTRPC } from "@/trpc/client";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const page = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in')
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.meetings.queryOptions({}));
  return (
    <>
      <MeetingHeaderView />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <Loading
              title="Loading Meetings"
              description="This may take a few seconds"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error in Getting Meetings"
                description="Please try again Later"
              />
            }
          >
            {" "}
            <MeetingView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
