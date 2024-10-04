import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/posts/useOptimisticPosts";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type Post, insertPostParams } from "@/lib/db/schema/posts";
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/lib/actions/posts";
import { type Topic, type TopicId } from "@/lib/db/schema/topics";

const PostForm = ({
  topics,
  topicId,
  post,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  post?: Post | null;
  topics: Topic[];
  topicId?: TopicId;
  openModal?: (post?: Post) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Post>(insertPostParams);
  const editing = !!post?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("posts");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Post }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Post ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const postParsed = await insertPostParams.safeParseAsync({
      topicId,
      ...payload,
    });
    if (!postParsed.success) {
      setErrors(postParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = postParsed.data;
    const pendingPost: Post = {
      updatedAt: post?.updatedAt ?? new Date(),
      createdAt: post?.createdAt ?? new Date(),
      id: post?.id ?? "",
      authorId: post?.authorId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingPost,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updatePostAction({ ...values, id: post.id })
          : await createPostAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingPost,
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.title ? "text-destructive" : ""
          )}
        >
          Title
        </Label>
        <Input
          type="text"
          name="title"
          className={cn(errors?.title ? "ring ring-destructive" : "")}
          defaultValue={post?.title ?? ""}
        />
        {errors?.title ? (
          <p className="text-xs text-destructive mt-2">{errors.title[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.slug ? "text-destructive" : ""
          )}
        >
          Slug
        </Label>
        <Input
          type="text"
          name="slug"
          className={cn(errors?.slug ? "ring ring-destructive" : "")}
          defaultValue={post?.slug ?? ""}
        />
        {errors?.slug ? (
          <p className="text-xs text-destructive mt-2">{errors.slug[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.content ? "text-destructive" : ""
          )}
        >
          Content
        </Label>
        <Input
          type="text"
          name="content"
          className={cn(errors?.content ? "ring ring-destructive" : "")}
          defaultValue={post?.content ?? ""}
        />
        {errors?.content ? (
          <p className="text-xs text-destructive mt-2">{errors.content[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>

      {topicId ? null : (
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.topicId ? "text-destructive" : ""
            )}
          >
            Topic
          </Label>
          <Select defaultValue={post?.topicId} name="topicId">
            <SelectTrigger
              className={cn(errors?.topicId ? "ring ring-destructive" : "")}
            >
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {topics?.map((topic) => (
                <SelectItem key={topic.id} value={topic.id.toString()}>
                  {topic.id}
                  {/* TODO: Replace with a field from the topic model */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.topicId ? (
            <p className="text-xs text-destructive mt-2">{errors.topicId[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
      )}
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: post });
              const error = await deletePostAction(post.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: post,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default PostForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
