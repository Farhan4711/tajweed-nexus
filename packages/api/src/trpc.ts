import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { db } from "@qlms/db";
import { UserRole } from "@qlms/types";

// The context type is inferred from the generic Context function in the App Router API route
export type Context = {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  } | null;
  db: typeof db;
};

export const createContext = async (opts: { user?: Context['user'] }): Promise<Context> => {
  return {
    user: opts.user,
    db,
  };
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Reusable middleware to ensure user is logged in
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// Example of a role-specific middleware
const enforceUserIsSuperAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== "SUPERADMIN") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const superAdminProcedure = t.procedure.use(enforceUserIsSuperAdmin);
