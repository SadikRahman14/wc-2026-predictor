const backgroundFacts = [
  "Shabalala",
  "The greatest player on the planet... Lionel Messi!",
  "Maggie Thatcher your boys took a hell of a beating",
  "Shabalalala...",
  "Manchester City are still alive here. Balotelli…Agueroooooooooooooooo!!!! I swear you’ll never see anything like this ever again!",
  "IT GETS better and better and better – or does it?",
  "KNOCKOUT BRACKET",
  "Oh, this is getting better and better and better. One, two, three for Michael Owen!",
  "What a save, what a save! Gordon Banks!",
  "They think it's all over... it is now!",
  "He has done it! ... The little boy from Rosario...",
  "Maradona... Genius, genius, genius!",
];

const desktopLines = [
  { text: backgroundFacts[0], top: "6%", left: "4%", size: "text-5xl", opacity: "text-white/[0.04]" },
  { text: backgroundFacts[1], top: "12%", left: "-2%", size: "text-5xl", opacity: "text-white/[0.045]" },
  { text: backgroundFacts[2], top: "19%", left: "8%", size: "text-4xl", opacity: "text-white/[0.035]" },
  { text: backgroundFacts[3], top: "26%", left: "68%", size: "text-8xl", opacity: "text-yellow-400/[0.075]" },
  { text: backgroundFacts[4], top: "34%", left: "-18%", size: "text-4xl", opacity: "text-white/[0.04]" },
  { text: backgroundFacts[5], top: "43%", left: "54%", size: "text-5xl", opacity: "text-white/[0.04]" },
  { text: backgroundFacts[6], top: "50%", left: "4%", size: "text-9xl", opacity: "text-white/[0.03]" },
  { text: backgroundFacts[7], top: "60%", left: "20%", size: "text-4xl", opacity: "text-white/[0.04]" },
  { text: backgroundFacts[8], top: "69%", left: "-2%", size: "text-6xl", opacity: "text-white/[0.04]" },
  { text: backgroundFacts[9], top: "76%", left: "48%", size: "text-5xl", opacity: "text-yellow-400/[0.06]" },
  { text: backgroundFacts[10], top: "84%", left: "8%", size: "text-4xl", opacity: "text-white/[0.04]" },
  { text: backgroundFacts[11], top: "91%", left: "56%", size: "text-7xl", opacity: "text-white/[0.04]" },
];

const mobileLines = [
  { text: "Shabalala", top: "7%", left: "5%", size: "text-4xl", opacity: "text-yellow-400/[0.075]" },
  { text: "Agueroooooooooooooooo!!!!", top: "16%", left: "-18%", size: "text-4xl", opacity: "text-white/[0.055]" },
  { text: "Lionel Messi!", top: "25%", left: "42%", size: "text-3xl", opacity: "text-white/[0.05]" },
  { text: "KNOCKOUT BRACKET", top: "35%", left: "-8%", size: "text-5xl", opacity: "text-white/[0.035]" },
  { text: "What a save!", top: "48%", left: "52%", size: "text-3xl", opacity: "text-white/[0.045]" },
  { text: "They think it's all over...", top: "61%", left: "-20%", size: "text-3xl", opacity: "text-white/[0.04]" },
  { text: "The little boy from Rosario", top: "73%", left: "18%", size: "text-3xl", opacity: "text-white/[0.045]" },
  { text: "Maradona... Genius!", top: "86%", left: "-4%", size: "text-4xl", opacity: "text-yellow-400/[0.06]" },
];

function LandingPage({ onStart }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(250,204,21,0.1),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />

      <BackgroundTextLayer lines={mobileLines} className="md:hidden" />
      <BackgroundTextLayer lines={desktopLines} className="hidden md:block" />

    <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/0 via-[#030303]/25 to-[#030303]/65" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.45em] text-yellow-400 sm:tracking-[0.55em]">
            World Cup 2026
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.86] tracking-tight text-white sm:text-6xl md:text-9xl">
            Predictor
          </h1>

          <button
            type="button"
            onClick={onStart}
            className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-7 py-4 text-xs font-black uppercase tracking-[0.22em] text-black shadow-[0_0_45px_rgba(250,204,21,0.26)] transition hover:scale-105 hover:bg-yellow-300 sm:px-9 sm:text-sm"
          >
            Let&apos;s Predict
            <span className="transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function BackgroundTextLayer({ lines, className = "" }) {
  return (
    <div className={["pointer-events-none absolute inset-0 overflow-hidden", className].join(" ")}>
      {lines.map((line, index) => (
        <p
          key={`${line.text}-${index}`}
          className={[
            "absolute max-w-[760px] select-none whitespace-nowrap font-black uppercase leading-none tracking-[-0.05em]",
            line.size,
            line.opacity,
          ].join(" ")}
          style={{
            top: line.top,
            left: line.left,
          }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export default LandingPage;