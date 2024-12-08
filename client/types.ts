import type { CoreMessage } from "ai";

export type Message = CoreMessage & {
	threadId: string;
	metadata?: Record<string, any>;
};

export interface Thread {
	id: string;
	title?: string;
	metadata?: Record<string, any>;
	createdAt: Date;
	updatedAt: Date;
}

export interface ThreadWithMessages extends Thread {
	messages: Message[];
}
