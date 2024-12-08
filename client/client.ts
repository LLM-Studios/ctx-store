#!/usr/bin/env bun

import { Message, MessageRole, Thread } from "@prisma/client";
import * as fetchClient from "./generated/index";
import { ThreadWithMessages } from "./types";

const getThread = async (threadId: string, includeMessages = true) => {
	return fetchClient
		.getThread({
			path: { threadId },
			query: { includeMessages },
		})
		.then((res) => res.data as ThreadWithMessages);
};

const listThreads = async () => {
	return fetchClient.listThreads().then((res) => res.data as Thread[]);
};

const createThread = async (data?: {
	id?: string;
	title?: string;
	metadata?: any;
}) => {
	return fetchClient
		.createThread({ body: data ?? {} })
		.then((res) => res.data as Thread);
};

const updateThread = async (
	threadId: string,
	data: { title?: string; metadata?: any }
) => {
	return fetchClient
		.updateThread({
			path: { threadId },
			body: data,
		})
		.then((res) => res.data as Thread);
};

const deleteThread = async (threadId: string) => {
	return fetchClient
		.deleteThread({
			path: { threadId },
		})
		.then((res) => res.data as { success: boolean });
};

const getMessage = async (threadId: string, messageId: string) => {
	return fetchClient
		.getMessage({
			path: { threadId, messageId },
		})
		.then((res) => res.data as Message);
};

const listMessages = async (
	threadId: string,
	options?: {
		limit?: number;
		order?: "asc" | "desc";
		before?: string;
		after?: string;
	}
) => {
	return fetchClient
		.listMessages({
			path: { threadId },
			query: options,
		})
		.then((res) => res.data as Message[]);
};

const addMessages = async (
	threadId: string,
	data: {
		id?: string;
		role: MessageRole;
		content: any;
		metadata?: any;
	}[]
) => {
	return fetchClient
		.createMessages({
			body: data,
			path: { threadId },
		})
		.then((res) => res.data as Message[]);
};

const addUserMessage = async (threadId: string, content: string) => {
	return fetchClient
		.createMessages({
			body: [{ role: "user", content }],
			path: { threadId },
		})
		.then((res) => res.data?.[(res.data?.length ?? 1) - 1] as Message);
};

const addAssistantMessage = async (threadId: string, content: string) => {
	return fetchClient
		.createMessages({
			body: [{ role: "assistant", content }],
			path: { threadId },
		})
		.then((res) => res.data?.[(res.data?.length ?? 1) - 1] as Message);
};

const updateMessage = async (
	threadId: string,
	messageId: string,
	data: {
		content?: any;
		metadata?: any;
	}
) => {
	return fetchClient
		.updateMessage({
			path: { threadId, messageId },
			body: data,
		})
		.then((res) => res.data as Message);
};

const deleteMessage = async (threadId: string, messageId: string) => {
	return fetchClient
		.deleteMessage({
			path: { threadId, messageId },
		})
		.then((res) => res.data);
};

export const createClient = (config?: { baseUrl?: string }) => {
	fetchClient.client.setConfig({
		baseUrl: config?.baseUrl ?? process.env.API_URL ?? "http://localhost:3003",
	});

	return {
		getThread,
		listThreads,
		createThread,
		updateThread,
		deleteThread,
		getMessage,
		listMessages,
		addMessages,
		addUserMessage,
		addAssistantMessage,
		updateMessage,
		deleteMessage,
	};
};
