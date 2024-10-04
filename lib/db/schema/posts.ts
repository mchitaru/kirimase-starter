import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getPosts } from "@/lib/api/posts/queries";
import { PostSchema } from "@/prisma/zod";

// Schema for posts - used to validate API requests
const baseSchema = PostSchema.omit(timestamps);

export const insertPostSchema = baseSchema.omit({ id: true });
export const insertPostParams = baseSchema
  .extend({
    topicId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    authorId: true,
  });

export const updatePostSchema = baseSchema;
export const updatePostParams = updatePostSchema
  .extend({
    topicId: z.coerce.string().min(1),
  })
  .omit({
    authorId: true,
  });
export const postIdSchema = baseSchema.pick({ id: true });

// Types for posts - used to type API request params and within Components
export type Post = z.infer<typeof PostSchema>;
export type NewPost = z.infer<typeof insertPostSchema>;
export type NewPostParams = z.infer<typeof insertPostParams>;
export type UpdatePostParams = z.infer<typeof updatePostParams>;
export type PostId = z.infer<typeof postIdSchema>["id"];

// this type infers the return from getPosts() - meaning it will include any joins
export type CompletePost = Awaited<
  ReturnType<typeof getPosts>
>["posts"][number];
