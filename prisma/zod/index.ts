import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','hashedPassword','name']);

export const SessionScalarFieldEnumSchema = z.enum(['id','userId','expiresAt']);

export const TopicScalarFieldEnumSchema = z.enum(['id','name','slug','authorId','createdAt','updatedAt']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','slug','content','topicId','authorId','createdAt','updatedAt']);

export const CommentScalarFieldEnumSchema = z.enum(['id','text','postId','authorId','createdAt','updatedAt']);

export const VoteScalarFieldEnumSchema = z.enum(['id','up','postId','authorId']);

export const SubscriptionScalarFieldEnumSchema = z.enum(['id','name','topicId','userId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// TOPIC SCHEMA
/////////////////////////////////////////

export const TopicSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  slug: z.string(),
  authorId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Topic = z.infer<typeof TopicSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  topicId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  text: z.string(),
  postId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// VOTE SCHEMA
/////////////////////////////////////////

export const VoteSchema = z.object({
  id: z.string().cuid(),
  up: z.boolean(),
  postId: z.string(),
  authorId: z.string(),
})

export type Vote = z.infer<typeof VoteSchema>

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  topicId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Subscription = z.infer<typeof SubscriptionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  topics: z.union([z.boolean(),z.lazy(() => TopicFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => SubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
  topics: z.boolean().optional(),
  posts: z.boolean().optional(),
  comments: z.boolean().optional(),
  votes: z.boolean().optional(),
  subscriptions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  hashedPassword: z.boolean().optional(),
  name: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  topics: z.union([z.boolean(),z.lazy(() => TopicFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => SubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TOPIC
//------------------------------------------------------

export const TopicIncludeSchema: z.ZodType<Prisma.TopicInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => SubscriptionFindManyArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TopicCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TopicArgsSchema: z.ZodType<Prisma.TopicDefaultArgs> = z.object({
  select: z.lazy(() => TopicSelectSchema).optional(),
  include: z.lazy(() => TopicIncludeSchema).optional(),
}).strict();

export const TopicCountOutputTypeArgsSchema: z.ZodType<Prisma.TopicCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TopicCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TopicCountOutputTypeSelectSchema: z.ZodType<Prisma.TopicCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
  subscriptions: z.boolean().optional(),
}).strict();

export const TopicSelectSchema: z.ZodType<Prisma.TopicSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  authorId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  subscriptions: z.union([z.boolean(),z.lazy(() => SubscriptionFindManyArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TopicCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  topic: z.union([z.boolean(),z.lazy(() => TopicArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
  votes: z.boolean().optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  slug: z.boolean().optional(),
  content: z.boolean().optional(),
  topicId: z.boolean().optional(),
  authorId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  topic: z.union([z.boolean(),z.lazy(() => TopicArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  postId: z.boolean().optional(),
  authorId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VOTE
//------------------------------------------------------

export const VoteIncludeSchema: z.ZodType<Prisma.VoteInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const VoteArgsSchema: z.ZodType<Prisma.VoteDefaultArgs> = z.object({
  select: z.lazy(() => VoteSelectSchema).optional(),
  include: z.lazy(() => VoteIncludeSchema).optional(),
}).strict();

export const VoteSelectSchema: z.ZodType<Prisma.VoteSelect> = z.object({
  id: z.boolean().optional(),
  up: z.boolean().optional(),
  postId: z.boolean().optional(),
  authorId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SUBSCRIPTION
//------------------------------------------------------

export const SubscriptionIncludeSchema: z.ZodType<Prisma.SubscriptionInclude> = z.object({
  topic: z.union([z.boolean(),z.lazy(() => TopicArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SubscriptionArgsSchema: z.ZodType<Prisma.SubscriptionDefaultArgs> = z.object({
  select: z.lazy(() => SubscriptionSelectSchema).optional(),
  include: z.lazy(() => SubscriptionIncludeSchema).optional(),
}).strict();

export const SubscriptionSelectSchema: z.ZodType<Prisma.SubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  topicId: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  topic: z.union([z.boolean(),z.lazy(() => TopicArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  topics: z.lazy(() => TopicListRelationFilterSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  topics: z.lazy(() => TopicOrderByRelationAggregateInputSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  votes: z.lazy(() => VoteOrderByRelationAggregateInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  topics: z.lazy(() => TopicListRelationFilterSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TopicWhereInputSchema: z.ZodType<Prisma.TopicWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TopicWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionListRelationFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TopicOrderByWithRelationInputSchema: z.ZodType<Prisma.TopicOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionOrderByRelationAggregateInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TopicWhereUniqueInputSchema: z.ZodType<Prisma.TopicWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TopicWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionListRelationFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TopicOrderByWithAggregationInputSchema: z.ZodType<Prisma.TopicOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TopicCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TopicMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TopicMinOrderByAggregateInputSchema).optional()
}).strict();

export const TopicScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TopicScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TopicScalarWhereWithAggregatesInputSchema),z.lazy(() => TopicScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TopicScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TopicScalarWhereWithAggregatesInputSchema),z.lazy(() => TopicScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  topicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional(),
  topic: z.union([ z.lazy(() => TopicRelationFilterSchema),z.lazy(() => TopicWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  votes: z.lazy(() => VoteOrderByRelationAggregateInputSchema).optional(),
  topic: z.lazy(() => TopicOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  topicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional(),
  topic: z.union([ z.lazy(() => TopicRelationFilterSchema),z.lazy(() => TopicWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  topicId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VoteWhereInputSchema: z.ZodType<Prisma.VoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  up: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const VoteOrderByWithRelationInputSchema: z.ZodType<Prisma.VoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  up: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const VoteWhereUniqueInputSchema: z.ZodType<Prisma.VoteWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  up: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const VoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.VoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  up: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VoteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VoteMinOrderByAggregateInputSchema).optional()
}).strict();

export const VoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VoteScalarWhereWithAggregatesInputSchema),z.lazy(() => VoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteScalarWhereWithAggregatesInputSchema),z.lazy(() => VoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  up: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SubscriptionWhereInputSchema: z.ZodType<Prisma.SubscriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  topic: z.union([ z.lazy(() => TopicRelationFilterSchema),z.lazy(() => TopicWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SubscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  topic: z.lazy(() => TopicOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.SubscriptionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  topic: z.union([ z.lazy(() => TopicRelationFilterSchema),z.lazy(() => TopicWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubscriptionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscriptionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  topicId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TopicCreateInputSchema: z.ZodType<Prisma.TopicCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutTopicInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutTopicInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutTopicsInputSchema).optional()
}).strict();

export const TopicUncheckedCreateInputSchema: z.ZodType<Prisma.TopicUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutTopicInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutTopicInputSchema).optional()
}).strict();

export const TopicUpdateInputSchema: z.ZodType<Prisma.TopicUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutTopicNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutTopicNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutTopicsNestedInputSchema).optional()
}).strict();

export const TopicUncheckedUpdateInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutTopicNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutTopicNestedInputSchema).optional()
}).strict();

export const TopicCreateManyInputSchema: z.ZodType<Prisma.TopicCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TopicUpdateManyMutationInputSchema: z.ZodType<Prisma.TopicUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TopicUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutPostInputSchema).optional(),
  topic: z.lazy(() => TopicCreateNestedOneWithoutPostsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  topicId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutPostNestedInputSchema).optional(),
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  topicId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  postId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  postId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteCreateInputSchema: z.ZodType<Prisma.VoteCreateInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  post: z.lazy(() => PostCreateNestedOneWithoutVotesInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutVotesInputSchema)
}).strict();

export const VoteUncheckedCreateInputSchema: z.ZodType<Prisma.VoteUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  postId: z.string(),
  authorId: z.string()
}).strict();

export const VoteUpdateInputSchema: z.ZodType<Prisma.VoteUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutVotesNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutVotesNestedInputSchema).optional()
}).strict();

export const VoteUncheckedUpdateInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteCreateManyInputSchema: z.ZodType<Prisma.VoteCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  postId: z.string(),
  authorId: z.string()
}).strict();

export const VoteUpdateManyMutationInputSchema: z.ZodType<Prisma.VoteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionCreateInputSchema: z.ZodType<Prisma.SubscriptionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  topic: z.lazy(() => TopicCreateNestedOneWithoutSubscriptionsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutSubscriptionsInputSchema)
}).strict();

export const SubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  topicId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionUpdateInputSchema: z.ZodType<Prisma.SubscriptionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional()
}).strict();

export const SubscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionCreateManyInputSchema: z.ZodType<Prisma.SubscriptionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  topicId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const TopicListRelationFilterSchema: z.ZodType<Prisma.TopicListRelationFilter> = z.object({
  every: z.lazy(() => TopicWhereInputSchema).optional(),
  some: z.lazy(() => TopicWhereInputSchema).optional(),
  none: z.lazy(() => TopicWhereInputSchema).optional()
}).strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const VoteListRelationFilterSchema: z.ZodType<Prisma.VoteListRelationFilter> = z.object({
  every: z.lazy(() => VoteWhereInputSchema).optional(),
  some: z.lazy(() => VoteWhereInputSchema).optional(),
  none: z.lazy(() => VoteWhereInputSchema).optional()
}).strict();

export const SubscriptionListRelationFilterSchema: z.ZodType<Prisma.SubscriptionListRelationFilter> = z.object({
  every: z.lazy(() => SubscriptionWhereInputSchema).optional(),
  some: z.lazy(() => SubscriptionWhereInputSchema).optional(),
  none: z.lazy(() => SubscriptionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TopicOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscriptionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubscriptionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const TopicCountOrderByAggregateInputSchema: z.ZodType<Prisma.TopicCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TopicMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicMinOrderByAggregateInputSchema: z.ZodType<Prisma.TopicMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicRelationFilterSchema: z.ZodType<Prisma.TopicRelationFilter> = z.object({
  is: z.lazy(() => TopicWhereInputSchema).optional(),
  isNot: z.lazy(() => TopicWhereInputSchema).optional()
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional(),
  isNot: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const VoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.VoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  up: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  up: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.VoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  up: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const SubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TopicCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.TopicCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutAuthorInputSchema),z.lazy(() => TopicCreateWithoutAuthorInputSchema).array(),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TopicCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.VoteCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutAuthorInputSchema),z.lazy(() => VoteCreateWithoutAuthorInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TopicUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutAuthorInputSchema),z.lazy(() => TopicCreateWithoutAuthorInputSchema).array(),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TopicCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutAuthorInputSchema),z.lazy(() => VoteCreateWithoutAuthorInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TopicUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.TopicUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutAuthorInputSchema),z.lazy(() => TopicCreateWithoutAuthorInputSchema).array(),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TopicUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => TopicUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TopicCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TopicUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => TopicUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TopicUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => TopicUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TopicScalarWhereInputSchema),z.lazy(() => TopicScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.VoteUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutAuthorInputSchema),z.lazy(() => VoteCreateWithoutAuthorInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriptionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SubscriptionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriptionScalarWhereInputSchema),z.lazy(() => SubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TopicUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutAuthorInputSchema),z.lazy(() => TopicCreateWithoutAuthorInputSchema).array(),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => TopicCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TopicUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => TopicUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TopicCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TopicWhereUniqueInputSchema),z.lazy(() => TopicWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TopicUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => TopicUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TopicUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => TopicUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TopicScalarWhereInputSchema),z.lazy(() => TopicScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutAuthorInputSchema),z.lazy(() => VoteCreateWithoutAuthorInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => VoteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriptionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SubscriptionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriptionScalarWhereInputSchema),z.lazy(() => SubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutTopicInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutTopicInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTopicInputSchema),z.lazy(() => PostCreateWithoutTopicInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema),z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyTopicInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionCreateNestedManyWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionCreateNestedManyWithoutTopicInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateWithoutTopicInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyTopicInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTopicsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTopicsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTopicsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTopicsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTopicsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostUncheckedCreateNestedManyWithoutTopicInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutTopicInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTopicInputSchema),z.lazy(() => PostCreateWithoutTopicInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema),z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyTopicInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUncheckedCreateNestedManyWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateNestedManyWithoutTopicInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateWithoutTopicInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyTopicInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateManyWithoutTopicNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutTopicNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTopicInputSchema),z.lazy(() => PostCreateWithoutTopicInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema),z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyTopicInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutTopicInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutTopicInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUpdateManyWithoutTopicNestedInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyWithoutTopicNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateWithoutTopicInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyTopicInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriptionUpdateManyWithWhereWithoutTopicInputSchema),z.lazy(() => SubscriptionUpdateManyWithWhereWithoutTopicInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriptionScalarWhereInputSchema),z.lazy(() => SubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutTopicsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTopicsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTopicsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTopicsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTopicsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTopicsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTopicsInputSchema),z.lazy(() => UserUpdateWithoutTopicsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTopicsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutTopicNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutTopicNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTopicInputSchema),z.lazy(() => PostCreateWithoutTopicInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema),z.lazy(() => PostCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyTopicInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutTopicInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutTopicInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateManyWithoutTopicNestedInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyWithoutTopicNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateWithoutTopicInputSchema).array(),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema),z.lazy(() => SubscriptionCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => SubscriptionUpsertWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionCreateManyTopicInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriptionWhereUniqueInputSchema),z.lazy(() => SubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => SubscriptionUpdateWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriptionUpdateManyWithWhereWithoutTopicInputSchema),z.lazy(() => SubscriptionUpdateManyWithWhereWithoutTopicInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriptionScalarWhereInputSchema),z.lazy(() => SubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.VoteCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPostInputSchema),z.lazy(() => VoteCreateWithoutPostInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TopicCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.TopicCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutPostsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TopicCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => TopicWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.VoteUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPostInputSchema),z.lazy(() => VoteCreateWithoutPostInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.VoteUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPostInputSchema),z.lazy(() => VoteCreateWithoutPostInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TopicUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.TopicUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutPostsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TopicCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => TopicUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => TopicWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TopicUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => TopicUpdateWithoutPostsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPostInputSchema),z.lazy(() => VoteCreateWithoutPostInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutVotesInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutVotesInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutVotesInputSchema),z.lazy(() => PostUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutVotesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutVotesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVotesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const PostUpdateOneRequiredWithoutVotesNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutVotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutVotesInputSchema),z.lazy(() => PostUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutVotesInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutVotesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutVotesInputSchema),z.lazy(() => PostUpdateWithoutVotesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutVotesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutVotesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVotesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVotesInputSchema),z.lazy(() => UserUpdateWithoutVotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVotesInputSchema) ]).optional(),
}).strict();

export const TopicCreateNestedOneWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicCreateNestedOneWithoutSubscriptionsInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutSubscriptionsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TopicCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => TopicWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriptionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TopicUpdateOneRequiredWithoutSubscriptionsNestedInputSchema: z.ZodType<Prisma.TopicUpdateOneRequiredWithoutSubscriptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutSubscriptionsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TopicCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  upsert: z.lazy(() => TopicUpsertWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => TopicWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TopicUpdateToOneWithWhereWithoutSubscriptionsInputSchema),z.lazy(() => TopicUpdateWithoutSubscriptionsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutSubscriptionsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSubscriptionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSubscriptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSubscriptionsInputSchema),z.lazy(() => UserUpdateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TopicCreateWithoutAuthorInputSchema: z.ZodType<Prisma.TopicCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutTopicInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutTopicInputSchema).optional()
}).strict();

export const TopicUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutTopicInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutTopicInputSchema).optional()
}).strict();

