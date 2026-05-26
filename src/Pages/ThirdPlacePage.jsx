import { useEffect, useMemo } from "react";
import { groups } from "../data/groups.js";
import TeamFlag from "../Components/common/TeamFlag.jsx";

function ThirdPlacePage({
  standings,
  selectedThirdIds,
  setSelectedThirdIds,
  setKnockoutWinners,
  onGoToBracket,
}) {
  const thirdPlaceCandidates = useMemo(() => {
    return groups.map((group) => {
      const team = standings[group.letter]?.[2];

      return {
        groupLetter: group.letter,
        slot: `3${group.letter}`,
        team,
      };
    });
  }, [standings]);

  const validThirdIds = useMemo(() => {
    return new Set(
      thirdPlaceCandidates
        .filter((candidate) => candidate.team)
        .map((candidate) => candidate.team.id),
    );
  }, [thirdPlaceCandidates]);

  useEffect(() => {
    setSelectedThirdIds((current) =>
      current.filter((teamId) => validThirdIds.has(teamId)),
    );
  }, [setSelectedThirdIds, validThirdIds]);

  const selectedCount = selectedThirdIds.length;
  const isComplete = selectedCount === 8;

  function toggleThirdPlace(candidate) {
    if (!candidate.team) return;

    setSelectedThirdIds((current) => {
      const alreadySelected = current.includes(candidate.team.id);

      if (alreadySelected) {
        return current.filter((id) => id !== candidate.team.id);
      }

      if (current.length >= 8) return current;

      return [...current, candidate.team.id];
    });

    setKnockoutWinners({});
  }

  return (
    <section className="bg-[#050505] px-4 py-8 text-white">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-yellow-400">
            Step 2
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-wide md:text-6xl">
            Third Place
            </h1>
        </div>

        
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
              Qualification Progress
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              {selectedCount}/8 selected
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Select the best third-placed teams from the 12 groups.
            </p>
          </div>

          <button
            type="button"
            disabled={!isComplete}
            onClick={onGoToBracket}
            className={[
              "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.22em] transition",
              isComplete
                ? "bg-yellow-400 text-black shadow-[0_0_30px_rgba(250,204,21,0.25)] hover:bg-yellow-300"
                : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-zinc-600",
            ].join(" ")}
          >
            Go to Bracket
            <span
              className={[
                "transition",
                isComplete && "group-hover:translate-x-1",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              →
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {thirdPlaceCandidates.map((candidate) => {
            const group = groups.find(
              (groupItem) => groupItem.letter === candidate.groupLetter,
            );

            const groupStandings = standings[candidate.groupLetter] || [];

            const isSelected = selectedThirdIds.includes(candidate.team?.id);
            const isDisabled = !candidate.team;
            const isMaxReached = selectedCount >= 8 && !isSelected;

            return (
              <ThirdPlaceCard
                key={candidate.groupLetter}
                candidate={candidate}
                group={group}
                groupStandings={groupStandings}
                isSelected={isSelected}
                isDisabled={isDisabled || isMaxReached}
                onClick={() => toggleThirdPlace(candidate)}
              />
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#101010] p-5">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            How it works
          </p>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            The top two teams from every group qualify automatically. From the
            12 third-placed teams, only 8 qualify. After you select those 8, the
            app generates the Round of 32 bracket.
          </p>
        </div>
      </div>
    </section>
  );
}

function ThirdPlaceCard({
  candidate,
  group,
  groupStandings,
  isSelected,
  isDisabled,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={[
        "group relative overflow-visible rounded-xl border p-3 text-left transition duration-300",
        isSelected
          ? "border-yellow-400/70 bg-yellow-400/15 shadow-[0_0_24px_rgba(250,204,21,0.12)]"
          : "border-white/10 bg-[#111111] hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/10",
        isDisabled && !isSelected && "cursor-not-allowed opacity-35",
      ].join(" ")}
    >
      {candidate.team && group && (
        <GroupHoverCard
          group={group}
          groupStandings={groupStandings}
          thirdPlaceTeamId={candidate.team.id}
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs font-black text-yellow-300">
          {candidate.slot}
        </div>

        {isSelected && (
          <span className="rounded-full bg-yellow-400 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-black">
            In
          </span>
        )}
      </div>

      {candidate.team ? (
        <div className="mt-4 flex items-center gap-2">
          <TeamFlag team={candidate.team} />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-black uppercase text-white">
              {candidate.team.name}
            </h3>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Group {candidate.groupLetter}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-sm font-black uppercase text-zinc-500">
            Incomplete
          </h3>

          <p className="mt-1 text-[11px] font-medium text-zinc-600">
            Complete group first.
          </p>
        </div>
      )}
    </button>
  );
}

function GroupHoverCard({ group, groupStandings, thirdPlaceTeamId }) {
  return (
    <div className="pointer-events-none absolute -top-4 left-1/2 z-50 w-64 -translate-x-1/2 -translate-y-full rounded-2xl border border-yellow-400/30 bg-[#171717] p-3 opacity-0 shadow-2xl shadow-black/60 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
          Group {group.letter}
        </p>

        {group.strength && (
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-zinc-400">
            {group.strength}
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
        {groupStandings.map((team, index) => {
          const isThirdPlaceTeam = team?.id === thirdPlaceTeamId;

          return (
            <div
              key={team?.id || index}
              className={[
                "flex items-center gap-2 border-b border-white/10 px-3 py-2 last:border-b-0",
                isThirdPlaceTeam
                  ? "bg-yellow-400/15 text-yellow-100"
                  : "text-zinc-300",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black",
                  isThirdPlaceTeam
                    ? "bg-yellow-400 text-black"
                    : "bg-white/[0.07] text-zinc-500",
                ].join(" ")}
              >
                {index + 1}
              </span>

              {team ? (
                <>
                  <TeamFlag team={team} />

                  <p className="min-w-0 truncate text-xs font-black uppercase">
                    {team.name}
                  </p>
                </>
              ) : (
                <p className="text-xs font-black uppercase text-zinc-600">
                  Empty
                </p>
              )}

              {isThirdPlaceTeam && (
                <span className="ml-auto rounded-full bg-yellow-400 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-black">
                  3rd
                </span>
              )}
            </div>
          );
        })}
      </div>

      <span className="absolute bottom-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-yellow-400/30 bg-[#171717]" />
    </div>
  );
}

export default ThirdPlacePage;