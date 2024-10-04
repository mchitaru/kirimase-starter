import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type VoteId, voteIdSchema } from "@/lib/db/schema/votes";

export const getVotes = async () => {
  const { session } = await getUserAuth();
  const v = await db.vote.findMany({
    where: { authorId: session?.user.id },
    include: { post: true },
  });
  return { votes: v };
};

export const getVoteById = async (id: VoteId) => {
  const { session } = await getUserAuth();
  const { id: voteId } = voteIdSchema.parse({ id });
  const v = await db.vote.findFirst({
    where: { id: voteId, authorId: session?.user.id },
    include: { post: true },
  });
  return { vote: v };
};
