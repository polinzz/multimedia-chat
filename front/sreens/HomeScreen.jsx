import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from 'react-native';
import stylesGlobal, { colors } from "../assets/style/StylesGlobal";


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={stylesGlobal.titleH1}>Open up App.js to start working on your app</Text>
      <StatusBar style={styles.auto}/>
      <Button
        title="Conversation"
        onPress={() => navigation.navigate("MessagesScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
