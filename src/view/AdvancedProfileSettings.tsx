import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, CustomInput } from '../components';
// Asumiendo que estos componentes existen

const AdvancedProfileSettings = () => {
  const [name, setName] = useState('Inversiones XYZ');
  const [email, setEmail] = useState('contacto@inversionesxyz.com');
  const [phone, setPhone] = useState('+34 912 345 678');
  const [address, setAddress] = useState('Calle Financiera 123, Madrid');
  const [licenseNumber, setLicenseNumber] = useState('LIC-2023-1234');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
      Alert.alert('Éxito', 'Configuración guardada correctamente');
  };

  const handleDeleteAccount = () => {
      Alert.alert(
          'Eliminar Cuenta',
          '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
          [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', style: 'destructive', onPress: () => console.log('Cuenta eliminada') },
          ]
      );
  };

  return (
      <>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Seguridad</Text>
              <View style={styles.settingItem}>
                  <Text>Autenticación de Dos Factores</Text>
                  <Switch value={twoFactorAuth} onValueChange={setTwoFactorAuth} />
              </View>
              <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Cambiar Contraseña', 'Funcionalidad en desarrollo')}>
                  <Text>Cambiar Contraseña</Text>
                  <Ionicons name="chevron-forward" size={24} color="#007AFF" />
              </TouchableOpacity>
          </View>

          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferencias</Text>
              <View style={styles.settingItem}>
                  <Text>Habilitar Notificaciones</Text>
                  <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
              </View>
              <View style={styles.settingItem}>
                  <Text>Modo Oscuro</Text>
                  <Switch value={darkMode} onValueChange={setDarkMode} />
              </View>
          </View>

          <CustomButton title="Guardar Cambios" onPress={handleSave} style={styles.saveButton} textStyle={undefined} />

          <TouchableOpacity style={styles.deleteAccount} onPress={handleDeleteAccount}>
              <Text style={styles.deleteAccountText}>Eliminar Cuenta</Text>
          </TouchableOpacity>
      </>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
  },
  configItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
  },
  section: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 15,
  },
  settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
  },
  saveButton: {
      marginTop: 20,
  },
  deleteAccount: {
      alignItems: 'center',
      marginBottom: 40,
      backgroundColor: '#FF3B30',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
  },
  deleteAccountText: {
      color: 'white',
      fontSize: 16,
  },
});

export default AdvancedProfileSettings;