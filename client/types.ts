

export interface Message {
  id: string;
  threadId: string;
  content: unknown;
}

export interface Thread {
  Messages: Array<{
      id: string;
      threadId: string;
      content: unknown;
      role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
      createdAt: (Date | string | number);
      updatedAt: (Date | string | number);
      metadata?: (unknown | null);
  }>;
}

export interface ThreadWithMessages extends Thread {
  Messages: Array<{
      id: string;
      threadId: string;
      content: unknown;
      role: ("function" | "user" | "system" | "assistant" | "data" | "tool");
      createdAt: (Date | string | number);
      updatedAt: (Date | string | number);
      metadata?: (unknown | null);
  }>;
}

