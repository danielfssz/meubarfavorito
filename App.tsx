import React from "react";

import { Alert } from "react-native";
import { createRootNavigator } from "./src/Routes";
import { isSignedIn, onSignOut } from "./src/services/auth";

export default class App extends React.Component {
  state = {
    signed: false,
    signLoaded: true
  };

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signed: res, signLoaded: true }))
      .catch(err =>
        Alert.alert("Erro", "Erro ao tentar recuperar token no AsyncStorage")
      );
  }

  componentDidMount() {
    onSignOut();
  }

  render() {
    const { signLoaded, signed } = this.state;

    if (!signLoaded) {
      return null;
    }

    const Layout = createRootNavigator(signed);
    return <Layout />;
  }
}
