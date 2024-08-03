import ItemList from "@/components/ItemList";
import NavBar from "@/components/NavBar";
import NewTaskWindow from "@/components/NewTaskWindow";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.homeScreen}>
      <NavBar/>
      <ItemList/>
      <NewTaskWindow/>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen:{
      flex: 1,
  },
})
