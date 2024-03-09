import "dotenv/config";
import { getTask, getToken, sendAnswer } from "../modules/task-management";
import { ChatOpenAI } from "langchain/chat_models/openai";

async function solveInPrompt() {
  const token = await getToken("inprompt");
  const task = await getTask(token);

  console.log(Object.keys(task));
  const { input, question } = task;

  const chat = new ChatOpenAI();
  const query = `What is the name of the person this question is about? Answer with only the name.
  ###
  Question: ${question}`;

  const { content: personName } = await chat.invoke(query);

  console.log({ personName });

  const sources = (input as string[]).filter((item) =>
    item.includes(personName as string)
  );

  console.log({ sources });
  console.log("Filtered sources to", sources.length, "out of", input.length);

  const { content: answer } =
    await chat.invoke(`Odpowiedz na pytanie korzystając z podanych źródeł.
  ###
  Żródła: ${sources.join("\n\n")}
  ###
  Pytanie: ${question}`);

  console.log({ answer });

  sendAnswer(token, answer);
}

solveInPrompt();
