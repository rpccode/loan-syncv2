import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, View, TouchableOpacity, Text, ScrollView } from "react-native";
import { CustomInput, CustomButton } from "../components";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../config/themeStyle";
import * as LocalAuthentication from 'expo-local-authentication';
import AdvancedProfileSettings from "../view/AdvancedProfileSettings";

// Pantalla de Configuración
// Pantalla de Configuración
const ConfiguracionScreen = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [umbralRiesgo, setUmbralRiesgo] = useState("700");
  const [useBiometrics, setUseBiometrics] = useState(false);

  const toggleBiometrics = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
          setUseBiometrics(!useBiometrics);
      } else {
          Alert.alert("Error", "Tu dispositivo no soporta autenticación biométrica");
      }
  };

  return (
      <ScrollView style={styles.container}>
          <Text style={styles.title}>Configuración</Text>

          <View style={styles.configItem}>
              <Text>Notificaciones</Text>
              <TouchableOpacity onPress={() => setNotificaciones(!notificaciones)}>
                  <Ionicons
                      name={notificaciones ? "notifications" : "notifications-off"}
                      size={24}
                      color="#007AFF"
                  />
              </TouchableOpacity>
          </View>

          <View style={styles.configItem}>
              <Text>Umbral de Riesgo Crediticio</Text>
              <CustomInput
                  value={umbralRiesgo}
                  onChangeText={setUmbralRiesgo}
                  keyboardType="numeric"
                  placeholder="700"
              />
          </View>

          <TouchableOpacity style={styles.configItem} onPress={() => navigation.navigate("Seguridad")}>
              <Text>Seguridad</Text>
              <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </TouchableOpacity>

          <View style={styles.configItem}>
              <Text>Usar Biometría</Text>
              <TouchableOpacity onPress={toggleBiometrics}>
                  <Ionicons
                      name={useBiometrics ? "checkbox" : "square-outline"}
                      size={24}
                      color="#007AFF"
                  />
              </TouchableOpacity>
          </View>

          <AdvancedProfileSettings />
      </ScrollView>
  );
};
  
export default ConfiguracionScreen;