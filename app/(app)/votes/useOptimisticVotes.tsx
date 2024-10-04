import { type Post } from "@/lib/db/schema/posts";
import { type Vote, type CompleteVote } from "@/lib/db/schema/votes";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Vote>) => void;

export const useOptimisticVotes = (
  votes: CompleteVote[],
  posts: Post[]
) => {
  const [optimisticVotes, addOptimisticVote] = useOptimistic(
    votes,
    (
      currentState: CompleteVote[],
      action: OptimisticAction<Vote>,
    ): CompleteVote[] => {
      const { data } = action;

      const optimisticPost = posts.find(
        (post) => post.id === data.postId,
      )!;

      const optimisticVote = {
        ...data,
        post: optimisticPost,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticVote]
            : [...currentState, optimisticVote];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticVote } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticVote, optimisticVotes };
};
