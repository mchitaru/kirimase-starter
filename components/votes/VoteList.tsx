"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Vote, CompleteVote } from "@/lib/db/schema/votes";
import Modal from "@/components/shared/Modal";
import { type Post, type PostId } from "@/lib/db/schema/posts";
import { useOptimisticVotes } from "@/app/(app)/votes/useOptimisticVotes";
import { Button } from "@/components/ui/button";
import VoteForm from "./VoteForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (vote?: Vote) => void;

export default function VoteList({
  votes,
  posts,
  postId,
}: {
  votes: CompleteVote[];
  posts: Post[];
  postId?: PostId;
}) {
  const { optimisticVotes, addOptimisticVote } = useOptimisticVotes(
    votes,
    posts
  );
  const [open, setOpen] = useState(false);
  const [activeVote, setActiveVote] = useState<Vote | null>(null);
  const openModal = (vote?: Vote) => {
    setOpen(true);
    vote ? setActiveVote(vote) : setActiveVote(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeVote ? "Edit Vote" : "Create Vote"}
      >
        <VoteForm
          vote={activeVote}
          addOptimistic={addOptimisticVote}
          openModal={openModal}
          closeModal={closeModal}
          posts={posts}
          postId={postId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticVotes.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticVotes.map((vote) => (
            <Vote vote={vote} key={vote.id} openModal={openModal} />
          ))}
        </ul>
      )}
    </div>
  );
}

const Vote = ({
  vote,
  openModal,
}: {
  vote: CompleteVote;
  openModal: TOpenModal;
}) => {
  const optimistic = vote.id === "optimistic";
  const deleting = vote.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("votes") ? pathname : pathname + "/votes/";

  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
    >
      <div className="w-full">
        <div>{vote.up}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + vote.id}>Edit</Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No votes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new vote.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Votes{" "}
        </Button>
      </div>
    </div>
  );
};
