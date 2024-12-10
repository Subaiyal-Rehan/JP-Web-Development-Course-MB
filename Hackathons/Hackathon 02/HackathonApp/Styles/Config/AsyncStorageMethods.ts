import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = (key: string, value: any) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      resolve('Data saved successfully.');
    } catch (e) {
      reject(e);
    }
  });
};

export const getData = (key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        resolve(parsedValue);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
