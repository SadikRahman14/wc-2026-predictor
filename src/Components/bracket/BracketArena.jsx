import { bracketLayout } from "../../data/bracketLayout.js";
import BracketColumn from "./BracketColumn.jsx";

function BracketArena({ matches, winners, champion, onChooseWinner }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#070707] shadow-2xl shadow-black/50">
      <div className="w-full overflow-hidden">
        <div className="grid w-full grid-cols-[1fr_0.75fr_0.75fr_0.7fr_0.9fr_0.7fr_0.75fr_0.75fr_1fr] gap-2 px-3 py-7">
          {bracketLayout.map((column) => (
            <BracketColumn
              key={`${column.title}-${column.matchIds.join("-")}`}
              column={column}
              matches={matches}
              winners={winners}
              champion={champion}
              onChooseWinner={onChooseWinner}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BracketArena;