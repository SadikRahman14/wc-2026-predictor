const socialLinks = [
  {
    label: "Email",
    href: "mailto:sadik.nai.008@gmail.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sadik-rahman-7b0658253/",
    icon: "linkedin",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/SadikRa94780860",
    icon: "x",
  },
  {
    label: "GitHub",
    href: "https://github.com/SadikRahman14",
    icon: "github",
  },
];

function SiteFooter() {
  return (
    <footer className="bg-[#050505] px-4 py-8 text-white">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
            by
          </p>

          <h2 className="mt-1 text-lg font-black uppercase tracking-wide text-white">
            Sadik Rahman
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={link.label}
              title={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <SocialIcon type={link.icon} />
            </a>
          ))}
        </div>

        <p className="text-center text-xs font-medium text-zinc-600 sm:text-right">
          © {new Date().getFullYear()} World Cup 2026 Predictor
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ type }) {
  const iconClass = "h-4 w-4";

  if (type === "mail") {
    return (
      <svg
        className={iconClass}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16v16H4z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.25 8h4.5v15.5H.25V8Zm7.5 0h4.31v2.11h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9v8.81h-4.5v-7.81c0-1.86-.03-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.11v7.95h-4.5V8Z" />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6c.97 0 1.95.13 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.07.78 2.15v3.19c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2h3.3l-7.2 8.23L23.5 22h-6.65l-5.2-6.8L5.7 22H2.4l7.7-8.8L2 2h6.82l4.7 6.22L18.9 2Zm-1.16 17.93h1.83L7.82 3.96H5.86l11.88 15.97Z" />
    </svg>
  );
}

export default SiteFooter;