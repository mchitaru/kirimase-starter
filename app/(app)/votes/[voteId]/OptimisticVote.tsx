"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/votes/useOptimisticVotes";
import { type Vote } from "@/lib/db/schema/votes";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import VoteForm from "@/components/votes/VoteForm";
import { type Post, type PostId } from "@/lib/db/schema/posts";

export default function OptimisticVote({
  vote,
  posts,
  postId,
}: {
  vote: Vote;

  posts: Post[];
  postId?: PostId;
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Vote) => {
    _;
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticVote, setOptimisticVote] = useOptimistic(vote);
  const updateVote: TAddOptimistic = (input) =>
    setOptimisticVote({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <VoteForm
          vote={optimisticVote}
          posts={posts}
          postId={postId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateVote}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticVote.up}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticVote.id === "optimistic" ? "animate-pulse" : ""
        )}
      >
        {JSON.stringify(optimisticVote, null, 2)}
      </pre>
    </div>
  );
}
