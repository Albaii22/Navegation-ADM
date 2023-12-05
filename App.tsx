import { StyleSheet, View } from "react-native";
import AppNavigator from "./componentes/AppNavigator";
import React from "react";
import UserProvider from "./providers/userProvider";

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <AppNavigator></AppNavigator>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
