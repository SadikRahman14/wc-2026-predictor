import { useMemo, useRef, useState } from "react";
import { groups } from "../data/groups.js";
import {
  laterRoundMatches,
  roundOf32Matches,
} from "../data/bracketMatches.js";
import { THIRD_PLACE_LOOKUP } from "../data/thirdPlaceLookup.js";
import {
  getDependentMatches,
  resolveParticipant,
} from "../Utils/bracketUtils.js";
import { shareBracketImage } from "../Utils/shareBracketImage.js";
import BracketArena from "../Components/bracket/BracketArena.jsx";
import MobileBracketFlow from "../Components/bracket/MobileBracketFlow.jsx";
import BracketSharePanel from "../Components/bracket/BracketSharePanel.jsx";

function BracketPage({
  standings,
  selectedThirdIds,
  knockoutWinners,
  setKnockoutWinners,
}) {
  const bracketCaptureRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const selectedThirdLetters = useMemo(() => {
    return groups
      .filter((group) => {
        const thirdPlacedTeam = standings[group.letter]?.[2];
        return selectedThirdIds.includes(thirdPlacedTeam?.id);
      })
      .map((group) => group.letter)
      .sort();
  }, [standings, selectedThirdIds]);

  const thirdPlaceMap = useMemo(() => {
    if (selectedThirdLetters.length !== 8) return null;

    const lookupKey = selectedThirdLetters.join("");

    return THIRD_PLACE_LOOKUP[lookupKey] || null;
  }, [selectedThirdLetters]);

  const resolvedMatches = useMemo(() => {
    const matches = {};

    for (const match of [...roundOf32Matches, ...laterRoundMatches]) {
      matches[match.id] = {
        ...match,
        teamA: resolveParticipant(match.a, {
          standings,
          thirdPlaceMap,
          knockoutWinners,
        }),
        teamB: resolveParticipant(match.b, {
          standings,
          thirdPlaceMap,
          knockoutWinners,
        }),
      };
    }

    return matches;
  }, [standings, thirdPlaceMap, knockoutWinners]);

  const champion = knockoutWinners.M104?.team;

  function chooseWinner(matchId, participant) {
    if (!participant?.team) return;

    setKnockoutWinners((current) => {
      const updated = {
        ...current,
        [matchId]: participant,
      };

      const dependentIds = getDependentMatches(matchId);

      for (const dependentId of dependentIds) {
        delete updated[dependentId];
      }

      return updated;
    });
  }

  async function handleShareBracket() {
    if (!champion) return;

    try {
      setIsExporting(true);

      await shareBracketImage(bracketCaptureRef.current, {
        fileName: `world-cup-2026-${champion.id}-bracket.png`,
      });
    } catch (error) {
      console.error("Failed to create bracket snapshot:", error);
      alert("Could not create the bracket image. Try again.");
    } finally {
      setIsExporting(false);
    }
  }

  if (!thirdPlaceMap) {
    return (
      <section className="bg-[#050505] px-4 py-20 text-white">
        <div className="mx-auto max-w-[1180px] rounded-3xl bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/40">
          <h1 className="text-3xl font-black uppercase text-white">
            Select 8 third-place teams first
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050505] px-4 py-8 text-white">
      <div className="mx-auto max-w-[1500px]">
        {/* Visible bracket area */}
        <div className="rounded-[2rem] bg-[#050505] p-3">
          <div className="hidden lg:block">
            <BracketArena
              matches={resolvedMatches}
              winners={knockoutWinners}
              champion={champion}
              onChooseWinner={chooseWinner}
            />
          </div>

          <div className="lg:hidden">
            <MobileBracketFlow
              matches={resolvedMatches}
              winners={knockoutWinners}
              champion={champion}
              onChooseWinner={chooseWinner}
            />
          </div>
        </div>

        {/* Hidden desktop bracket used only for PNG export */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 -z-10 w-[1500px] bg-[#050505] p-4 text-white"
        >
          <div ref={bracketCaptureRef} className="bg-[#050505]">
            <BracketArena
              matches={resolvedMatches}
              winners={knockoutWinners}
              champion={champion}
              onChooseWinner={() => {}}
            />
          </div>
        </div>

        <BracketSharePanel
          champion={champion}
          isExporting={isExporting}
          onShare={handleShareBracket}
        />
      </div>
    </section>
  );
}

export default BracketPage;