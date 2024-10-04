import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PostId, postIdSchema } from "@/lib/db/schema/posts";

export const getPosts = async () => {
  const { session } = await getUserAuth();
  const p = await db.post.findMany({
    where: { authorId: session?.user.id },
    include: { topic: true },
  });
  return { posts: p };
};

export const getPostById = async (id: PostId) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const p = await db.post.findFirst({
    where: { id: postId, authorId: session?.user.id },
    include: { topic: true },
  });
  return { post: p };
};

export const getPostByIdWithCommentsAndVotes = async (id: PostId) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const p = await db.post.findFirst({
    where: { id: postId, authorId: session?.user.id },
    include: {
      topic: { include: { posts: true } },
      comments: { include: { post: true } },
      votes: { include: { post: true } },
    },
  });
  if (p === null) return { post: null };
  const { topic, comments, votes, ...post } = p;

  return { post, topic: topic, comments: comments, votes: votes };
};
