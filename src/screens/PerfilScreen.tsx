import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { CustomInput, CustomButton } from "../components";
import { styles } from "../config/themeStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Pantalla de Perfil del Prestamista
const PerfilScreen = ({navigation}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [perfil, setPerfil] = useState({
      nombre: "Inversiones XYZ",
      email: "contacto@inversionesxyz.com",
      telefono: "+34 912 345 678",
      direccion: "Calle Financiera 123, Madrid",
      licencia: "LIC-2023-1234",
      capitalDisponible: "5000000",
    });
  
    const handleSave = () => {
      setIsEditing(false);
      // Aquí iría la lógica para guardar los cambios en el servidor
      Alert.alert("Éxito", "Perfil actualizado con éxito");
    };
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Perfil del Prestamista</Text>
        <View style={styles.profileCard}>
          {Object.entries(perfil).map(([key, value]) => (
            <View key={key} style={styles.profileItem}>
              <Text style={styles.profileLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>
              {isEditing ? (
                <CustomInput
                  value={value}
                  onChangeText={(text) => setPerfil({ ...perfil, [key]: text })}
                  placeholder={undefined}
                />
              ) : (
                <Text style={styles.profileValue}>{value}</Text>
              )}
            </View>
          ))}
        </View>
        <CustomButton
          title={isEditing ? "Guardar Cambios" : "Editar Perfil"}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          style={undefined}
          textStyle={undefined}
        />
          <CustomButton
          title="Cerrar Sesión"
          onPress={async () => {
            await AsyncStorage.removeItem("userToken");
            navigation.replace("Login");
          }}
          style={styles.logoutButton}
          textStyle={undefined}
        />
      </ScrollView >
    );
  };


  
  export default PerfilScreen;
  