import * as SecureStore from "expo-secure-store";

export const signOut = (navigation) => {
  SecureStore.deleteItemAsync("userInformation")
    .then
    //   navigation.replace('SingIn')
    ();
};
