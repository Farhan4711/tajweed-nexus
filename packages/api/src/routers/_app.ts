import { createTRPCRouter } from "../trpc";
import { userRouter } from "./user";
import { sessionRouter } from "./session";
import { paymentRouter } from "./payment";
import { evaluationRouter } from "./evaluation";
import { searchRouter } from "./search";

export const appRouter = createTRPCRouter({
  user: userRouter,
  session: sessionRouter,
  payment: paymentRouter,
  evaluation: evaluationRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;
