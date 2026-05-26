import { laterRoundMatches } from "../data/bracketMatches.js";

export function resolveParticipant(source, context) {
  if (!source) return null;

  if (typeof source === "string") {
    return getTeamFromSlot(source, context.standings);
  }

  if (source.thirdFor) {
    const thirdSlot = context.thirdPlaceMap?.[source.thirdFor];

    if (!thirdSlot) {
      return null;
    }

    return getTeamFromSlot(thirdSlot, context.standings);
  }

  if (source.winnerOf) {
    const winner = context.knockoutWinners[source.winnerOf];

    if (!winner) {
      return {
        team: null,
      };
    }

    return {
      ...winner,
    };
  }

  return null;
}

export function getTeamFromSlot(slot, standings) {
  const position = Number(slot[0]);
  const groupLetter = slot[1];
  const team = standings[groupLetter]?.[position - 1];

  if (!team) {
    return {
      team: null,
      slot,
    };
  }

  return {
    team,
    slot,
  };
}

export function getDependentMatches(matchId) {
  const dependents = [];

  function collect(currentMatchId) {
    for (const match of laterRoundMatches) {
      const sources = [match.a, match.b];

      const dependsOnCurrent = sources.some(
        (source) => source.winnerOf === currentMatchId,
      );

      if (dependsOnCurrent) {
        dependents.push(match.id);
        collect(match.id);
      }
    }
  }

  collect(matchId);

  return dependents;
}