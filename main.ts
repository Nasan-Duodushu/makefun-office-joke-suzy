// One-Line Office Joke Laugh-Off — entry program.
// Writes one office joke (1-200 chars, single line) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const SETUP = "The office has a 'quick question' Slack channel.";
const PUNCH = "It is neither quick nor a question; it is a 47-message hostage situation.";

const JOKE = `${SETUP} ${PUNCH}`;

async function main(): Promise<void> {
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`joke is ${chars} chars, outside the 1-200 gate`);
  }
  if (JOKE.includes("\n") || JOKE.trim() !== JOKE) {
    throw new Error("joke must be a single trimmed line");
  }
  if (!/office|slack|channel/i.test(JOKE)) {
    throw new Error("joke must be about office life");
  }
  await mkdir("/output", { recursive: true });
  await writeFile("/output/entry.txt", JOKE, "utf8");
  console.log(`wrote ${chars} chars to /output/entry.txt`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
