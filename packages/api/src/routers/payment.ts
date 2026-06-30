import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const paymentRouter = createTRPCRouter({
  // Create a Stripe Checkout Session placeholder
  createCheckoutSession: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.db.course.findUnique({
        where: { id: input.courseId }
      });

      if (!course) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }

      // [PLACEHOLDER] Stripe Integration
      // In a real app, you would initialize Stripe here:
      // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      // const session = await stripe.checkout.sessions.create({...});
      // return { url: session.url };

      // Mock return for now
      return { 
        url: `/checkout/success?courseId=${input.courseId}`,
        mockSessionId: `cs_test_${Date.now()}` 
      };
    }),

  // Get user's payment history
  getMyHistory: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.payment.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" }
      });
    }),
});
