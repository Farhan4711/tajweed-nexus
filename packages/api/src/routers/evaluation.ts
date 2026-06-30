import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Role, EvaluationType, ArabicGrade } from "@qlms/types";

export const evaluationRouter = createTRPCRouter({
  // Create an evaluation for a student
  create: protectedProcedure
    .input(
      z.object({
        studentId: z.string(),
        courseId: z.string(),
        type: z.nativeEnum(EvaluationType),
        scores: z.record(z.number()), // E.g., { makharij: 90, fluency: 85 }
        overallGrade: z.nativeEnum(ArabicGrade),
        teacherComment: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Only Teachers and Admins can create evaluations
      if (ctx.session.user.role === Role.STUDENT) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only teachers can evaluate." });
      }

      return ctx.db.evaluation.create({
        data: {
          ...input,
          teacherId: ctx.session.user.id,
        },
      });
    }),

  // Get a student's evaluations
  getByStudent: protectedProcedure
    .input(z.object({ studentId: z.string() }))
    .query(async ({ ctx, input }) => {
      // A student can only see their own evaluations, unless requester is Teacher/Admin
      if (
        ctx.session.user.role === Role.STUDENT &&
        ctx.session.user.id !== input.studentId
      ) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return ctx.db.evaluation.findMany({
        where: { studentId: input.studentId },
        include: {
          teacher: { select: { name: true } },
          course: { select: { title: true } },
        },
        orderBy: { date: "desc" },
      });
    }),
});
