import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createContext } from "@qlms/api";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // The node-compatible auth that holds the JWT parsing

const handler = auth(async (req) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req as NextRequest,
    router: appRouter,
    createContext: () => createContext({ user: req.auth?.user }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
}) as (req: Request) => Promise<Response>;

export { handler as GET, handler as POST };
