import { db } from "@/lib/db/index";
import {
  CommentId,
  NewCommentParams,
  UpdateCommentParams,
  updateCommentSchema,
  insertCommentSchema,
  commentIdSchema,
} from "@/lib/db/schema/comments";
import { getUserAuth } from "@/lib/auth/utils";

export const createComment = async (comment: NewCommentParams) => {
  const { session } = await getUserAuth();
  const newComment = insertCommentSchema.parse({
    ...comment,
    authorId: session?.user.id,
  });
  try {
    const c = await db.comment.create({ data: newComment });
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateComment = async (
  id: CommentId,
  comment: UpdateCommentParams
) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  const newComment = updateCommentSchema.parse({
    ...comment,
    authorId: session?.user.id,
  });
  try {
    const c = await db.comment.update({
      where: { id: commentId, authorId: session?.user.id },
      data: newComment,
    });
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteComment = async (id: CommentId) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  try {
    const c = await db.comment.delete({
      where: { id: commentId, authorId: session?.user.id },
    });
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
