import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

type Event = {
  id: string;
  date: string;
  title: string;
  type: 'payment' | 'meeting';
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState<Event[]>([
    { id: '1', date: '2023-06-15', title: 'Pago de Juan Pérez', type: 'payment' },
    { id: '2', date: '2023-06-18', title: 'Reunión con María García', type: 'meeting' },
  ]);

  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: event.type === 'payment' ? '#4CAF50' : '#2196F3' };
    return acc;
  }, {});

  const addEvent = () => {
    // Aquí iría la lógica para añadir un nuevo evento
    // Por ahora, solo mostraremos una alerta
    alert('Funcionalidad para añadir evento');
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <View style={styles.eventItem}>
      <Ionicons 
        name={item.type === 'payment' ? 'cash-outline' : 'people-outline'} 
        size={24} 
        color={item.type === 'payment' ? '#4CAF50' : '#2196F3'} 
      />
      <Text style={styles.eventTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: '#007AFF' },
        }}
      />
      <View style={styles.eventList}>
        <Text style={styles.eventListTitle}>Eventos para {selectedDate || 'la fecha seleccionada'}</Text>
        <FlatList
          data={events.filter(event => event.date === selectedDate)}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No hay eventos para esta fecha.</Text>}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addEvent}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  eventList: {
    flex: 1,
    padding: 20,
  },
  eventListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});