// This file is auto-generated by @hey-api/openapi-ts

export type ListMessagesData = {
    path: {
        /**
         * The ID of the thread to retrieve messages from.
         */
        threadId: string;
    };
    query?: {
        /**
         * A cursor for use in pagination. `after` is a message ID defining the start of the page.
         */
        after?: string;
        /**
         * A cursor for use in pagination. `before` is a message ID defining the end of the page.
         */
        before?: string;
        /**
         * Number of messages to return
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         */
        order?: string;
    };
};

export type ListMessagesResponse = (Array<{
    id: string;
    threadId: string;
    content: unknown;
    role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
}>);

export type ListMessagesError = unknown;

export type CreateMessagesData = {
    body: Array<{
        /**
         * The role of the message sender (function, user, system, assistant, data, tool).
         */
        role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
        /**
         * The content of the message. Can be any valid JSON value (string, object, array, etc.).
         */
        content: unknown;
        /**
         * Optional metadata associated with the message. Can be any valid JSON value.
         */
        metadata?: unknown;
    }>;
    path: {
        /**
         * The ID of the thread to create the message in.
         */
        threadId: string;
    };
};

export type CreateMessagesResponse = (Array<{
    id: string;
    threadId: string;
    content: unknown;
    role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
}>);

export type CreateMessagesError = unknown;

export type GetMessageData = {
    path: {
        /**
         * The ID of the message to retrieve.
         */
        messageId: string;
        /**
         * The ID of the thread to retrieve messages from.
         */
        threadId: string;
    };
};

export type GetMessageResponse = ({
    id: string;
    threadId: string;
    content: unknown;
    role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
});

export type GetMessageError = unknown;

export type UpdateMessageData = {
    body: {
        /**
         * New content to update the message with. Can be any valid JSON value.
         */
        content?: unknown;
        /**
         * New metadata to update the message with. Can be any valid JSON value.
         */
        metadata?: unknown;
    };
    path: {
        /**
         * The ID of the message to update.
         */
        messageId: string;
        /**
         * The ID of the thread containing the message.
         */
        threadId: string;
    };
};

export type UpdateMessageResponse = ({
    id: string;
    threadId: string;
    content: unknown;
    role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
});

export type UpdateMessageError = unknown;

export type DeleteMessageData = {
    path: {
        /**
         * The ID of the message to delete.
         */
        messageId: string;
        /**
         * The ID of the thread containing the message to delete.
         */
        threadId: string;
    };
};

export type DeleteMessageResponse = ({
    success: boolean;
});

export type DeleteMessageError = unknown;

export type GetThreadData = {
    path: {
        /**
         * The ID of the thread to retrieve.
         */
        threadId: string;
    };
    query?: {
        /**
         * Whether to include the most recent messages in the response.
         */
        includeMessages?: boolean;
    };
};

export type GetThreadResponse = ({
    id: string;
    title?: (string | null);
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
    Messages: Array<{
        id: string;
        threadId: string;
        content: unknown;
        role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
        createdAt: (Date | string);
        updatedAt: (Date | string);
        metadata?: (unknown | null);
    }>;
});

export type GetThreadError = unknown;

export type UpdateThreadData = {
    body: {
        /**
         * New title for the thread.
         */
        title?: string;
        /**
         * Optional metadata associated with the thread. Can be any valid JSON value.
         */
        metadata?: unknown;
    };
    path: {
        /**
         * The ID of the thread to update.
         */
        threadId: string;
    };
};

export type UpdateThreadResponse = ({
    id: string;
    title?: (string | null);
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
});

export type UpdateThreadError = unknown;

export type DeleteThreadData = {
    path: {
        /**
         * The ID of the thread to delete.
         */
        threadId: string;
    };
};

export type DeleteThreadResponse = ({
    success: boolean;
});

export type DeleteThreadError = unknown;

export type ListThreadsData = {
    query?: {
        /**
         * A cursor for pagination. Returns threads created after this timestamp.
         */
        after?: string;
        /**
         * A cursor for pagination. Returns threads created before this timestamp.
         */
        before?: string;
        /**
         * Number of threads to return. Defaults to 50.
         */
        limit?: number;
        /**
         * Sort order by creation timestamp. 'asc' for ascending order and 'desc' for descending order.
         */
        order?: ("asc" | "desc");
    };
};

export type ListThreadsResponse = (Array<{
    id: string;
    title?: (string | null);
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
    _count: {
        Messages: number;
    };
}>);

export type ListThreadsError = unknown;

export type CreateThreadData = {
    body: {
        /**
         * Title of the thread.
         */
        title?: string;
        /**
         * Optional metadata associated with the thread. Can be any valid JSON value.
         */
        metadata?: unknown;
    };
};

export type CreateThreadResponse = ({
    id: string;
    title?: (string | null);
    createdAt: (Date | string);
    updatedAt: (Date | string);
    metadata?: (unknown | null);
});

export type CreateThreadError = unknown;