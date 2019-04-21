import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

import CardPub from "../components/CardPub";

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
    listPubs: []
  };

  ex = [
    {
      addressPub: "rua 12, 124",
      namePub: "Bar do Carlinhos",
      imagePub: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png"
    },
    {
      addressPub: "rua 12, 124",
      namePub: "Bar do Carlinhos",
      imagePub: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png"
    },
    {
      addressPub: "rua 12, 124",
      namePub: "Bar do Carlinhos",
      imagePub: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png"
    },
    {
      addressPub: "rua 12, 124",
      namePub: "Bar do Carlinhos",
      imagePub: "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png"
    }
  ];

  componentDidMount() {
    this.setState({
      matchDetail: this.props.navigation.state.params
    });
    this.setState({
      listPubs: this.ex
    });
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
              source={{
                uri:
                  "https://karana.com.br/blog/wp-content/uploads/2016/06/x.png"
              }}
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
              {moment(matchDetail.data).format("LLLL")}
            </Text>
          </View>
          <View style={styles.divMatchViews}>
            <Text style={styles.textInfoView}>
              {matchDetail.views} visualizações
            </Text>
          </View>
          <View style={styles.divListPubs}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.listPubs}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  onPress={() => {
                    alert("sd");
                  }}
                >
                  <CardPub
                    namePub={item.namePub}
                    addressPub={item.addressPub}
                    imagePub={item.imagePub}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1, backgroundColor: "#38C08E" },
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
  divMatchViews: {
    alignItems: "flex-end",
    marginRight: 30,
    marginTop: 10
  },
  textInfoView: {
    fontWeight: "bold",
    fontSize: 16
  },
  divListPubs: {
    flex: 1,
    marginTop: 13
  }
});
