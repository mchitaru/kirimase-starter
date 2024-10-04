"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  type Subscription,
  CompleteSubscription,
} from "@/lib/db/schema/subscriptions";
import Modal from "@/components/shared/Modal";
import { type Topic, type TopicId } from "@/lib/db/schema/topics";
import { useOptimisticSubscriptions } from "@/app/(app)/subscriptions/useOptimisticSubscriptions";
import { Button } from "@/components/ui/button";
import SubscriptionForm from "./SubscriptionForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (subscription?: Subscription) => void;

export default function SubscriptionList({
  subscriptions,
  topics,
  topicId,
}: {
  subscriptions: CompleteSubscription[];
  topics: Topic[];
  topicId?: TopicId;
}) {
  const { optimisticSubscriptions, addOptimisticSubscription } =
    useOptimisticSubscriptions(subscriptions, topics);
  const [open, setOpen] = useState(false);
  const [activeSubscription, setActiveSubscription] =
    useState<Subscription | null>(null);
  const openModal = (subscription?: Subscription) => {
    setOpen(true);
    subscription
      ? setActiveSubscription(subscription)
      : setActiveSubscription(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeSubscription ? "Edit Subscription" : "Create Subscription"}
      >
        <SubscriptionForm
          subscription={activeSubscription}
          addOptimistic={addOptimisticSubscription}
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
      {optimisticSubscriptions.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticSubscriptions.map((subscription) => (
            <Subscription
              subscription={subscription}
              key={subscription.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Subscription = ({
  subscription,
  openModal,
}: {
  subscription: CompleteSubscription;
  openModal: TOpenModal;
}) => {
  const optimistic = subscription.id === "optimistic";
  const deleting = subscription.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("subscriptions")
    ? pathname
    : pathname + "/subscriptions/";

  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
    >
      <div className="w-full">
        <div>{subscription.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + subscription.id}>Edit</Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No subscriptions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new subscription.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Subscriptions{" "}
        </Button>
      </div>
    </div>
  );
};
