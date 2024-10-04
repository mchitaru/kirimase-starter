import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/votes/useOptimisticVotes";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type Vote, insertVoteParams } from "@/lib/db/schema/votes";
import {
  createVoteAction,
  deleteVoteAction,
  updateVoteAction,
} from "@/lib/actions/votes";
import { type Post, type PostId } from "@/lib/db/schema/posts";

const VoteForm = ({
  posts,
  postId,
  vote,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  vote?: Vote | null;
  posts: Post[];
  postId?: PostId;
  openModal?: (vote?: Vote) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Vote>(insertVoteParams);
  const editing = !!vote?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("votes");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Vote }
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
      toast.success(`Vote ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const voteParsed = await insertVoteParams.safeParseAsync({
      postId,
      ...payload,
    });
    if (!voteParsed.success) {
      setErrors(voteParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = voteParsed.data;
    const pendingVote: Vote = {
      id: vote?.id ?? "",
      authorId: vote?.authorId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingVote,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updateVoteAction({ ...values, id: vote.id })
          : await createVoteAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingVote,
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
            errors?.up ? "text-destructive" : ""
          )}
        >
          Up
        </Label>
        <br />
        <Checkbox
          defaultChecked={vote?.up}
          name={"up"}
          className={cn(errors?.up ? "ring ring-destructive" : "")}
        />
        {errors?.up ? (
          <p className="text-xs text-destructive mt-2">{errors.up[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>

      {postId ? null : (
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.postId ? "text-destructive" : ""
            )}
          >
            Post
          </Label>
          <Select defaultValue={vote?.postId} name="postId">
            <SelectTrigger
              className={cn(errors?.postId ? "ring ring-destructive" : "")}
            >
              <SelectValue placeholder="Select a post" />
            </SelectTrigger>
            <SelectContent>
              {posts?.map((post) => (
                <SelectItem key={post.id} value={post.id.toString()}>
                  {post.id}
                  {/* TODO: Replace with a field from the post model */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.postId ? (
            <p className="text-xs text-destructive mt-2">{errors.postId[0]}</p>
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
              addOptimistic && addOptimistic({ action: "delete", data: vote });
              const error = await deleteVoteAction(vote.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: vote,
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

export default VoteForm;

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
