import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import config from '../config.json';

function timeNormalize(updatedAt) {
  const hours = updatedAt.split('T')[1].split(':')
  return `${hours[0]} : ${hours[1]}`;
}

export default function ({ navigation }) {
  const apiUrlMyIp = config.apiUrlMyIp;
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch(`${apiUrlMyIp}/get-all-conv-by-user/2`)
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
  }, []);

  return (
    <View style={styles.container}>
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
              <Text style={styles.conversationContent}>{timeNormalize(item.updatedAt)}</Text>
            }
            <Text style={styles.conversationSeparator}>--------------------------</Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
