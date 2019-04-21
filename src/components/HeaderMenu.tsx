import React, { Component } from "react";
import { Header, Icon } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";

export default class HeaderMenu extends Component {
  public props: any;
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{ marginTop: -10 }}>
        <Header
          backgroundColor="#38C08E"
          leftComponent={
            <>
              {this.props.menu && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}
                >
                  <Icon
                    containerStyle={{ paddingRight: 16 }}
                    name="menu"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
              )}
            </>
          }
          centerComponent={{
            text: this.props.tituloTela,
            style: { color: "#fff", fontSize: 22 }
          }}
        />
      </View>
    );
  }
}
