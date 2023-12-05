import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import React, { useContext } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { authContext } from "../componentes/userContext";

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const image = require("practica1/assets/image/123.gif");

const Bienvenido: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { user, isLoggedIn } = React.useContext(authContext);

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View>
        <Text style={styles.text1}>Explore new places with me</Text>
      </View>
      <View>
        <Text style={styles.text2}>!Welcome¡</Text>
      </View>
      <View>
        <Text style={styles.text3}>To AlbaiiBlog</Text>
      </View>
      {isLoggedIn ? <Text style={styles.icono}> ͡° ͜ʖ ͡°</Text> : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Icon name="iterations" type="octicon" color="#517fa4" size={35} />
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

export default Bienvenido;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 100,
    alignItems: "center",
  },
  text1: {
    color: "black",
    textAlign: "left",
    fontSize: 30,
    marginLeft: 50,
    marginRight: 25,
    marginBottom: 15,
    marginTop: 50,
    fontFamily: "Nunito_400Regular",
  },
  text2: {
    color: "black",
    textAlign: "center",
    fontSize: 40,
    marginBottom: 15,
    fontFamily: "Nunito_400Regular",
  },
  text3: {
    color: "black",
    textAlign: "center",
    fontSize: 45,
    fontFamily: "Nunito_400Regular",
  },
  button: {
    backgroundColor: "#f5dde2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    position: "absolute",
    bottom: 60,
    width: "60%",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Nunito_400Regular",
  },
  icono: {
    fontSize: 70,
    textAlign: 'center',
    marginTop: 100,
  }
});
