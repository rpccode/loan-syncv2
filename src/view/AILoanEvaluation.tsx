import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CustomInput } from '../components';
 // Asumiendo que este componente existe

type LoanEvaluation = {
  score: number;
  risk: 'Bajo' | 'Medio' | 'Alto';
  recommendation: string;
  factors: string[];
};

export default function AILoanEvaluation() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<LoanEvaluation | null>(null);

  const evaluateLoan = async () => {
    setLoading(true);
    // Simular una llamada a una API de IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Esta es una lógica simplificada. En un escenario real, esto vendría de un modelo de IA.
    const score = Math.random() * 100;
    let risk: 'Bajo' | 'Medio' | 'Alto';
    let recommendation: string;
    
    if (score > 80) {
      risk = 'Bajo';
      recommendation = 'Aprobar el préstamo';
    } else if (score > 50) {
      risk = 'Medio';
      recommendation = 'Revisar manualmente';
    } else {
      risk = 'Alto';
      recommendation = 'Rechazar el préstamo';
    }

    setEvaluation({
      score: Math.round(score),
      risk,
      recommendation,
      factors: [
        'Historial crediticio',
        'Relación préstamo-ingreso',
        'Duración del préstamo',
        'Estabilidad laboral'
      ],
    });

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Evaluación de Préstamos con IA</Text>
      <CustomInput
        placeholder="Monto del préstamo"
        value={loanAmount}
        onChangeText={setLoanAmount}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Tasa de interés (%)"
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
      <CustomInput
        
        placeholder="Puntaje crediticio"
        value={creditScore}
        onChangeText={setCreditScore}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Ingreso mensual"
        value={monthlyIncome}
        onChangeText={setMonthlyIncome}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.evaluateButton} onPress={evaluateLoan}>
        <Text style={styles.evaluateButtonText}>Evaluar Préstamo</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Analizando datos...</Text>
        </View>
      )}

      {evaluation && (
        <View style={styles.evaluationContainer}>
          <Text style={styles.evaluationTitle}>Resultado de la Evaluación</Text>
          <Text style={styles.evaluationScore}>Puntuación: {evaluation.score}/100</Text>
          <Text style={[styles.evaluationRisk, { color: evaluation.risk === 'Bajo' ? 'green' : evaluation.risk === 'Medio' ? 'orange' : 'red' }]}>
            Riesgo: {evaluation.risk}
          </Text>
          <Text style={styles.evaluationRecommendation}>Recomendación: {evaluation.recommendation}</Text>
          <Text style={styles.factorsTitle}>Factores considerados:</Text>
          {evaluation.factors.map((factor, index) => (
            <Text key={index} style={styles.factor}>• {factor}</Text>
          ))}
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
  evaluateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  evaluateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  evaluationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  evaluationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  evaluationScore: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  evaluationRisk: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  evaluationRecommendation: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  factorsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  factor: {
    fontSize: 14,
    marginBottom: 3,
    color: '#666',
  },
});