export const TopicCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.TopicCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => TopicWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TopicCreateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const TopicCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.TopicCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TopicCreateManyAuthorInputSchema),z.lazy(() => TopicCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutPostInputSchema).optional(),
  topic: z.lazy(() => TopicCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  topicId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyAuthorInputSchema),z.lazy(() => PostCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  postId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyAuthorInputSchema),z.lazy(() => CommentCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VoteCreateWithoutAuthorInputSchema: z.ZodType<Prisma.VoteCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  post: z.lazy(() => PostCreateNestedOneWithoutVotesInputSchema)
}).strict();

export const VoteUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  postId: z.string()
}).strict();

export const VoteCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.VoteCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VoteCreateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const VoteCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.VoteCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VoteCreateManyAuthorInputSchema),z.lazy(() => VoteCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubscriptionCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  topic: z.lazy(() => TopicCreateNestedOneWithoutSubscriptionsInputSchema)
}).strict();

export const SubscriptionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  topicId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SubscriptionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SubscriptionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubscriptionCreateManyUserInputSchema),z.lazy(() => SubscriptionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TopicUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => TopicWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TopicUpdateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => TopicCreateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const TopicUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => TopicWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TopicUpdateWithoutAuthorInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const TopicUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => TopicScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TopicUpdateManyMutationInputSchema),z.lazy(() => TopicUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const TopicScalarWhereInputSchema: z.ZodType<Prisma.TopicScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TopicScalarWhereInputSchema),z.lazy(() => TopicScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TopicScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TopicScalarWhereInputSchema),z.lazy(() => TopicScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  topicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VoteUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VoteUpdateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => VoteCreateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const VoteUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateWithoutAuthorInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const VoteUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => VoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateManyMutationInputSchema),z.lazy(() => VoteUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const VoteScalarWhereInputSchema: z.ZodType<Prisma.VoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  up: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SubscriptionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SubscriptionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SubscriptionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubscriptionUpdateManyMutationInputSchema),z.lazy(() => SubscriptionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SubscriptionScalarWhereInputSchema: z.ZodType<Prisma.SubscriptionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionScalarWhereInputSchema),z.lazy(() => SubscriptionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionScalarWhereInputSchema),z.lazy(() => SubscriptionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  topics: z.lazy(() => TopicCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  topics: z.lazy(() => TopicUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topics: z.lazy(() => TopicUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topics: z.lazy(() => TopicUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutTopicInputSchema: z.ZodType<Prisma.PostCreateWithoutTopicInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostUncheckedCreateWithoutTopicInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutTopicInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutTopicInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutTopicInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutTopicInputSchema),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema) ]),
}).strict();

