import ChampionCard from "./ChampionCard.jsx";
import MatchCard from "./MatchCard.jsx";
import trophyImage from "../../assets/wc.png";

function BracketColumn({
  column,
  matches,
  winners,
  champion,
  onChooseWinner,
}) {
  const count = column.matchIds.length;

  const spacingClass =
    count === 8
      ? "gap-3"
      : count === 4
        ? "justify-around"
        : count === 2
          ? "justify-around py-16"
          : "justify-center";

  return (
    <div className="flex min-h-[650px] min-w-0 flex-col">
      <h3 className="mb-4 min-h-8 text-center text-[10px] font-black uppercase tracking-[0.32em] text-zinc-400">
        {column.title}
      </h3>

      <div className={["flex flex-1 flex-col", spacingClass].join(" ")}>
        {column.isFinal && (
          <div className="mb-3 flex justify-center">
            <img
                src={trophyImage}
                alt="World Cup trophy"
                className="h-40 w-25 object-contain drop-shadow-[0_0_18px_rgba(250,204,21,0.35)]"
                draggable="false"
            />
            </div>
        )}

        {column.matchIds.map((matchId) => (
          <MatchCard
            key={matchId}
            match={matches[matchId]}
            winner={winners[matchId]}
            isFinal={column.isFinal}
            onChooseWinner={onChooseWinner}
          />
        ))}

        {column.isFinal && <ChampionCard champion={champion} />}
      </div>
    </div>
  );
}

export default BracketColumn;