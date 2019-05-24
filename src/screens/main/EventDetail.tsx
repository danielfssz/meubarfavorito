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

import CardPub from "../../components/CardPub";
import api from "../../services/apiService";

export default class EventDetail extends Component {
  public props: any;

  constructor(props: any) {
    super(props);
    moment.locale("pt-BR");
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#FFF",
      elevation: 0
    },
    headerTintColor: "#000"
  };

  state: { [key: string]: any } = {
    eventDetail: this.props.navigation.state.params,
    listPubs: []
  };

  getEventos = async () => {
    api
      .get("/evento/" + this.state.eventDetail.id)
      .then(data => {
        console.log(data);
        this.setState({ listPubs: data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getEventos();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divContent}>
          <View style={styles.divCarrousel}>
            <Text>Carousel</Text>
          </View>

          <View style={styles.divEventDetail}>
            <Text style={styles.textNamePub}>{ this.state.listPubs.nomeEstabelecimento }</Text>
            <Text style={styles.textInfoAddress}>
              Endereço: { this.state.listPubs.enderecoEstabelecimento }
            </Text>
            <Text style={styles.textInfoAddress}>Telefone: { this.state.listPubs.telefone }</Text>
          </View>
        </View>
        <View style={styles.divOthers}>
          <Text>Outras coisasss</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divContent: { flex: 12 },
  divCarrousel: {
    flex: 4, // Somar
    backgroundColor: "#38C08E"
  },
  divEventDetail: {
    flex: 2, // Somar
    paddingLeft: 30,
    paddingTop: 15,
    alignItems: "flex-start",
    backgroundColor: "#abc"
  },
  textNamePub: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 22
  },
  textInfoAddress: {
    fontWeight: "bold",
    fontSize: 16
  },
  divOthers: {
    flex: 6 // Somar
  }
});