export const PostCreateManyTopicInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyTopicInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyTopicInputSchema),z.lazy(() => PostCreateManyTopicInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubscriptionCreateWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionCreateWithoutTopicInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSubscriptionsInputSchema)
}).strict();

export const SubscriptionUncheckedCreateWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateWithoutTopicInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionCreateOrConnectWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionCreateOrConnectWithoutTopicInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema) ]),
}).strict();

export const SubscriptionCreateManyTopicInputEnvelopeSchema: z.ZodType<Prisma.SubscriptionCreateManyTopicInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubscriptionCreateManyTopicInputSchema),z.lazy(() => SubscriptionCreateManyTopicInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutTopicsInputSchema: z.ZodType<Prisma.UserCreateWithoutTopicsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTopicsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTopicsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTopicsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTopicsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTopicsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTopicsInputSchema) ]),
}).strict();

export const PostUpsertWithWhereUniqueWithoutTopicInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutTopicInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutTopicInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTopicInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutTopicInputSchema),z.lazy(() => PostUncheckedCreateWithoutTopicInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutTopicInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutTopicInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutTopicInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTopicInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutTopicInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutTopicInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutTopicInputSchema) ]),
}).strict();

export const SubscriptionUpsertWithWhereUniqueWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUpsertWithWhereUniqueWithoutTopicInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutTopicInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutTopicInputSchema) ]),
}).strict();

