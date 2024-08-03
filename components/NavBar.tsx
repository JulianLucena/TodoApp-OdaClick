import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavBar = () => {
    return (
        <View style={styles.navBarContainer}>
            <Text style={styles.text}>TodoApp</Text>
            <Pressable>
                <Icon
                    name={"plus-square"}
                    size={30}                                
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    navBarContainer:{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    newTaskWindow:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'red', 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        marginTop: 50,
    }
})

export default NavBar