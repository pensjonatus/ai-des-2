import { readFileSync } from "fs";

const fileContents = readFileSync("./index.ts", "utf-8");

console.log("Hello from AI devs!", fileContents);
