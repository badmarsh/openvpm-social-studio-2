import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { canvasDocuments } from "@openvpm/db/schema";
import { eq } from "drizzle-orm";

export const canvasRouter = router({
  getDocuments: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.canvasDocuments.findMany({
      where: eq(canvasDocuments.practiceId, ctx.session.practiceId),
    });
  }),
});
