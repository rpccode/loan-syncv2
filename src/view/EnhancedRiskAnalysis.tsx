import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../config/themeStyle';

const screenWidth = Dimensions.get('window').width;

const EnhancedRiskAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const riskScoreData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [650, 680, 690, 700, 695, 710],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const loanTypeData = {
    labels:  ['Personal', 'Hipoteca', 'Automóvil', 'Negocio', 'Educación'],
    datasets: [
      {
        data: [30, 40, 15, 10, 5]
      }
    ]
  };
  const [riesgos, setRiesgos] = useState([
    { categoria: "Bajo", cantidad: 50 },
    { categoria: "Medio", cantidad: 30 },
    { categoria: "Alto", cantidad: 20 },
  ]);

  const data = {
    labels: riesgos.map((r) => r.categoria),
    datasets: [
      {
        data: riesgos.map((r) => r.cantidad),
      },
    ],
  };
  return (
    <ScrollView style={stylesAnality.container}>
      <Text style={stylesAnality.title}>Análisis de Riesgo Avanzado</Text>

      <View style={stylesAnality.periodSelector}>
        <TouchableOpacity
          style={[stylesAnality.periodButton, selectedPeriod === '1M' && stylesAnality.selectedPeriod]}
          onPress={() => setSelectedPeriod('1M')}
        >
          <Text style={[stylesAnality.periodButtonText, selectedPeriod === '1M' && stylesAnality.selectedPeriodText]}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesAnality.periodButton, selectedPeriod === '3M' && stylesAnality.selectedPeriod]}
          onPress={() => setSelectedPeriod('3M')}
        >
          <Text style={[stylesAnality.periodButtonText, selectedPeriod === '3M' && stylesAnality.selectedPeriodText]}>3M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesAnality.periodButton, selectedPeriod === '6M' && stylesAnality.selectedPeriod]}
          onPress={() => setSelectedPeriod('6M')}
        >
          <Text style={[stylesAnality.periodButtonText, selectedPeriod === '6M' && stylesAnality.selectedPeriodText]}>6M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesAnality.periodButton, selectedPeriod === '1Y' && stylesAnality.selectedPeriod]}
          onPress={() => setSelectedPeriod('1Y')}
        >
          <Text style={[stylesAnality.periodButtonText, selectedPeriod === '1Y' && stylesAnality.selectedPeriodText]}>1A</Text>
        </TouchableOpacity>
      </View>

      <View style={stylesAnality.card}>
        <Text style={stylesAnality.cardTitle}>Puntuación de Riesgo Promedio</Text>
        <LineChart
          data={riskScoreData}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#007AFF"
            }
          }}
          bezier
          style={stylesAnality.chart}
        />
      </View>

      <View style={stylesAnality.card}>
        <Text style={styles.cardTitle}>Distribución por Tipo de Préstamo</Text>
        <BarChart
          data={loanTypeData}
          width={screenWidth - 60}
          height={220}
          yAxisLabel="%"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
          }}
          style={styles.chart}
        />
      </View>
      <Text style={styles.title}>Gestión de Riesgos</Text>
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      <View style={styles.riskSummary}>
          <Text style={styles.riskText}>Préstamos de Bajo Riesgo: 50</Text>
          <Text style={styles.riskText}>Préstamos de Riesgo Medio: 30</Text>
          <Text style={styles.riskText}>Préstamos de Alto Riesgo: 20</Text>
        </View>
      <View style={stylesAnality.riskFactors}>
        <Text style={stylesAnality.cardTitle}>Factores de Riesgo Principales</Text>
        <View style={stylesAnality.riskFactor}>
          <Ionicons name="trending-up" size={24} color="#FF3B30" />
          <Text style={stylesAnality.riskFactorText}>Aumento en tasas de interés</Text>
        </View>
        <View style={stylesAnality.riskFactor}>
          <Ionicons name="business" size={24} color="#FF9500" />
          <Text style={stylesAnality.riskFactorText}>Inestabilidad en el mercado inmobiliario</Text>
        </View>
        <View style={stylesAnality.riskFactor}>
          <Ionicons name="people" size={24} color="#4CD964" />
          <Text style={stylesAnality.riskFactorText}>Mejora en la calificación crediticia promedio</Text>
        </View>
      </View>

      <TouchableOpacity style={stylesAnality.generateReportButton}>
        <Text style={stylesAnality.generateReportButtonText}>Generar Informe Detallado</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const stylesAnality = StyleSheet.create({
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
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedPeriod: {
    backgroundColor: '#007AFF',
  },
  periodButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  selectedPeriodText: {
    color: '#ffffff',
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  riskFactors: {
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
  riskFactor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  riskFactorText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  generateReportButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  generateReportButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnhancedRiskAnalysis;