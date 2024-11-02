import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../components';


type Collection = {
  id: string;
  collectorId: string;
  clientName: string;
  amount: number;
  date: Date;
  status: 'completed' | 'partial' | 'failed';
};

export default function CollectionTracking() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCollection, setNewCollection] = useState<Partial<Collection>>({});

  useEffect(() => {
    // Simular la carga de cobros realizados
    const sampleCollections: Collection[] = [
      { id: '1', collectorId: '1', clientName: 'Juan Pérez', amount: 500, date: new Date(2023, 5, 1), status: 'completed' },
      { id: '2', collectorId: '2', clientName: 'María García', amount: 300, date: new Date(2023, 5, 2), status: 'partial' },
      { id: '3', collectorId: '1', clientName: 'Carlos Rodríguez', amount: 0, date: new Date(2023, 5, 3), status: 'failed' },
    ];
    setCollections(sampleCollections);
  }, []);

  const addCollection = () => {
    if (newCollection.clientName && newCollection.amount) {
      const collection: Collection = {
        id: Date.now().toString(),
        collectorId: '1', // En una implementación real, esto vendría del usuario logueado
        clientName: newCollection.clientName,
        amount: parseFloat(newCollection.amount as unknown as string),
        date: new Date(),
        status: newCollection.status as 'completed' | 'partial' | 'failed' || 'completed',
      };
      setCollections([...collections, collection]);
      setModalVisible(false);
      setNewCollection({});
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'partial': return '#FFC107';
      case 'failed': return '#F44336';
      default: return '#000000';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'partial': return 'Parcial';
      case 'failed': return 'Fallido';
      default: return status;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Seguimiento de Cobros</Text> */}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={24} color="#ffffff" />
        <Text style={styles.addButtonText}>Registrar Nuevo Cobro</Text>
      </TouchableOpacity>

      {collections.map(collection => (
        <View key={collection.id} style={styles.collectionItem}>
          <View style={styles.collectionInfo}>
            <Text style={styles.clientName}>{collection.clientName}</Text>
            <Text style={styles.collectionDetails}>Monto: €{collection.amount.toFixed(2)}</Text>
            <Text style={styles.collectionDetails}>Fecha: {collection.date.toLocaleDateString()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(collection.status) }]}>
            <Text style={styles.statusText}>{getStatusText(collection.status)}</Text>
          </View>
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar Nuevo Cobro</Text>
            <CustomInput
              placeholder="Nombre del Cliente"
              value={newCollection.clientName}
              onChangeText={(text) => setNewCollection({...newCollection, clientName: text})}
            />
            <CustomInput
              placeholder="Monto Cobrado"
              value={newCollection.amount?.toString()}
              onChangeText={(text) => setNewCollection({...newCollection, amount: text})}
              keyboardType="numeric"
            />
            <View style={styles.statusButtons}>
              <TouchableOpacity
                style={[styles.statusButton, newCollection.status === 'completed' && styles.selectedStatusButton]}
                onPress={() => setNewCollection({...newCollection, status: 'completed'})}
              >
                <Text style={styles.statusButtonText}>Completado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statusButton, newCollection.status === 'partial' && styles.selectedStatusButton]}
                onPress={() => setNewCollection({...newCollection, status: 'partial'})}
              >
                <Text style={styles.statusButtonText}>Parcial</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statusButton, newCollection.status === 'failed' && styles.selectedStatusButton]}
                onPress={() => setNewCollection({...newCollection, status: 'failed'})}
              >
                <Text style={styles.statusButtonText}>Fallido</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={addCollection}>
              <Text style={styles.saveButtonText}>Guardar Cobro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  collectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  collectionInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  collectionDetails: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 5,
  },
  selectedStatusButton: {
    backgroundColor: '#007AFF',
  },
  statusButtonText: {
    textAlign: 'center',
    color: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});