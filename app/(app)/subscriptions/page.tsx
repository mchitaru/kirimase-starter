import { Suspense } from "react";

import Loading from "@/app/loading";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";
import { getSubscriptions } from "@/lib/api/subscriptions/queries";
import { getTopics } from "@/lib/api/topics/queries";
import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function SubscriptionsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Subscriptions</h1>
        </div>
        <Subscriptions />
      </div>
    </main>
  );
}

const Subscriptions = async () => {
  await checkAuth();

  const { subscriptions } = await getSubscriptions();
  const { topics } = await getTopics();
  return (
    <Suspense fallback={<Loading />}>
      <SubscriptionList subscriptions={subscriptions} topics={topics} />
    </Suspense>
  );
};
