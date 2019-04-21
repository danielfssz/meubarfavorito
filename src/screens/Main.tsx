import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import moment from "moment";
import "moment/locale/pt-br";

import CardMatch from "../components/CardMatch";
import api from "../services/apiService";
import HeaderMenu from "../components/HeaderMenu";

export default class Main extends Component {
  public props: any;

  constructor(props: any) {
    super(props);
    moment.locale("pt-BR");
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
    eventos: []
  };

  ex = [
    {
      data: "Sun, 30 Jun 2019 21:45:00 GMT",
      enderecoEstabelecimento: "rua 12, 124",
      escudoMandante: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
      escudoVisitante:
        "https://a3.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F874.png",
      id: 3,
      nomeEstabelecimento: "Bar do Zé",
      nomeMandante: "Palmeiras",
      nomeVisitante: "Corinthians",
      campeonato: "Campeonato Brasileiro",
      views: 878
    },
    {
      data: "Sun, 30 Jun 2019 21:45:00 GMT",
      enderecoEstabelecimento: "rua 12, 124",
      escudoMandante: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
      escudoVisitante:
        "https://a3.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F874.png",
      id: 3,
      nomeEstabelecimento: "Bar do Zé",
      nomeMandante: "Palmeiras",
      nomeVisitante: "Corinthians",
      campeonato: "Campeonato Brasileiro",
      views: 878
    },
    {
      data: "Sun, 30 Jun 2019 21:45:00 GMT",
      enderecoEstabelecimento: "rua 12, 124",
      escudoMandante: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
      escudoVisitante:
        "https://a3.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F874.png",
      id: 3,
      nomeEstabelecimento: "Bar do Zé",
      nomeMandante: "Palmeiras",
      nomeVisitante: "Corinthians",
      campeonato: "Campeonato Brasileiro",
      views: 878
    },
    {
      data: "Sun, 30 Jun 2019 21:45:00 GMT",
      enderecoEstabelecimento: "rua 12, 124",
      escudoMandante: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
      escudoVisitante:
        "https://a3.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F874.png",
      id: 3,
      nomeEstabelecimento: "Bar do Zé",
      nomeMandante: "Palmeiras",
      nomeVisitante: "Corinthians",
      campeonato: "Campeonato Brasileiro",
      views: 878
    }
  ];

  componentDidMount() {
    this.setState({ eventos: this.ex });
    // api
    //   .get("/evento")
    //   .then(data => {
    //     console.log(data.data);
    //     // this.setState({ eventos: data.data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <HeaderMenu {...this.props} tituloTela="Meu Bar Favorito" />
        </View>
        <View style={styles.divContent}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.eventos}
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
                  horario={moment(item.data).format("LLLL")}
                  views={item.views}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1 },
  divContent: { flex: 8 }
});
