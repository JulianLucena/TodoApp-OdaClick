import React, {useState}  from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

const NewTaskWindow = () => {

const [text, setText] = useState('');


return (

    <View style={styles.newTaskWindow}>
        <Text>Nueva tarea</Text>
        <TextInput
            style={{height: 40}}
            placeholder="Nombre"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
        />
        <TextInput
            style={{height: 40}}
            placeholder="Descripción"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
            >
        </TextInput>
    </View>

)}

const styles = StyleSheet.create({

    newTaskWindow:{
        backgroundColor: 'gray',
        marginHorizontal: 50,
        position: 'absolute',
        width: 300,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
})

export default NewTaskWindow;