import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView, Image, View } from 'react-native';
import config from '../config.json';
import { check } from '../utils/CheckUserInfo';
import { timeNormalize } from '../utils/timeHandler';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../assets/style/StylesGlobal';

export default function ({ navigation }) {
  const apiUrlMyIp = config.apiUrlMyIp;
  const [conversations, setConversations] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      check().then(result => {
        if (!result) {
          navigation.replace("SingIn");
          return;
        }
        let user = JSON.parse(result);
        fetch(`${apiUrlMyIp}/get-all-conv-by-user/${user.id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Réponse HTTP : ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setConversations(data);
          })
          .catch((error) => {
            console.error('Erreur :', error);
          });
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Messages", {
                conversationId: item.id,
              });
            }}
            style={styles.conversationItem}
          >
            <View style={styles.conversationDetails}>
              <View style={styles.nameContentContainer}>
                <Text style={styles.conversationName}>{item.name}</Text>
                {item.updatedAt !== null && (
                <Text style={styles.updatedAt}>
                  {timeNormalize(item.updatedAt, "conv")}
                </Text> 
              )}
              </View>
              {item.content !== null && (
                  <Text style={styles.conversationContent}>
                    {item.content.length > 30
                      ? item.content.slice(0, 30) + "..."
                      : item.content}
                  </Text>
                )}
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.navigate("Nouvelle conversation");
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../assets/images/addConv.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchable: {
    bottom: 24,
  },
  tinyLogo: {
    width: 65,
    height: 65,
    borderRadius: 400,
    left: '100%',
    transform: [{ translateX: -80 }], 
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  conversationItem: {
    paddingVertical: 16,
  },
  conversationDetails: {
    flex: 1,
  },
  nameContentContainer: {
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updatedAt: {
    fontSize: 14,
  },
  conversationContent: {
    fontSize: 16,
    marginBottom: 6,
  },
});
