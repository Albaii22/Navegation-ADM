import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PortfolioAlby from "../screens/Portfolio";
import QR from "../screens/QR";

const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#343053"i
      barStyle={{ backgroundColor: "#edd7e2" }}
    >
      <Tab.Screen
        name="Portfolio"
        component={PortfolioAlby}
        options={{
          tabBarLabel: "Portfolio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="badge-account"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QR}
        options={{
          tabBarLabel: "Github",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="github" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
