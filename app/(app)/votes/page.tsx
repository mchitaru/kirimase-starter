import { Suspense } from "react";

import Loading from "@/app/loading";
import VoteList from "@/components/votes/VoteList";
import { getVotes } from "@/lib/api/votes/queries";
import { getPosts } from "@/lib/api/posts/queries";
import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function VotesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Votes</h1>
        </div>
        <Votes />
      </div>
    </main>
  );
}

const Votes = async () => {
  await checkAuth();

  const { votes } = await getVotes();
  const { posts } = await getPosts();
  return (
    <Suspense fallback={<Loading />}>
      <VoteList votes={votes} posts={posts} />
    </Suspense>
  );
};
