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
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
export const agentsRouter = createTRPCRouter({
  agents: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      const data = await db
        .select({ ...getTableColumns(agents), meetingCount: sql<number>`5` })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        );
      const totalPages = Math.ceil(total.count / pageSize);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        total: total.count,
        items: data,
        totalPages,
      };
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
    .query(async ({ input,ctx }) => {
      const [existingAgent] = await db
        .select({ ...getTableColumns(agents), meetingCount: sql<number>`5` })
        .from(agents)
        .where(and(eq(agents.id, input.id),eq(agents.userId,ctx.auth.user.id)));
      if(!existingAgent){
        throw new TRPCError({code:'NOT_FOUND',message:'Error In Fetching Agent'})
      }
      return existingAgent;
    }),
});