export const SubscriptionUpdateWithWhereUniqueWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithWhereUniqueWithoutTopicInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubscriptionUpdateWithoutTopicInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutTopicInputSchema) ]),
}).strict();

export const SubscriptionUpdateManyWithWhereWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyWithWhereWithoutTopicInput> = z.object({
  where: z.lazy(() => SubscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubscriptionUpdateManyMutationInputSchema),z.lazy(() => SubscriptionUncheckedUpdateManyWithoutTopicInputSchema) ]),
}).strict();

export const UserUpsertWithoutTopicsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTopicsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTopicsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTopicsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTopicsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTopicsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTopicsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTopicsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTopicsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTopicsInputSchema) ]),
}).strict();

export const UserUpdateWithoutTopicsInputSchema: z.ZodType<Prisma.UserUpdateWithoutTopicsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTopicsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTopicsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CommentCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyPostInputSchema),z.lazy(() => CommentCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VoteCreateWithoutPostInputSchema: z.ZodType<Prisma.VoteCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  author: z.lazy(() => UserCreateNestedOneWithoutVotesInputSchema)
}).strict();

export const VoteUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.VoteUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  authorId: z.string()
}).strict();

export const VoteCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.VoteCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VoteCreateWithoutPostInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const VoteCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.VoteCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VoteCreateManyPostInputSchema),z.lazy(() => VoteCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TopicCreateWithoutPostsInputSchema: z.ZodType<Prisma.TopicCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutTopicInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutTopicsInputSchema).optional()
}).strict();

