import { z } from "zod";
// Mock import of standard OpenVPM protected procedure
import { router, protectedProcedure } from "../trpc";
import { marketingPosts, marketingTemplates } from "@openvpm/db/schema";
import { eq } from "drizzle-orm";

export const marketingRouter = router({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    // Assuming ctx.db is the Drizzle instance and ctx.session has practiceId
    return ctx.db.query.marketingPosts.findMany({
      where: eq(marketingPosts.practiceId, ctx.session.practiceId),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),
  createPost: protectedProcedure
    .input(
      z.object({
        topic: z.string(),
        content: z.string(),
        platform: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [newPost] = await ctx.db.insert(marketingPosts).values({
        practiceId: ctx.session.practiceId,
        authorId: ctx.session.user.id,
        topic: input.topic,
        content: input.content,
        platform: input.platform,
      }).returning();
      return newPost;
    }),
});
