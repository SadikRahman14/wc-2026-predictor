import TeamFlag from "../common/TeamFlag.jsx";

function BracketSharePanel({ champion, isExporting, onShare }) {
  return (
    <section className="mt-8 rounded-2xl bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Final Step
          </p>

          {champion ? (
            <div className="mt-3 flex items-center gap-3">
              <TeamFlag team={champion} large />

              <div>
                <h2 className="text-2xl font-black uppercase text-white">
                  {champion.name} wins it
                </h2>

                <p className="mt-1 text-sm font-medium text-zinc-500">
                  Snapshot your bracket and share your prediction.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="mt-3 text-2xl font-black uppercase text-white">
                Pick your champion
              </h2>

              <p className="mt-1 text-sm font-medium text-zinc-500">
                The share button unlocks after the final winner is selected.
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          disabled={!champion || isExporting}
          onClick={onShare}
          className={[
            "inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.22em] transition",
            champion && !isExporting
              ? "bg-yellow-400 text-black shadow-[0_0_30px_rgba(250,204,21,0.25)] hover:bg-yellow-300"
              : "cursor-not-allowed bg-white/[0.05] text-zinc-600",
          ].join(" ")}
        >
          {isExporting ? "Creating..." : "Share Bracket"}

        </button>
      </div>
    </section>
  );
}

export default BracketSharePanel;