export const TopicUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.TopicUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutTopicInputSchema).optional()
}).strict();

export const TopicCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.TopicCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => TopicWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TopicCreateWithoutPostsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const VoteUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.VoteUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VoteUpdateWithoutPostInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => VoteCreateWithoutPostInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const VoteUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.VoteUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateWithoutPostInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const VoteUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.VoteUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => VoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateManyMutationInputSchema),z.lazy(() => VoteUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const TopicUpsertWithoutPostsInputSchema: z.ZodType<Prisma.TopicUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => TopicUpdateWithoutPostsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => TopicCreateWithoutPostsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => TopicWhereInputSchema).optional()
}).strict();

export const TopicUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.TopicUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => TopicWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TopicUpdateWithoutPostsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const TopicUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TopicUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutTopicNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutTopicsNestedInputSchema).optional()
}).strict();

export const TopicUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutTopicNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutPostInputSchema).optional(),
  topic: z.lazy(() => TopicCreateNestedOneWithoutPostsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  topicId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutPostNestedInputSchema).optional(),
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutVotesInputSchema: z.ZodType<Prisma.PostCreateWithoutVotesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  topic: z.lazy(() => TopicCreateNestedOneWithoutPostsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostUncheckedCreateWithoutVotesInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutVotesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  topicId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutVotesInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutVotesInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutVotesInputSchema),z.lazy(() => PostUncheckedCreateWithoutVotesInputSchema) ]),
}).strict();

