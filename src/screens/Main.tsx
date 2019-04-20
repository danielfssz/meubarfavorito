import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import HeaderMenu from "../components/HeaderMenu";
import { Icon } from "react-native-elements";
import CardMatch from "../components/CardMatch";
import api from "../services/apiService";
import moment from "moment";
import "moment/locale/pt-br";

export default class Main extends Component {
  public props: any;
  // private formatDate: Moment;
  constructor(props: any) {
    super(props);
    moment.locale("pt-BR");
  }

  static navigationOptions = {
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
      campeonato: "Campeonato Brasileiro"
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
      campeonato: "Campeonato Brasileiro"
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
      campeonato: "Campeonato Brasileiro"
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
      campeonato: "Campeonato Brasileiro"
    }
  ];

  componentDidMount() {
    api
      .get("/evento")
      .then(data => {
        console.log(data.data);
        // this.setState({ eventos: data.data });
        this.setState({ eventos: this.ex });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // {
  //         "data": "Sun, 30 Jun 2019 21:45:00 GMT",
  //         "enderecoEstabelecimento": "rua 12, 124",
  //         "escudoMandante": "linkEscudoPalmeiras",
  //         "escudoVisitante": "linkEscudoCorinthians",
  //         "id": 3,
  //         "nomeEstabelecimento": "Bar do Zé",
  //         "nomeMandante": "Palmeiras",
  //         "nomeVisitante": "Corinthians"
  //     }

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
              <CardMatch
                nomeMandante={item.nomeMandante}
                nomeVisitante={item.nomeVisitante}
                escudoMandante={item.escudoMandante}
                escudoVisitante={item.escudoVisitante}
                campeonato={item.campeonato}
                horario={moment(item.data).format("LLLL")}
              />
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
