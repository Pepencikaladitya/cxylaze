import readline from "readline";

/* ===== NEON COLORS ===== */
const reset = "\x1b[0m";
const green = t => `\x1b[92m${t}${reset}`;
const red = t => `\x1b[91m${t}${reset}`;
const cyan = t => `\x1b[96m${t}${reset}`;
const yellow = t => `\x1b[93m${t}${reset}`;
const magenta = t => `\x1b[95m${t}${reset}`;
const blue = t => `\x1b[94m${t}${reset}`;
const white = t => `\x1b[97m${t}${reset}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* ===== GAME STATE ===== */
let lives = 5;
let xp = 0;
let rank = "Script Kiddie";
let stage = 1;

/* ===== UTIL ===== */
function clear() { console.clear(); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function beep() { process.stdout.write("\x07"); }

function updateRank() {
  if (xp >= 200) rank = "Cyber Overlord";
  else if (xp >= 120) rank = "Elite Hacker";
  else if (xp >= 60) rank = "Network Raider";
  else rank = "Script Kiddie";
}

function header() {
  console.log(blue("████████████████████████████████████"));
  console.log(cyan("        CYXLAZE BREACH // NEON"));
  console.log(blue("████████████████████████████████████"));
  console.log("");
  console.log(yellow("LIVES:"), red("❤".repeat(lives)));
  console.log(yellow("XP:"), green(xp));
  console.log(yellow("RANK:"), magenta(rank));
  console.log("");
}

/* ===== PROGRESS ===== */
async function progress(label) {
  console.log(magenta(label));
  let p = 0;
  while (p <= 100) {
    process.stdout.write("\r" + green("█".repeat(p/5)) + white(" ".repeat(20 - p/5)) + " " + yellow(p + "%"));
    await sleep(40);
    p += 5;
  }
  console.log("\n");
}

/* ===== CODE ===== */
function generateCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function timedInput(timeoutMs) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      resolve(null);
    }, timeoutMs);

    rl.question(magenta("INPUT > "), input => {
      clearTimeout(timer);
      resolve(input.trim().toUpperCase());
    });
  });
}

/* ===== CHALLENGE ===== */
async function challenge() {
  clear();
  header();

  const code = generateCode();

  console.log(red("FIREWALL STAGE " + stage));
  console.log("");
  console.log(cyan("ACCESS CODE:"), green(code));
  console.log(yellow("You have 3 seconds..."));
  console.log("");

  const answer = await timedInput(3000);

  if (!answer) {
    console.log(red("\nTIME EXPIRED!"));
    beep(); beep();
    lives--;
    return false;
  }

  if (answer === code) {
    console.log(green("\nACCESS GRANTED ✔"));
    beep();
    xp += 25;
    updateRank();
    stage++;
    return true;
  } else {
    console.log(red("\nACCESS DENIED ✖"));
    beep(); beep();
    lives--;
    return false;
  }
}

/* ===== GAME LOOP ===== */
async function main() {
  clear();
  header();

  console.log(green("BOOTING CYBER NODE..."));
  await sleep(800);

  await progress("CONNECTING...");
  await progress("BYPASSING ENCRYPTION...");

  while (lives > 0 && stage <= 5) {
    const result = await challenge();
    await sleep(1000);
  }

  clear();

  if (lives <= 0) {
    console.log(red("SYSTEM LOCKED"));
    console.log(yellow("FINAL XP:"), green(xp));
  } else {
    console.log(green("BREACH COMPLETE ⚡"));
    console.log(yellow("FINAL XP:"), green(xp));
    console.log(magenta("FINAL RANK:"), rank);
  }

  process.exit();
}

main();
