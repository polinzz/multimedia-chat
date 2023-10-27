import * as SecureStore from "expo-secure-store";
import config from '../config.json';
export const makeLoginRequest = async (email, password) => {
  const apiUrl = config.apiUrlMyIp;
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Reponse HTTP : ${response.status}`);
  }

  return response.json();
};

export const handleLoginSuccess = async (user, navigation) => {
  await SecureStore.setItemAsync("userInformation", JSON.stringify(user));
  navigation.replace("Nouvelle conversation");
};
