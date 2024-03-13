import { OpenAIEmbeddings } from "@langchain/openai";
import { getToken, sendAnswer } from "../modules/task-management";

async function embedPizza() {
  const pizzaPhrase = "Hawaiian pizza";
  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-ada-002",
    batchSize: 1536,
  });

  const vectors = (await embeddings.embedDocuments([pizzaPhrase])).flat();

  console.log("Got vectors", vectors.length);

  const token = await getToken("embedding");
  await sendAnswer(token, vectors);
}

embedPizza();
