import TeamFlag from "../common/TeamFlag.jsx";

function ChampionCard({ champion }) {
  return (
    <div className="mt-4 rounded-lg border border-yellow-400/40 bg-yellow-400/10 p-4 text-center shadow-[0_0_35px_rgba(250,204,21,0.12)]">
      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-400">
        Champion
      </p>

      {champion ? (
        <div className="mt-3 flex flex-col items-center">
          <TeamFlag team={champion} large />

          <h2 className="mt-3 max-w-full truncate text-[clamp(16px,1.2vw,24px)] font-black uppercase leading-none text-white">
            {champion.name}
          </h2>
        </div>
      ) : (
        <h2 className="mt-3 text-[clamp(18px,1.35vw,26px)] font-black uppercase leading-tight text-zinc-500">
          Pick Winner
        </h2>
      )}
    </div>
  );
}

export default ChampionCard;