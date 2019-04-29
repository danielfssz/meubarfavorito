import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  SafeAreaView,
  ScrollView,
  DrawerItems,
  createDrawerNavigator
} from "react-navigation";

import SignIn from "./screens/SignIn";
import Main from "./screens/Main";
import MatchDetail from "./screens/MatchDetail";
import { Icon } from "react-native-elements";
import Register from "./screens/Register";
import RegisteredSuccessfully from "./screens/RegisteredSuccessfully";

const { width } = Dimensions.get("window");

const menuDrawer = (props: any) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          width: 150,
          height: 150,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <Image
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
          }}
          resizeMode={"contain"}
          style={{
            flex: 1,
            alignSelf: "stretch",
            width: 150,
            height: 150,
            alignItems: "center",
            marginTop: 10
          }}
        />
      </View>
    </View>
    <ScrollView>
      <Text
        style={{
          margin: 10,
          marginLeft: 20,
          fontSize: 17,
          fontWeight: "bold",
          color: "#38C08E",
          textAlign: "center"
        }}
      >
        Seja nosso parceiro
      </Text>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const mainNavigation = createStackNavigator(
  {
    Main,
    MatchDetail
  },
  {
    navigationOptions: {
      drawerLabel: "Início",
      drawerIcon: ({ tintColor }: any) => (
        <Icon name="home" type="font-awesome" color={tintColor} />
      )
    }
  }
);

const registerNavigator = createSwitchNavigator({
  Register,
  RegisteredSuccessfully
});

const drawerNaoLogado = createDrawerNavigator(
  {
    mainNavigation,
    SignIn,
    registerNavigator: {
      screen: registerNavigator,
      navigationOptions: {
        drawerLabel: "Cadastre-se",
        drawerIcon: ({ tintColor }: any) => (
          <Icon
            name="user-plus"
            type="font-awesome"
            size={20}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    contentComponent: menuDrawer,
    drawerWidth: width * 0.75,
    contentOptions: {
      activeTintColor: "#38C08E"
    }
  }
);

const drawerLogado = createDrawerNavigator(
  {
    mainNavigation
  },
  {
    contentComponent: menuDrawer,
    drawerWidth: width * 0.75,
    contentOptions: {
      activeTintColor: "#38C08E"
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: { screen: drawerNaoLogado },
        SignedOut: { screen: drawerLogado }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    )
  );
};
