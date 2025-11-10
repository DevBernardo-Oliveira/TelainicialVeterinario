import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ConsultaDetailsModal = ({ visible, onClose, consulta }) => {
  if (!consulta) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['rgb(180, 140, 240)', 'rgb(160, 160, 250)']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Image source={consulta.imageSource} style={styles.petImage} />
              <Text style={styles.petName}>{consulta.petName}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.contentContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Informações da Consulta</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Status:</Text>
                <View style={[styles.statusBadge, styles[`status${consulta.status}`]]}>
                  <Text style={styles.statusText}>{consulta.status}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Data:</Text>
                <Text style={styles.infoText}>{consulta.date}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Horário:</Text>
                <Text style={styles.infoText}>{consulta.time}</Text>
              </View>

              {consulta.doctorName && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Veterinário:</Text>
                  <Text style={styles.infoText}>{consulta.doctorName}</Text>
                </View>
              )}

              <View style={styles.infoRow}>
                <Text style={styles.label}>Local:</Text>
                <Text style={styles.infoText}>{consulta.localizacao}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Sintomas do Pet</Text>
              <Text style={styles.descriptionText}>{consulta.sintomas}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Implementos Necessários</Text>
              {consulta.implementos.map((implemento, index) => (
                <View key={index} style={styles.implementoItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.implementoText}>{implemento}</Text>
                </View>
              ))}
            </View>



            {consulta.status === 'Aceita' && (
              <TouchableOpacity style={[styles.actionButton, styles.startButton]}>
                <Text style={styles.actionButtonText}>Iniciar Consulta</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  headerGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  headerContent: {
    alignItems: 'center',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B48CF0',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusPendente: {
    backgroundColor: '#A8C0FF',
  },
  statusAceita: {
    backgroundColor: '#D0BCFF',
  },
  statusAndamento: {
    backgroundColor: '#FFB74D',
  },
  statusConcluída: {
    backgroundColor: '#B48CF0',
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  implementoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#B48CF0',
    marginRight: 8,
  },
  implementoText: {
    fontSize: 14,
    color: '#333',
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  startButton: {
    backgroundColor: '#B48CF0',
  },
});

export default ConsultaDetailsModal;