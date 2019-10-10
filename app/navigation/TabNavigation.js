import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import MessagesLink from "../components/MessagesLink";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import UserDetail from "../screens/UserDetail";
import Search from "../screens/Tabs/SearchContainer";
import { createStackNavigator } from "react-navigation-stack";
import NavIcon from "../components/NavIcon";
import { Platform } from "@unimodules/core";
import { stackStyles } from "./config";
import styles from "../styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          title: "Photo"
        }
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("username")
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.blackColor,
        headerStyle: { ...stackStyles }
      },
      headerLayoutPreset: "center"
    }
  );

export default TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        title: "Home",
        headerRight: <MessagesLink />,
        headerTitle: (
          <NavIcon name={"logo-instagram"} size={36} focused={true} />
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={Platform.OS == "ios" ? "ios-home" : "md-home"}
            focused={focused}
          />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        headerBackTitle: null
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-search" : "md-search"}
          />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: () => ({
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("PhotoNavigation");
        },
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-add" : "md-add"}
          />
        )
      })
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-heart" : "md-heart"}
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-person" : "md-person"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Profile",
    tabBarOptions: {
      showLabel: false,
      style: { ...stackStyles }
    }
  }
);
