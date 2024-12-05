import { PrismaClient } from "@prisma/client";
import { t } from "elysia";

export const db = new PrismaClient();

export const MessageSchema = t.Object({
	id: t.String(),
	threadId: t.String(),
	content: t.Any(),
	role: t.Union([
		t.Literal("function"),
		t.Literal("user"),
		t.Literal("system"),
		t.Literal("assistant"),
		t.Literal("data"),
		t.Literal("tool"),
	]),
	createdAt: t.Date(),
	updatedAt: t.Date(),
	metadata: t.Optional(t.Union([t.Any(), t.Null()])),
});

export const ThreadSchema = t.Object({
	id: t.String(),
	title: t.Optional(t.Union([t.String(), t.Null()])),
	createdAt: t.Date(),
	updatedAt: t.Date(),
	metadata: t.Optional(t.Union([t.Any(), t.Null()])),
});

export const ThreadWithMessagesSchema = t.Composite([
	ThreadSchema,
	t.Object({
		Messages: t.Array(MessageSchema),
	}),
]);

export const ThreadWithMessageCountSchema = t.Composite([
	ThreadSchema,
	t.Object({
		_count: t.Object({
			Messages: t.Number(),
		}),
	}),
]);
