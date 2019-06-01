import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
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
      backgroundColor: "#38C08E",
      elevation: 0
    },
    headerTintColor: "#FFF"
  };

  state: { [key: string]: any } = {
    eventListItem: this.props.navigation.state.params,
    event: null
  };

  getEventos = async () => {
    api
      .get(`/evento/${this.state.eventListItem.id}`)
      .then(data => {
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
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 1 }} source={{ uri: item }} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divContent}>
          <View style={styles.divCarrousel}>
            {this.state.event ? (
              <Carousel
                layout={"default"}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                data={this.state.event.fotosEstabelecimento}
              />
            ) : (
              <View
                style={[
                  styles.divLoading,
                  { flexDirection: "column", justifyContent: "flex-start" }
                ]}
              >
                <Text style={styles.text}>
                  Carregando as informações do estabelecimento...
                </Text>
                <ActivityIndicator
                  style={{ marginTop: 20 }}
                  animating
                  size="large"
                  color="#38C08E"
                />
              </View>
            )}
          </View>
          <View style={styles.divEventDetail}>
            {this.state.event ? (
              <View style={{ alignItems: "flex-start", paddingLeft: 20 }}>
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
            ) : (
              <View
                style={[
                  styles.divLoading,
                  { alignItems: "center", justifyContent: "center" }
                ]}
              >
                <ActivityIndicator animating size="large" color="#38C08E" />
              </View>
            )}
          </View>
        </View>

        <View style={styles.divEventPromo}>
          {this.state.event ? (
            <View style={{ alignItems: "flex-start", paddingLeft: 20 }}>
              <Text style={styles.textTitlePromo}>Promoções:</Text>
              <Text style={styles.textPromo}>
                {this.state.event.descricaoPromocao}
              </Text>
            </View>
          ) : (
            <View
              style={[
                styles.divLoading,
                { alignItems: "center", justifyContent: "center" }
              ]}
            >
              <ActivityIndicator animating size="large" color="#38C08E" />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  divContent: { flex: 12 },
  divCarrousel: {
    flex: 4, // Somar
    // backgroundColor: "#38C08E",
    margin: 5,
    borderRadius: 3
  },
  divEventDetail: {
    flex: 2, // Somar
    margin: 5,
    borderRadius: 3,
    paddingTop: 15
  },
  textNamePub: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 22
  },
  textInfoAddress: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#939393",
    marginTop: 5
  },
  divEventPromo: {
    flex: 6, // Somar
    margin: 5,
    borderRadius: 3
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1
  },
  divLoading: {
    flex: 1
  },
  text: {
    color: "#38C08E",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 20
  },
  textTitlePromo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 22,
    padding: 5
  },
  textPromo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#939393",
    marginTop: 5
  }
});
