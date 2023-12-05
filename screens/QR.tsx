import { StyleSheet, View, Image } from "react-native";
import React from "react";

const QR = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageQr}
        source={require("../assets/image/Repositorio.png")}
        resizeMode="contain"
      />
    </View>
  );
};

export default QR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "white", 
  },
  imageQr: {
    flex: 1,
    width: "100%", 
    height: "100%", 
  },
});
