import AsyncStorage from "@react-native-community/async-storage";
import api from "./apiService";

export const TOKEN_KEY = "@AuthToken:token";

export const onSignIn = (data: any) => {
  return new Promise((resolve, reject) => {
    api
      .post("/login", data)
      .then(response => {
        AsyncStorage.setItem(TOKEN_KEY, response.data.body.token).then(() => {
          resolve(response);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const onSignOut = async () => await AsyncStorage.removeItem(TOKEN_KEY);

export const getToken = async () => {
  try {
    return AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    throw error;
  }
};

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return token !== null ? true : false;
};
