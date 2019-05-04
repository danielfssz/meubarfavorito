import React, { Component } from "react";
import { Text, StyleSheet, View, ViewProps, Image, Button } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { NavigationInjectedProps } from "react-navigation";

import HeaderMenu from "../../components/HeaderMenu";

export default class PerfilPicture extends Component<NavigationInjectedProps> {
  constructor(props: Readonly<ViewProps & NavigationInjectedProps>) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };

  state: { [key: string]: any } = {
    pickedImage: {},
    infoRegister: {}
  };

  componentDidMount() {
    this.setState(
      {
        infoRegister: this.props.navigation.state.params
      },
      () => {
        this.pickImageHandler();
      }
    );
  }

  pickImageHandler = () => {
    ImagePicker.openPicker({
      includeBase64: true
    }).then((res: any) => {
      this.setState({
        pickedImage: res
      });

      const newInfoRegister = Object.assign({}, this.state.infoRegister);
      newInfoRegister.fotoPerfil = res.data;

      this.setState({
        infoRegister: newInfoRegister
      });
    });
  };

  handleSubmitForm = () => {
    this.props.navigation.navigate("PubPictures", this.state.infoRegister);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.divHeader}>
          <HeaderMenu {...this.props} back tituloTela="Foto de Perfil" />
        </View>
        <View style={styles.divContent}>
          <View style={styles.title}>
            <Text style={styles.txtTitle}>Selecione a foto do seu perfil!</Text>
          </View>
          <View style={styles.previewContainer}>
            <View style={styles.previewImage}>
              <Image
                source={{
                  uri: `data:${this.state.pickedImage.mime};base64,${
                    this.state.pickedImage.data
                  }`
                }}
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
              <Button
                title="Próxima Etapa"
                color="#38C08E"
                onPress={this.handleSubmitForm}
              />
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
