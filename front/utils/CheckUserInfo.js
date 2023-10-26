import * as SecureStore from "expo-secure-store";

export async function check() {
  /*if (!userInformation) {
    navigation.replace("SingIn");
    return;
  }*/

  return await SecureStore.getItemAsync("userInformation");
}
