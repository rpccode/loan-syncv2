import React, { useState } from "react";
import { Alert, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../config/themeStyle";

// Pantalla de Seguridad
const SeguridadScreen = () => {
    const [useBiometrics, setUseBiometrics] = useState(false);
  
    const configureTwoFactor = () => {
      // Aquí iría la lógica para configurar la autenticación de dos factores
      Alert.alert(
        "2FA",
        "Se ha enviado un código a tu correo electrónico para configurar la autenticación de dos factores."
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seguridad</Text>
        <TouchableOpacity style={styles.configItem} onPress={() => {}}>
          <Text>Cambiar Contraseña</Text>
          <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.configItem}>
          <Text>Usar Biometría</Text>
          <TouchableOpacity onPress={() => setUseBiometrics(!useBiometrics)}>
            <Ionicons
              name={useBiometrics ? "checkbox" : "square-outline"}
              size={24}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.configItem} onPress={configureTwoFactor}>
          <Text>Configurar Autenticación de Dos Factores</Text>
          <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    );
  };

  export default SeguridadScreen;