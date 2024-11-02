import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { CustomButton, CustomInput } from '../components';
 // Asumiendo que estos componentes existen

export default function PredictiveAnalysisScreen() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [prediction, setPrediction] = useState(null);

  const screenWidth = Dimensions.get('window').width;

  const performAnalysis = () => {
    // Aquí iría la lógica real de análisis predictivo
    // Por ahora, solo generaremos datos de muestra
    const amount = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const months = parseInt(term);

    const monthlyPayment = (amount * rate / 12) / (1 - Math.pow(1 + rate / 12, -months));
    
    const data = {
      labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
      datasets: [
        {
          data: [
            amount,
            amount * 0.8,
            amount * 0.6,
            amount * 0.4,
            amount * 0.2,
          ],
        },
      ],
    };

    setPrediction({ monthlyPayment, data });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Análisis Predictivo de Préstamos</Text>
      <CustomInput
        placeholder="Monto del préstamo"
        value={loanAmount}
        onChangeText={setLoanAmount}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Tasa de interés anual (%)"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Plazo (meses)"
        value={term}
        onChangeText={setTerm}
        keyboardType="numeric"
      />
      <CustomButton
              title="Realizar Análisis"
              onPress={performAnalysis} style={undefined} textStyle={undefined}      />
      {prediction && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Pago mensual estimado: €{prediction.monthlyPayment.toFixed(2)}</Text>
          <Text style={styles.chartTitle}>Proyección del saldo del préstamo</Text>
          <LineChart
            data={prediction.data}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});