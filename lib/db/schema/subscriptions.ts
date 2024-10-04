import { SubscriptionSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getSubscriptions } from "@/lib/api/subscriptions/queries";

// Schema for subscriptions - used to validate API requests
const baseSchema = SubscriptionSchema.omit(timestamps);

export const insertSubscriptionSchema = baseSchema.omit({ id: true });
export const insertSubscriptionParams = baseSchema
  .extend({
    topicId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSubscriptionSchema = baseSchema;
export const updateSubscriptionParams = updateSubscriptionSchema
  .extend({
    topicId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const subscriptionIdSchema = baseSchema.pick({ id: true });

// Types for subscriptions - used to type API request params and within Components
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type NewSubscription = z.infer<typeof insertSubscriptionSchema>;
export type NewSubscriptionParams = z.infer<typeof insertSubscriptionParams>;
export type UpdateSubscriptionParams = z.infer<typeof updateSubscriptionParams>;
export type SubscriptionId = z.infer<typeof subscriptionIdSchema>["id"];

// this type infers the return from getSubscriptions() - meaning it will include any joins
export type CompleteSubscription = Awaited<
  ReturnType<typeof getSubscriptions>
>["subscriptions"][number];
