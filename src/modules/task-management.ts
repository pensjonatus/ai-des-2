import "dotenv/config";

type TokenResponse = {
  code: number;
  msg: string;
  token: string;
};

export async function getToken(taskName: string): Promise<string> {
  const response = await fetch(`https://zadania.aidevs.pl/token/${taskName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apikey: process.env.AI_DEV_ZADANIA_API_KEY,
    }),
  });

  if (!response.ok) {
    console.error({ response });
    process.exit(1);
  }

  const result = (await response.json()) as TokenResponse;

  console.log("Retrieved token for task", taskName);
  return result.token;
}

export async function getTask(token: string) {
  const response = await fetch(`https://zadania.aidevs.pl/task/${token}`);

  if (!response.ok) {
    console.error({ response });
    process.exit(1);
  }

  const task = await response.json();

  console.log("Got task", { task });
  return task;
}

export async function sendAnswer(token: string, answer: any) {
  const response = await fetch(`https://zadania.aidevs.pl/answer/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer,
    }),
  });

  if (!response.ok) {
    console.error(response);
    process.exit(1);
  }

  try {
    const result = await response.json();

    console.log({ result });
  } catch (err) {
    console.log("TASK ERROR", err);
    process.exit(1);
  }
}
