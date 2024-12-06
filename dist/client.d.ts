#!/usr/bin/env node
import { MessageRole } from "@prisma/client";
import * as fetchClient from "./index";
import { CreateThreadData, UpdateThreadData } from "./index";
export declare const createClient: (config?: {
    baseUrl?: string;
}) => {
    getThread: (threadId: string, includeMessages?: boolean) => Promise<fetchClient.GetThreadResponse>;
    listThreads: () => Promise<fetchClient.ListThreadsResponse>;
    createThread: (data?: CreateThreadData["body"]) => Promise<fetchClient.CreateThreadResponse>;
    updateThread: (threadId: string, data: UpdateThreadData["body"]) => Promise<fetchClient.UpdateThreadResponse>;
    deleteThread: (threadId: string) => Promise<fetchClient.DeleteThreadResponse>;
    getMessage: (threadId: string, messageId: string) => Promise<fetchClient.GetMessageResponse>;
    listMessages: (threadId: string, options?: {
        limit?: number;
        order?: "asc" | "desc";
        before?: string;
        after?: string;
    }) => Promise<fetchClient.ListMessagesResponse>;
    createMessages: (threadId: string, data: {
        role: MessageRole;
        content: any;
        metadata?: any;
    }[]) => Promise<fetchClient.CreateMessagesResponse>;
    updateMessage: (threadId: string, messageId: string, data: {
        content?: any;
        metadata?: any;
    }) => Promise<fetchClient.UpdateMessageResponse>;
    deleteMessage: (threadId: string, messageId: string) => Promise<fetchClient.DeleteMessageResponse>;
};
