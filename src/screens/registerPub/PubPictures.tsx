import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewProps,
  Button,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { NavigationInjectedProps } from "react-navigation";

import HeaderMenu from "../../components/HeaderMenu";
import api from "../../services/apiService";
import SelectImage from "../../components/SelectImage";

export default class PubPictures extends Component<NavigationInjectedProps> {
  constructor(props: Readonly<ViewProps & NavigationInjectedProps>) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };

  state: { [key: string]: any } = {
    pickedImages: [],
    infoRegister: {},
    finished: false,
    error: null
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
      multiple: true,
      includeBase64: true
    }).then((images: any) => {
      this.setState({ pickedImages: images });
    });
  };

  selectedImagesToSend = async () => {
    const newInfoRegister = Object.assign({}, this.state.infoRegister);

    this.state.pickedImages.forEach((item: any) => {
      if (item === undefined) return;
      newInfoRegister.fotosEstabelecimento.push(`data:${item.mime};base64,${item.data}`);
    });

    await this.setState({
      infoRegister: newInfoRegister
    });
  };

  handleSubmitForm = async () => {
    await this.selectedImagesToSend();
    if (this.state.infoRegister.fotosEstabelecimento.length < 1) {
      Alert.alert(
        "Cadastro",
        "Você deve selecionar pelo menos 1 foto do seu estabelecimento"
      );
      return;
    } else {
      this.setState({ finished: true });
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
          fotoPerfil,
          fotosEstabelecimento
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
            fotoPerfil,
            fotosEstabelecimento
          })
          .then((response: any) => {
            if (response.data.code == 200) {
              this.props.navigation.navigate("RegisteredSuccessfully");
            }
          })
          .catch(_ => {
            const error = _.response.data;

            if (error.code === 409) {
              this.setState({
                error: "CNPJ já cadastrado, verifique novamente."
              });
            } else {
              this.setState({
                error: "Erro ao realizar cadastro!"
              });
            }
          });
      } catch (_err) {
        this.setState({
          error: "Houve um problema com o cadastro, verifique suas informações!"
        });
      }
    }
  };

  createRows = (data: any, columns: any) => {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;

    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true
      });
      lastRowElements += 1;
    }
    return data;
  };

  deleteItem = (item: any) => {
    this.setState({
      pickedImages: this.state.pickedImages.filter(
        (img: any) => img.path !== item.path
      )
    });
  };

  render() {
    const columns = 2;
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
            <Text style={styles.text}>
              Selecione as fotos do seu estabelecimento!
            </Text>
          </View>
          <View style={styles.previewContainer}>
            <SafeAreaView>
              <FlatList
                // data={this.createRows(this.state.pickedImages, columns)}
                data={this.state.pickedImages}
                keyExtractor={(_, i) => i.toString()}
                numColumns={columns}
                renderItem={({ item }: any) => {
                  // if (item.empty) {
                  //   return <View style={[styles.item, styles.itemEmpty]} />;
                  // }
                  return (
                    <SelectImage item={item} deleteItem={this.deleteItem} />
                  );
                }}
              />
            </SafeAreaView>
          </View>
          {this.state.error ? (
            <View style={styles.divFooter}>
              <Text style={styles.text}>{this.state.error}</Text>
            </View>
          ) : (
            <View style={styles.divFooter}>
              <View style={styles.groupButton}>
                {!this.state.finished ? (
                  <>
                    <Button
                      title="Selecionar fotos"
                      color="#38C08E"
                      onPress={this.pickImageHandler}
                    />
                    <Button
                      title="Finalizar cadastro"
                      color="#38C08E"
                      onPress={this.handleSubmitForm}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.text}>Enviando seu cadastro...</Text>
                    <ActivityIndicator animating size="large" color="#38C08E" />
                  </>
                )}
              </View>
            </View>
          )}
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
  text: {
    color: "#38C08E",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 20
  },
  previewContainer: {
    flex: 3,
    width: "90%"
  },
  previewImage: {
    backgroundColor: "#eee",
    height: 280,
    width: "100%"
  },
  divFooter: {
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
  },
  item: {
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 60
  },
  itemEmpty: {
    backgroundColor: "transparent"
  }
});
