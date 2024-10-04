"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/posts/useOptimisticPosts";
import { type Post } from "@/lib/db/schema/posts";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import PostForm from "@/components/posts/PostForm";
import { type Topic, type TopicId } from "@/lib/db/schema/topics";

export default function OptimisticPost({
  post,
  topics,
  topicId,
}: {
  post: Post;

  topics: Topic[];
  topicId?: TopicId;
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Post) => {
    _;
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticPost, setOptimisticPost] = useOptimistic(post);
  const updatePost: TAddOptimistic = (input) =>
    setOptimisticPost({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <PostForm
          post={optimisticPost}
          topics={topics}
          topicId={topicId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updatePost}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticPost.title}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticPost.id === "optimistic" ? "animate-pulse" : ""
        )}
      >
        {JSON.stringify(optimisticPost, null, 2)}
      </pre>
    </div>
  );
}
