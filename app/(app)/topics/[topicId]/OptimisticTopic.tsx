"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/topics/useOptimisticTopics";
import { type Topic } from "@/lib/db/schema/topics";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import TopicForm from "@/components/topics/TopicForm";

export default function OptimisticTopic({ topic }: { topic: Topic }) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Topic) => {
    _;
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticTopic, setOptimisticTopic] = useOptimistic(topic);
  const updateTopic: TAddOptimistic = (input) =>
    setOptimisticTopic({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <TopicForm
          topic={optimisticTopic}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateTopic}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticTopic.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticTopic.id === "optimistic" ? "animate-pulse" : ""
        )}
      >
        {JSON.stringify(optimisticTopic, null, 2)}
      </pre>
    </div>
  );
}
