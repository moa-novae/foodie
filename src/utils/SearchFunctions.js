import { characterSwap } from "./textParser";
export const categoryFinder = (cards, category) => {
  let output = {};
  if (cards) {
    for (let [key, value] of Object.entries(cards)) {
      if (value.tags) {
        const tags = value.tags.map(tag => tag.toLowerCase());
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
  if (!keyword) return;
  //al string converted to lowercase, underscore repalced with space
  const lowerKeyword = keyword.toLowerCase();
  if (cards) {
    for (let [itemId, value] of Object.entries(cards)) {
      const name = characterSwap(value.name, "_", " ").toLowerCase();
      if (name.includes(lowerKeyword)) {
        output.itemId = { ...value };
        continue;
      }
      if (value.description) {
        const description = value.description.toLowerCase();
        if (description.includes(lowerKeyword)) {
          output.itemId = { ...value };
          continue;
        }
      }
      if (value.ingredients) {
        const ingredients = value.ingredients.map(ingredient =>
          ingredient.toLowerCase()
        );
        if (ingredients.includes(lowerKeyword)) {
          output.itemId = { ...value };
          continue;
        }
      }
      if (value.tags) {
        const tags = value.tags.map(tag => tag.toLowerCase());
        if (tags.includes(lowerKeyword)) {
          output.itemId = { ...value };
          continue;
        }
        //Convert searchTags which is an object, to an array
        let searchTagsArr = [];
        for (let [tag, bool] of Object.entries(searchTags)) {
          if (bool) searchTagsArr.push(tag);
        }
        //check to see if this item has all tags searched
        if (searchTagsArr) {
          if (searchTagsArr.every(searchTag => tags.includes(searchTag))) {
            output.itemId = { ...value };
            continue;
          }
        }
      }
    }
  }
  return output;
};
