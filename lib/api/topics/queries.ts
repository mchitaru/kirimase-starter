import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type TopicId, topicIdSchema } from "@/lib/db/schema/topics";

export const getTopics = async () => {
  const { session } = await getUserAuth();
  const t = await db.topic.findMany({ where: { authorId: session?.user.id } });
  return { topics: t };
};

export const getTopicById = async (id: TopicId) => {
  const { session } = await getUserAuth();
  const { id: topicId } = topicIdSchema.parse({ id });
  const t = await db.topic.findFirst({
    where: { id: topicId, authorId: session?.user.id },
  });
  return { topic: t };
};

export const getTopicByIdWithPostsAndSubscriptions = async (id: TopicId) => {
  const { session } = await getUserAuth();
  const { id: topicId } = topicIdSchema.parse({ id });
  const t = await db.topic.findFirst({
    where: { id: topicId, authorId: session?.user.id },
    include: {
      posts: { include: { topic: true } },
      subscriptions: { include: { topic: true } },
    },
  });
  if (t === null) return { topic: null };
  const { posts, subscriptions, ...topic } = t;

  return { topic, posts: posts, subscriptions: subscriptions };
};
