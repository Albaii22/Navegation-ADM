import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { userContext } from "./userContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { getLoginUser } from "../services/LoginService";
import { Register } from "../types/typeRegister";


type LoginProp = {
  navigation: StackNavigationProp<any>;
};

const Formulario: React.FC<LoginProp> = ({ navigation }) => {

  let { user, userFunc, handleLogin } = React.useContext(userContext);

  const handleInputChange = (field: string, value: string) => {
    userFunc({ ...user, [field]: value });
  }

  const handleLoginIn = async () => {
    const loginUser: Register = {
      name: user.name,
      email: user.email,
      psswd: user.psswd
    };

    if (!loginUser.name || !loginUser.psswd) {
      Alert.alert("ERROR: VALORES NO VÁLIDOS");
    } else {
      try {
        const newUser: Register = await getLoginUser(loginUser);

        if (newUser) {
          Alert.alert(`Inicio de sesión exitoso: ${newUser.name}`);
          userFunc(newUser);
          handleLogin();
          navigation.navigate("Drawer");
        } else {
          Alert.alert(`ERROR: Credenciales incorrectas ${loginUser.name} ${loginUser.psswd} ${loginUser.email}`);

        }
      } catch (error) {
        console.error("Error al realizar el inicio de sesión:", error);
        Alert.alert("ERROR: Fallo en el inicio de sesión");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="josito23"
          value={user.name}
          onChangeText={user => handleInputChange("name", user)}
        ></TextInput>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="**********"
          secureTextEntry
          value={user.psswd}
          onChangeText={psswd => handleInputChange("psswd", psswd)}
        ></TextInput>
        <Text style={styles.missingPassword}>Forgot password?</Text>
      </View>
      <View style={styles.buttonBox}>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              handleLoginIn();
            }}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.registerText}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: "Nunito_400Regular",
  },
  input: {
    height: 40,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: 300,
  },
  loginContainer: {
    backgroundColor: "rgba(191, 191, 191, .6)",
    borderRadius: 30,
    padding: 30,
    marginTop: 100,
  },
  buttonBox: {
    marginBottom: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f5dde2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: "Nunito_400Regular",
  },
  missingPassword: {
    fontSize: 12,
    textAlign: "right",
  },
  registerText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    marginTop: 10,
    fontFamily: "Nunito_400Regular",
  },
  errorsText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Formulario;
