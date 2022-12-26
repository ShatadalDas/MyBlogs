export default function createUrl(title: string): string {
  //* if title is empty
  if (!title) return title;

  let words = title.split(" ");
  // if (words.length === 1) words = title.split("-");

  let res = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
      const ch = word[j];
      res += isAlphaNum(ch) ? ch.toLowerCase() : charToHex(ch);
    }

    res += i === words.length - 1 ? "" : "-";
  }
  return res;
}

function isAlphaNum(char: string) {
  return /^[a-zA-Z0-9]/.test(char);
}

function charToHex(ch: string) {
  let hex = "%" + Number(ch.charCodeAt(0)).toString(16);
  return hex;
}
