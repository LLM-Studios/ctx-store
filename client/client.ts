#!/usr/bin/env bun

import { MessageRole } from "@prisma/client";
import * as fetchClient from "./generated/index";

const getThread = async (threadId: string, includeMessages = true) => {
	return fetchClient
		.getThread({
			path: { threadId },
			query: { includeMessages },
		})
		.then((res) => res.data);
};

const listThreads = async () => {
	return fetchClient.listThreads().then((res) => res.data);
};

const createThread = async (data?: { title?: string; metadata?: any }) => {
	return fetchClient.createThread({ body: data ?? {} }).then((res) => res.data);
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
		.then((res) => res.data);
};

const deleteThread = async (threadId: string) => {
	return fetchClient
		.deleteThread({
			path: { threadId },
		})
		.then((res) => res.data);
};

const getMessage = async (threadId: string, messageId: string) => {
	return fetchClient
		.getMessage({
			path: { threadId, messageId },
		})
		.then((res) => res.data);
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
		.then((res) => res.data);
};

const addMessages = async (
	threadId: string,
	data: {
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
		.then((res) => res.data);
};

const addUserMessage = async (threadId: string, content: string) => {
	return fetchClient
		.createMessages({
			body: [{ role: "user", content }],
			path: { threadId },
		})
		.then((res) => res.data);
};

const addAssistantMessage = async (threadId: string, content: string) => {
	return fetchClient
		.createMessages({
			body: [{ role: "assistant", content }],
			path: { threadId },
		})
		.then((res) => res.data);
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
		.then((res) => res.data);
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
