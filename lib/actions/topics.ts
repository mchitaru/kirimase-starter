"use server";

import { revalidatePath } from "next/cache";
import {
  createTopic,
  deleteTopic,
  updateTopic,
} from "@/lib/api/topics/mutations";
import {
  TopicId,
  NewTopicParams,
  UpdateTopicParams,
  topicIdSchema,
  insertTopicParams,
  updateTopicParams,
} from "@/lib/db/schema/topics";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTopics = () => revalidatePath("/topics");

export const createTopicAction = async (input: NewTopicParams) => {
  try {
    const payload = insertTopicParams.parse(input);
    await createTopic(payload);
    revalidateTopics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTopicAction = async (input: UpdateTopicParams) => {
  try {
    const payload = updateTopicParams.parse(input);
    await updateTopic(payload.id, payload);
    revalidateTopics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTopicAction = async (input: TopicId) => {
  try {
    const payload = topicIdSchema.parse({ id: input });
    await deleteTopic(payload.id);
    revalidateTopics();
  } catch (e) {
    return handleErrors(e);
  }
};