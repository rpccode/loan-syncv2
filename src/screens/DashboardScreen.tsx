import { useState, useEffect } from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { CustomButton } from "../components";
import { styles } from "../config/themeStyle";

// Pantalla de Dashboard
const DashboardScreen = ({ navigation }) => {
    const [totalPrestamos, setTotalPrestamos] = useState(0);
    const [prestamosPendientes, setPrestamosPendientes] = useState(0);
    const [tasaInteresMedio, setTasaInteresMedio] = useState(0);
    const [rendimientoAnual, setRendimientoAnual] = useState(0);
  
    useEffect(() => {
      // Aquí se cargarían los datos reales del prestamista
      setTotalPrestamos(1500000);
      setPrestamosPendientes(750000);
      setTasaInteresMedio(8.5);
      setRendimientoAnual(12.3);
    }, []);
  
    const data = {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          data: [300000, 250000, 350000, 400000, 380000, 300000],
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  
    const pieData = [
      {
        name: "Préstamos Activos",
        population: 750000,
        color: "#007AFF",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Préstamos Pagados",
        population: 750000,
        color: "#4CAF50",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Dashboard del Prestamista</Text>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardText}>
            Total Préstamos: €{totalPrestamos.toLocaleString()}
          </Text>
          <Text style={styles.dashboardText}>
            Préstamos Pendientes: €{prestamosPendientes.toLocaleString()}
          </Text>
          <Text style={styles.dashboardText}>
            Tasa de Interés Media: {tasaInteresMedio}%
          </Text>
          <Text style={styles.dashboardText}>
            Rendimiento Anual: {rendimientoAnual}%
          </Text>
        </View>
        <Text style={styles.subtitle}>Préstamos Otorgados (últimos 6 meses)</Text>
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel="€"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#007AFF",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text style={styles.subtitle}>Distribución de Préstamos</Text>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <CustomButton
          title="Ver Todos los Préstamos"
          onPress={() => navigation.navigate("PrestamosOtorgados")}
          style={styles.secondaryButton}
          textStyle={undefined}
        />
      </ScrollView>
    );
  };

 

  export default DashboardScreen;


  