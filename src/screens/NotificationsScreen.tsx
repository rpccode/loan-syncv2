import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Pago recibido', message: 'Se ha recibido el pago de Juan Pérez', date: '2023-06-15', read: false },
    { id: '2', title: 'Nuevo préstamo solicitado', message: 'María García ha solicitado un nuevo préstamo', date: '2023-06-14', read: true },
    { id: '3', title: 'Recordatorio de reunión', message: 'Tienes una reunión programada para mañana', date: '2023-06-13', read: false },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]} 
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
      />
    </View>
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  unreadNotification: {
    backgroundColor: '#E3F2FD',
  },
  readNotification: {
    backgroundColor: 'white',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginLeft: 10,
  },
});