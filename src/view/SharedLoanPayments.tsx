import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../components';


type Participant = {
  id: string;
  name: string;
  share: number;
};

type Payment = {
  id: string;
  amount: number;
  date: Date;
  paidBy: string;
};

export default function SharedLoanPayments() {
  const [loanId, setLoanId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [newParticipantShare, setNewParticipantShare] = useState('');
  const [newPaymentAmount, setNewPaymentAmount] = useState('');
  const [newPaymentPaidBy, setNewPaymentPaidBy] = useState('');

  useEffect(() => {
    // Simular la carga de datos de un préstamo compartido
    setLoanId('LOAN-SHARED-001');
    setTotalAmount('10000');
    setParticipants([
      { id: '1', name: 'Juan', share: 40 },
      { id: '2', name: 'María', share: 60 },
    ]);
    setPayments([
      { id: '1', amount: 500, date: new Date(2023, 5, 1), paidBy: 'Juan' },
      { id: '2', amount: 750, date: new Date(2023, 6, 1), paidBy: 'María' },
    ]);
  }, []);

  const addParticipant = () => {
    if (newParticipantName && newParticipantShare) {
      const newParticipant: Participant = {
        id: Date.now().toString(),
        name: newParticipantName,
        share: parseFloat(newParticipantShare),
      };
      setParticipants([...participants, newParticipant]);
      setNewParticipantName('');
      setNewParticipantShare('');
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const addPayment = () => {
    if (newPaymentAmount && newPaymentPaidBy) {
      const newPayment: Payment = {
        id: Date.now().toString(),
        amount: parseFloat(newPaymentAmount),
        date: new Date(),
        paidBy: newPaymentPaidBy,
      };
      setPayments([...payments, newPayment]);
      setNewPaymentAmount('');
      setNewPaymentPaidBy('');
    }
  };

  const calculateBalances = () => {
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balances: { [key: string]: number } = {};

    participants.forEach(participant => {
      const expectedContribution = (parseFloat(totalAmount) * participant.share) / 100;
      const actualContribution = payments
        .filter(payment => payment.paidBy === participant.name)
        .reduce((sum, payment) => sum + payment.amount, 0);
      balances[participant.name] = actualContribution - expectedContribution;
    });

    return balances;
  };

  const balances = calculateBalances();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Préstamo Compartido</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>ID del Préstamo: {loanId}</Text>
        <Text style={styles.infoText}>Monto Total: €{totalAmount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Participantes</Text>
        {participants.map(participant => (
          <View key={participant.id} style={styles.participantItem}>
            <Text style={styles.participantName}>{participant.name} ({participant.share}%)</Text>
            <TouchableOpacity onPress={() => removeParticipant(participant.id)}>
              <Ionicons name="close-circle" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.addParticipantForm}>
          <CustomInput
            placeholder="Nombre"
            value={newParticipantName}
            onChangeText={setNewParticipantName}
          />
          <CustomInput
            placeholder="Porcentaje"
            value={newParticipantShare}
            onChangeText={setNewParticipantShare}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addButton} onPress={addParticipant}>
            <Text style={styles.addButtonText}>Agregar Participante</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pagos Realizados</Text>
        {payments.map(payment => (
          <View key={payment.id} style={styles.paymentItem}>
            <Text style={styles.paymentInfo}>€{payment.amount.toFixed(2)} - {payment.date.toLocaleDateString()}</Text>
            <Text style={styles.paymentPaidBy}>Pagado por: {payment.paidBy}</Text>
          </View>
        ))}
        <View style={styles.addPaymentForm}>
          <CustomInput
            placeholder="Monto"
            value={newPaymentAmount}
            onChangeText={setNewPaymentAmount}
            keyboardType="numeric"
          />
          <CustomInput
            placeholder="Pagado por"
            value={newPaymentPaidBy}
            onChangeText={setNewPaymentPaidBy}
          />
          <TouchableOpacity style={styles.addButton} onPress={addPayment}>
            <Text style={styles.addButtonText}>Registrar Pago</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Balance Actual</Text>
        {Object.entries(balances).map(([name, balance]) => (
          <View key={name} style={styles.balanceItem}>
            <Text style={styles.balanceName}>{name}</Text>
            <Text style={[styles.balanceAmount, balance >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
              €{Math.abs(balance).toFixed(2)} {balance >= 0 ? 'a favor' : 'debe'}
            </Text>
          </View>
        ))}
      </View>
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
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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
    marginBottom: 10,
    color: '#333',
  },
  participantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  participantName: {
    fontSize: 16,
    color: '#333',
  },
  addParticipantForm: {
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  paymentInfo: {
    fontSize: 16,
    color: '#333',
  },
  paymentPaidBy: {
    fontSize: 14,
    color: '#666',
  },
  addPaymentForm: {
    marginTop: 10,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  balanceName: {
    fontSize: 16,
    color: '#333',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positiveBalance: {
    color: '#4CAF50',
  },
  negativeBalance: {
    color: '#F44336',
  },
});