import { type Options } from '@hey-api/client-fetch';
import type { ListMessagesData, ListMessagesResponse, CreateMessagesData, CreateMessagesResponse, GetMessageData, GetMessageResponse, UpdateMessageData, UpdateMessageResponse, DeleteMessageData, DeleteMessageResponse, GetThreadData, GetThreadResponse, UpdateThreadData, UpdateThreadResponse, DeleteThreadData, DeleteThreadResponse, ListThreadsData, ListThreadsResponse, CreateThreadData, CreateThreadResponse } from './types.gen';
export declare const client: import("@hey-api/client-fetch").Client<Request, Response, unknown, import("@hey-api/client-fetch").RequestOptionsBase<false> & import("@hey-api/client-fetch").Config<false> & {
    headers: Headers;
}>;
/**
 * List messages in thread
 * Retrieves a paginated list of messages in a specific thread
 */
export declare const listMessages: <ThrowOnError extends boolean = false>(options: Options<ListMessagesData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<ListMessagesResponse, unknown, ThrowOnError>;
/**
 * Create messages
 * Creates new messages in a specified thread with the provided content and metadata.
 */
export declare const createMessages: <ThrowOnError extends boolean = false>(options: Options<CreateMessagesData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<CreateMessagesResponse, unknown, ThrowOnError>;
/**
 * Get a specific message
 * Retrieves a specific message from a thread by its ID. Returns a 404 error if the message is not found.
 */
export declare const getMessage: <ThrowOnError extends boolean = false>(options: Options<GetMessageData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<GetMessageResponse, unknown, ThrowOnError>;
/**
 * Update a message
 * Updates the content and/or metadata of an existing message. Only the provided fields will be updated.
 */
export declare const updateMessage: <ThrowOnError extends boolean = false>(options: Options<UpdateMessageData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<UpdateMessageResponse, unknown, ThrowOnError>;
/**
 * Delete a message
 * Permanently deletes a message from a thread. This action cannot be undone.
 */
export declare const deleteMessage: <ThrowOnError extends boolean = false>(options: Options<DeleteMessageData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<DeleteMessageResponse, unknown, ThrowOnError>;
/**
 * Get a specific thread
 * Retrieves a thread by ID, optionally including its most recent messages.
 */
export declare const getThread: <ThrowOnError extends boolean = false>(options: Options<GetThreadData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<GetThreadResponse, unknown, ThrowOnError>;
/**
 * Update a thread
 * Updates a thread's title or metadata. Only the provided fields will be updated.
 */
export declare const updateThread: <ThrowOnError extends boolean = false>(options: Options<UpdateThreadData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<UpdateThreadResponse, unknown, ThrowOnError>;
/**
 * Delete a thread
 * Permanently deletes a thread and all its associated messages. This action cannot be undone.
 */
export declare const deleteThread: <ThrowOnError extends boolean = false>(options: Options<DeleteThreadData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<DeleteThreadResponse, unknown, ThrowOnError>;
/**
 * List all threads
 * Retrieves a paginated list of threads with their message counts.
 */
export declare const listThreads: <ThrowOnError extends boolean = false>(options?: Options<ListThreadsData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<ListThreadsResponse, unknown, ThrowOnError>;
/**
 * Create a thread
 * Creates a new thread with the provided title and metadata.
 */
export declare const createThread: <ThrowOnError extends boolean = false>(options: Options<CreateThreadData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<CreateThreadResponse, unknown, ThrowOnError>;
