# Context Store API

A lightweight service for managing threads and messages for AI SDK driven LLM applications.

## Quick Start

1. Start the server

```bash
npx ctx-store
```

2. Initialize the client

```typescript
import { createClient } from "@ctx-store/client";

const ctxStore = createClient();
```

3. Create a thread and add a message

```typescript
const thread = await ctxStore.createThread();

await ctxStore.createMessages(thread.id, [
	{
		role: "user",
		content: "Hello, world!",
	},
]);
```

4. Use together with AI SDK

```typescript
const { text } = await generateText({
	model: "gpt-4o",
	messages: [{ role: "user", content: "Hello, world!" }],
	onFinish: async ({ response }) => {
		await ctxStore.createMessages(thread.id, response.messages);
	},
});
```

https://llmstudios.de/
