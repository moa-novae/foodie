import { AsyncStorage } from "react-native";

export const saveToLocal = async function (key, value) {
  const valueStr = JSON.stringify(value);
  try {
    await AsyncStorage.mergeItem(key, valueStr);
  } catch (error) {
    console.log("error", error.message);
  }
};

export const deleteCard = async function (cardId) {
  const currentCards = await readFromLocal("cards");
  const currentCardsParsed = JSON.parse(currentCards);
  delete currentCardsParsed[cardId];
  const newCards = JSON.stringify(currentCardsParsed);
  try {
    await AsyncStorage.setItem("cards", newCards);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const readFromLocal = async function (key) {
  let output;
  try {
    output = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("error", error.message);
  }
  return output;
};

export const deleteCategoryFromLocal = async function (categoryId) {
  const currentCategories = await readFromLocal("categories");
  const currentCategoriesParsed = JSON.parse(currentCategories);
  delete currentCategoriesParsed[categoryId];
  const newCategories = JSON.stringify(currentCategoriesParsed);
  try {
    await AsyncStorage.setItem("categories", newCategories);
  } catch (error) {
    console.log("error", error.message);
  }
};
