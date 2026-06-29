import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@qlms/api";

export const trpc = createTRPCReact<AppRouter>();
