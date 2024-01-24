import { StyleSheet } from "react-native";
import React from "react";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Bienvenido from "../screens/Bienvenido";
import Login from "../screens/Login";
import BottomTabs from "./BottomTabs";
import RecorderScreen from "../screens/RecorderScreen"

const Drawer = createDrawerNavigator();

const CustomDrawer: React.FC = () => {
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerTitle: "Practica1",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#dab8c9",
    },
    headerTintColor: "black",
    drawerItemStyle: {
      width: "100%",
    },
    drawerStyle: {
      backgroundColor: "#dab8c9",
    },
    drawerActiveTintColor: "black",
    drawerActiveBackgroundColor: "#9b83b0",
    drawerInactiveTintColor: "lightgray",
    drawerInactiveBackgroundColor: "#343053",
    drawerType: "slide",
  };

  return (
    <Drawer.Navigator screenOptions={drawerNavigatorScreenOptions}>
      <Drawer.Screen name="Welcome" component={Bienvenido} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Portfolio" component={BottomTabs} />
      <Drawer.Screen name="Grabadora" component={RecorderScreen}/>
    </Drawer.Navigator>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerContainer: {},
  headerTitle: {},
});
