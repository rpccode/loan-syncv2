import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type LoanInfo = {
  clientName: string;
  amount: string;
  interestRate: string;
  term: string;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
};

type AmortizationRow = {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

const NewLoanCreation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loanInfo, setLoanInfo] = useState<LoanInfo>({
    clientName: '',
    amount: '',
    interestRate: '',
    term: '',
    paymentFrequency: 'monthly',
  });
  const [amortizationTable, setAmortizationTable] = useState<AmortizationRow[]>([]);

  const handleInputChange = (name: keyof LoanInfo, value: string) => {
    setLoanInfo({ ...loanInfo, [name]: value });
  };

  const calculateLoan = () => {
    const amount = parseFloat(loanInfo.amount);
    const interestRate = parseFloat(loanInfo.interestRate) / 100 / 12; // Monthly interest rate
    const term = parseInt(loanInfo.term);
    
    const monthlyPayment = (amount * interestRate * Math.pow(1 + interestRate, term)) / (Math.pow(1 + interestRate, term) - 1);
    
    let balance = amount;
    const newAmortizationTable: AmortizationRow[] = [];

    for (let i = 1; i <= term; i++) {
      const interest = balance * interestRate;
      const principal = monthlyPayment - interest;
      balance -= principal;

      newAmortizationTable.push({
        payment: monthlyPayment,
        principal: principal,
        interest: interest,
        balance: balance,
      });
    }

    setAmortizationTable(newAmortizationTable);
  };

  const renderStep1 = () => (
    <View>
      <Text style={styles.label}>Nombre del Cliente</Text>
      <TextInput
        style={styles.input}
        value={loanInfo.clientName}
        onChangeText={(text) => handleInputChange('clientName', text)}
        placeholder="Ingrese el nombre del cliente"
      />
      <Text style={styles.label}>Monto del Préstamo</Text>
      <TextInput
        style={styles.input}
        value={loanInfo.amount}
        onChangeText={(text) => handleInputChange('amount', text)}
        placeholder="Ingrese el monto del préstamo"
        keyboardType="numeric"
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.label}>Tasa de Interés Anual (%)</Text>
      <TextInput
        style={styles.input}
        value={loanInfo.interestRate}
        onChangeText={(text) => handleInputChange('interestRate', text)}
        placeholder="Ingrese la tasa de interés anual"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Plazo (en meses)</Text>
      <TextInput
        style={styles.input}
        value={loanInfo.term}
        onChangeText={(text) => handleInputChange('term', text)}
        placeholder="Ingrese el plazo en meses"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Frecuencia de Pago</Text>
      <Picker
        selectedValue={loanInfo.paymentFrequency}
        onValueChange={(itemValue) => handleInputChange('paymentFrequency', itemValue)}
      >
        <Picker.Item label="Mensual" value="monthly" />
        <Picker.Item label="Quincenal" value="biweekly" />
        <Picker.Item label="Semanal" value="weekly" />
      </Picker>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.sectionTitle}>Resumen del Préstamo</Text>
      <Text style={styles.summaryText}>Cliente: {loanInfo.clientName}</Text>
      <Text style={styles.summaryText}>Monto: ${loanInfo.amount}</Text>
      <Text style={styles.summaryText}>Tasa de Interés: {loanInfo.interestRate}%</Text>
      <Text style={styles.summaryText}>Plazo: {loanInfo.term} meses</Text>
      <Text style={styles.summaryText}>Frecuencia de Pago: {loanInfo.paymentFrequency}</Text>
      
      <Text style={styles.sectionTitle}>Tabla de Amortización</Text>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Pago</Text>
            <Text style={styles.tableHeaderText}>Principal</Text>
            <Text style={styles.tableHeaderText}>Interés</Text>
            <Text style={styles.tableHeaderText}>Balance</Text>
          </View>
          {amortizationTable.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>${row.payment.toFixed(2)}</Text>
              <Text style={styles.tableCell}>${row.principal.toFixed(2)}</Text>
              <Text style={styles.tableCell}>${row.interest.toFixed(2)}</Text>
              <Text style={styles.tableCell}>${row.balance.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
    if (step === 2) {
      calculateLoan();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Préstamo</Text>
      <View style={styles.stepIndicator}>
        <Text style={[styles.stepText, step >= 1 && styles.activeStep]}>1</Text>
        <View style={styles.stepLine} />
        <Text style={[styles.stepText, step >= 2 && styles.activeStep]}>2</Text>
        <View style={styles.stepLine} />
        <Text style={[styles.stepText, step >= 3 && styles.activeStep]}>3</Text>
      </View>
      
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Atrás</Text>
          </TouchableOpacity>
        )}
        {step < 3 && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Siguiente</Text>
            <Ionicons name="arrow-forward" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
        {step === 3 && (
          <TouchableOpacity style={styles.button} onPress={() => console.log('Guardar préstamo')}>
            <Text style={styles.buttonText}>Guardar Préstamo</Text>
            <Ionicons name="save" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepText: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeStep: {
    backgroundColor: '#007AFF',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 10,
  },
  tableHeaderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    padding: 10,
    width: 100,
    textAlign: 'center',
  },
});

export default NewLoanCreation;