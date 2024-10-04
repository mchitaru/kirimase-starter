import { db } from "@/lib/db/index";
import {
  TopicId,
  NewTopicParams,
  UpdateTopicParams,
  updateTopicSchema,
  insertTopicSchema,
  topicIdSchema,
} from "@/lib/db/schema/topics";
import { getUserAuth } from "@/lib/auth/utils";

export const createTopic = async (topic: NewTopicParams) => {
  const { session } = await getUserAuth();
  const newTopic = insertTopicSchema.parse({
    ...topic,
    authorId: session?.user.id,
  });
  try {
    const t = await db.topic.create({ data: newTopic });
    return { topic: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTopic = async (id: TopicId, topic: UpdateTopicParams) => {
  const { session } = await getUserAuth();
  const { id: topicId } = topicIdSchema.parse({ id });
  const newTopic = updateTopicSchema.parse({
    ...topic,
    authorId: session?.user.id,
  });
  try {
    const t = await db.topic.update({
      where: { id: topicId, authorId: session?.user.id },
      data: newTopic,
    });
    return { topic: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTopic = async (id: TopicId) => {
  const { session } = await getUserAuth();
  const { id: topicId } = topicIdSchema.parse({ id });
  try {
    const t = await db.topic.delete({
      where: { id: topicId, authorId: session?.user.id },
    });
    return { topic: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
