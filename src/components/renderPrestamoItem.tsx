import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../config/themeStyle";
import { getStatusColor } from "../helpers/getStatusColor";

export const renderPrestamoItem = ({ item, navigation }) => (
    <TouchableOpacity
      style={styles.prestamoItem}
      onPress={() => navigation.navigate("Detalle Prestamo", { prestamo: item })}
    >
      <View>
        <Text style={styles.prestamoPrestatario}>{item.prestatario}</Text>
        <Text style={styles.prestamoMonto}>€{item.monto.toLocaleString()}</Text>
        <Text style={styles.prestamoFecha}>Vence: {item.fechaVencimiento}</Text>
      </View>
      <View
        style={[
          styles.prestamoEstadoContainer,
          { backgroundColor: getStatusColor(item.estado) },
        ]}
      >
        <Text style={styles.prestamoEstado}>{item.estado}</Text>
      </View>
    </TouchableOpacity>
  );