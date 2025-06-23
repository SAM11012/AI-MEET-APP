import db from "@/db";
import { meetings } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";

export const meetingsRouter = createTRPCRouter({
  meetings: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      const data = await db
        .select({ ...getTableColumns(meetings) })
        .from(meetings)
        .where(and(eq(meetings.userId, ctx.auth.user.id)))
        .orderBy(desc(meetings.createdAt), desc(meetings.id));
      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(and(eq(meetings.userId, ctx.auth.user.id)));
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        items: data,
      };
    }),
  getOneMeeting: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({ ...getTableColumns(meetings), meetingCount: sql<number>`5` })
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        );
      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Error In Fetching Agent",
        });
      }
      return existingMeeting;
    }),
  create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input, "the input", ctx.auth.user.id);
      const { name, agentId } = input;
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          name,
          agentId,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdMeeting;
    }),
  updateMeeting: protectedProcedure
    .input(meetingsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input, "the input");

      const [updateAgents] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning();
      if (!updateAgents) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      }
      return updateAgents;
    }),
});
