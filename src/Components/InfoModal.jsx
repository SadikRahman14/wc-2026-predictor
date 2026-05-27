// InfoModal.jsx
import { useEffect } from "react";

function InfoModal({ isOpen }) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    // Section (backdrop)
<section
  style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
  className={[
    "fixed inset-0 z-[999] bg-black/75 px-4 py-8 text-white backdrop-blur-2xl",
    "transition-all md:origin-top-right",
    isOpen ? "duration-500" : "duration-700",          // slower on close
    isOpen
      ? "pointer-events-auto opacity-100 md:scale-100"
      : "pointer-events-none opacity-0 md:scale-0",
  ].join(" ")}
  aria-hidden={!isOpen}
>

  {/* Inner card */}
  <div
    className={[
      "flex min-h-full items-center justify-center transition-all ease-out",
      isOpen ? "duration-900 delay-200" : "duration-300 delay-0",  // fades out quicker than backdrop
      isOpen
        ? "translate-y-0 opacity-100"
        : "translate-y-6 opacity-0",
    ].join(" ")}
  >
        <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white/[0.08] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.85)] backdrop-blur-2xl md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.2),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_34%)]" />

          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.45em] text-yellow-400">
              Format Guide
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase leading-none text-white md:text-6xl">
              How It Works
            </h2>

            <div className="mt-8 grid gap-4">
              <InfoBlock
                number="01"
                title="Groups"
                text="Predict all 12 groups from 1st to 4th. The top two qualify automatically, then 8 of the 12 third-placed teams continue."
              />
              <InfoBlock
                number="02"
                title="Round of 32"
                text="The selected third-place group letters create a lookup key. That key decides where the third-place teams go in the Round of 32."
                highlight
              />
              <InfoBlock
                number="03"
                title="Bracket"
                text="After the bracket is generated, pick match winners until your World Cup champion is decided."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ number, title, text, highlight = false }) {
  return (
    <div
      className={[
        "grid grid-cols-[48px_1fr] gap-4 rounded-3xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        highlight ? "bg-yellow-400/10" : "bg-black/25",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black",
          highlight
            ? "bg-yellow-400 text-black"
            : "bg-white/[0.08] text-yellow-300",
        ].join(" ")}
      >
        {number}
      </div>
      <div>
        <h3 className="text-lg font-black uppercase text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
      </div>
    </div>
  );
}

export default InfoModal;