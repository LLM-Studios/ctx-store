import { MessageRole } from "@prisma/client";
import * as fetchClient from "./index";
import { CreateThreadData, UpdateThreadData } from "./index";
declare const getThread: (threadId: string, includeMessages?: boolean) => Promise<fetchClient.GetThreadResponse>;
declare const listThreads: () => Promise<fetchClient.ListThreadsResponse>;
declare const createThread: (data?: CreateThreadData["body"]) => Promise<fetchClient.CreateThreadResponse>;
declare const updateThread: (threadId: string, data: UpdateThreadData["body"]) => Promise<fetchClient.UpdateThreadResponse>;
declare const deleteThread: (threadId: string) => Promise<fetchClient.DeleteThreadResponse>;
declare const getMessage: (threadId: string, messageId: string) => Promise<fetchClient.GetMessageResponse>;
declare const listMessages: (threadId: string, options?: {
    limit?: number;
    order?: "asc" | "desc";
    before?: string;
    after?: string;
}) => Promise<fetchClient.ListMessagesResponse>;
declare const createMessages: (threadId: string, data: {
    role: MessageRole;
    content: any;
    metadata?: any;
}[]) => Promise<fetchClient.CreateMessagesResponse>;
declare const updateMessage: (threadId: string, messageId: string, data: {
    content?: any;
    metadata?: any;
}) => Promise<fetchClient.UpdateMessageResponse>;
declare const deleteMessage: (threadId: string, messageId: string) => Promise<fetchClient.DeleteMessageResponse>;
export { getThread, listThreads, createThread, updateThread, deleteThread, getMessage, listMessages, createMessages, updateMessage, deleteMessage, };
