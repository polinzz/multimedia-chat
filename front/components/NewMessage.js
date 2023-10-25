import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
export default function NewMessage () {
	const [myMessage, setMyMessage] = useState('');
	return (
		<View style={styles.container}>
			<TextInput style={styles.myInput} multiline="true" placeholder='Nouveau message' onChangeText={newText => setMyMessage(newText)} defaultValue={''} value={myMessage}/>
			<Button title="Envoyer" color="#000000" onPress={()=>console.log(myMessage)} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	myInput: {
	  height: 40,
	  borderWidth: 1,
	  backgroundColor: "#eeeeee",
	},
});