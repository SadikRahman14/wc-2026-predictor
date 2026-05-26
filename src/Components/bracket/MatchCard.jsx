import ParticipantRow from "./ParticipantRow.jsx";

function MatchCard({ match, winner, isFinal, onChooseWinner }) {
  if (!match) return null;

  return (
    <article
      className={[
        "min-w-0 overflow-hidden rounded-lg border bg-[#111111] shadow-xl shadow-black/35",
        isFinal
          ? "border-yellow-400/50 shadow-[0_0_40px_rgba(250,204,21,0.12)]"
          : "border-white/10",
      ].join(" ")}
    >
      <ParticipantRow
        participant={match.teamA}
        winner={winner}
        onClick={() => onChooseWinner(match.id, match.teamA)}
      />

      <ParticipantRow
        participant={match.teamB}
        winner={winner}
        onClick={() => onChooseWinner(match.id, match.teamB)}
      />
    </article>
  );
}

export default MatchCard;