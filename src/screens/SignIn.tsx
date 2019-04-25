/*This is an Example to Use Keyboard Avoiding View and Request Focus in React Native*/
import React, { Component } from "react";

import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import HeaderMenu from "../components/HeaderMenu";

export default class SignIn extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      senha: ""
    };
  }

  static navigationOptions = {
    drawerLabel: "Login",
    drawerIcon: ({ tintColor }: any) => (
      <Icon name="sign-in" type="font-awesome" color={tintColor} />
    )
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          justifyContent: "center"
        }}
      >
        <View style={{ flex: 1 }}>
          <HeaderMenu {...this.props} tituloTela="Faça seu login" />
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: 25 }}>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                <Icon
                  name="envelope"
                  type="font-awesome"
                  size={15}
                  iconStyle={{ padding: 10 }}
                  color="#413E4F"
                />

                <TextInput
                  style={{ flex: 1, color: "#413E4F" }}
                  onChangeText={email => this.setState({ email })}
                  underlineColorAndroid="#413E4F"
                  placeholder="Digite seu e-mail"
                  placeholderTextColor="#413E4F"
                  autoCapitalize="sentences"
                  keyboardType="email-address"
                  // ref={ref => {
                  //   this._emailinput = ref;
                  // }}
                  returnKeyType="next"
                  // onSubmitEditing={() =>
                  //   this._ageinput && this._ageinput.focus()
                  // }
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.SectionStyle}>
                <Icon
                  name="key"
                  type="font-awesome"
                  size={15}
                  iconStyle={{ padding: 10 }}
                  color="#413E4F"
                />

                <TextInput
                  style={{ flex: 1, color: "#413E4F" }}
                  onChangeText={senha => this.setState({ senha })}
                  underlineColorAndroid="#413E4F"
                  placeholder="Digite sua senha"
                  placeholderTextColor="#413E4F"
                  autoCapitalize="sentences"
                  // ref={ref => {
                  // this._addressinput = ref;
                  // }}
                  returnKeyType="send"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                style={styles.ButtonStyle}
                activeOpacity={0.5}
                onPress={() => {}}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    paddingVertical: 10,
                    fontSize: 16
                  }}
                >
                  Entrar
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },

  ButtonStyle: {
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
