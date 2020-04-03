export const categoryFinder = (cards, category) => {
  let output = {};
  if (cards) {
    for (let [key, value] of Object.entries(cards)) {
      if (value.tags) {
        const tags = value.tags.map(tag => tag.toLowerCase());
        if (tags.includes(category)) {
          output = { ...output, value };
        }
      }
    }
  }
  return output;
};
