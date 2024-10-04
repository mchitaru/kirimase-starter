import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/topics/useOptimisticTopics";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import { type Topic, insertTopicParams } from "@/lib/db/schema/topics";
import {
  createTopicAction,
  deleteTopicAction,
  updateTopicAction,
} from "@/lib/actions/topics";

const TopicForm = ({
  topic,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  topic?: Topic | null;

  openModal?: (topic?: Topic) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Topic>(insertTopicParams);
  const editing = !!topic?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("topics");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Topic }
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
      toast.success(`Topic ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const topicParsed = await insertTopicParams.safeParseAsync({ ...payload });
    if (!topicParsed.success) {
      setErrors(topicParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = topicParsed.data;
    const pendingTopic: Topic = {
      updatedAt: topic?.updatedAt ?? new Date(),
      createdAt: topic?.createdAt ?? new Date(),
      id: topic?.id ?? "",
      authorId: topic?.authorId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingTopic,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updateTopicAction({ ...values, id: topic.id })
          : await createTopicAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingTopic,
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
            errors?.name ? "text-destructive" : ""
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={topic?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
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
          defaultValue={topic?.slug ?? ""}
        />
        {errors?.slug ? (
          <p className="text-xs text-destructive mt-2">{errors.slug[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
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
              addOptimistic && addOptimistic({ action: "delete", data: topic });
              const error = await deleteTopicAction(topic.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: topic,
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

export default TopicForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: boolean;
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
