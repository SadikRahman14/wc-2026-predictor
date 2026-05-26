function TeamFlag({ team, large = false }) {
  if (!team?.flagCode) return null;

  return (
    <img
      src={`https://flagcdn.com/${team.flagCode}.svg`}
      alt=""
      crossOrigin="anonymous"
      className={[
        "shrink-0 rounded-[2px] object-cover shadow-sm ring-1 ring-black/20",
        large ? "h-8 w-12" : "h-4 w-6",
      ].join(" ")}
      loading="lazy"
    />
  );
}

export default TeamFlag;