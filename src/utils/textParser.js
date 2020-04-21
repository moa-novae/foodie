//convert between underscore and space
export const characterSwap = function (str, oldChar, newChar) {
  if (!str) return;
  return str
    .split("")
    .map((char) => {
      if (char === oldChar) {
        return newChar;
      }
      return char;
    })
    .join("");
};

export const capitalizeAsTitle = function (str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};
