import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import api from "../../services/apiService";
import Carousel from "react-native-snap-carousel";

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

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
    eventListItem: this.props.navigation.state.params,
    event: [],
    entries: [{ title: "teste"},{ title: "teste2" }]
  };

  getEventos = async () => {
    api
      .get("/evento/" + this.state.eventListItem.id)
      .then(data => {
        console.log(data);
        this.setState({ event: data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getEventos();
  }

  _renderItem({ item, index }: { item: any; index: any }) {
    return (
      <View style={{ flex: 1, backgroundColor: "#443212" }}>
        <Text style={{ flex: 1 }}>{item.title}</Text>
      </View>
    );
  }

  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divContent}>
          <View style={styles.divCarrousel}>
            <Carousel
              layout={"default"}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              data={this.state.entries}
            />
          </View>

          <View style={styles.divEventDetail}>
            <Text style={styles.textNamePub}>
              {this.state.event.nomeEstabelecimento}
            </Text>
            <Text style={styles.textInfoAddress}>
              Endereço: {this.state.event.enderecoEstabelecimento}
            </Text>
            <Text style={styles.textInfoAddress}>
              Telefone: {this.state.event.telefone}
            </Text>
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
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1
    // other styles for the inner container
  }
});
