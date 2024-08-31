import { OpenAI } from "llms";
import { loadSummarizationChain } from "chains";
import { RecursiveCharacterTextSplitter } from "text_splitter";

export const run = async (message: any) => {
  console.log(message)
  console.log(message[message.length - 1].content)
  // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
  //   const text = fs.readFileSync("state_of_the_union.txt", "utf8");
  // const memory = new BufferMemory({ memoryKey: "chat_history" });
  // const template = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.
  // Current conversation:{chat_history}
  // Human: {input}
  // AI:`;
  // const prompt = PromptTemplate.fromTemplate(template);
  // const chains = new LLMChain({ llm: model, prompt, memory });
  const model = new OpenAI({ openAIApiKey: Deno.env.get("OPENAI_API_KEY"), temperature: 0, streaming: true });
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([message[message.length - 1].content]);
  console.log(docs)
  // This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = loadSummarizationChain(model, { type: "map_reduce" });

  const res = await chain.call({ input_documents: docs }, [
    {
      handleLLMNewToken(token: string) {
        return token
      },
    },
  ]);
  console.log(res)
  return res;
  /*
  {
    res: {
      text: ' President Biden is taking action to protect Americans from the COVID-19 pandemic and Russian aggression, providing economic relief, investing in infrastructure, creating jobs, and fighting inflation.
      He is also proposing measures to reduce the cost of prescription drugs, protect voting rights, and reform the immigration system. The speaker is advocating for increased economic security, police reform, and the Equality Act, as well as providing support for veterans and military families.
      The US is making progress in the fight against COVID-19, and the speaker is encouraging Americans to come together and work towards a brighter future.'
    }
  }
  */
};