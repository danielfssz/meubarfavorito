import React from "react";

import { createRootNavigator } from "./src/routes";
// import { isSignedIn, onSignOut } from "./src/service/auth";

export default class App extends React.Component {
  state = {
    signed: true,
    signLoaded: true
  };

  componentWillMount() {
    // isSignedIn()
    //   .then(res => this.setState({ signed: res, signLoaded: true }))
    //   .catch(err => alert("Erro"));
  }

  componentDidMount() {
    // onSignOut()
    //   .then(() => {
    //     console.log("limpou");
    //   })
    //   .catch(() => {
    //     console.log("nao limpouo");
    //   });
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
