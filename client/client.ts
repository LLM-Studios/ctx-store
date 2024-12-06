#!/usr/bin/env bun

import { MessageRole } from "@prisma/client";
import * as fetchClient from "./generated/index";
import { CreateThreadData, UpdateThreadData } from "./generated/index";

const getThread = (threadId: string, includeMessages = true) => {
	return fetchClient
		.getThread({
			path: { threadId },
			query: { includeMessages },
		})
		.then((res) => res.data);
};

const listThreads = () => {
	return fetchClient.listThreads().then((res) => res.data);
};

const createThread = (data?: CreateThreadData["body"]) => {
	return fetchClient.createThread({ body: data ?? {} }).then((res) => res.data);
};

const updateThread = (threadId: string, data: UpdateThreadData["body"]) => {
	return fetchClient
		.updateThread({
			path: { threadId },
			body: data,
		})
		.then((res) => res.data);
};

const deleteThread = (threadId: string) => {
	return fetchClient
		.deleteThread({
			path: { threadId },
		})
		.then((res) => res.data);
};

const getMessage = (threadId: string, messageId: string) => {
	return fetchClient
		.getMessage({
			path: { threadId, messageId },
		})
		.then((res) => res.data);
};

const listMessages = (
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

const createMessages = (
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

const updateMessage = (
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

const deleteMessage = (threadId: string, messageId: string) => {
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
		createMessages,
		updateMessage,
		deleteMessage,
	};
};
