import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemList = () => {
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  
  return (
    <View style={styles.container}>
        <View>
            <Text style={[styles.text, checked && styles.strikethrough]}>
                Nombre de Tarea
            </Text>
            <Text style={[styles.subtext, checked && styles.strikethrough]}>
                Descripción de tarea
            </Text>
        </View>
      <View style={styles.checkbuttons}>          
        <Pressable onPress={toggleCheckbox}>
            <Icon 
            style={styles.icon}
            name={checked ? "check-square" : "square"} 
            size={30}
            color={checked ? "green" : "gray"}
            />
        </Pressable>        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    height: 75,
    padding: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 15,
    color: 'gray',
  },
  checkbuttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 10,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
});

export default ItemList;
