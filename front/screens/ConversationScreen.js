import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import config from '../config.json';
import {check} from '../utils/CheckUserInfo'
import {timeNormalize} from '../utils/timeHandler'
import { useIsFocused } from '@react-navigation/native';

export default function ({ navigation }) {
  const apiUrlMyIp = config.apiUrlMyIp;
  const [conversations, setConversations] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      check().then(result => {
        if (!result) {
          navigation.replace("SingIn");
          return
        }
        let user = JSON.parse(result);
        fetch(`${apiUrlMyIp}/get-all-conv-by-user/${user.id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Reponse HTTP : ${response.status}`);
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
              navigation.navigate('Messages', {
                conversationId: item.id,
              });
            }}
          >
            <Text style={styles.conversationName}>{item.name}</Text>
            {item.content !== null &&
              <Text style={styles.conversationContent}>{item.content}</Text>
            }
            {item.updatedAt !== null &&
              <Text style={styles.conversationContent}>{timeNormalize(item.updatedAt, 'conv')}</Text>
            }
            <Text style={styles.conversationSeparator}>--------------------------</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conversationName: {
    fontSize: 20,
    marginBottom: 8,
  },
  conversationContent: {
    fontSize: 16,
    marginBottom: 6,
  },
  conversationSeparator: {
    marginBottom: 12,
  },
});
