import TeamFlag from "../common/TeamFlag.jsx";

function BracketSharePanel({ champion, isExporting, onShare }) {
  if (!champion) {
    return (
      <section className="mt-8 rounded-2xl bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Final Step
          </p>

          <h2 className="text-2xl font-black uppercase text-white">
            Pick your champion
          </h2>

          <p className="text-sm font-medium text-zinc-500">
            Once the final winner is selected, your prediction will be ready to
            save and share.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 overflow-hidden rounded-[2rem] bg-yellow-400/10 p-1 shadow-[0_0_45px_rgba(250,204,21,0.1)]">
      <div className="relative overflow-hidden rounded-[1.8rem] bg-[#101010] p-6 shadow-2xl shadow-black/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%)]" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.38em] text-yellow-400">
              Prediction Complete
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-20 items-center justify-center rounded-2xl bg-yellow-400/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <TeamFlag team={champion} large />
              </div>

              <div>
                <h2 className="text-3xl font-black uppercase leading-none text-white md:text-4xl">
                  {champion.name}
                </h2>

                <p className="mt-2 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                  Your World Cup 2026 Champion
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={isExporting}
            onClick={onShare}
            className={[
              "group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-black uppercase tracking-[0.22em] transition",
              isExporting
                ? "cursor-wait bg-white/[0.06] text-zinc-600"
                : "bg-yellow-400 text-black shadow-[0_0_35px_rgba(250,204,21,0.28)] hover:scale-105 hover:bg-yellow-300",
            ].join(" ")}
          >
            {isExporting ? "Creating..." : "Save & Share"}
            
          </button>
        </div>
      </div>
    </section>
  );
}

export default BracketSharePanel;