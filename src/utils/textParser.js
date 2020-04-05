//convert between underscore and space
export const characterSwap = function(str, oldChar, newChar) {
  if (!str) return 
  return str
    .split("")
    .map(char => {
      if (char === oldChar) {
        return newChar;
      }
      return char;
    })
    .join("");
};
