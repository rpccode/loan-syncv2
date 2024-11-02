import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AlertSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

type Alert = {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
};

export default function CustomAlerts() {
  const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  useEffect(() => {
    // Simular la carga de configuraciones de alertas
    setAlertSettings([
      { id: '1', title: 'Recordatorio de pago', description: 'Recibe una alerta 3 días antes de la fecha de pago', enabled: true },
      { id: '2', title: 'Cambios en la tasa de interés', description: 'Notificaciones sobre cambios en las tasas del mercado', enabled: false },
      { id: '3', title: 'Oportunidades de refinanciamiento', description: 'Alertas sobre posibles ahorros mediante refinanciamiento', enabled: true },
      { id: '4', title: 'Hitos de préstamo', description: 'Celebra hitos importantes en tu préstamo', enabled: true },
    ]);

    // Simular la carga de alertas
    setAlerts([
      { id: '1', title: 'Pago próximo', message: 'Tu próximo pago de €500 vence en 3 días', date: new Date(2023, 5, 15), read: false },
      { id: '2', title: 'Tasa de interés reducida', message: 'La tasa de interés de referencia ha bajado un 0.25%', date: new Date(2023, 5, 10), read: true },
      { id: '3', title: '50% del préstamo pagado', message: '¡Felicidades! Has pagado el 50% de tu préstamo', date: new Date(2023, 5, 5), read: false },
    ]);
  }, []);

  const toggleAlertSetting = (id: string) => {
    setAlertSettings(alertSettings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const openAlertModal = (alert: Alert) => {
    setSelectedAlert(alert);
    setModalVisible(true);
    markAlertAsRead(alert.id);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alertas Personalizadas</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración de Alertas</Text>
        {alertSettings.map(setting => (
          <View key={setting.id} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={() => toggleAlertSetting(setting.id)}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={setting.enabled ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis Alertas</Text>
        {alerts.map(alert => (
          <TouchableOpacity
            key={alert.id}
            style={[styles.alertItem, alert.read ? styles.readAlert : styles.unreadAlert]}
            onPress={() => openAlertModal(alert)}
          >
            <View style={styles.alertInfo}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDate}>{alert.date.toLocaleDateString()}</Text>
            </View>
            {!alert.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAlert && (
              <>
                <Text style={styles.modalTitle}>{selectedAlert.title}</Text>
                <Text style={styles.modalMessage}>{selectedAlert.message}</Text>
                <Text style={styles.modalDate}>{selectedAlert.date.toLocaleString()}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
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
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  alertDate: {
    fontSize: 14,
    color: '#666',
  },
  unreadAlert: {
    backgroundColor: '#E3F2FD',
  },
  readAlert: {
    backgroundColor: '#ffffff',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
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
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});