export const UserCreateWithoutVotesInputSchema: z.ZodType<Prisma.UserCreateWithoutVotesInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutVotesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVotesInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutVotesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVotesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]),
}).strict();

export const PostUpsertWithoutVotesInputSchema: z.ZodType<Prisma.PostUpsertWithoutVotesInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutVotesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutVotesInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutVotesInputSchema),z.lazy(() => PostUncheckedCreateWithoutVotesInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutVotesInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutVotesInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutVotesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutVotesInputSchema) ]),
}).strict();

export const PostUpdateWithoutVotesInputSchema: z.ZodType<Prisma.PostUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutVotesInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutVotesInputSchema: z.ZodType<Prisma.UserUpsertWithoutVotesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutVotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVotesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutVotesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVotesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVotesInputSchema) ]),
}).strict();

export const UserUpdateWithoutVotesInputSchema: z.ZodType<Prisma.UserUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutVotesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TopicCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicCreateWithoutSubscriptionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutTopicInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutTopicsInputSchema).optional()
}).strict();

export const TopicUncheckedCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicUncheckedCreateWithoutSubscriptionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutTopicInputSchema).optional()
}).strict();

export const TopicCreateOrConnectWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicCreateOrConnectWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => TopicWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TopicCreateWithoutSubscriptionsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const UserCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSubscriptionsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSubscriptionsInput> = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  name: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const TopicUpsertWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicUpsertWithoutSubscriptionsInput> = z.object({
  update: z.union([ z.lazy(() => TopicUpdateWithoutSubscriptionsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
  create: z.union([ z.lazy(() => TopicCreateWithoutSubscriptionsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutSubscriptionsInputSchema) ]),
  where: z.lazy(() => TopicWhereInputSchema).optional()
}).strict();

export const TopicUpdateToOneWithWhereWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicUpdateToOneWithWhereWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => TopicWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TopicUpdateWithoutSubscriptionsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const TopicUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutTopicNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutTopicsNestedInputSchema).optional()
}).strict();

export const TopicUncheckedUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutTopicNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSubscriptionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSubscriptionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSubscriptionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  topics: z.lazy(() => TopicUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const TopicCreateManyAuthorInputSchema: z.ZodType<Prisma.TopicCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  topicId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  postId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const VoteCreateManyAuthorInputSchema: z.ZodType<Prisma.VoteCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  postId: z.string()
}).strict();

export const SubscriptionCreateManyUserInputSchema: z.ZodType<Prisma.SubscriptionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  topicId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TopicUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutTopicNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUpdateManyWithoutTopicNestedInputSchema).optional()
}).strict();

export const TopicUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutTopicNestedInputSchema).optional(),
  subscriptions: z.lazy(() => SubscriptionUncheckedUpdateManyWithoutTopicNestedInputSchema).optional()
}).strict();

