export function formatRelativeTime(isoDate) {
  const now = new Date();
  const time = new Date(isoDate);
  const diffMs = now.getTime() - time.getTime();

  if (Number.isNaN(diffMs)) {
    return "just now";
  }

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "just now";
  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }
  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(diffMs / day);
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return time.toLocaleDateString();
}

export function initialsFromName(name = "User") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((piece) => piece[0]?.toUpperCase())
    .join("");
}
