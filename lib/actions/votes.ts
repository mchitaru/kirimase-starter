"use server";

import { revalidatePath } from "next/cache";
import {
  createVote,
  deleteVote,
  updateVote,
} from "@/lib/api/votes/mutations";
import {
  VoteId,
  NewVoteParams,
  UpdateVoteParams,
  voteIdSchema,
  insertVoteParams,
  updateVoteParams,
} from "@/lib/db/schema/votes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateVotes = () => revalidatePath("/votes");

export const createVoteAction = async (input: NewVoteParams) => {
  try {
    const payload = insertVoteParams.parse(input);
    await createVote(payload);
    revalidateVotes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateVoteAction = async (input: UpdateVoteParams) => {
  try {
    const payload = updateVoteParams.parse(input);
    await updateVote(payload.id, payload);
    revalidateVotes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteVoteAction = async (input: VoteId) => {
  try {
    const payload = voteIdSchema.parse({ id: input });
    await deleteVote(payload.id);
    revalidateVotes();
  } catch (e) {
    return handleErrors(e);
  }
};