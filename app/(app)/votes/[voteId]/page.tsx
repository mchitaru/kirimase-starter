import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getVoteById } from "@/lib/api/votes/queries";
import { getPosts } from "@/lib/api/posts/queries";import OptimisticVote from "@/app/(app)/votes/[voteId]/OptimisticVote";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function VotePage({
  params,
}: {
  params: { voteId: string };
}) {

  return (
    <main className="overflow-auto">
      <Vote id={params.voteId} />
    </main>
  );
}

const Vote = async ({ id }: { id: string }) => {
  await checkAuth();

  const { vote } = await getVoteById(id);
  const { posts } = await getPosts();

  if (!vote) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="votes" />
        <OptimisticVote vote={vote} posts={posts} />
      </div>
    </Suspense>
  );
};
