import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { db } from "@qlms/db";
import { UserRole } from "@qlms/types";

// The context type is inferred from the generic Context function in the App Router API route
export type Context = {
  user?: {
    id: string;
    email?: string | null; // NextAuth email can be null/undefined
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

export const createTRPCRouter = t.router;
export const router = t.router;
export const publicProcedure = t.procedure;

// Reusable middleware to ensure user is logged in.
// Critically, we must forward `db` alongside `user` in the next context.
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
      db: ctx.db, // ← Bug fix: forward db into protected context
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// Role-specific middleware for Super Admin actions
const enforceUserIsSuperAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== "SUPERADMIN") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      user: ctx.user,
      db: ctx.db, // ← Bug fix: forward db into super admin context
    },
  });
});

export const superAdminProcedure = t.procedure.use(enforceUserIsSuperAdmin);
