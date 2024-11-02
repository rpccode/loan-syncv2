import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

type Document = {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
  tags: string[];
};

export default function EnhancedDocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [newTag, setNewTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simular la carga de documentos
    const sampleDocuments: Document[] = [
      { id: '1', name: 'Contrato_001.pdf', type: 'application/pdf', size: 1024000, createdAt: new Date(), tags: ['contrato', 'cliente1'] },
      { id: '2', name: 'Factura_002.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 512000, createdAt: new Date(), tags: ['factura', 'cliente2'] },
    ];
    setDocuments(sampleDocuments);
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });

      if (result.type === 'success') {
        const newDoc: Document = {
          id: Date.now().toString(),
          name: result.name,
          type: result.mimeType || 'application/octet-stream',
          size: result.size,
          createdAt: new Date(),
          tags: [],
        };
        setDocuments(prevDocs => [...prevDocs, newDoc]);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
  };

  const addTag = () => {
    if (selectedDocument && newTag) {
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === selectedDocument.id
            ? { ...doc, tags: [...doc.tags, newTag] }
            : doc
        )
      );
      setNewTag('');
    }
  };

  const removeTag = (docId: string, tagToRemove: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.id === docId
          ? { ...doc, tags: doc.tags.filter(tag => tag !== tagToRemove) }
          : doc
      )
    );
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderDocumentItem = ({ item }: { item: Document }) => (
    <View style={styles.documentItem}>
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{item.name}</Text>
        <Text style={styles.documentDetails}>
          {(item.size / 1024).toFixed(2)} KB • {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <View style={styles.tagsContainer}>
          {item.tags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={styles.tag}
              onPress={() => removeTag(item.id, tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
              <Ionicons name="close-circle" size={16} color="#ffffff" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.documentActions}>
        <TouchableOpacity onPress={() => {
          setSelectedDocument(item);
          setModalVisible(true);
        }}>
          <Ionicons name="pricetag" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteDocument(item.id)}>
          <Ionicons name="trash" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Documentos</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar documentos o etiquetas"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDocuments}
        renderItem={renderDocumentItem}
        keyExtractor={item => item.id}
        style={styles.documentList}
      />
      <TouchableOpacity style={styles.addButton} onPress={pickDocument}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir Etiqueta</Text>
            <TextInput
              style={styles.tagInput}
              placeholder="Nueva etiqueta"
              value={newTag}
              onChangeText={setNewTag}
            />
            <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
              <Text style={styles.addTagButtonText}>Añadir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  documentList: {
    flex: 1,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  documentDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  tagInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  addTagButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addTagButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007AFF',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: '#ffffff',
    marginRight: 5,
  },
});