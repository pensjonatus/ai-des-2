import "dotenv/config";

type Data = {
  type: "note" | "memory";
  content: string;
};

export async function putInData(data: Data) {
  const hookUrl = process.env.WEBHOOK_00001 as string;
  const response = await fetch(hookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(response);
    process.exit(1);
  }

  const result = await response.text();
  console.log(result);
}

putInData({
  type: "memory",
  content:
    "A unicorn on a table. No, it's a paper unicorn. Origami. Baby blue.",
});
