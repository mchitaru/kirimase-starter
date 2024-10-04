"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Topic, CompleteTopic } from "@/lib/db/schema/topics";
import Modal from "@/components/shared/Modal";

import { useOptimisticTopics } from "@/app/(app)/topics/useOptimisticTopics";
import { Button } from "@/components/ui/button";
import TopicForm from "./TopicForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (topic?: Topic) => void;

export default function TopicList({
  topics,
   
}: {
  topics: CompleteTopic[];
   
}) {
  const { optimisticTopics, addOptimisticTopic } = useOptimisticTopics(
    topics,
     
  );
  const [open, setOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const openModal = (topic?: Topic) => {
    setOpen(true);
    topic ? setActiveTopic(topic) : setActiveTopic(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeTopic ? "Edit Topic" : "Create Topic"}
      >
        <TopicForm
          topic={activeTopic}
          addOptimistic={addOptimisticTopic}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticTopics.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticTopics.map((topic) => (
            <Topic
              topic={topic}
              key={topic.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Topic = ({
  topic,
  openModal,
}: {
  topic: CompleteTopic;
  openModal: TOpenModal;
}) => {
  const optimistic = topic.id === "optimistic";
  const deleting = topic.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("topics")
    ? pathname
    : pathname + "/topics/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{topic.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + topic.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No topics
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new topic.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Topics </Button>
      </div>
    </div>
  );
};
