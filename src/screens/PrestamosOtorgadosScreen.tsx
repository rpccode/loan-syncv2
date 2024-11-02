import { useState } from "react";
import { TouchableOpacity, View, FlatList, Text } from "react-native";
import { CustomButton } from "../components";
import { styles } from "../config/themeStyle";
import { renderPrestamoItem } from "../components/renderPrestamoItem";

// Pantalla de Préstamos Otorgados
const PrestamosOtorgadosScreen = ({ navigation }) => {
    const [prestamos, setPrestamos] = useState([
      {
        id: "1",
        prestatario: "Juan Pérez",
        monto: 50000,
        estado: "Activo",
        fechaVencimiento: "2023-12-31",
      },
      {
        id: "2",
        prestatario: "María García",
        monto: 30000,
        estado: "Pagado",
        fechaVencimiento: "2023-11-30",
      },
      {
        id: "3",
        prestatario: "Carlos López",
        monto: 70000,
        estado: "Atrasado",
        fechaVencimiento: "2024-01-31",
      },
    ]);

    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Préstamos Otorgados</Text> */}
        <FlatList
          data={prestamos}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderPrestamoItem(item)}
        />
        <CustomButton
          title="Nuevo Prestamo"
          onPress={() => navigation.navigate("Nuevo Prestamo")}
          style={undefined}
          textStyle={undefined}
        />
      </View>
    );
  };




  export default PrestamosOtorgadosScreen;


