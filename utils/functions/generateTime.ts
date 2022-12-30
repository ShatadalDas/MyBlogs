export default function generateTime(): string {
  const dateObj = new Date();

  // 27-12-2022 18:19 (GMT +5:30)
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const hh = dateObj.getHours();
  const mm = dateObj.getMinutes();

  return `${date}-${month}-${year} ${hh}:${mm} (GMT +05:30)`;
}
