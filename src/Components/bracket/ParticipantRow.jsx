import TeamFlag from "../common/TeamFlag.jsx";

function ParticipantRow({ participant, winner, onClick }) {
  const hasTeam = Boolean(participant?.team);
  const isWinner = winner?.team?.id === participant?.team?.id;

  return (
    <button
      type="button"
      disabled={!hasTeam}
      onClick={onClick}
      className={[
        "flex min-h-[42px] w-full min-w-0 items-center gap-2 border-b border-white/10 px-2.5 text-left transition last:border-b-0",
        hasTeam
          ? "hover:bg-yellow-400/10"
          : "cursor-not-allowed bg-white/[0.02]",
        isWinner &&
          "bg-yellow-400/20 shadow-[inset_3px_0_0_rgba(250,204,21,0.95)]",
      ].join(" ")}
    >
      {hasTeam ? (
        <>
          <TeamFlag team={participant.team} />

          <p
            className={[
              "min-w-0 truncate font-black uppercase leading-none text-white",
              "text-[clamp(9px,0.65vw,12px)]",
              isWinner && "text-yellow-100",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {participant.team.name}
          </p>
        </>
      ) : (
        <>
          <div className="h-4 w-6 shrink-0 rounded-sm bg-white/[0.06]" />
          <div className="h-2.5 w-16 rounded bg-white/[0.06]" />
        </>
      )}
    </button>
  );
}

export default ParticipantRow;