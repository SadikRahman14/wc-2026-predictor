import { groups } from "../data/groups.js";
import { teamStats } from "../data/teamStats.js";

export function createRankedStandings() {
  return groups.reduce((acc, group) => {
    acc[group.letter] = [...group.teams].sort((teamA, teamB) => {
      const rankA = teamStats[teamA.id]?.fifaRank ?? 999;
      const rankB = teamStats[teamB.id]?.fifaRank ?? 999;

      return rankA - rankB;
    });

    return acc;
  }, {});
}