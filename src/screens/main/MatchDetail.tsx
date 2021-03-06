import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

import CardPub from "../../components/CardPub";
import api from "../../services/apiService";

export default class MatchDetail extends Component {
  public props: any;

  constructor(props: any) {
    super(props);
    moment.locale("pt-BR");
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#38C08E",
      elevation: 0
    },
    headerTintColor: "#000"
  };

  state: { [key: string]: any } = {
    matchDetail: [],
    listPubs: [],
    loaded: false
  };

  getEventos = async () => {
    api
      .get("/partida/" + this.state.matchDetail.id + "/evento")
      .then(data => {
        this.setState({ loaded: true, listPubs: data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.setState(
      {
        matchDetail: this.props.navigation.state.params
      },
      () => {
        this.getEventos();
      }
    );
  }

  render() {
    const matchDetail = this.state.matchDetail;

    return (
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <View style={styles.divImages}>
            <Image
              style={styles.imageTeam}
              source={{
                uri: matchDetail.escudoMandante
              }}
            />
            <Image
              style={styles.imageVersus}
              source={require("../../assets/x.png")}
            />
            <Image
              style={styles.imageTeam}
              source={{
                uri: matchDetail.escudoVisitante
              }}
            />
          </View>
        </View>
        <View style={styles.divContent}>
          <View style={styles.divMatchDetail}>
            <Text style={styles.textInfoTeams}>{matchDetail.campeonato}</Text>
            <Text style={styles.textInfoData}>
              {moment(matchDetail.dataHora).format("LLLL")}
            </Text>
          </View>
          {!this.state.loaded ? (
            <View style={styles.divLoading}>
              <Text style={styles.text}>Buscando os bares...</Text>
              <ActivityIndicator
                style={styles.activityIndicator}
                animating
                size="large"
                color="#38C08E"
              />
            </View>
          ) : this.state.listPubs.length > 0 ? (
            <>
              <View style={styles.divTitleListPub}>
                <Text style={styles.titleListPub}>
                  Bares que irão transmitir essa partida:
                </Text>
              </View>
              <View style={styles.divListPubs}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.listPubs}
                  renderItem={({ item }: any) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("EventDetail", item);
                      }}
                    >
                      <CardPub
                        nomeEstabelecimento={item.nomeEstabelecimento}
                        enderecoEstabelecimento={item.enderecoEstabelecimento}
                        fotoPerfil={item.fotoPerfil}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={styles.text}>
                Até o momento nenhum bar irá transimitir esse jogo :(
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1, backgroundColor: "#38C08E", paddingBottom: 15 },
  divContent: { flex: 4, marginTop: 17 },
  divImages: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 25,
    marginLeft: 25
  },
  imageTeam: {
    width: 95,
    height: 95
  },
  imageVersus: {
    width: 50,
    height: 50
  },
  divMatchDetail: {
    alignItems: "center"
  },
  textInfoTeams: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 22
  },
  textInfoData: {
    fontWeight: "bold",
    fontSize: 16
  },
  divTitleListPub: {
    alignItems: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ACACAC"
  },
  titleListPub: {
    marginTop: 8,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#000"
  },
  divListPubs: {
    flex: 1,
    marginTop: 13
  },
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
  activityIndicator: {
    marginTop: 20
  }
});
