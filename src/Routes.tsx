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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Main from "./screens/main/Main";
import MatchDetail from "./screens/main/MatchDetail";
import EventDetail from "./screens/main/EventDetail";

import SignIn from "./screens/authentication/SignIn";
import SignOut from "./screens/authentication/SignOut";

import Register from "./screens/registerPub/Register";
import PerfilPicture from "./screens/registerPub/PerfilPicture";
import PubPictures from "./screens/registerPub/PubPictures";
import RegisteredSuccessfully from "./screens/registerPub/RegisteredSuccessfully";

import CreateEvent from "./screens/createEvent/CreateEvent";
import SelectMatch from "./screens/createEvent/SelectMatch";

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
          source={require("./assets/logo.png")}
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
    MatchDetail,
    EventDetail
  },
  {
    navigationOptions: {
      drawerLabel: "Início",
      drawerIcon: ({ tintColor }: any) => (
        <Icon name="home" size={20} color={tintColor} />
      )
    }
  }
);

const registerNavigator = createStackNavigator({
  Register,
  PerfilPicture,
  PubPictures
});

const switchRegisterNavigator = createSwitchNavigator({
  registerNavigator,
  RegisteredSuccessfully
});

const createEventNavigator = createStackNavigator({
  CreateEvent,
  SelectMatch
});

const switchCreateEventNavigator = createSwitchNavigator({
  createEventNavigator,
  RegisteredSuccessfully
});

const drawerNaoLogado = createDrawerNavigator(
  {
    mainNavigation,
    SignIn,
    registerNavigator: {
      screen: switchRegisterNavigator,
      navigationOptions: {
        drawerLabel: "Cadastre-se",
        drawerIcon: ({ tintColor }: any) => (
          <Icon name="account-plus" size={20} color={tintColor} />
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
    mainNavigation,
    switchCreateEventNavigator: {
      screen: switchCreateEventNavigator,
      navigationOptions: {
        drawerLabel: "Crie um evento",
        drawerIcon: ({ tintColor }: any) => (
          <Icon name="soccer" size={20} color={tintColor} />
        )
      }
    },
    SignOut
  },
  {
    contentComponent: menuDrawer,
    drawerWidth: width * 0.75,
    contentOptions: {
      activeTintColor: "#38C08E"
    }
  }
);

export const createRootNavigator = (logado = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        AreaNaoLogada: { screen: drawerNaoLogado },
        AreaLogada: { screen: drawerLogado }
      },
      {
        initialRouteName: logado ? "AreaLogada" : "AreaNaoLogada"
      }
    )
  );
};
