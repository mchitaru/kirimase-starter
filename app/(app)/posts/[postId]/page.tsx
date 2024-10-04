import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPostByIdWithCommentsAndVotes } from "@/lib/api/posts/queries";
import { getTopics } from "@/lib/api/topics/queries";import OptimisticPost from "@/app/(app)/posts/[postId]/OptimisticPost";
import { checkAuth } from "@/lib/auth/utils";
import CommentList from "@/components/comments/CommentList";
import VoteList from "@/components/votes/VoteList";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {

  return (
    <main className="overflow-auto">
      <Post id={params.postId} />
    </main>
  );
}

const Post = async ({ id }: { id: string }) => {
  await checkAuth();

  const { post, comments, votes } = await getPostByIdWithCommentsAndVotes(id);
  const { topics } = await getTopics();

  if (!post) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="posts" />
        <OptimisticPost post={post} topics={topics} />
      </div>
      <div className="relative mt-8 mx-4">
        <h3 className="text-xl font-medium mb-4">{post.title}&apos;s Comments</h3>
        <CommentList
          posts={[]}
          postId={post.id}
          comments={comments}
        />
      </div>
      <div className="relative mt-8 mx-4">
        <h3 className="text-xl font-medium mb-4">{post.title}&apos;s Votes</h3>
        <VoteList
          posts={[]}
          postId={post.id}
          votes={votes}
        />
      </div>
    </Suspense>
  );
};
