export const roundOf32Matches = [
  { id: "M73", a: "2A", b: "2B" },
  { id: "M74", a: "1E", b: { thirdFor: "1E" } },
  { id: "M75", a: "1F", b: "2C" },
  { id: "M76", a: "1C", b: "2F" },
  { id: "M77", a: "1I", b: { thirdFor: "1I" } },
  { id: "M78", a: "2E", b: "2I" },
  { id: "M79", a: "1A", b: { thirdFor: "1A" } },
  { id: "M80", a: "1L", b: { thirdFor: "1L" } },

  { id: "M81", a: "1D", b: { thirdFor: "1D" } },
  { id: "M82", a: "1G", b: { thirdFor: "1G" } },
  { id: "M83", a: "2K", b: "2L" },
  { id: "M84", a: "1H", b: "2J" },
  { id: "M85", a: "1B", b: { thirdFor: "1B" } },
  { id: "M86", a: "1J", b: "2H" },
  { id: "M87", a: "1K", b: { thirdFor: "1K" } },
  { id: "M88", a: "2D", b: "2G" },
];

export const laterRoundMatches = [
  { id: "M89", a: { winnerOf: "M74" }, b: { winnerOf: "M77" } },
  { id: "M90", a: { winnerOf: "M73" }, b: { winnerOf: "M75" } },
  { id: "M91", a: { winnerOf: "M76" }, b: { winnerOf: "M78" } },
  { id: "M92", a: { winnerOf: "M79" }, b: { winnerOf: "M80" } },

  { id: "M93", a: { winnerOf: "M83" }, b: { winnerOf: "M84" } },
  { id: "M94", a: { winnerOf: "M81" }, b: { winnerOf: "M82" } },
  { id: "M95", a: { winnerOf: "M86" }, b: { winnerOf: "M88" } },
  { id: "M96", a: { winnerOf: "M85" }, b: { winnerOf: "M87" } },

  { id: "M97", a: { winnerOf: "M89" }, b: { winnerOf: "M90" } },
  { id: "M98", a: { winnerOf: "M93" }, b: { winnerOf: "M94" } },
  { id: "M99", a: { winnerOf: "M91" }, b: { winnerOf: "M92" } },
  { id: "M100", a: { winnerOf: "M95" }, b: { winnerOf: "M96" } },

  { id: "M101", a: { winnerOf: "M97" }, b: { winnerOf: "M98" } },
  { id: "M102", a: { winnerOf: "M99" }, b: { winnerOf: "M100" } },

  { id: "M104", a: { winnerOf: "M101" }, b: { winnerOf: "M102" } },
];