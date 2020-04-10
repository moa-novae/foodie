import { characterSwap } from "./textParser";
export const categoryFinder = (cards, category) => {
  let output = {};
  if (cards) {
    for (let [key, value] of Object.entries(cards)) {
      if (value.tags) {
        const tags = value.tags.map((tag) => tag.toLowerCase());
        if (tags.includes(category)) {
          output = { ...output, [key]: value };
        }
      }
    }
  }
  return output;
};
//Function for searchbar on homepage
export const searchAll = (cards, keyword, searchTags) => {
  let output = {};
  if (!keyword.length && !searchTags.length) return;
  //al string converted to lowercase, underscore repalced with space
  const lowerKeyword = keyword.toLowerCase();
  if (Object.keys(cards).length) {
    for (let [itemId, value] of Object.entries(cards)) {
      let name = "";
      if (value.name) {
        name = characterSwap(value.name, "_", " ").toLowerCase();
      }
      if (lowerKeyword.length) {
        if (name.includes(lowerKeyword)) {
          output[itemId] = { ...value };
          continue;
        }
        if (value.description) {
          const description = value.description.toLowerCase();
          if (description.includes(lowerKeyword)) {
            output[itemId] = { ...value };
            continue;
          }
        }
        if (value.ingredients) {
          const ingredients = value.ingredients.map((ingredient) =>
            ingredient.toLowerCase()
          );
          if (ingredients.includes(lowerKeyword)) {
            output[itemId] = { ...value };
            continue;
          }
        }
        if (value.tags) {
          const lowerTags = value.tags.map((tag) => tag.toLowerCase());
          if (lowerTags.includes(lowerKeyword)) {
            output[itemId] = { ...value };
            continue;
          }
        }
      }

      //check to see if this item has all tags searched
      if (searchTags.length) {
        // console.log("searchTags", searchTags, "value.tags", value.tags);
        if (searchTags.every((searchTag) => value.tags.includes(searchTag))) {
          output[itemId] = { ...value };
          // console.log("passed by tag", value.name);
          continue;
        }
      }
    }
  }
  return output;
};
