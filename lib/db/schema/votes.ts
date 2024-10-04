import { z } from "zod";
import { getVotes } from "@/lib/api/votes/queries";
import { VoteSchema } from "@/prisma/zod";

// Schema for votes - used to validate API requests
const baseSchema = VoteSchema;

export const insertVoteSchema = baseSchema.omit({ id: true });
export const insertVoteParams = baseSchema
  .extend({
    up: z.coerce.boolean(),
    postId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    authorId: true,
  });

export const updateVoteSchema = baseSchema;
export const updateVoteParams = updateVoteSchema
  .extend({
    up: z.coerce.boolean(),
    postId: z.coerce.string().min(1),
  })
  .omit({
    authorId: true,
  });
export const voteIdSchema = baseSchema.pick({ id: true });

// Types for votes - used to type API request params and within Components
export type Vote = z.infer<typeof VoteSchema>;
export type NewVote = z.infer<typeof insertVoteSchema>;
export type NewVoteParams = z.infer<typeof insertVoteParams>;
export type UpdateVoteParams = z.infer<typeof updateVoteParams>;
export type VoteId = z.infer<typeof voteIdSchema>["id"];

// this type infers the return from getVotes() - meaning it will include any joins
export type CompleteVote = Awaited<
  ReturnType<typeof getVotes>
>["votes"][number];
