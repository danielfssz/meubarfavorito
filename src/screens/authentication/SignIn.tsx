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
  ActivityIndicator
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
    error: null,
    finished: false
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
      this.setState({ finished: true, error: null });
      try {
        const { email, senha } = this.state;
        onSignIn({ email, senha })
          .then((response: any) => {
            const { code, mensagem } = response;

            if (code === 200) {
              this.props.navigation.navigate("AreaLogada");
            } else if (code === 201) {
              this.setState({ finished: false, error: mensagem });
            } else {
              this.setState({ finished: false, error: mensagem });
            }
          })
          .catch(error => {
            this.setState({
              finished: false,
              error:
                "Houve um problema com o login, verifique suas credenciais!"
            });
          });
      } catch (_err) {
        this.setState({
          finished: false,
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
                  returnKeyType="next"
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
                <View style={styles.divLoading}>
                  <Text style={styles.text}>Efetuando login...</Text>
                  <ActivityIndicator animating size="large" color="#38C08E" />
                </View>
              )}
              {this.state.error && (
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
  },
  divLoading: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  text: {
    color: "#38C08E",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 20
  }
});
