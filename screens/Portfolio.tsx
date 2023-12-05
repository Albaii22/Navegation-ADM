import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";

const PortfolioAlby = () => {
  return (
    <ImageBackground
      style={styles.backImage}
      source={require("practica1/assets/image/123.gif")}
    >
      <View>
        <ScrollView>
          <Image
            style={styles.avatar}
            source={require("../assets/image/200w.gif")}
          />
          <View style={styles.profileStyle}>
            <ImageBackground
              source={require("../assets/image/xd.gif")}
              resizeMode="cover"
              style={styles.fondo}
            >
              <View style={styles.textBox}>
                <Text style={styles.textFrase}>
                  Si no vuelvo en cinco minutos... solo espera más
                </Text>
              </View>
            </ImageBackground>
          </View>
          <Text style={styles.titleStyle}>Hobbies : </Text>
          <ScrollView style={{ padding: 10 }}>
            <View style={styles.cajas}>
              <Text style={styles.textStyles}>Bailar</Text>
              <Text style={styles.textStyles}>Tepearse</Text>
            </View>
            <View style={styles.cajas}>
              <Text style={styles.textStyles}>Brillo</Text>
              <Text style={styles.textStyles}>Taric</Text>
            </View>
            <View style={styles.cajas}>
              <Text style={styles.textStyles}>Clutch 1 v 5</Text>
              <Text style={styles.textStyles}>Best Adc</Text>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default PortfolioAlby;

const styles = StyleSheet.create({
  titleStyle: {
    color: "black",
    fontWeight: "900",
    textTransform: "capitalize",
    fontSize: 20,
    textAlign: "center",
  },
  textStyles: {
    borderColor: "#414469",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 16,
    width: "50%",
    backgroundColor: "#ecd7dd",
  },
  profileStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  avatar: {
    height: 200,
    marginTop: 10,
    marginLeft: 20,
    width: "90%",
    borderRadius: 100,
  },
  fondo: {
    width: "100%",
    border: "solid",
    borderRadius: 10,
  },
  textBox: {
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  textFrase: {
    textAlign: "center",
    color: "#ecd7dd",
    fontFamily: "Nu",
    fontSize: 20,
  },
  textStyle: {
    textAlign: "center",
    color: "#000",
    fontWeight: "700",
    fontSize: 20,
  },
  cajas: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  backImage: {
    flex: 1,
  },
});
