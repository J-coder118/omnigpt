import { CreateCompletionRequest } from "openai";

export type Imessage = {
  role: string;
  content: string;
};

export type CreateChatCompletionRequest = {
  messages: Imessage[];
} & CreateCompletionRequest;
