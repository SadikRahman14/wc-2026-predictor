import { useState } from "react";
import InfoModal from "./InfoModal.jsx";

const steps = [
  {
    id: "groups",
    number: 1,
    label: "GROUPS",
  },
  {
    id: "third-place",
    number: 2,
    label: "THIRD PLACE",
  },
  {
    id: "bracket",
    number: 3,
    label: "BRACKET",
  },
];

function TournamentNav({
  activeStep,
  onStepChange,
  isGroupsComplete,
  isThirdPlaceComplete,
}) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const activeIndex = steps.findIndex((step) => step.id === activeStep);

  function isStepLocked(stepId) {
    if (stepId === "groups") return false;
    if (stepId === "third-place") return !isGroupsComplete;
    if (stepId === "bracket") return !isGroupsComplete || !isThirdPlaceComplete;

    return false;
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070707]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
          <button
            type="button"
            onClick={() => onStepChange("groups")}
            className="hidden min-w-max text-left sm:block"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-400">
              WC 2026
            </p>
            <p className="mt-1 text-sm font-black uppercase tracking-[0.18em] text-white">
              Predictor
            </p>
          </button>

          <div className="relative flex min-w-0 flex-1 items-center justify-center">
            <div className="relative flex w-full max-w-3xl items-center justify-between">
              {steps.map((step, index) => {
                const isActive = step.id === activeStep;
                const isCompleted = index < activeIndex;
                const locked = isStepLocked(step.id);

                return (
                  <button
                    key={step.id}
                    type="button"
                    disabled={locked}
                    onClick={() => onStepChange(step.id)}
                    title={
                      locked ? "Complete the previous step first" : step.label
                    }
                    className={[
                      "group relative flex h-20 items-center gap-2 px-1 transition sm:gap-3 sm:px-2",
                      locked
                        ? "cursor-not-allowed opacity-35"
                        : "cursor-pointer hover:opacity-100",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-7 w-7 items-center justify-center rounded-full text-sm font-black transition-all duration-300",
                        isActive
                          ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.35)]"
                          : isCompleted
                            ? "bg-emerald-500 text-white"
                            : locked
                              ? "bg-zinc-900 text-zinc-600 ring-1 ring-white/5"
                              : "bg-zinc-800 text-zinc-400",
                      ].join(" ")}
                    >
                      {locked ? "×" : step.number}
                    </span>

                    <span
                      className={[
                        "hidden text-xs font-black tracking-[0.22em] transition-all duration-300 md:block",
                        isActive
                          ? "text-yellow-400"
                          : isCompleted
                            ? "text-zinc-200"
                            : locked
                              ? "text-zinc-700"
                              : "text-zinc-500 group-hover:text-zinc-300",
                      ].join(" ")}
                    >
                      {step.label}
                    </span>

                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-16 -translate-x-1/2 rounded-full bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.65)] md:w-40" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsInfoOpen(true)}
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-black text-yellow-300 shadow-lg shadow-black/20 backdrop-blur transition hover:border-yellow-400/60 hover:bg-yellow-400 hover:text-black"
            aria-label="Open tournament information"
            title="Tournament info"
          >
            i
          </button>
        </div>
      </nav>

      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </>
  );
}

export default TournamentNav;