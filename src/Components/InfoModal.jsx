import { useEffect } from "react";

function InfoModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white/[0.08] shadow-[0_30px_120px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%)]" />

        <div className="relative px-6 py-6 md:px-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-yellow-400">
                Format Guide
              </p>

              <h2
                id="info-modal-title"
                className="mt-3 text-3xl font-black uppercase leading-none text-white md:text-5xl"
              >
                How It Works
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/35 text-xl font-black text-zinc-400 transition hover:bg-yellow-400 hover:text-black"
              aria-label="Close tournament guide"
            >
              ×
            </button>
          </div>

          <div className="mt-8 grid gap-4">
            <InfoBlock
              number="01"
              title="Groups"
              text="Predict all 12 groups from 1st to 4th. The top two from every group qualify automatically. Then choose 8 of the 12 third-placed teams to continue."
            />

            <InfoBlock
              number="02"
              title="Round of 32 combinations"
              text="The selected third-place group letters create a key. Example: A, B, C, D, F, H, J, K becomes ABCDFHJK. That key decides where the third-place teams go in the Round of 32."
              highlight
            />

            <InfoBlock
              number="03"
              title="Bracket"
              text="After the Round of 32 is generated, click the winner of each match. Winners move forward until your World Cup champion is decided."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ number, title, text, highlight = false }) {
  return (
    <div
      className={[
        "grid grid-cols-[48px_1fr] gap-4 rounded-3xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        highlight ? "bg-yellow-400/12" : "bg-black/25",
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