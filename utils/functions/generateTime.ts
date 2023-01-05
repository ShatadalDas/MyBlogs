export default function generateTime(): string {
  const dateObj = new Date();

  const date = putZero(dateObj.getDate());
  const month = putZero(dateObj.getMonth() + 1);
  const year = putZero(dateObj.getFullYear());

  const hh = putZero(dateObj.getHours());
  const mm = putZero(dateObj.getMinutes());

  return `${date}-${month}-${year} ${hh}:${mm} (GMT +05:30)`;
}

function putZero(val: number) {
  return (val < 10 ? "0" + val : val).toString;
}
