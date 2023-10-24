import * as SecureStore from "expo-secure-store";

export const checkToken = async (navigation) => {
  const userInformation = await SecureStore.getItemAsync("userInformation");
  if (!userInformation) {
    navigation.replace("SingIn");
  }
};