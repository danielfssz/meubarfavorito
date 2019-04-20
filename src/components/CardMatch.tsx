import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Octicons";

const CardMatch = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.divHeader}>
        <View style={styles.divImages}>
          <Image
            style={styles.imageTeam}
            source={{
              uri: props.escudoMandante
            }}
          />
          <Image
            style={styles.imageVersus}
            source={{
              uri: "https://karana.com.br/blog/wp-content/uploads/2016/06/x.png"
            }}
          />
          <Image
            style={styles.imageTeam}
            source={{
              uri: props.escudoVisitante
            }}
          />
        </View>
      </View>
      <View style={styles.divContent}>
        <View style={styles.divInformation}>
          <Text style={styles.textTeams}>
            {props.nomeMandante} x {props.nomeVisitante}
          </Text>
          <Text style={styles.textChampionship}>{props.campeonato}</Text>
          <Text style={styles.textHour}>{props.horario}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 220,
    margin: 13,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: "#dddddd"
  },
  divHeader: {
    flex: 4,
    padding: 10,
    backgroundColor: "#EBEBEB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  divContent: {
    flex: 4,
    backgroundColor: "#38C08E",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  divImages: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginRight: 25,
    marginLeft: 25
  },
  imageTeam: {
    width: 80,
    height: 80
  },
  imageVersus: {
    width: 40,
    height: 40
  },
  divInformation: {
    margin: 15
  },
  textTeams: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold"
  },
  textChampionship: {
    fontSize: 15,
    color: "#FFF"
  },
  textHour: {
    fontSize: 15,
    color: "#FFF"
  }
});

export default CardMatch;
