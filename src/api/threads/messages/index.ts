import Elysia, { t } from "elysia";
import { db, MessageSchema } from "../../../db";

export const messages = new Elysia({ prefix: "/messages" })
	.get(
		"/",
		async ({ query, params }) => {
			const { limit = 50, order = "desc", before, after } = query;

			const messages = await db.message.findMany({
				where: {
					threadId: params.threadId,
					...(before && { createdAt: { lt: new Date(before) } }),
					...(after && { createdAt: { gt: new Date(after) } }),
				},
				orderBy: {
					createdAt: order as "asc" | "desc",
				},
				take: limit,
			});

			return messages;
		},
		{
			query: t.Object({
				limit: t.Optional(
					t.Number({ description: "Number of messages to return" })
				),
				order: t.Optional(
					t.String({
						pattern: "asc|desc",
						description:
							"Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.",
					})
				),
				after: t.Optional(
					t.String({
						description:
							"A cursor for use in pagination. `after` is a message ID defining the start of the page.",
					})
				),
				before: t.Optional(
					t.String({
						description:
							"A cursor for use in pagination. `before` is a message ID defining the end of the page.",
					})
				),
			}),
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread to retrieve messages from.",
				}),
			}),
			detail: {
				tags: ["Messages"],
				summary: "List messages in thread",
				description:
					"Retrieves a paginated list of messages in a specific thread",
				operationId: "listMessages",
			},
			response: t.Array(MessageSchema),
		}
	)
	.get(
		"/:messageId",
		async ({ params }) => {
			const message = await db.message.findUnique({
				where: {
					id: params.messageId,
					threadId: params.threadId,
				},
			});
			if (!message) throw new Error("Message not found");
			return message;
		},
		{
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread to retrieve messages from.",
				}),
				messageId: t.String({
					description: "The ID of the message to retrieve.",
				}),
			}),
			detail: {
				tags: ["Messages"],
				summary: "Get a specific message",
				description:
					"Retrieves a specific message from a thread by its ID. Returns a 404 error if the message is not found.",
				operationId: "getMessage",
			},
			response: MessageSchema,
		}
	)
	.post(
		"/",
		async ({ params, body }) => {
			const newMessagesCount = await db.message.createMany({
				data: body.map((message, i) => ({
					id: message.id,
					content: message.content,
					role: message.role,
					metadata: message.metadata,
					createdAt: new Date(Date.now() + i),
					threadId: params.threadId,
				})),
			});

			const messages = await db.message.findMany({
				where: {
					threadId: params.threadId,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: newMessagesCount.count,
			});

			return messages;
		},
		{
			body: t.Array(
				t.Object({
					id: t.Optional(
						t
							.String({
								description: "ID of the message.",
							})
							.uuid()
					),
					role: t.Union(
						[
							t.Literal("function"),
							t.Literal("user"),
							t.Literal("system"),
							t.Literal("assistant"),
							t.Literal("data"),
							t.Literal("tool"),
						],
						{
							description:
								"The role of the message sender (function, user, system, assistant, data, tool).",
						}
					),
					content: t.Any({
						description:
							"The content of the message. Can be any valid JSON value (string, object, array, etc.).",
					}),
					metadata: t.Optional(
						t.Any({
							description:
								"Optional metadata associated with the message. Can be any valid JSON value.",
						})
					),
				}),
				{
					description:
						"An array of message objects to create. Each message object must include a `role` and `content` property.",
				}
			),
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread to create the message in.",
				}),
			}),
			detail: {
				tags: ["Messages"],
				summary: "Create messages",
				description:
					"Creates new messages in a specified thread with the provided content and metadata.",
				operationId: "createMessages",
			},
			response: t.Array(MessageSchema),
		}
	)
	.patch(
		"/:messageId",
		async ({ params, body }) => {
			const message = await db.message.update({
				where: {
					id: params.messageId,
					threadId: params.threadId,
				},
				data: body,
			});
			return message;
		},
		{
			body: t.Object({
				content: t.Optional(
					t.Any({
						description:
							"New content to update the message with. Can be any valid JSON value.",
					})
				),
				metadata: t.Optional(
					t.Any({
						description:
							"New metadata to update the message with. Can be any valid JSON value.",
					})
				),
			}),
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread containing the message.",
				}),
				messageId: t.String({
					description: "The ID of the message to update.",
				}),
			}),
			detail: {
				tags: ["Messages"],
				summary: "Update a message",
				description:
					"Updates the content and/or metadata of an existing message. Only the provided fields will be updated.",
				operationId: "updateMessage",
			},
			response: MessageSchema,
		}
	)
	.delete(
		"/:messageId",
		async ({ params }) => {
			await db.message.delete({
				where: {
					id: params.messageId,
					threadId: params.threadId,
				},
			});
			return { success: true };
		},
		{
			params: t.Object({
				threadId: t.String({
					description: "The ID of the thread containing the message to delete.",
				}),
				messageId: t.String({
					description: "The ID of the message to delete.",
				}),
			}),
			detail: {
				tags: ["Messages"],
				summary: "Delete a message",
				description:
					"Permanently deletes a message from a thread. This action cannot be undone.",
				operationId: "deleteMessage",
			},
			response: t.Object({
				success: t.Boolean(),
			}),
		}
	);
