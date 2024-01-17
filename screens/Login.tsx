import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Formulario from "../componentes/Formulario";
import { userContext } from "../componentes/userContext";
import React from "react";
import { Register } from "../types/typeRegister";
import { getLoginUser } from "../services/LoginService";

type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
};

const image = require("../assets/image/123.gif");

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { user , isLoggedIn} = React.useContext(userContext);


  return (  
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      {isLoggedIn ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.textBox1}>
            <Text style={styles.text1}>Estas logueado como</Text>
            <Text style={styles.userLogged}>{user.name}</Text>
            <Image
              style={styles.imageContext}
              source={require("../assets/image/image1.gif")}
            />
          </View>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.textBox1}>
            <Text style={styles.text1}>AlbaiiVlog</Text>
            <Text style={styles.text2}>¡The best Vlog!</Text>
          </View>
          <View>
            <Formulario navigation={navigation}></Formulario>
          </View>
        </KeyboardAvoidingView>
      )}
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  text1: {
    color: "black",
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Nunito_400Regular",
  },
  textBox1: {
    marginTop: 20,
  },
  text2: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Nunito_400Regular",
  },
  image: {
    flex: 1,
  },
  userLogged: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
  },
  imageContext: {
    flex: 1,
    width: 300,
    marginLeft: 45,
    marginBottom: 100,
    marginTop: 50
    
  },
});
