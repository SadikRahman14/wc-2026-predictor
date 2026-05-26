import fs from "node:fs/promises";
import * as cheerio from "cheerio";

const SOURCE_URL =
  "https://en.wikipedia.org/wiki/Template:2026_FIFA_World_Cup_third-place_table";

const WINNER_SLOTS = ["1A", "1B", "1D", "1E", "1G", "1I", "1K", "1L"];

async function main() {
  const response = await fetch(SOURCE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch table: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const lookup = {};

  $("table tr").each((_, row) => {
    const cells = $(row)
      .find("th, td")
      .map((_, cell) =>
        $(cell)
          .text()
          .replace(/\s+/g, " ")
          .trim(),
      )
      .get();

    if (!cells.length) return;

    const optionNumber = cells[0];

    if (!/^\d+$/.test(optionNumber)) return;

    const opponents = cells.slice(-8);
    const groupsText = cells.slice(1, -8).join(" ");
    const groups = groupsText.match(/[A-L]/g) || [];

    if (groups.length !== 8) return;

    const key = groups.join("");

    const isValidOpponentRow = opponents.every((opponent) =>
      /^3[A-L]$/.test(opponent),
    );

    if (!isValidOpponentRow) return;

    lookup[key] = Object.fromEntries(
      WINNER_SLOTS.map((slot, index) => [slot, opponents[index]]),
    );
  });

  const keys = Object.keys(lookup);

  if (keys.length !== 495) {
    throw new Error(`Expected 495 combinations, got ${keys.length}`);
  }

  const fileContent = `export const THIRD_PLACE_LOOKUP = ${JSON.stringify(
    lookup,
    null,
    2,
  )};
`;

  await fs.mkdir("src/data", { recursive: true });
  await fs.writeFile("src/data/thirdPlaceLookup.js", fileContent);

  console.log("Created src/data/thirdPlaceLookup.js");
  console.log(`Total combinations: ${keys.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});