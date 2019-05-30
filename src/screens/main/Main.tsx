import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import moment from "moment";
// import "moment/locale/pt-br";

import CardMatch from "../../components/CardMatch";
import api from "../../services/apiService";
import HeaderMenu from "../../components/HeaderMenu";

export default class Main extends Component {
  public props: any;

  constructor(props: any) {
    super(props);
    // moment.locale("pt-BR");
  }

  static navigationOptions = {
    header: null,
    drawerLabel: "Início",
    title: "Home",
    drawerIcon: ({ tintColor }: any) => (
      <Icon name="home" type="font-awesome" color={tintColor} />
    )
  };

  state = {
    partidas: null,
    loaded: false
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    api
      .get("/partida")
      .then(data => {
        if (this._isMounted) {
          this.setState({ loaded: true });
          this.setState({ partidas: data.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <HeaderMenu {...this.props} menu tituloTela="Meu Bar Favorito" />
        </View>
        <View style={styles.divContent}>
          {this.state.loaded ? (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.partidas}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("MatchDetail", item);
                  }}
                >
                  <CardMatch
                    nomeMandante={item.nomeMandante}
                    nomeVisitante={item.nomeVisitante}
                    escudoMandante={item.escudoMandante}
                    escudoVisitante={item.escudoVisitante}
                    campeonato={item.campeonato}
                    horario={moment(item.dataHora).format("LLLL")}
                    views={item.views}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.divLoading}>
              <Text style={styles.text}>Buscando partidas...</Text>
              <ActivityIndicator style={styles.activityIndicator} animating size="large" color="#38C08E" />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1 },
  divContent: { flex: 8, marginTop: 8 },
  divLoading: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  text: {
    color: "#38C08E",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 20
  },
  activityIndicator:{
    marginTop: 20
  }
});