export const TopicUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutPostNestedInputSchema).optional(),
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutVotesNestedInputSchema).optional()
}).strict();

export const VoteUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional()
}).strict();

export const SubscriptionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManyTopicInputSchema: z.ZodType<Prisma.PostCreateManyTopicInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionCreateManyTopicInputSchema: z.ZodType<Prisma.SubscriptionCreateManyTopicInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateWithoutTopicInputSchema: z.ZodType<Prisma.PostUpdateWithoutTopicInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutTopicInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutTopicInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutTopicInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutTopicInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionUpdateWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithoutTopicInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSubscriptionsNestedInputSchema).optional()
}).strict();

export const SubscriptionUncheckedUpdateWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateWithoutTopicInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateManyWithoutTopicInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyWithoutTopicInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyPostInputSchema: z.ZodType<Prisma.CommentCreateManyPostInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const VoteCreateManyPostInputSchema: z.ZodType<Prisma.VoteCreateManyPostInput> = z.object({
  id: z.string().cuid().optional(),
  up: z.boolean(),
  authorId: z.string()
}).strict();

export const CommentUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUpdateWithoutPostInputSchema: z.ZodType<Prisma.VoteUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutVotesNestedInputSchema).optional()
}).strict();

export const VoteUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  up: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const TopicFindFirstArgsSchema: z.ZodType<Prisma.TopicFindFirstArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TopicScalarFieldEnumSchema,TopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TopicFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TopicFindFirstOrThrowArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TopicScalarFieldEnumSchema,TopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TopicFindManyArgsSchema: z.ZodType<Prisma.TopicFindManyArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TopicScalarFieldEnumSchema,TopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TopicAggregateArgsSchema: z.ZodType<Prisma.TopicAggregateArgs> = z.object({
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TopicGroupByArgsSchema: z.ZodType<Prisma.TopicGroupByArgs> = z.object({
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithAggregationInputSchema.array(),TopicOrderByWithAggregationInputSchema ]).optional(),
  by: TopicScalarFieldEnumSchema.array(),
  having: TopicScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TopicFindUniqueArgsSchema: z.ZodType<Prisma.TopicFindUniqueArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const TopicFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TopicFindUniqueOrThrowArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const VoteFindFirstArgsSchema: z.ZodType<Prisma.VoteFindFirstArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VoteScalarFieldEnumSchema,VoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VoteFindFirstOrThrowArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VoteScalarFieldEnumSchema,VoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VoteFindManyArgsSchema: z.ZodType<Prisma.VoteFindManyArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VoteScalarFieldEnumSchema,VoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VoteAggregateArgsSchema: z.ZodType<Prisma.VoteAggregateArgs> = z.object({
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VoteGroupByArgsSchema: z.ZodType<Prisma.VoteGroupByArgs> = z.object({
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithAggregationInputSchema.array(),VoteOrderByWithAggregationInputSchema ]).optional(),
  by: VoteScalarFieldEnumSchema.array(),
  having: VoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VoteFindUniqueArgsSchema: z.ZodType<Prisma.VoteFindUniqueArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const VoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VoteFindUniqueOrThrowArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionFindFirstArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionScalarFieldEnumSchema,SubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionScalarFieldEnumSchema,SubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriptionFindManyArgsSchema: z.ZodType<Prisma.SubscriptionFindManyArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionScalarFieldEnumSchema,SubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriptionAggregateArgsSchema: z.ZodType<Prisma.SubscriptionAggregateArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscriptionGroupByArgsSchema: z.ZodType<Prisma.SubscriptionGroupByArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithAggregationInputSchema.array(),SubscriptionOrderByWithAggregationInputSchema ]).optional(),
  by: SubscriptionScalarFieldEnumSchema.array(),
  having: SubscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscriptionFindUniqueArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const TopicCreateArgsSchema: z.ZodType<Prisma.TopicCreateArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  data: z.union([ TopicCreateInputSchema,TopicUncheckedCreateInputSchema ]),
}).strict() ;

