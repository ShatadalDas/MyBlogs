export default function generateTime(): string {
  const dateObj = new Date();

  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const hh = dateObj.getHours();
  const mm = dateObj.getMinutes();

  return `${putZero(date)}-${putZero(month)}-${year} ${putZero(hh)}:${putZero(
    mm
  )} (GMT +05:30)`;
}

function putZero(val: number) {
  return (val < 10 ? "0" + val : val).toString;
}
