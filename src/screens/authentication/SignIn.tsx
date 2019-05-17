import React, { Component } from "react";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView, 
  ActivityIndicator, 
} from "react-native";
import { Icon } from "react-native-elements";
import HeaderMenu from "../../components/HeaderMenu";
import { onSignIn } from "../../services/auth";

export default class SignIn extends Component<any, {}> {
  constructor(props: any) {
    super(props);
  }

  state = {
    email: "",
    senha: "",
    error: "", 
    finished: false, 
  };

  static navigationOptions = {
    drawerLabel: "Login",
    drawerIcon: ({ tintColor }: any) => (
      <Icon name="sign-in" type="font-awesome" color={tintColor} />
    )
  };

  handleSubmitLogin = () => {
    if (this.state.email.length === 0 || this.state.senha.length === 0) {
      this.setState(
        { error: "Preencha usuário e senha para continuar!" },
        () => false
      );
      setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    } else {
      this.setState({ finished: true });
      try {
        const { email, senha } = this.state;
        onSignIn({ email, senha })
          .then((response: any) => {
            if (response.data.code == 200) {
              if (response.data.body.token) {
                this.props.navigation.navigate("AreaLogada");
              } else {
                this.setState({
                  error: "Erro ao recuperar token!"
                });
              }
            } else {
              if (response.data.code == 201) {
                this.setState({
                  error: "Registro ou senha inválidos!"
                });
              } else {
                this.setState({ error: "Erro ao realizar login!" });
              }
            }
          })
          .catch(error => {
            console.log(error);
            this.setState({
              error:
                "Houve um problema com o login, verifique suas credenciais!"
            });
          });
      } catch (_err) {
        this.setState({
          error: "Houve um problema com o login, verifique suas credenciais!"
        });
      }
    }
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
          <HeaderMenu {...this.props} back tituloTela="Faça seu login" />
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
                  value={this.state.email}
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
                  value={this.state.senha}
                  // ref={ref => {
                  // this._addressinput = ref;
                  // }}
                  returnKeyType="send"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry
                />
              </View>
              {!this.state.finished ? (
                <TouchableOpacity
                  style={styles.ButtonStyle}
                  activeOpacity={0.5}
                  onPress={this.handleSubmitLogin}
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
              ) : (
                <>
                  <Text>Efetuando login...</Text>
                  <ActivityIndicator animating size="large" color="#38C08E" />
                </>
              )}
              {this.state.error.length !== 0 && (
                <View style={styles.divError}>
                  <Text style={styles.textError}>{this.state.error}</Text>
                </View>
              )}
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
