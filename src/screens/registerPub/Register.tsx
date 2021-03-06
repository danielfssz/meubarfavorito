import React, { Component } from "react";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderMenu from "../../components/HeaderMenu";

export default class Register extends Component<any, {}> {
  constructor(props: any) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  state = {
    error: "",
    nome: "",
    descricao: "",
    cnpj: "",
    endereco: "",
    cep: "",
    telefone: "",
    celular: "",
    email: "",
    senha: "",
    fotoPerfil: "",
    fotosEstabelecimento: []
  };

  handleSubmitForm = () => {
    if (!this.state.nome) {
    } else {
      const {
        nome,
        descricao,
        cnpj,
        endereco,
        cep,
        telefone,
        celular,
        email,
        senha,
        fotoPerfil,
        fotosEstabelecimento
      } = this.state;

      const infoRegister = {
        nome,
        descricao,
        cnpj,
        endereco,
        cep,
        telefone,
        celular,
        email,
        senha,
        fotoPerfil,
        fotosEstabelecimento
      };
      this.props.navigation.navigate("PerfilPicture", infoRegister);
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
          <HeaderMenu {...this.props} back tituloTela="Cadastre-se" />
        </View>
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View>
              <KeyboardAvoidingView enabled>
                <View style={styles.SectionStyle}>
                  <Icon
                    name="user"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
                    onChangeText={nome => this.setState({ nome })}
                    underlineColorAndroid="#413E4F"
                    placeholder="Nome"
                    placeholderTextColor="#413E4F"
                    autoCapitalize="sentences"
                    value={this.state.nome}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Icon
                    name="key"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
                    onChangeText={descricao => this.setState({ descricao })}
                    underlineColorAndroid="#413E4F"
                    placeholder="Descrição do seu estabelecimento"
                    placeholderTextColor="#413E4F"
                    autoCapitalize="sentences"
                    value={this.state.descricao}
                    blurOnSubmit={false}
                    multiline
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Icon
                    name="envelope"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
                    onChangeText={cnpj => this.setState({ cnpj })}
                    underlineColorAndroid="#413E4F"
                    placeholder="CNPJ"
                    placeholderTextColor="#413E4F"
                    autoCapitalize="sentences"
                    value={this.state.cnpj}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    keyboardType={"numbers-and-punctuation"}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Icon
                    name="map-marker"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
                    onChangeText={endereco => this.setState({ endereco })}
                    underlineColorAndroid="#413E4F"
                    placeholder="Endereço"
                    placeholderTextColor="#413E4F"
                    autoCapitalize="sentences"
                    value={this.state.endereco}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Icon
                    name="envelope"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
                    onChangeText={cep => this.setState({ cep })}
                    underlineColorAndroid="#413E4F"
                    placeholder="CEP"
                    placeholderTextColor="#413E4F"
                    autoCapitalize="sentences"
                    value={this.state.cep}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    keyboardType={"numeric"}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Icon
                    name="phone-square"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
                    onChangeText={telefone => this.setState({ telefone })}
                    underlineColorAndroid="#413E4F"
                    placeholder="Telefone"
                    placeholderTextColor="#413E4F"
                    autoCapitalize="sentences"
                    value={this.state.telefone}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    keyboardType={"numeric"}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Icon
                    name="mobile"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
                    onChangeText={celular => this.setState({ celular })}
                    underlineColorAndroid="#413E4F"
                    placeholder="Celular"
                    placeholderTextColor="#413E4F"
                    autoCapitalize="sentences"
                    value={this.state.celular}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    keyboardType={"numeric"}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Icon
                    name="at"
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />

                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
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
                    size={15}
                    style={{ padding: 10 }}
                    color="#413E4F"
                  />

                  <TextInput
                    style={{
                      flex: 1,
                      color: "#413E4F"
                    }}
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
                    SELECIONE A FOTO DE PERFIL
                  </Text>
                </TouchableOpacity>
                {this.state.error.length !== 0 && (
                  <View style={styles.divError}>
                    <Text style={styles.textError}>{this.state.error}</Text>
                  </View>
                )}
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 8, marginTop: 10, marginBottom: 30 },
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
