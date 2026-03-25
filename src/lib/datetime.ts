export function formatAmPmTime(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "시간 미정";

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
