import { loadSummarizationChain } from "chains";
import { CallbackManager } from "langchain/callbacks";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";
import { BufferWindowMemory } from "langchain/memory";
import { getChatCompletion } from "../_common/openai.ts";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { serve } from "std/server";
import { RecursiveCharacterTextSplitter } from "text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { corsHeaders } from "../_shared/cors.ts";
import { BufferMemory } from "langchain/memory";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
const prompt = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate("{messages}"),
]);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    // Check if the request is for a streaming response.

      // For a streaming response we need to use a TransformStream to
      // convert the LLM's callback-based API into a stream-based API.
      const encoder = new TextEncoder();
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();
      const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 , chunkOverlap : 0});
      const docs = await textSplitter.createDocuments([messages[messages.length - 1].content]);
      // const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
      console.log("length" , docs.length)
      
      const model = new OpenAI({ temperature: 0  , openAIApiKey: Deno.env.get("OPENAI_API_KEY"),});
      // const chain = new LLMChain({ prompt, llm });
      const chain = loadSummarizationChain(model, { type: "map_reduce" });
      // We don't need to await the result of the chain.run() call because
      // the LLM will invoke the callbackManager's handleLLMEnd() method
      console.log("docs ", docs)
      //  await chain.call({input_documents: docs }).catch((e) => console.error(e));
      const res = await chain.call({
        input_documents: docs,
      })
      console.log(res) 
      console.log(res.text)
      messages[messages.length - 1].content = res.text;

      return getChatCompletion(messages , true);
    
    
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});