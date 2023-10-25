import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import stylesGlobal, { colors } from "../assets/style/StylesGlobal";

export default function Message({ message, messageContent, key }) {
  const styleMessage =
    message.sender === 1
      ? [styles.message, styles.message1]
      : [styles.message, styles.message2];
  const styleContainer =
    message.sender === 1
      ? [styles.container, styles.container1]
      : [styles.container, styles.container2];

  return (
    <View key={key} style={styleContainer}>
      {message.sender === 1 && (
        <Text style={styles.expediteur}>Expéditeur</Text>
      )}
      <Text style={styleMessage}>{message.content}</Text>
      <Text style={styles.hour}>10:36</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    //flexDirection: "row",
    gap: 5,
    width: "80%",
  },
  container1: {
    alignSelf: "flex-start",
    
  },
  container2: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  message: {
    borderWidth: 1,
    borderColor: colors.orangeLight,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    maxWidth: 400,
    color: colors.grey,
    flex: 0,
  },
  message1: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 4,
  },
  message2: {
    backgroundColor: colors.orangeLight,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 12,
  },
});
