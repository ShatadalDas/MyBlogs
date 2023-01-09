export default function createUrl(title: string): string {
  //* if title is empty
  if (!title) return title;

  let words = title.split(" ");

  let res = "";

  //* looping through all the words of the title
  for (let i = 0; i < words.length; i++) {
    //* Taking one word
    const word = words[i];

    //* Looping through all the characters of the word
    for (let j = 0; j < word.length; j++) {
      //* Taking one character
      const ch = word[j];
      
      res += isAlphaNum(ch) ? ch.toLowerCase() : toHexaDecimal(ch);
    }

    if (i !== words.length - 1) res += "-";
  }
  return res;
}

function isAlphaNum(char: string) {
  return /^[a-zA-Z0-9]/.test(char);
}

function toHexaDecimal(ch: string) {
  let hex = "%" + Number(ch.charCodeAt(0)).toString(16).toUpperCase();
  return hex;
}
