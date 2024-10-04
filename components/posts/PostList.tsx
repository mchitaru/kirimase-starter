"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Post, CompletePost } from "@/lib/db/schema/posts";
import Modal from "@/components/shared/Modal";
import { type Topic, type TopicId } from "@/lib/db/schema/topics";
import { useOptimisticPosts } from "@/app/(app)/posts/useOptimisticPosts";
import { Button } from "@/components/ui/button";
import PostForm from "./PostForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (post?: Post) => void;

export default function PostList({
  posts,
  topics,
  topicId 
}: {
  posts: CompletePost[];
  topics: Topic[];
  topicId?: TopicId 
}) {
  const { optimisticPosts, addOptimisticPost } = useOptimisticPosts(
    posts,
    topics 
  );
  const [open, setOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const openModal = (post?: Post) => {
    setOpen(true);
    post ? setActivePost(post) : setActivePost(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activePost ? "Edit Post" : "Create Post"}
      >
        <PostForm
          post={activePost}
          addOptimistic={addOptimisticPost}
          openModal={openModal}
          closeModal={closeModal}
          topics={topics}
        topicId={topicId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticPosts.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticPosts.map((post) => (
            <Post
              post={post}
              key={post.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Post = ({
  post,
  openModal,
}: {
  post: CompletePost;
  openModal: TOpenModal;
}) => {
  const optimistic = post.id === "optimistic";
  const deleting = post.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("posts")
    ? pathname
    : pathname + "/posts/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{post.title}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + post.id }>
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
        No posts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new post.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Posts </Button>
      </div>
    </div>
  );
};
