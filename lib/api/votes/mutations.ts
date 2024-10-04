import { db } from "@/lib/db/index";
import {
  VoteId,
  NewVoteParams,
  UpdateVoteParams,
  updateVoteSchema,
  insertVoteSchema,
  voteIdSchema,
} from "@/lib/db/schema/votes";
import { getUserAuth } from "@/lib/auth/utils";

export const createVote = async (vote: NewVoteParams) => {
  const { session } = await getUserAuth();
  const newVote = insertVoteSchema.parse({
    ...vote,
    authorId: session?.user.id,
  });
  try {
    const v = await db.vote.create({ data: newVote });
    return { vote: v };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateVote = async (id: VoteId, vote: UpdateVoteParams) => {
  const { session } = await getUserAuth();
  const { id: voteId } = voteIdSchema.parse({ id });
  const newVote = updateVoteSchema.parse({
    ...vote,
    authorId: session?.user.id,
  });
  try {
    const v = await db.vote.update({
      where: { id: voteId, authorId: session?.user.id },
      data: newVote,
    });
    return { vote: v };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteVote = async (id: VoteId) => {
  const { session } = await getUserAuth();
  const { id: voteId } = voteIdSchema.parse({ id });
  try {
    const v = await db.vote.delete({
      where: { id: voteId, authorId: session?.user.id },
    });
    return { vote: v };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
