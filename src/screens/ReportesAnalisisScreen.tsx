import { useState } from "react";
import { TouchableOpacity, Alert, View, FlatList, Text } from "react-native";
import { CustomButton } from "../components";
import { styles } from "../config/themeStyle";

// Pantalla de Reportes y Análisis
const ReportesAnalisisScreen = () => {
    const [reportes, setReportes] = useState([
      {
        id: "1",
        titulo: "Rendimiento Mensual",
        descripcion: "Análisis del rendimiento de préstamos del último mes",
      },
      {
        id: "2",
        titulo: "Morosidad",
        descripcion: "Informe de préstamos en mora y acciones recomendadas",
      },
      {
        id: "3",
        titulo: "Proyección Anual",
        descripcion: "Proyección de ingresos y riesgos para el próximo año",
      },
    ]);
  
    const renderReporteItem = ({ item }) => (
      <TouchableOpacity
        style={styles.reporteItem}
        onPress={() =>
          Alert.alert("Reporte", `Generando reporte: ${item.titulo}`)
        }
      >
        <Text style={styles.reporteTitulo}>{item.titulo}</Text>
        <Text style={styles.reporteDescripcion}>{item.descripcion}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reportes y Análisis</Text>
        <FlatList
          data={reportes}
          keyExtractor={(item) => item.id}
          renderItem={renderReporteItem}
        />
        <CustomButton
          title="Generar Nuevo Reporte"
          onPress={() =>
            Alert.alert(
              "Nuevo Reporte",
              "Seleccione el tipo de reporte a generar"
            )
          }
          style={undefined}
          textStyle={undefined}
        />
      </View>
    );
  };


  export default ReportesAnalisisScreen;