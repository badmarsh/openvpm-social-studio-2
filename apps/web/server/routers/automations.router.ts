import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { crmAutomations } from "@openvpm/db/schema";
import { eq } from "drizzle-orm";

export const automationsRouter = router({
  getAutomations: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.crmAutomations.findMany({
      where: eq(crmAutomations.practiceId, ctx.session.practiceId),
    });
  }),
});