export const TopicUpsertArgsSchema: z.ZodType<Prisma.TopicUpsertArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
  create: z.union([ TopicCreateInputSchema,TopicUncheckedCreateInputSchema ]),
  update: z.union([ TopicUpdateInputSchema,TopicUncheckedUpdateInputSchema ]),
}).strict() ;

export const TopicCreateManyArgsSchema: z.ZodType<Prisma.TopicCreateManyArgs> = z.object({
  data: z.union([ TopicCreateManyInputSchema,TopicCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TopicCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TopicCreateManyAndReturnArgs> = z.object({
  data: z.union([ TopicCreateManyInputSchema,TopicCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TopicDeleteArgsSchema: z.ZodType<Prisma.TopicDeleteArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const TopicUpdateArgsSchema: z.ZodType<Prisma.TopicUpdateArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  data: z.union([ TopicUpdateInputSchema,TopicUncheckedUpdateInputSchema ]),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const TopicUpdateManyArgsSchema: z.ZodType<Prisma.TopicUpdateManyArgs> = z.object({
  data: z.union([ TopicUpdateManyMutationInputSchema,TopicUncheckedUpdateManyInputSchema ]),
  where: TopicWhereInputSchema.optional(),
}).strict() ;

export const TopicDeleteManyArgsSchema: z.ZodType<Prisma.TopicDeleteManyArgs> = z.object({
  where: TopicWhereInputSchema.optional(),
}).strict() ;

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const VoteCreateArgsSchema: z.ZodType<Prisma.VoteCreateArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  data: z.union([ VoteCreateInputSchema,VoteUncheckedCreateInputSchema ]),
}).strict() ;

export const VoteUpsertArgsSchema: z.ZodType<Prisma.VoteUpsertArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
  create: z.union([ VoteCreateInputSchema,VoteUncheckedCreateInputSchema ]),
  update: z.union([ VoteUpdateInputSchema,VoteUncheckedUpdateInputSchema ]),
}).strict() ;

export const VoteCreateManyArgsSchema: z.ZodType<Prisma.VoteCreateManyArgs> = z.object({
  data: z.union([ VoteCreateManyInputSchema,VoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VoteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VoteCreateManyAndReturnArgs> = z.object({
  data: z.union([ VoteCreateManyInputSchema,VoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VoteDeleteArgsSchema: z.ZodType<Prisma.VoteDeleteArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const VoteUpdateArgsSchema: z.ZodType<Prisma.VoteUpdateArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  data: z.union([ VoteUpdateInputSchema,VoteUncheckedUpdateInputSchema ]),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const VoteUpdateManyArgsSchema: z.ZodType<Prisma.VoteUpdateManyArgs> = z.object({
  data: z.union([ VoteUpdateManyMutationInputSchema,VoteUncheckedUpdateManyInputSchema ]),
  where: VoteWhereInputSchema.optional(),
}).strict() ;

export const VoteDeleteManyArgsSchema: z.ZodType<Prisma.VoteDeleteManyArgs> = z.object({
  where: VoteWhereInputSchema.optional(),
}).strict() ;

export const SubscriptionCreateArgsSchema: z.ZodType<Prisma.SubscriptionCreateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([ SubscriptionCreateInputSchema,SubscriptionUncheckedCreateInputSchema ]),
}).strict() ;

export const SubscriptionUpsertArgsSchema: z.ZodType<Prisma.SubscriptionUpsertArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
  create: z.union([ SubscriptionCreateInputSchema,SubscriptionUncheckedCreateInputSchema ]),
  update: z.union([ SubscriptionUpdateInputSchema,SubscriptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SubscriptionCreateManyArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyArgs> = z.object({
  data: z.union([ SubscriptionCreateManyInputSchema,SubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscriptionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SubscriptionCreateManyInputSchema,SubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscriptionDeleteArgsSchema: z.ZodType<Prisma.SubscriptionDeleteArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionUpdateArgsSchema: z.ZodType<Prisma.SubscriptionUpdateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([ SubscriptionUpdateInputSchema,SubscriptionUncheckedUpdateInputSchema ]),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.SubscriptionUpdateManyArgs> = z.object({
  data: z.union([ SubscriptionUpdateManyMutationInputSchema,SubscriptionUncheckedUpdateManyInputSchema ]),
  where: SubscriptionWhereInputSchema.optional(),
}).strict() ;

export const SubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.SubscriptionDeleteManyArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
}).strict() ;