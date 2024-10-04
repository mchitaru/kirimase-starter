import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getSubscriptionById } from "@/lib/api/subscriptions/queries";
import { getTopics } from "@/lib/api/topics/queries";
import OptimisticSubscription from "@/app/(app)/subscriptions/[subscriptionId]/OptimisticSubscription";
import { checkAuth } from "@/lib/auth/utils";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";

export const revalidate = 0;

export default async function SubscriptionPage({
  params,
}: {
  params: { subscriptionId: string };
}) {
  return (
    <main className="overflow-auto">
      <Subscription id={params.subscriptionId} />
    </main>
  );
}

const Subscription = async ({ id }: { id: string }) => {
  await checkAuth();

  const { subscription } = await getSubscriptionById(id);
  const { topics } = await getTopics();

  if (!subscription) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="subscriptions" />
        <OptimisticSubscription
          subscription={subscription}
          topics={topics}
          topicId={subscription.topicId}
        />
      </div>
    </Suspense>
  );
};
