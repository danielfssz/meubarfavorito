import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import moment from "moment";

import CardMatch from "../../components/CardMatch";
import api from "../../services/apiService";
import HeaderMenu from "../../components/HeaderMenu";

export default class SelectMatch extends Component {
  public props: any;

  constructor(props: any) {
    super(props);    
  }

  static navigationOptions = {
    header: null,
    drawerLabel: "Criar evento",
    drawerIcon: ({ tintColor }: any) => (
      <Icon name="plus-square" type="font-awesome" color={tintColor} />
    )
  };

  state = {
    partidas: []
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    api
      .get("/partida")
      .then(data => {
        if (this._isMounted) {
          this.setState({ partidas: data.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSelectedMatch = (item: any) => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect({
      selected: item
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <HeaderMenu {...this.props} back tituloTela="Selecione uma partida" />
        </View>
        <View style={styles.divContent}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.partidas}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                onPress={() => {
                  this.handleSelectedMatch(item);
                }}
              >
                <CardMatch
                  nomeMandante={item.nomeMandante}
                  nomeVisitante={item.nomeVisitante}
                  escudoMandante={item.escudoMandante}
                  escudoVisitante={item.escudoVisitante}
                  campeonato={item.campeonato}
                  horario={moment(item.dataHora).format("LLLL")}
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
  divContent: { flex: 8, marginTop: 8 }
});
