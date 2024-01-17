import { Alert, ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { userContext } from "../componentes/userContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { postRegisteredUser } from "../services/LoginService";
import { Register } from "../types/typeRegister";

const image = require("../assets/image/123.gif");

type LoginProp = {
  navigation: StackNavigationProp<any>;
};

const RegisterScreen: React.FC<LoginProp> = ({ navigation }) => {
  const { user, userFunc, handleLogin } = React.useContext(userContext);

  const handleInputChange = (field: string, value: string) => {
    userFunc({ ...user, [field]: value });
  }

  const handleRegister = async () => {
    const userRegister: Register = {
      name: user.name,
      email: user.email,
      psswd: user.psswd
    };

    if (!userRegister.name || !userRegister.email || !userRegister.psswd) {
      Alert.alert("ERROR: VALORES NO VÁLIDOS");
    } else {
      try {
        const newUser: Register = await postRegisteredUser(userRegister);

        if (newUser) {
          Alert.alert(`Usuario registrado: ${newUser.name}`);
          userFunc(newUser);
          handleLogin();
          navigation.navigate("Drawer");
        } else {
          Alert.alert("ERROR: Fallo en el registro");
        }
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        Alert.alert("ERROR: Fallo en el registro");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage} />
      <View style={styles.viewButtons}>
        <Text style={styles.titleText}>Introduce tus datos</Text>
        <TextInput style={styles.inputText} placeholder="example@gmail.com" value={user.email} onChangeText={email => handleInputChange("email", email)} />
        <TextInput style={styles.inputText} placeholder="Josito24" value={user.name} onChangeText={userName => handleInputChange("name", userName)} />
        <TextInput style={styles.inputText} placeholder="niii-san" value={user.psswd} secureTextEntry={true} onChangeText={psswd => handleInputChange("psswd", psswd)} />
        <TouchableOpacity style={styles.bottonSend} onPress={() => handleRegister()}>
          <Text style={styles.textButton}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewButtons: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    margin: 'auto',
    padding: '2%',
    borderRadius: 20,
    width: '80%',
    backgroundColor: '#dab8c9',
    marginBottom: 200
  },

  backgroundImage: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },

  bottonSend: {
    backgroundColor: '#517fa4',
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },

  textButton: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  titleText: {
    textAlign: 'center',
    fontSize: 25,
    color: '#9b83b0',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  inputText: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default RegisterScreen;
