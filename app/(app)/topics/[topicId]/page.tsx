import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getTopicByIdWithPostsAndSubscriptions } from "@/lib/api/topics/queries";
import OptimisticTopic from "./OptimisticTopic";
import { checkAuth } from "@/lib/auth/utils";
import PostList from "@/components/posts/PostList";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";

export const revalidate = 0;

export default async function TopicPage({
  params,
}: {
  params: { topicId: string };
}) {
  return (
    <main className="overflow-auto">
      <Topic id={params.topicId} />
    </main>
  );
}

const Topic = async ({ id }: { id: string }) => {
  await checkAuth();

  const { topic, posts, subscriptions } =
    await getTopicByIdWithPostsAndSubscriptions(id);

  if (!topic) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="topics" />
        <OptimisticTopic topic={topic} />
      </div>
      <div className="relative mt-8 mx-4">
        <h3 className="text-xl font-medium mb-4">{topic.name}&apos;s Posts</h3>
        <PostList topics={[]} topicId={topic.id} posts={posts} />
      </div>
      <div className="relative mt-8 mx-4">
        <h3 className="text-xl font-medium mb-4">
          {topic.name}&apos;s Subscriptions
        </h3>
        <SubscriptionList
          topics={[]}
          topicId={topic.id}
          subscriptions={subscriptions}
        />
      </div>
    </Suspense>
  );
};
