import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Bienvenido from "../screens/Bienvenido";
import Login from "../screens/Login";
import AppDrawer from "./AppDrawer";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Bienvenido} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default AppNavigator;
