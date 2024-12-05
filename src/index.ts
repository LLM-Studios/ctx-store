#!/usr/bin/env node

import { Elysia } from "elysia";
import { threads } from "./api/threads";
import { swagger } from "@elysiajs/swagger";

export const app = new Elysia()
	.use(
		swagger({
			documentation: {
				info: {
					title: "Context Store API",
					version: "1.0.0",
					description: "API for managing threads and messages",
				},
				tags: [
					{ name: "Threads", description: "Thread management endpoints" },
					{
						name: "Messages",
						description: "Message management endpoints within threads",
					},
				],
			},
			path: "/docs",
		})
	)
	.use(threads)
	.onAfterResponse(({ request, response }) => {
		console.log(`${request.method} ${request.url} ${response.status}`);
	})
	.listen(3003);

export type App = typeof app;

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
