import { knockoutRoundOrder } from "../../data/knockoutRoundOrder.js";
import TeamFlag from "../common/TeamFlag.jsx";

function MobileBracketFlow({ matches, winners, champion, onChooseWinner }) {
  const totalMatches = knockoutRoundOrder.reduce(
    (total, round) => total + round.matchIds.length,
    0,
  );

  const completedMatches = knockoutRoundOrder.reduce((total, round) => {
    const roundCompleted = round.matchIds.filter(
      (matchId) => winners[matchId],
    ).length;

    return total + roundCompleted;
  }, 0);

  return (
    <section className="rounded-3xl bg-[#070707] p-4 shadow-2xl shadow-black/40">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
            Mobile Bracket
          </p>

          <h2 className="mt-1 text-xl font-black uppercase text-white">
            Match List
          </h2>
        </div>

        <div className="rounded-full bg-white/[0.06] px-3 py-2 text-xs font-black text-zinc-400">
          {completedMatches}/{totalMatches}
        </div>
      </div>

      {champion && (
        <div className="mb-5 rounded-2xl bg-yellow-400/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
            Champion
          </p>

          <div className="mt-2 flex items-center gap-3">
            <TeamFlag team={champion} large />

            <h3 className="min-w-0 truncate text-2xl font-black uppercase text-white">
              {champion.name}
            </h3>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {knockoutRoundOrder.map((round) => (
          <MobileRoundSection
            key={round.title}
            round={round}
            matches={matches}
            winners={winners}
            onChooseWinner={onChooseWinner}
          />
        ))}
      </div>
    </section>
  );
}

function MobileRoundSection({ round, matches, winners, onChooseWinner }) {
  const roundCompleted = round.matchIds.filter(
    (matchId) => winners[matchId],
  ).length;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-[0.28em] text-yellow-400">
          {round.title}
        </h3>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
          {roundCompleted}/{round.matchIds.length}
        </p>
      </div>

      <div className="space-y-3">
        {round.matchIds.map((matchId) => (
          <MobileMatchCard
            key={matchId}
            match={matches[matchId]}
            winner={winners[matchId]}
            onChooseWinner={onChooseWinner}
          />
        ))}
      </div>
    </section>
  );
}

function MobileMatchCard({ match, winner, onChooseWinner }) {
  const hasBothTeams = Boolean(match?.teamA?.team && match?.teamB?.team);

  if (!match) return null;

  return (
    <article
      className={[
        "overflow-hidden rounded-2xl bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]",
        !hasBothTeams && "opacity-55",
      ].join(" ")}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
          {match.id}
        </p>

        {winner?.team ? (
          <p className="max-w-[160px] truncate text-[10px] font-black uppercase tracking-[0.18em] text-yellow-400">
            {winner.team.name}
          </p>
        ) : hasBothTeams ? (
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
            Pick winner
          </p>
        ) : (
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-700">
            Pending
          </p>
        )}
      </div>

      {hasBothTeams ? (
        <div className="grid gap-px bg-white/10">
          <MobileParticipantButton
            participant={match.teamA}
            isWinner={winner?.team?.id === match.teamA?.team?.id}
            onClick={() => onChooseWinner(match.id, match.teamA)}
          />

          <MobileParticipantButton
            participant={match.teamB}
            isWinner={winner?.team?.id === match.teamB?.team?.id}
            onClick={() => onChooseWinner(match.id, match.teamB)}
          />
        </div>
      ) : (
        <div className="px-4 pb-4">
          <div className="rounded-2xl bg-black/30 px-4 py-5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600">
              Waiting for previous winners
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

function MobileParticipantButton({ participant, isWinner, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex min-h-[58px] items-center gap-3 px-4 py-3 text-left transition",
        isWinner
          ? "bg-yellow-400 text-black"
          : "bg-[#101010] text-white hover:bg-yellow-400/10",
      ].join(" ")}
    >
      <TeamFlag team={participant.team} />

      <div className="min-w-0 flex-1">
        <h4
          className={[
            "truncate text-base font-black uppercase",
            isWinner ? "text-black" : "text-white",
          ].join(" ")}
        >
          {participant.team.name}
        </h4>

        <p
          className={[
            "mt-1 text-[9px] font-black uppercase tracking-[0.22em]",
            isWinner ? "text-black/60" : "text-zinc-600",
          ].join(" ")}
        >
          {isWinner ? "Selected" : "Tap to choose"}
        </p>
      </div>

      <span
        className={[
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black",
          isWinner
            ? "bg-black text-yellow-400"
            : "bg-white/[0.06] text-zinc-600",
        ].join(" ")}
      >
        {isWinner ? "✓" : ""}
      </span>
    </button>
  );
}

export default MobileBracketFlow;