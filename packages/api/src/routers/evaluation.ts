import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { EvaluationType, ArabicGrade } from "@qlms/types";

export const evaluationRouter = createTRPCRouter({
  // Create an evaluation for a student
  // Bug fix: replaced ctx.session.user with ctx.user
  // Bug fix: Role, EvaluationType, ArabicGrade are string union types — not enums — use z.enum() with literal values
  create: protectedProcedure
    .input(
      z.object({
        studentId: z.string(),
        courseId: z.string(),
        type: z.enum(["READING", "TARTEEL", "HIFZ"] as const),
        scores: z.record(z.number()),
        overallGrade: z.enum(["MUMTAZ", "JAYYID_JIDDAN", "JAYYID", "MAQBOOL"] as const),
        teacherComment: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Only Teachers and Admins can create evaluations
      if (ctx.user.role === "STUDENT") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only teachers can evaluate." });
      }

      return ctx.db.evaluation.create({
        data: {
          ...input,
          teacherId: ctx.user.id,
        },
      });
    }),

  // Get a student's evaluations
  // Bug fix: replaced ctx.session.user with ctx.user
  getByStudent: protectedProcedure
    .input(z.object({ studentId: z.string() }))
    .query(async ({ ctx, input }) => {
      // A student can only see their own evaluations, unless requester is Teacher/Admin
      if (
        ctx.user.role === "STUDENT" &&
        ctx.user.id !== input.studentId
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
