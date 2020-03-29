import { AsyncStorage } from "react-native";

export const saveToLocal = async function(obj) {
  const objStr = JSON.stringify(obj);
  try {
    await AsyncStorage.setItem("cards", objStr);
  } catch (error) {
    console.log("error", error.message);
  }
};

export const readFromLocal = async function(key) {
  let output;
  try {
    output = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("error", error.message);
  }
  return output;
};
