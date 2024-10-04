
import { type Topic, type CompleteTopic } from "@/lib/db/schema/topics";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Topic>) => void;

export const useOptimisticTopics = (
  topics: CompleteTopic[],
  
) => {
  const [optimisticTopics, addOptimisticTopic] = useOptimistic(
    topics,
    (
      currentState: CompleteTopic[],
      action: OptimisticAction<Topic>,
    ): CompleteTopic[] => {
      const { data } = action;

      

      const optimisticTopic = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticTopic]
            : [...currentState, optimisticTopic];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticTopic } : item,
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

  return { addOptimisticTopic, optimisticTopics };
};
