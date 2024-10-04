import { Suspense } from "react";

import Loading from "@/app/loading";
import TopicList from "@/components/topics/TopicList";
import { getTopics } from "@/lib/api/topics/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function TopicsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Topics</h1>
        </div>
        <Topics />
      </div>
    </main>
  );
}

const Topics = async () => {
  await checkAuth();

  const { topics } = await getTopics();
  
  return (
    <Suspense fallback={<Loading />}>
      <TopicList topics={topics}  />
    </Suspense>
  );
};
