"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/subscriptions/useOptimisticSubscriptions";
import { type Subscription } from "@/lib/db/schema/subscriptions";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import SubscriptionForm from "@/components/subscriptions/SubscriptionForm";
import { type Topic, type TopicId } from "@/lib/db/schema/topics";

export default function OptimisticSubscription({
  subscription,
  topics,
  topicId,
}: {
  subscription: Subscription;

  topics: Topic[];
  topicId?: TopicId;
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Subscription) => {
    _;
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticSubscription, setOptimisticSubscription] =
    useOptimistic(subscription);
  const updateSubscription: TAddOptimistic = (input) =>
    setOptimisticSubscription({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <SubscriptionForm
          subscription={optimisticSubscription}
          topics={topics}
          topicId={topicId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateSubscription}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">
          {optimisticSubscription.name}
        </h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticSubscription.id === "optimistic" ? "animate-pulse" : ""
        )}
      >
        {JSON.stringify(optimisticSubscription, null, 2)}
      </pre>
    </div>
  );
}
