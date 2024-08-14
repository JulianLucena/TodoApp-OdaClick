import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { View, StyleSheet, Dimensions } from "react-native";

export default function Index() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', updateWidth);

    return () => subscription?.remove(); 
  }, []);

  const marginLeftValue = screenWidth < 1300 ? 0 : screenWidth * 0.2; 
  const marginRightValue = screenWidth < 1300 ? 0 : screenWidth * 0.2; 

  return (
    <View style={[styles.homeScreen, { marginLeft: marginLeftValue, marginRight: marginRightValue }]}>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
});
