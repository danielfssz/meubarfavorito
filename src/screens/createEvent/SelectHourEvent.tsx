import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import HeaderMenu from "../../components/HeaderMenu";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class SelectHourEvent extends Component {
  state = {
    isDateTimePickerVisible: false
  };
  static navigationOptions = {
    header: null
  };

  showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true
    });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false
    });
  };

  handleDatePicked = (date: Date) => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <HeaderMenu {...this.props} back tituloTela="Horário do evento" />
        </View>
        <View style={styles.divContent}>
          <View style={styles.content}>
            <>
              <Button
                title="Show DatePicker"
                onPress={this.showDateTimePicker}
              />
              <DateTimePicker
                mode={"time"}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
            </>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1 },
  divContent: { flex: 8 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  textContent: {
    fontFamily: "Raleway-Bold",
    fontSize: 30,
    textAlign: "center",
    margin: 10
  }
});
