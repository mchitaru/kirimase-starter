import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/subscriptions/useOptimisticSubscriptions";

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

import {
  type Subscription,
  insertSubscriptionParams,
} from "@/lib/db/schema/subscriptions";
import {
  createSubscriptionAction,
  deleteSubscriptionAction,
  updateSubscriptionAction,
} from "@/lib/actions/subscriptions";
import { type Topic, type TopicId } from "@/lib/db/schema/topics";

const SubscriptionForm = ({
  topics,
  topicId,
  subscription,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  subscription?: Subscription | null;
  topics: Topic[];
  topicId?: TopicId;
  openModal?: (subscription?: Subscription) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Subscription>(insertSubscriptionParams);
  const editing = !!subscription?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("subscriptions");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Subscription }
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
      toast.success(`Subscription ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const subscriptionParsed = await insertSubscriptionParams.safeParseAsync({
      topicId,
      ...payload,
    });
    if (!subscriptionParsed.success) {
      setErrors(subscriptionParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = subscriptionParsed.data;
    const pendingSubscription: Subscription = {
      updatedAt: subscription?.updatedAt ?? new Date(),
      createdAt: subscription?.createdAt ?? new Date(),
      id: subscription?.id ?? "",
      userId: subscription?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingSubscription,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updateSubscriptionAction({ ...values, id: subscription.id })
          : await createSubscriptionAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingSubscription,
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
          defaultValue={subscription?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
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
          <Select defaultValue={subscription?.topicId} name="topicId">
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
              addOptimistic &&
                addOptimistic({ action: "delete", data: subscription });
              const error = await deleteSubscriptionAction(subscription.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: subscription,
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

export default SubscriptionForm;

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
