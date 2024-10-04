import { type Topic } from "@/lib/db/schema/topics";
import {
  type Subscription,
  type CompleteSubscription,
} from "@/lib/db/schema/subscriptions";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Subscription>) => void;

export const useOptimisticSubscriptions = (
  subscriptions: CompleteSubscription[],
  topics: Topic[]
) => {
  const [optimisticSubscriptions, addOptimisticSubscription] = useOptimistic(
    subscriptions,
    (
      currentState: CompleteSubscription[],
      action: OptimisticAction<Subscription>
    ): CompleteSubscription[] => {
      const { data } = action;

      const optimisticTopic = topics.find(
        (topic) => topic.id === data.topicId
      )!;

      const optimisticSubscription = {
        ...data,
        topic: optimisticTopic,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticSubscription]
            : [...currentState, optimisticSubscription];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticSubscription } : item
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item
          );
        default:
          return currentState;
      }
    }
  );

  return { addOptimisticSubscription, optimisticSubscriptions };
};
