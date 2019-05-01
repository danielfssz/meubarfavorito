import React, { Component } from "react";
import { Text, StyleSheet, View, ViewProps, Image, Button } from "react-native";
import ImagePicker from "react-native-image-picker";
import { NavigationInjectedProps } from "react-navigation";

import HeaderMenu from "../components/HeaderMenu";
import api from "../services/apiService";

export default class PubPictures extends Component<NavigationInjectedProps> {
  constructor(props: Readonly<ViewProps & NavigationInjectedProps>) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };

  state: { [key: string]: any } = {
    pickedImage: null,
    infoRegister: {}
  };

  componentDidMount() {
    this.setState(
      {
        infoRegister: this.props.navigation.state.params
      },
      () => {
        // this.pickImageHandler();
      }
    );
  }

  pickImageHandler = () => {
    ImagePicker.launchImageLibrary({}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: res
        });

        const newInfoRegister = Object.assign({}, this.state);
        newInfoRegister.infoRegister.fotoPerfil = res.data;

        this.setState({
          infoRegister: newInfoRegister
        });
      }
    });
  };

  handleSubmitForm = () => {
    if (!this.state.infoRegister.nome) {
    } else {
      try {
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
          fotoPerfil
        } = this.state.infoRegister;
        api
          .post("/estabelecimento", {
            nome,
            descricao,
            cnpj,
            endereco,
            cep,
            telefone,
            celular,
            email,
            senha,
            fotoPerfil
          })
          .then((response: any) => {
            if (response.data.code == 200) {
              this.props.navigation.navigate("RegisteredSuccessfully");
            } else {
              if (response.data.code == 409) {
                this.setState({
                  error: "CNPJ já cadastrado!"
                });
              } else {
                this.setState({
                  error: "Erro ao realizar cadastro!"
                });
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
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <HeaderMenu
            {...this.props}
            back
            tituloTela="Fotos do Estabelecimento"
          />
        </View>
        <View style={styles.divContent}>
          <View style={styles.title}>
            <Text style={styles.txtTitle}>Selecione a foto do seu perfil!</Text>
          </View>
          <View style={styles.previewContainer}>
            <View style={styles.previewImage}>
              <Image
                source={this.state.pickedImage}
                style={styles.previewImage}
              />
            </View>
          </View>
          <View style={styles.divButtons}>
            <View style={styles.groupButton}>
              <Button
                title="Mudar foto"
                color="#38C08E"
                onPress={this.pickImageHandler}
              />
              <Button title="Concluir" color="#38C08E" onPress={() => {}} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divHeader: { flex: 1 },
  divContent: { flex: 8, marginTop: 20, alignItems: "center" },
  title: {
    flex: 1
  },
  txtTitle: {
    color: "#38C08E",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 20
  },
  previewContainer: {
    flex: 3,
    width: "70%"
  },
  previewImage: {
    backgroundColor: "#eee",
    height: 280,
    width: "100%"
  },
  divButtons: {
    flex: 2,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  groupButton: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
