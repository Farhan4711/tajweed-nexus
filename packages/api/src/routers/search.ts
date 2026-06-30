import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const searchRouter = createTRPCRouter({
  // Global search across Courses, Teachers, and Blog Posts
  global: publicProcedure
    .input(z.object({ query: z.string().min(2) }))
    .query(async ({ ctx, input }) => {
      const q = input.query.toLowerCase();

      // Search Courses
      const courses = await ctx.db.course.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 3,
        select: { id: true, title: true, slug: true, type: true },
      });

      // Search Teachers (joining with User table for name)
      const teachers = await ctx.db.teacherProfile.findMany({
        where: {
          isApproved: true,
          OR: [
            { user: { name: { contains: q, mode: "insensitive" } } },
            { bio: { contains: q, mode: "insensitive" } },
            { specialisations: { hasSome: [q] } }, // Rough match on arrays
          ],
        },
        take: 3,
        select: { id: true, user: { select: { name: true } } },
      });

      // Search Blog Posts
      const blogs = await ctx.db.blogPost.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 3,
        select: { id: true, title: true, slug: true },
      });

      return {
        courses,
        teachers: teachers.map(t => ({ id: t.id, name: t.user.name })),
        blogs,
      };
    }),
});
