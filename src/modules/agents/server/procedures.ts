import db from "@/db";
import { agents } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";
export const agentsRouter = createTRPCRouter({
  agents: protectedProcedure.query(async () => {
    const data = await db
      .select({ ...getTableColumns(agents), meetingCount: sql<number>`5` })
      .from(agents);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgents] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgents;
    }),
  getOneAgent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),
});
