import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import MainStackNavigator from "./src/nav/MainStackNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";



// Configuración de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


// Componente Principal de la App
export default function App() {
  useEffect(() => {
    // Configurar las notificaciones push
    registerForPushNotificationsAsync().then((token) => console.log(token));
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
   
  );
}

// Función para registrar el dispositivo para notificaciones push
async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

