import { useEffect } from "react";

function ResetConfirmModal({ isOpen, onClose, onConfirm }) {
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

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-[2rem] bg-white/[0.08] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_40%)]" />

        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Reset
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase leading-none text-white">
            Start Over?
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-400">
            This will clear your group standings, third-place selections,
            bracket winners, champion, and saved browser progress.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-red-500 px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-white transition hover:bg-red-400"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-white/[0.08] px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-300 transition hover:bg-white/[0.14] hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetConfirmModal;