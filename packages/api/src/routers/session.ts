import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Role } from "@qlms/types";

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
  getMyUpcoming: protectedProcedure
    .query(async ({ ctx }) => {
      const now = new Date();
      
      if (ctx.session.user.role === Role.TEACHER) {
        return ctx.db.classSession.findMany({
          where: { 
            teacherId: ctx.session.user.id,
            scheduledAt: { gte: now }
          },
          include: { course: { select: { title: true } } },
          orderBy: { scheduledAt: "asc" },
          take: 10,
        });
      }

      // For students, find sessions belonging to courses they are enrolled in
      const enrollments = await ctx.db.enrollment.findMany({
        where: { studentId: ctx.session.user.id, status: "ACTIVE" },
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
      if (ctx.session.user.role === Role.STUDENT) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return ctx.db.classSession.create({
        data: {
          ...input,
          teacherId: ctx.session.user.id,
        },
      });
    }),
});
