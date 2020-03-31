import { AsyncStorage } from "react-native";

export const saveToLocal = async function(key, value) {
  const valueStr = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, valueStr);
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
