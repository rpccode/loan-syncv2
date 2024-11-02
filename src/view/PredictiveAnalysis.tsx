import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomInput } from '../components';


const screenWidth = Dimensions.get('window').width;

type Scenario = 'optimistic' | 'realistic' | 'pessimistic';

export default function PredictiveAnalysis() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [scenario, setScenario] = useState<Scenario>('realistic');
  const [projections, setProjections] = useState<any>(null);

  const generateProjections = () => {
    const amount = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const months = parseInt(term);

    if (isNaN(amount) || isNaN(rate) || isNaN(months)) {
      alert('Por favor, ingrese valores válidos');
      return;
    }

    const monthlyPayment = (amount * rate / 12) / (1 - Math.pow(1 + rate / 12, -months));

    const scenarioFactors = {
      optimistic: 1.1,
      realistic: 1,
      pessimistic: 0.9,
    };

    const factor = scenarioFactors[scenario];

    const projectedData = {
      labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
      datasets: [
        {
          data: [
            amount,
            amount * 0.8 * factor,
            amount * 0.6 * factor,
            amount * 0.4 * factor,
            amount * 0.2 * factor,
          ],
        },
      ],
    };

    setProjections({
      monthlyPayment,
      totalInterest: (monthlyPayment * months - amount) * factor,
      data: projectedData,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Análisis Predictivo</Text>
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
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Escenario:</Text>
        <Picker
          selectedValue={scenario}
          onValueChange={(itemValue) => setScenario(itemValue as Scenario)}
          style={styles.picker}
        >
          <Picker.Item label="Optimista" value="optimistic" />
          <Picker.Item label="Realista" value="realistic" />
          <Picker.Item label="Pesimista" value="pessimistic" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.generateButton} onPress={generateProjections}>
        <Text style={styles.generateButtonText}>Generar Proyecciones</Text>
      </TouchableOpacity>

      {projections && (
        <View style={styles.projectionsContainer}>
          <Text style={styles.projectionsTitle}>Resultados del Análisis</Text>
          <Text style={styles.projectionItem}>
            Pago mensual estimado: €{projections.monthlyPayment.toFixed(2)}
          </Text>
          <Text style={styles.projectionItem}>
            Interés total estimado: €{projections.totalInterest.toFixed(2)}
          </Text>
          <Text style={styles.chartTitle}>Proyección del saldo del préstamo</Text>
          <LineChart
            data={projections.data}
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
            style={styles.chart}
          />
          <Text style={styles.disclaimer}>
            Nota: Estas proyecciones son estimaciones basadas en el escenario seleccionado y pueden variar en la realidad.
          </Text>
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
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  picker: {
    backgroundColor:  '#ffffff',
    borderRadius: 10,
  },
  generateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  projectionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  projectionItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  disclaimer: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 10,
  },
});