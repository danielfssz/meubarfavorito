import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import SignIn from "./screens/SignIn";
import Main from "./screens/Main";

const SignedOutRoutes = createStackNavigator({
  Login: {
    screen: SignIn
  }
});

const SignedInRoutes = createStackNavigator(
  {
    Logged: {
      screen: Main
    }
  },
  {
    headerMode: "none"
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: { screen: SignedInRoutes },
        SignedOut: { screen: SignedOutRoutes }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    )
  );
};
