// One Word for the Boss — make.fun entry (program/v1, Node stdlib only).
//
// The deliverable is exactly one word written to /output/entry.txt: the
// single word that describes the entrant's boss. No phrase, no caption,
// no explanation — the word is the whole entry.
//
// The word: "Micromanager". Every worker knows this boss — the one who
// proofreads your Slack messages, re-opens the ticket you just closed,
// and asks for a status update on the status update. One word names that
// exact lived annoyance, and a judge reading it pictures the same person
// immediately: funny at once, true, and needing zero context.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry word. Twelve letters, one word, no spaces, no punctuation.
const WORD = "Micromanager";

// The kit gate allows a single word of 1-30 letters. The maximum length
// is a named constant so the rule reads as a rule, not a magic number.
const MAX_WORD_LENGTH = 30;

// Gate check, mirroring the kit gate: a single word of letters only,
// within the length cap. Throws instead of writing an invalid entry,
// so a bad word can never reach the output file.
function assertEntryWord(word: string): void {
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error(`entry word is not a single word of letters: ${JSON.stringify(word)}`);
  }
  if (word.length < 1 || word.length > MAX_WORD_LENGTH) {
    throw new Error(`entry word fails the length gate (1-${MAX_WORD_LENGTH}): ${JSON.stringify(word)}`);
  }
}

// The output directory and file are named constants: the program has
// exactly one destination, and it is spelled out once, up top.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

function main(): void {
  assertEntryWord(WORD);

  // Create /output if needed. The output directory itself is never deleted.
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Write the word exactly, with no trailing newline and nothing else,
  // so repeated runs produce byte-identical output.
  writeFileSync(OUTPUT_FILE, WORD, "utf8");

  // Verify the write: read the file back and confirm it holds exactly the
  // word, so a partial or altered write is caught here, not by the grader.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== WORD) {
    throw new Error(`verify failed: ${OUTPUT_FILE} holds ${JSON.stringify(written)}`);
  }
}

main();
