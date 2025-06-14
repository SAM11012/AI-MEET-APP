"use client";
import React from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Loading from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/emptyState";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import DataPagination from "../components/data-pagination";
import { useRouter } from "next/navigation";
const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.agents.queryOptions({
      ...filters,
    })
  );
  console.log(data, "the agent data");
  return (
    <div className="flex pb-4 px-4 md:px-8 flex-1 flex-col gap-y-4">
      {data.items.length === 0 ? (
        <EmptyState
          title="Create your first Agent"
          description="Create an agent to join in your meetings. Each agent will follow your instructions"
        />
      ) : (
        <>
          {" "}
          <DataTable
            columns={columns}
            data={data.items}
            onRowClick={(row) => router.push(`/agents/${row.id}`)}
          />
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) =>
              setFilters({
                page,
              })
            }
          />
        </>
      )}
    </div>
  );
};

export default AgentsView;
