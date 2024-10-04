"use server";

import { revalidatePath } from "next/cache";
import {
  createSubscription,
  deleteSubscription,
  updateSubscription,
} from "@/lib/api/subscriptions/mutations";
import {
  SubscriptionId,
  NewSubscriptionParams,
  UpdateSubscriptionParams,
  subscriptionIdSchema,
  insertSubscriptionParams,
  updateSubscriptionParams,
} from "@/lib/db/schema/subscriptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSubscriptions = () => revalidatePath("/subscriptions");

export const createSubscriptionAction = async (
  input: NewSubscriptionParams
) => {
  try {
    const payload = insertSubscriptionParams.parse(input);
    await createSubscription(payload);
    revalidateSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSubscriptionAction = async (
  input: UpdateSubscriptionParams
) => {
  try {
    const payload = updateSubscriptionParams.parse(input);
    await updateSubscription(payload.id, payload);
    revalidateSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSubscriptionAction = async (input: SubscriptionId) => {
  try {
    const payload = subscriptionIdSchema.parse({ id: input });
    await deleteSubscription(payload.id);
    revalidateSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};
