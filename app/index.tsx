import NavBar from "@/components/NavBar";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.homeScreen}>
      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen:{
      flex: 1,
  },
})
