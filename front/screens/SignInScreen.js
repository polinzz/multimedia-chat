import { useState } from "react";
import {colors} from "../assets/style/StylesGlobal";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { makeLoginRequest, handleLoginSuccess } from '../api/SignInApi';
import { handleLoginError } from '../utils/ErrorController';

export default function SignInScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await makeLoginRequest(email, password);
      await handleLoginSuccess(data.user, navigation);
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <SafeAreaView
      style={styles.pageStyle}
    >
      <Text style={styles.titlePage}>Hechat</Text>
      <View style={styles.formContainer}>
        <Text style={styles.textTitleInput}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <Text style={styles.textTitleInput}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>CONNECTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  titlePage: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
  },
  formContainer:{
    width: '100%',
  },
  textTitleInput:{
    marginBottom: 8,
    fontWeight:"bold",
  },
  input: {
    padding: 10,
    backgroundColor: "#F3F3F3",
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
  },
  appButtonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop:40,
    width: '100%',
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
