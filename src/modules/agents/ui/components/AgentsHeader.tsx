"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import AgentsDialog from "./agents-dialog";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilters } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

const AgentsHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAnyFilteredModified = !!filters.search;
  const onClearFilter = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <AgentsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4 ">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Add Agents
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilters />
          {isAnyFilteredModified && (
            <Button variant='outline' size={'sm'} onClick={onClearFilter}>
              <XCircleIcon />
              Clear{" "}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentsHeader;
