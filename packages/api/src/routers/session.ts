import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const sessionRouter = createTRPCRouter({
  // Get sessions for a specific course
  getByCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.classSession.findMany({
        where: { courseId: input.courseId },
        include: {
          teacher: { select: { id: true, name: true, avatar: true } },
        },
        orderBy: { scheduledAt: "asc" },
      });
    }),

  // Get my upcoming sessions (as student or teacher)
  // Bug fix: was incorrectly accessing ctx.session.user — context only has ctx.user
  getMyUpcoming: protectedProcedure
    .query(async ({ ctx }) => {
      const now = new Date();
      
      if (ctx.user.role === "TEACHER") {
        return ctx.db.classSession.findMany({
          where: { 
            teacherId: ctx.user.id,
            scheduledAt: { gte: now }
          },
          include: { course: { select: { title: true } } },
          orderBy: { scheduledAt: "asc" },
          take: 10,
        });
      }

      // For students, find sessions belonging to courses they are enrolled in
      const enrollments = await ctx.db.enrollment.findMany({
        where: { studentId: ctx.user.id, status: "ACTIVE" },
        select: { courseId: true }
      });

      const courseIds = enrollments.map(e => e.courseId);

      return ctx.db.classSession.findMany({
        where: {
          courseId: { in: courseIds },
          scheduledAt: { gte: now }
        },
        include: { 
          course: { select: { title: true } },
          teacher: { select: { id: true, name: true } }
        },
        orderBy: { scheduledAt: "asc" },
        take: 10,
      });
    }),

  // Create a new class session (Teachers/Admins only)
  // Bug fix: was incorrectly accessing ctx.session.user
  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        title: z.string().optional(),
        scheduledAt: z.date(),
        duration: z.number().default(60),
        zoomUrl: z.string().url().optional(),
        meetingId: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === "STUDENT") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return ctx.db.classSession.create({
        data: {
          ...input,
          teacherId: ctx.user.id,
        },
      });
    }),
});
