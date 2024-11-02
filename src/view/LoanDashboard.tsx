import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../config/themeStyle';
import { CustomButton } from '../components';

const screenWidth = Dimensions.get('window').width;

const LoanDashboard = ({ navigation }) => {
  const [activeLoans, setActiveLoans] = useState(15);
  const [totalLoanAmount, setTotalLoanAmount] = useState(500000);
  const [averageInterestRate, setAverageInterestRate] = useState(8.5);
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

  const loanData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const riskData = [
    {
      name: 'Bajo',
      population: 60,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Medio',
      population: 30,
      color: '#FFC107',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Alto',
      population: 10,
      color: '#FF5722',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
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
   <>
    <ScrollView style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>Tablero de Préstamos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={style.statsContainer}>
        <View style={style.statItem}>
          <Text style={style.statValue}>{activeLoans}</Text>
          <Text style={style.statLabel}>Préstamos Activos</Text>
        </View>
        <View style={style.statItem}>
          <Text style={style.statValue}>€{totalLoanAmount.toLocaleString()}</Text>
          <Text style={style.statLabel}>Total Prestado</Text>
        </View>
        <View style={style.statItem}>
          <Text style={style.statValue}>{averageInterestRate}%</Text>
          <Text style={style.statLabel}>Tasa Promedio</Text>
        </View>
     
       
      </View>
      <View style={style.statsContainer}>
      <View style={style.statItem}>
          <Text style={style.statValue}>${prestamosPendientes.toLocaleString()}</Text>
          <Text style={style.statLabel}>Préstamos Pendientes</Text>
        </View>
        <View style={style.statItem}>
          <Text style={style.statValue}>{rendimientoAnual}%</Text>
          <Text style={style.statLabel}>Rendimiento Anual</Text>
        </View>
        <View style={style.statItem}>
          <Text style={style.statValue}>${prestamosPendientes.toLocaleString()}</Text>
          <Text style={style.statLabel}>Préstamos Pendientes</Text>
        </View>
      </View>

      <Text style={style.sectionTitle}>Préstamos Otorgados (últimos 6 meses)</Text>
      <BarChart
        data={loanData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="€"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#007AFF"
          }
        }}
        style={style.chart}
      />

      <Text style={style.sectionTitle}>Distribución de Riesgo</Text>
      <PieChart
        data={riskData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
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

    </ScrollView>
      <View style={style.actionButtons}>
      <TouchableOpacity 
          style={{...styles.button, backgroundColor:'green'}} 
          onPress={() => navigation.navigate('Nuevo Prestamo')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Nuevo Préstamo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{...styles.button, backgroundColor:'orange'}} 
          onPress={() => navigation.navigate("Prestamos Otorgados")}
        >
          <Ionicons name="eye-outline" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Ver Préstamos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => navigation.navigate('Gestion de Riesgos')}
        >
          <Ionicons name="analytics-outline" size={24} color="#007AFF" />
          <Text style={[style.buttonText, style.secondaryButtonText]}>Gestión de Riesgos</Text>
        </TouchableOpacity>
      </View>
   
   
   </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    padding: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    width: '48%',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});

export default LoanDashboard;