import { ScrollView, View, Alert, Text } from "react-native";
import { CustomButton } from "../components";
import { styles } from "../config/themeStyle";

// Pantalla de Detalle de Préstamo
const DetallePrestamoScreen = ({ route }) => {
    const { prestamo } = route.params;
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Detalle del Préstamo</Text>
        <View style={styles.detailCard}>
          <Text style={styles.detailText}>
            Prestatario: {prestamo.prestatario}
          </Text>
          <Text style={styles.detailText}>
            Monto: €{prestamo.monto.toLocaleString()}
          </Text>
          <Text style={styles.detailText}>Estado: {prestamo.estado}</Text>
          <Text style={styles.detailText}>
            Fecha de Vencimiento: {prestamo.fechaVencimiento}
          </Text>
          <Text style={styles.detailText}>Tasa de Interés: 8.5%</Text>
          <Text style={styles.detailText}>Plazo: 12 meses</Text>
          <Text style={styles.detailText}>
            Cuota Mensual: €{((prestamo.monto * 1.085) / 12).toFixed(2)}
          </Text>
        </View>
        <CustomButton
          title="Gestionar Préstamo"
          onPress={() =>
            Alert.alert("Gestión de Préstamo", "Funcionalidad en desarrollo")
          }
          style={undefined}
          textStyle={undefined}
        />
        <CustomButton
          title="Manage Documents"
          onPress={() =>
            Alert.alert("Gestión de Préstamo", "Funcionalidad en desarrollo")
          }
          style={undefined}
          textStyle={undefined}
        />
      </ScrollView>
    );
  };


  
  export default DetallePrestamoScreen;

  
  