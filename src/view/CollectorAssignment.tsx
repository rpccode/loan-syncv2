import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type Collector = {
  id: string;
  name: string;
};

type Route = {
  id: string;
  name: string;
};

type Assignment = {
  id: string;
  collectorId: string;
  routeId: string;
  date: Date;
};

export default function CollectorAssignment() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');

  useEffect(() => {
    // Simular la carga de cobradores y rutas
    const sampleCollectors: Collector[] = [
      { id: '1', name: 'Juan Pérez' },
      { id: '2', name: 'María García' },
      { id: '3', name: 'Carlos Rodríguez' },
    ];
    const sampleRoutes: Route[] = [
      { id: '1', name: 'Ruta Centro' },
      { id: '2', name: 'Ruta Norte' },
      { id: '3', name: 'Ruta Sur' },
    ];
    setCollectors(sampleCollectors);
    setRoutes(sampleRoutes);

    // Simular asignaciones existentes
    const sampleAssignments: Assignment[] = [
      { id: '1', collectorId: '1', routeId: '1', date: new Date() },
      { id: '2', collectorId: '2', routeId: '2', date: new Date() },
    ];
    setAssignments(sampleAssignments);
  }, []);

  const addAssignment = () => {
    if (selectedCollector && selectedRoute) {
      const newAssignment: Assignment = {
        id: Date.now().toString(),
        collectorId: selectedCollector,
        routeId: selectedRoute,
        date: new Date(),
      };
      setAssignments([...assignments, newAssignment]);
      setModalVisible(false);
      setSelectedCollector('');
      setSelectedRoute('');
    }
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  const getCollectorName = (id: string) => {
    const collector = collectors.find(c => c.id === id);
    return collector ? collector.name : 'Desconocido';
  };

  const getRouteName = (id: string) => {
    const route = routes.find(r => r.id === id);
    return route ? route.name : 'Desconocida';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Asignación de Cobradores</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={24} color="#ffffff" />
        <Text style={styles.addButtonText}>Nueva Asignación</Text>
      </TouchableOpacity>

      {assignments.map(assignment => (
        <View key={assignment.id} style={styles.assignmentItem}>
          <View style={styles.assignmentInfo}>
            <Text style={styles.assignmentText}>Cobrador: {getCollectorName(assignment.collectorId)}</Text>
            <Text style={styles.assignmentText}>Ruta: {getRouteName(assignment.routeId)}</Text>
            <Text style={styles.assignmentText}>Fecha: {assignment.date.toLocaleDateString()}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteAssignment(assignment.id)}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
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
            <Text style={styles.modalTitle}>Nueva Asignación</Text>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Cobrador:</Text>
              <Picker
                selectedValue={selectedCollector}
                onValueChange={(itemValue) => setSelectedCollector(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione un cobrador" value="" />
                {collectors.map(collector => (
                  <Picker.Item key={collector.id} label={collector.name} value={collector.id} />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Ruta:</Text>
              <Picker
                selectedValue={selectedRoute}
                onValueChange={(itemValue) => setSelectedRoute(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione una ruta" value="" />
                {routes.map(route => (
                  <Picker.Item key={route.id} label={route.name} value={route.id} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={addAssignment}>
              <Text style={styles.saveButtonText}>Guardar Asignación</Text>
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
  assignmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
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