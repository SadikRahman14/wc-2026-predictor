import { useEffect, useState } from "react";
import { teamStats } from "../../data/teamStats.js";
import TeamFlag from "../common/TeamFlag.jsx";

function GroupFormGuide({ group }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!isMobileOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  return (
    <div className="group/form relative">
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 transition hover:bg-yellow-400 hover:text-black"
      >
        Form
      </button>

      {/* Desktop: hover popover */}
      <div className="pointer-events-none absolute right-0 top-full z-50 mt-3 hidden w-[min(92vw,520px)] translate-y-2 rounded-2xl bg-[#171717]/95 p-3 opacity-0 shadow-2xl shadow-black/70 backdrop-blur-xl transition duration-200 group-hover/form:translate-y-0 group-hover/form:opacity-100 md:block">
        <GroupFormTable group={group} />
      </div>

      {/* Mobile: clickable modal */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-lg md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-[#111111] p-4 shadow-2xl shadow-black/80"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
                  Group {group.letter}
                </p>

                <h3 className="mt-1 text-xl font-black uppercase text-white">
                  Form Guide
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-lg font-black text-zinc-400 transition hover:bg-yellow-400 hover:text-black"
                aria-label="Close form guide"
              >
                ×
              </button>
            </div>

            <GroupFormTable group={group} compact />
          </div>
        </div>
      )}
    </div>
  );
}

function GroupFormTable({ group, compact = false }) {
  return (
    <>
      {!compact && (
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
            Group {group.letter} Form Guide
          </p>

          {group.strength && (
            <span className="rounded-full bg-white/[0.06] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-zinc-500">
              {group.strength}
            </span>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-xl bg-black/35">
        <div
          className={[
            "grid gap-2 px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600",
            compact
              ? "grid-cols-[48px_1fr_54px]"
              : "grid-cols-[56px_1fr_70px_94px]",
          ].join(" ")}
        >
          <span>Rank</span>
          <span>Nation</span>
          {!compact && <span>Move</span>}
          <span>Form</span>
        </div>

        {group.teams.map((team) => {
          const stats = teamStats[team.id];

          return (
            <div
              key={team.id}
              className={[
                "grid items-center gap-2 border-t border-white/10 px-3 py-2",
                compact
                  ? "grid-cols-[48px_1fr_54px]"
                  : "grid-cols-[56px_1fr_70px_94px]",
              ].join(" ")}
            >
              <p className="text-sm font-black text-white">
                {stats ? `#${stats.fifaRank}` : "—"}
              </p>

              <div className="flex min-w-0 items-center gap-2">
                <TeamFlag team={team} />

                <div className="min-w-0">
                  <p className="truncate text-xs font-black uppercase text-zinc-200">
                    {team.name}
                  </p>

                  {compact && <Movement movement={stats?.movement} small />}
                </div>
              </div>

              {!compact && <Movement movement={stats?.movement} />}

              <div className="flex items-center gap-1">
                {(stats?.form || ["?", "?", "?", "?", "?"]).map(
                  (result, index) => (
                    <FormCircle
                      key={`${team.id}-${index}`}
                      result={result}
                      small={compact}
                    />
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Movement({ movement = 0, small = false }) {
  const sizeClass = small ? "text-[9px]" : "text-xs";

  if (movement > 0) {
    return (
      <span className={`${sizeClass} font-black text-emerald-400`}>
        ↑ {movement}
      </span>
    );
  }

  if (movement < 0) {
    return (
      <span className={`${sizeClass} font-black text-rose-400`}>
        ↓ {Math.abs(movement)}
      </span>
    );
  }

  return <span className={`${sizeClass} font-black text-zinc-600`}>—</span>;
}

function FormCircle({ result, small = false }) {
  const styles = {
    W: "bg-emerald-500 text-white",
    L: "bg-rose-500 text-white",
    D: "bg-zinc-600 text-white",
    "?": "bg-zinc-800 text-zinc-500",
  };

  return (
    <span
      className={[
        "flex items-center justify-center rounded-full font-black",
        small ? "h-4 w-4 text-[8px]" : "h-5 w-5 text-[10px]",
        styles[result] || styles["?"],
      ].join(" ")}
    >
      {result}
    </span>
  );
}

export default GroupFormGuide;