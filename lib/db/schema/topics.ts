import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getTopics } from "@/lib/api/topics/queries";
import { TopicSchema } from "@/prisma/zod";

// Schema for topics - used to validate API requests
const baseSchema = TopicSchema.omit(timestamps);

export const insertTopicSchema = baseSchema.omit({ id: true });
export const insertTopicParams = baseSchema.extend({}).omit({
  id: true,
  authorId: true,
});

export const updateTopicSchema = baseSchema;
export const updateTopicParams = updateTopicSchema.extend({}).omit({
  authorId: true,
});
export const topicIdSchema = baseSchema.pick({ id: true });

// Types for topics - used to type API request params and within Components
export type Topic = z.infer<typeof TopicSchema>;
export type NewTopic = z.infer<typeof insertTopicSchema>;
export type NewTopicParams = z.infer<typeof insertTopicParams>;
export type UpdateTopicParams = z.infer<typeof updateTopicParams>;
export type TopicId = z.infer<typeof topicIdSchema>["id"];

// this type infers the return from getTopics() - meaning it will include any joins
export type CompleteTopic = Awaited<
  ReturnType<typeof getTopics>
>["topics"][number];
