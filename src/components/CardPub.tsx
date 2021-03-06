import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CardMatch = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.divImagePub}>
        <Image resizeMode={"contain"} style={styles.imagePub} source={{ uri: props.fotoPerfil }} />
      </View>
      <View style={styles.divContent}>
        <View style={styles.divInformation}>
          <Text style={styles.textPubName}>{props.nomeEstabelecimento}</Text>
          <Text style={styles.textPubAddress}>
            {props.enderecoEstabelecimento}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#38C08E",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "transparent",
    margin: 12,
    marginTop: 6,
    marginBottom: 6
  },
  divImagePub: {
    margin: 9,
    borderColor: "transparent",
    borderWidth: 0.5
  },
  divContent: {
    flex: 1,
    flexDirection: "column"
  },
  imagePub: {
    width: 100,
    height: 100,
    borderRadius: 20
  },
  divInformation: {
    margin: 15
  },
  textPubName: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold"
  },
  textPubAddress: {
    fontSize: 17,
    color: "#FFF"
  }
});

export default CardMatch;
