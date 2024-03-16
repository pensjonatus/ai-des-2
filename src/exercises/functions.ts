import { getTask, getToken, sendAnswer } from "../modules/task-management";

async function defineFunction() {
  const token = await getToken("functions");
  const task = await getTask(token);

  const functionDefinition = {
    name: "addUser",
    description: "Add a new user with all the required properties",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "First name, given name, Christian name, or Muslim name",
        },
        surname: {
          type: "string",
          description:
            "The other part of their name. Like, the rest of the name.",
        },
        year: {
          type: "integer",
          description: "The year they were born",
        },
      },
      required: ["name", "surname", "year"],
    },
  };

  sendAnswer(token, functionDefinition);
}

defineFunction();
