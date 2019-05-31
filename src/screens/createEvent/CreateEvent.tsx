import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  ViewProps,
  ActivityIndicator,
  Alert
} from "react-native";
import HeaderMenu from "../../components/HeaderMenu";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationInjectedProps } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import api from "../../services/apiService";
import { getToken } from "../../services/auth";
import RF from "react-native-responsive-fontsize";
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
    isDateTimePickerVisibleEnd: false,
    loaded: false,
    error: null
  };

  handleSelectMatch = () => {
    this.props.navigation.navigate("SelectMatch", {
      onSelect: this.setMatch
    });
  };

  setMatch = (item: any) => {
    this.setState({
      matchSelected: item.selected,
      startDate: moment(item.selected.dataHora).subtract(1, "hours"),
      endDate: moment(item.selected.dataHora).add(2.5, "hours")
    });
    this.cleanError();
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
    this.cleanError();
  };

  handleDatePickedEnd = (date: Date) => {
    this.setState({
      endDate: date
    });
    this.hideDateTimePickerEnd();
    this.cleanError();
  };

  cleanError = () => {
    this.setState({
      error: null
    });
  };

  handleSubmitForm = async () => {
    this.setState({ loaded: true });
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
        if (res.data.code === 200) {
          Alert.alert(
            "Cadastro de evento",
            "Evento cadastrado com sucesso!",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.navigation.navigate("mainNavigation");
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Cadastro de evento",
            "Algum problema ocorreu durante o cadastro, tente novamente.",
            [
              {
                text: "OK",
                onPress: () => {
                  this.setState({ loaded: false });
                }
              }
            ],
            { cancelable: false }
          );
        }
      })
      .catch(_ => {
        const error = _.response.data;
        if (error.code === 409) {
          this.setState({
            error: "Evento já cadastrado para essa partida.",
            loaded: false
          });
        } else {
          this.setState({
            error: "Erro ao cadastrar evento!",
            loaded: false
          });
        }
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
                      borderColor: "#38C08E",
                      paddingTop: 20
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
            {!this.state.error ? (
              <>
                {!this.state.loaded ? (
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
                ) : (
                  <View style={styles.divLoading}>
                    <Text style={styles.text}>Cadastrando evento...</Text>
                    <ActivityIndicator
                      style={styles.activityIndicator}
                      animating
                      size="large"
                      color="#38C08E"
                    />
                  </View>
                )}
              </>
            ) : (
              <>
                {this.state.error && (
                  <View style={styles.divError}>
                    <Text style={styles.textError}>{this.state.error}</Text>
                  </View>
                )}
              </>
            )}
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
    fontSize: RF(2.6),
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
  },
  divLoading: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  text: {
    color: "#38C08E",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 8
  },
  activityIndicator: {
    marginLeft: 20
  },
  divError: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  textError: {
    fontFamily: "Hebbo",
    fontSize: 15,
    color: "#EA2323"
  }
});
