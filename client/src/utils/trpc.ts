import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../server/server";

export const trpc = createReactQueryHooks<AppRouter>();
