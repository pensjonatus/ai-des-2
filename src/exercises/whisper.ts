import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { getTask, getToken, sendAnswer } from "../modules/task-management";
import { writeFileSync } from "fs";

async function makeWhisper() {
  const token = await getToken("whisper");
  const task = await getTask(token);
  const fileUrl = task.msg.replace(
    "please return transcription of this file: ",
    ""
  );
  const response = await fetch(fileUrl);

  if (!response.ok) {
    console.error({ response });
    process.exit(1);
  }

  const blob = await response.blob();

  const filePath =
    "D:/git-repos/ai-devs-2/src/exercises/workbench/recording.mp3";
  const buffer = Buffer.from(await blob.arrayBuffer());
  writeFileSync(filePath, buffer);

  const loader = new OpenAIWhisperAudio(filePath);
  const docs = await loader.load();
  console.log(docs);
  sendAnswer(token, docs[0].pageContent);
}

makeWhisper();
