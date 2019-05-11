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
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import api from "../../services/apiService";
import { getToken } from "../../services/auth";

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
    matchSelected: null,
    startDate: moment(),
    endDate: moment(),
    isDateTimePickerVisibleStart: false,
    isDateTimePickerVisibleEnd: false
  };

  handleSelectMatch = () => {
    this.props.navigation.navigate("SelectMatch", {
      onSelect: this.setMatch
    });
  };

  setMatch = (item: any) => {
    this.setState({ matchSelected: item.selected });
  };

  showDateTimePickerStart = () => {
    this.setState({
      isDateTimePickerVisibleStart: true
    });
  };

  hideDateTimePickerStart = () => {
    this.setState({
      isDateTimePickerVisibleStart: false
    });
  };

  handleDatePickedStart = (date: Date) => {
    this.setState({
      startDate: date
    });
    this.hideDateTimePickerStart();
  };

  showDateTimePickerEnd = () => {
    this.setState({
      isDateTimePickerVisibleEnd: true
    });
  };

  hideDateTimePickerEnd = () => {
    this.setState({
      isDateTimePickerVisibleEnd: false
    });
  };

  handleDatePickedEnd = (date: Date) => {
    this.setState({
      endDate: date
    });
    this.hideDateTimePickerEnd();
  };

  handleSubmitForm = async () => {
    const { matchSelected, startDate, endDate } = this.state;
    const token = await getToken();
    api
      .post(
        "/evento",
        {
          idPartida: matchSelected.id,
          horaInicio: startDate,
          horaFim: endDate,
          descricao: "descricao nao tem na tela :("
        },
        {
          headers: { token }
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  render() {
    return (
      <View style={styles.container}>
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
                      color: "#38C08E"
                    }}
                  >
                    Escolha uma partida
                  </Text>
                  <Icon
                    name="soccer"
                    style={{ marginLeft: 30 }}
                    size={20}
                    color="#38C08E"
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={this.handleSelectMatch}
                    style={{
                      flex: 1,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: "#38C08E"
                    }}
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
            <View style={styles.divBoxSelectHour}>
              <View style={styles.divRegionHour}>
                <Text style={styles.textTitleRegionHour}>Início do Evento</Text>
                <TouchableOpacity
                  style={styles.divSelectedHour}
                  onPress={this.showDateTimePickerStart}
                >
                  <Text style={styles.textHourSelect}>
                    {moment(this.state.startDate).format("LLLL")}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  mode={"datetime"}
                  isVisible={this.state.isDateTimePickerVisibleStart}
                  onConfirm={this.handleDatePickedStart}
                  onCancel={this.hideDateTimePickerStart}
                />
              </View>
            </View>
          </View>
          <View style={styles.divSelectHour}>
            <View style={styles.divBoxSelectHour}>
              <View style={styles.divRegionHour}>
                <Text style={styles.textTitleRegionHour}>Fim do Evento</Text>
                <TouchableOpacity
                  style={styles.divSelectedHour}
                  onPress={this.showDateTimePickerEnd}
                >
                  <Text style={styles.textHourSelect}>
                    {moment(this.state.endDate).format("LLLL")}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  mode={"datetime"}
                  isVisible={this.state.isDateTimePickerVisibleEnd}
                  onConfirm={this.handleDatePickedEnd}
                  onCancel={this.hideDateTimePickerEnd}
                />
              </View>
            </View>
          </View>
          <View style={styles.divButtonArea}>
            <TouchableOpacity
              style={styles.ButtonStyle}
              activeOpacity={0.5}
              onPress={this.handleSubmitForm}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  paddingVertical: 10
                }}
              >
                CADASTRAR EVENTO
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
    borderColor: "#38C08E"
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
    marginTop: 10,
    marginBottom: 10
  },
  textInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38C08E"
  },
  divSelectHour: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  divBoxSelectHour: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    alignSelf: "stretch"
  },
  divRegionHour: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "stretch",
    alignItems: "flex-start"
  },
  textTitleRegionHour: {
    flex: 2,
    fontSize: 15,
    marginTop: 10,
    marginLeft: 20,
    fontWeight: "bold",
    color: "#38C08E"
  },
  divSelectedHour: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#38C08E"
  },
  textHourSelect: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38C08E"
  },
  divButtonArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  ButtonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#38C08E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "transparent",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 30
  }
});
