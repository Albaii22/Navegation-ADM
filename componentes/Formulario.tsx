import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { authContext } from "./userContext";
import { StackNavigationProp } from "@react-navigation/stack";

type Errors = {
  username?: string;
  password?: string;
};

type LoginProp = {
  navigation: StackNavigationProp<any>;
};

const Formulario: React.FC<LoginProp> = ({ navigation }) => {
  const [errors, setErrors] = useState<Errors>({});
  const [password, setPassword] = useState("");

  let { user, handleUser, handleLogin } = React.useContext(authContext);

  const validateInput = () => {
    let newErrors: Errors = {};

    if (!user.trim()) {
      newErrors.username = "Please enter your username";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={user}
          onChangeText={(user) => {
            setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
            handleUser(user);
          }}
        ></TextInput>
        {errors.username ? (
          <Text style={styles.errorsText}>{errors.username}</Text>
        ) : null}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="**********"
          secureTextEntry
          value={password}
          onChangeText={(pass) => {
            setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
            setPassword(pass);
          }}
        ></TextInput>
        {errors.password ? (
          <Text style={styles.errorsText}>{errors.password}</Text>
        ) : null}
        <Text style={styles.missingPassword}>Forgot password?</Text>
      </View>
      <View style={styles.buttonBox}>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              if (validateInput()) {
                handleLogin();
                navigation.navigate("Drawer");
              }
            }}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.registerText}>
            Don't have an account? Sign up
          </Text>
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
