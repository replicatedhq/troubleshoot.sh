export function titleize(string) {
  let newStr;
  if (string !== "") {
    newStr = string
      .split("-")
      .map(s => s[0].toUpperCase() + s.slice(1))
      .join(" ");
  }
  return newStr;
}