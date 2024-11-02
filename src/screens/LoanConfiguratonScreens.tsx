import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type LoanSettings = {
  defaultInterestRate: string;
  minLoanAmount: string;
  maxLoanAmount: string;
  minLoanTerm: string;
  maxLoanTerm: string;
  allowedPaymentFrequencies: {
    weekly: boolean;
    biweekly: boolean;
    monthly: boolean;
  };
  enableEarlyPayment: boolean;
  enableLatePaymentFees: boolean;
  latePaymentFeePercentage: string;
  enableCollateral: boolean;
};

const LoanGeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState<LoanSettings>({
    defaultInterestRate: '10',
    minLoanAmount: '1000',
    maxLoanAmount: '50000',
    minLoanTerm: '3',
    maxLoanTerm: '60',
    allowedPaymentFrequencies: {
      weekly: true,
      biweekly: true,
      monthly: true,
    },
    enableEarlyPayment: true,
    enableLatePaymentFees: true,
    latePaymentFeePercentage: '5',
    enableCollateral: false,
  });

  const handleInputChange = (name: keyof LoanSettings, value: string) => {
    setSettings({ ...settings, [name]: value });
  };

  const handleSwitchChange = (name: keyof LoanSettings) => {
    setSettings({ ...settings, [name]: !settings[name as keyof LoanSettings] });
  };

  const handleFrequencyChange = (frequency: 'weekly' | 'biweekly' | 'monthly') => {
    setSettings({
      ...settings,
      allowedPaymentFrequencies: {
        ...settings.allowedPaymentFrequencies,
        [frequency]: !settings.allowedPaymentFrequencies[frequency],
      },
    });
  };

  const saveSettings = () => {
    // Aquí iría la lógica para guardar la configuración en el backend
    console.log('Configuración guardada:', settings);
    // Mostrar un mensaje de éxito al usuario
    alert('Configuración guardada exitosamente');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configuración General de Préstamos</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tasas y Montos</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tasa de Interés Predeterminada (%)</Text>
          <TextInput
            style={styles.input}
            value={settings.defaultInterestRate}
            onChangeText={(text) => handleInputChange('defaultInterestRate', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Monto Mínimo de Préstamo</Text>
          <TextInput
            style={styles.input}
            value={settings.minLoanAmount}
            onChangeText={(text) => handleInputChange('minLoanAmount', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Monto Máximo de Préstamo</Text>
          <TextInput
            style={styles.input}
            value={settings.maxLoanAmount}
            onChangeText={(text) => handleInputChange('maxLoanAmount', text)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plazos</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Plazo Mínimo (meses)</Text>
          <TextInput
            style={styles.input}
            value={settings.minLoanTerm}
            onChangeText={(text) => handleInputChange('minLoanTerm', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Plazo Máximo (meses)</Text>
          <TextInput
            style={styles.input}
            value={settings.maxLoanTerm}
            onChangeText={(text) => handleInputChange('maxLoanTerm', text)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frecuencias de Pago Permitidas</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Semanal</Text>
          <Switch
            value={settings.allowedPaymentFrequencies.weekly}
            onValueChange={() => handleFrequencyChange('weekly')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Quincenal</Text>
          <Switch
            value={settings.allowedPaymentFrequencies.biweekly}
            onValueChange={() => handleFrequencyChange('biweekly')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Mensual</Text>
          <Switch
            value={settings.allowedPaymentFrequencies.monthly}
            onValueChange={() => handleFrequencyChange('monthly')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Características Adicionales</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Permitir Pago Anticipado</Text>
          <Switch
            value={settings.enableEarlyPayment}
            onValueChange={() => handleSwitchChange('enableEarlyPayment')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Habilitar Cargos por Pago Tardío</Text>
          <Switch
            value={settings.enableLatePaymentFees}
            onValueChange={() => handleSwitchChange('enableLatePaymentFees')}
          />
        </View>
        {settings.enableLatePaymentFees && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Porcentaje de Cargo por Pago Tardío (%)</Text>
            <TextInput
              style={styles.input}
              value={settings.latePaymentFeePercentage}
              onChangeText={(text) => handleInputChange('latePaymentFeePercentage', text)}
              keyboardType="numeric"
            />
          </View>
        )}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Habilitar Préstamos con Garantía</Text>
          <Switch
            value={settings.enableCollateral}
            onValueChange={() => handleSwitchChange('enableCollateral')}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Guardar Configuración</Text>
      </TouchableOpacity>
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
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoanGeneralSettings;