import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  ViewProps
} from "react-native";
import HeaderMenu from "../../components/HeaderMenu";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationInjectedProps } from "react-navigation";

export default class SelectHourEvent extends Component<
  NavigationInjectedProps
> {
  constructor(props: Readonly<ViewProps & NavigationInjectedProps>) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  state: { [key: string]: any } = {
    matchSelected: null
  };

  handleSelectMatch = () => {
    this.props.navigation.navigate("SelectMatch", {
      onSelect: this.setMatch
    });
  };

  setMatch = (item: any) => {
    this.setState({ matchSelected: item.selected }, () => {
      console.log(this.state.matchSelected);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.divHeader}>
          <HeaderMenu {...this.props} back tituloTela="Horário do evento" />
        </View> */}
        <View style={styles.divContent}>
          <View style={styles.divSelectMatch}>
            <View style={styles.divTextSelectMatch}>
              <Text style={styles.textSelectMatch}>Selecione uma partida</Text>
            </View>
            <View style={styles.divChooseAMatch}>
              {!this.state.matchSelected ? (
                <TouchableOpacity
                  style={styles.buttonChooseAMatch}
                  onPress={this.handleSelectMatch}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#757575"
                    }}
                  >
                    Escolha uma partida
                  </Text>
                  <Icon
                    name="soccer"
                    style={{ marginLeft: 30 }}
                    size={20}
                    color="#757575"
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={this.handleSelectMatch}
                    style={{ flex: 1 }}
                  >
                    <View style={styles.divImages}>
                      <Image
                        style={styles.imageTeam}
                        source={{
                          uri: this.state.matchSelected.escudoMandante
                        }}
                      />
                      <Image
                        style={styles.imageVersus}
                        source={require("../../assets/x.png")}
                      />
                      <Image
                        style={styles.imageTeam}
                        source={{
                          uri: this.state.matchSelected.escudoVisitante
                        }}
                      />
                    </View>
                    <View style={styles.divTextInfo}>
                      <Text style={styles.textInfo}>
                        {this.state.matchSelected.campeonato}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <View style={styles.divSelectHour}>
            <Text>sd</Text>
          </View>
          <View style={styles.divInfoPub}>
            <Text>sd</Text>
          </View>
          <View style={styles.divButtonArea}>
            <Text>sd</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1 },
  divContent: { flex: 9 },
  divSelectMatch: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#FFF"
  },
  divTextSelectMatch: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  textSelectMatch: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#38C08E"
  },
  divChooseAMatch: {
    flex: 1,
    marginTop: 7,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 15
  },
  buttonChooseAMatch: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#AFAFAF"
  },
  divImages: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 25,
    marginLeft: 25
  },
  imageTeam: {
    width: 60,
    height: 60
  },
  imageVersus: {
    width: 40,
    height: 40
  },
  divTextInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  textInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38C08E"
  },
  divSelectHour: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3FBF3F"
  },
  divInfoPub: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7F3FBF"
  },
  divButtonArea: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3FBFBF"
  }
});
