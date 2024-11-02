import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../components';


type CollectionRoute = {
  id: string;
  name: string;
  area: string;
  numberOfClients: number;
  totalAmountToBeColl: any

ected: number;
};

export default function CollectionRouteManagement() {
  const [routes, setRoutes] = useState<CollectionRoute[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRoute, setNewRoute] = useState<Partial<CollectionRoute>>({});

  useEffect(() => {
    // Simular la carga de rutas de cobro
    const sampleRoutes: CollectionRoute[] = [
      { id: '1', name: 'Ruta Centro', area: 'Centro de la ciudad', numberOfClients: 20, totalAmountToBeCollected: 15000 },
      { id: '2', name: 'Ruta Norte', area: 'Zona norte', numberOfClients: 15, totalAmountToBeCollected: 12000 },
      { id: '3', name: 'Ruta Sur', area: 'Zona sur', numberOfClients: 18, totalAmountToBeCollected: 13500 },
    ];
    setRoutes(sampleRoutes);
  }, []);

  const addRoute = () => {
    if (newRoute.name && newRoute.area) {
      const route: CollectionRoute = {
        id: Date.now().toString(),
        name: newRoute.name,
        area: newRoute.area,
        numberOfClients: parseInt(newRoute.numberOfClients as string) || 0,
        totalAmountToBeCollected: parseFloat(newRoute.totalAmountToBeCollected as string) || 0,
      };
      setRoutes([...routes, route]);
      setModalVisible(false);
      setNewRoute({});
    }
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Gestión de Rutas de Cobro</Text> */}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={24} color="#ffffff" />
        <Text style={styles.addButtonText}>Agregar Nueva Ruta</Text>
      </TouchableOpacity>

      {routes.map(route => (
        <View key={route.id} style={styles.routeItem}>
          <View style={styles.routeInfo}>
            <Text style={styles.routeName}>{route.name}</Text>
            <Text style={styles.routeDetails}>Área: {route.area}</Text>
            <Text style={styles.routeDetails}>Clientes: {route.numberOfClients}</Text>
            <Text style={styles.routeDetails}>Total a cobrar: €{route.totalAmountToBeCollected.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteRoute(route.id)}>
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
            <Text style={styles.modalTitle}>Agregar Nueva Ruta</Text>
            <CustomInput
              placeholder="Nombre de la Ruta"
              value={newRoute.name}
              onChangeText={(text) => setNewRoute({...newRoute, name: text})}
            />
            <CustomInput
              placeholder="Área"
              value={newRoute.area}
              onChangeText={(text) => setNewRoute({...newRoute, area: text})}
            />
            <CustomInput
              placeholder="Número de Clientes"
              value={newRoute.numberOfClients?.toString()}
              onChangeText={(text) => setNewRoute({...newRoute, numberOfClients: text})}
              keyboardType="numeric"
            />
            <CustomInput
              placeholder="Total a Cobrar"
              value={newRoute.totalAmountToBeCollected?.toString()}
              onChangeText={(text) => setNewRoute({...newRoute, totalAmountToBeCollected: text})}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={addRoute}>
              <Text style={styles.saveButtonText}>Guardar Ruta</Text>
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
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  routeDetails: {
    fontSize: 14,
    color: '#666',
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