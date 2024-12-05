import Elysia, { t } from "elysia";
import { messages } from "./messages";
import {
	db,
	ThreadSchema,
	ThreadWithMessageCountSchema,
	ThreadWithMessagesSchema,
} from "../../db";

const thread = new Elysia({ prefix: "/:threadId" })
	.use(messages)
	.get(
		"/",
		async ({ params, query }) => {
			const thread = await db.thread.findUnique({
				where: { id: params.threadId },

				include: {
					_count: {
						select: { Messages: true },
					},
					...(query.includeMessages && {
						Messages: {
							orderBy: {
								createdAt: "desc",
							},
							take: 50,
						},
					}),
				},
			});
			if (!thread) throw new Error("Thread not found");
			return thread;
		},
		{
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread to retrieve.",
				}),
			}),
			query: t.Object({
				includeMessages: t.Optional(
					t.Boolean({
						description:
							"Whether to include the most recent messages in the response.",
					})
				),
			}),
			detail: {
				tags: ["Threads"],
				summary: "Get a specific thread",
				description:
					"Retrieves a thread by ID, optionally including its most recent messages.",
				operationId: "getThread",
			},
			response: ThreadWithMessagesSchema,
		}
	)
	.patch(
		"/",
		async ({ params, body }) => {
			const thread = await db.thread.update({
				where: { id: params.threadId },
				data: body,
			});
			return thread;
		},
		{
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread to update.",
				}),
			}),
			body: t.Object({
				title: t.Optional(
					t.String({
						description: "New title for the thread.",
					})
				),
				metadata: t.Optional(
					t.Any({
						description:
							"Optional metadata associated with the thread. Can be any valid JSON value.",
					})
				),
			}),
			detail: {
				tags: ["Threads"],
				summary: "Update a thread",
				description:
					"Updates a thread's title or metadata. Only the provided fields will be updated.",
				operationId: "updateThread",
			},
			response: ThreadSchema,
		}
	)
	.delete(
		"/",
		async ({ params }) => {
			await db.thread.delete({
				where: { id: params.threadId },
			});
			return { success: true };
		},
		{
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread to delete.",
				}),
			}),
			detail: {
				tags: ["Threads"],
				summary: "Delete a thread",
				description:
					"Permanently deletes a thread and all its associated messages. This action cannot be undone.",
				operationId: "deleteThread",
			},
			response: t.Object({
				success: t.Boolean(),
			}),
		}
	);

export const threads = new Elysia({ prefix: "/threads" })
	.use(thread)
	.get(
		"/",
		async ({ query }) => {
			const { limit = 50, order = "desc", before, after } = query;

			const threads = await db.thread.findMany({
				where: {
					...(before && { createdAt: { lt: new Date(before) } }),
					...(after && { createdAt: { gt: new Date(after) } }),
				},
				orderBy: {
					createdAt: order,
				},
				take: limit,
				include: {
					_count: {
						select: { Messages: true },
					},
				},
			});

			return threads;
		},
		{
			query: t.Object({
				limit: t.Optional(
					t.Number({
						description: "Number of threads to return. Defaults to 50.",
					})
				),
				order: t.Optional(
					t.Union([t.Literal("asc"), t.Literal("desc")], {
						description:
							"Sort order by creation timestamp. 'asc' for ascending order and 'desc' for descending order.",
					})
				),
				before: t.Optional(
					t.String({
						description:
							"A cursor for pagination. Returns threads created before this timestamp.",
					})
				),
				after: t.Optional(
					t.String({
						description:
							"A cursor for pagination. Returns threads created after this timestamp.",
					})
				),
			}),
			detail: {
				tags: ["Threads"],
				summary: "List all threads",
				description:
					"Retrieves a paginated list of threads with their message counts.",
				operationId: "listThreads",
			},
			response: t.Array(ThreadWithMessageCountSchema),
		}
	)
	.post(
		"/",
		async ({ body }) => {
			const thread = await db.thread.create({
				data: body,
			});
			return thread;
		},
		{
			body: t.Object({
				title: t.Optional(
					t.String({
						description: "Title of the thread.",
					})
				),
				metadata: t.Optional(
					t.Any({
						description:
							"Optional metadata associated with the thread. Can be any valid JSON value.",
					})
				),
			}),
			detail: {
				tags: ["Threads"],
				summary: "Create a thread",
				description:
					"Creates a new thread with the provided title and metadata.",
				operationId: "createThread",
			},
			response: ThreadSchema,
		}
	);
