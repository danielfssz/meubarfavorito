import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import HeaderMenu from "../../components/HeaderMenu";
import { onSignOut } from "../../services/auth";

export default class RegisteredSuccessfully extends Component<any, {}> {
  static navigationOptions = {
    header: null,
    drawerLabel: "Sair",
    drawerIcon: ({ tintColor }: any) => (
      <Icon name="sign-out" type="font-awesome" color={tintColor} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <HeaderMenu {...this.props} menu tituloTela="Meu Bar Favorito" />
        </View>
        <View style={styles.divContent}>
          <View style={styles.content}>
            <Text style={styles.textContent}>
              Deseja realmente sair da sua conta?
            </Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.ButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                onSignOut().then(() => {
                  this.props.navigation.navigate("AreaNaoLogada");
                });
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  paddingVertical: 10
                }}
              >
                Desejo sair
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.navigate("mainNavigation");
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  paddingVertical: 10
                }}
              >
                Página inicial
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1 },
  divContent: { flex: 8 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  textContent: {
    fontFamily: "Raleway-Bold",
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  ButtonStyle: {
    backgroundColor: "#38C08E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "transparent",
    height: 40,
    width: 250,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 30
  }
});
