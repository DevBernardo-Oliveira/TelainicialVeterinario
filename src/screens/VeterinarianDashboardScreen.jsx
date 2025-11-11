import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, CommonStyles } from '../Utils/Theme';

// Ícones
import iconeConsultas from '../assets/Calendario.png';
import iconePacientes from '../assets/pet.png';
import iconeChat from '../assets/Chat.png.png';
import iconeConfig from '../assets/engrenagem.png';

const VeterinarianDashboardScreen = ({ navigation }) => {
  const [consultasHoje] = useState(5);
  const [pacientesAtivos] = useState(12);

  const MenuCard = ({ title, subtitle, icon, onPress, color }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <Image source={icon} style={styles.cardIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com gradiente */}
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Área do Veterinário</Text>
        <Text style={styles.headerSubtitle}>Bem-vindo, Dr. Veterinário</Text>
      </LinearGradient>

      {/* Cards de estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{consultasHoje}</Text>
          <Text style={styles.statLabel}>Consultas Hoje</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pacientesAtivos}</Text>
          <Text style={styles.statLabel}>Pacientes Ativos</Text>
        </View>
      </View>

      {/* Menu principal */}
      <View style={styles.menuContainer}>
        <MenuCard
          title="Minha Agenda"
          subtitle="Ver consultas agendadas"
          icon={iconeConsultas}
          color="#FF6B6B"
          onPress={() => navigation.navigate('AgendaVeterinario')}
        />
        <MenuCard
          title="Meus Pacientes"
          subtitle="Gerenciar pacientes"
          icon={iconePacientes}
          color="#4ECDC4"
          onPress={() => navigation.navigate('VeterinarioMain')}
        />
        <MenuCard
          title="Conversas"
          subtitle="Mensagens com tutores"
          icon={iconeChat}
          color="#45B7D1"
          onPress={() => navigation.navigate('ChatVeterinario')}
        />
        <MenuCard
          title="Configurações"
          subtitle="Preferências da conta"
          icon={iconeConfig}
          color="#96CEB4"
          onPress={() => navigation.navigate('ConfigurationVeterinario')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 20,
  },
  statCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    ...CommonStyles.card,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.purple,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  menuContainer: {
    padding: 20,
    marginTop: 10,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    ...CommonStyles.card,
  },
  cardIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default VeterinarianDashboardScreen;