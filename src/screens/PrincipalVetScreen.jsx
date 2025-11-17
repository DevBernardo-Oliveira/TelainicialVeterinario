import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text, Platform, Modal, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Ícones personalizados
import iconeHome from '../assets/Calendario.png';
import iconeMao from '../assets/Chat.png.png';
import iconePet from '../assets/pet.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/veterinario.png';

// Simulação do hook useTheme para o código ser executável
const useTheme = () => ({
  colors: {
    background: '#FFFAD9',
    textPrimary: '#3C3633',
    textSecondary: '#7D7C7C',
    primary: '#7F57F1',
    cardBackground: '#FFF7F1',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    navBackground: '#FEEEEE', // alterado de #FFFFFF para #FEEEEE
  }
});

const PrincipalVetScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Dados reais da agenda do veterinário
  const consultasData = {
    Agendada: [
      {
        id: 1,
        petName: "Mascote 1",
        service: "Consulta Geral", 
        time: "10:00 AM",
        imageSource: require('../assets/cat1.png'),
        status: "Agendada",
        data: "15:23 | 05/02/2025",
        sintomas: "Meu gato acordou vomitando, está dormindo mais que o normal e não está comendo nada.",
        localizacao: "R. Bento Branco de Andrade Filho, 379 – Santo Amaro, São Paulo – SP, 04757-000",
        implementos: ["Termômetro", "Estetoscópio", "Soro"]
      },
      {
        id: 2,
        petName: "Mascote 2", 
        service: "Vacinação",
        time: "02:30 PM",
        imageSource: require('../assets/dog1.png'),
        status: "Agendada",
        data: "14:00 | 05/02/2025",
        sintomas: "Vacinação anual de rotina para meu cachorro.",
        localizacao: "Av. Paulista, 1000 – Bela Vista, São Paulo – SP, 01310-000",
        implementos: ["Vacina", "Algodão", "Álcool"]
      }
    ],
    Andamento: [
      {
        id: 3,
        petName: "Mascote 3",
        service: "Exame de Sangue", 
        time: "09:00 AM",
        imageSource: require('../assets/dog2.png'),
        status: "Andamento",
        data: "09:00 | 05/02/2025",
        sintomas: "Meu cachorro está com fraqueza e perda de apetite, precisa de exame de sangue.",
        localizacao: "R. Augusta, 500 – Consolação, São Paulo – SP, 01305-000",
        implementos: ["Agulha", "Tubo de coleta", "Algodão"]
      }
    ],
    Concluídas: [
      {
        id: 4,
        petName: "Mascote 4",
        service: "Tosa", 
        time: "04:00 PM",
        imageSource: require('../assets/cat1.png'),
        status: "Concluída",
        data: "16:00 | 04/02/2025",
        sintomas: "Tosa de rotina para meu gato de pelo longo.",
        localizacao: "R. Oscar Freire, 800 – Jardim Paulista, São Paulo – SP, 01426-000",
        implementos: ["Tesoura", "Máquina de tosa", "Pente"]
      }
    ]
  };

  // Função para obter consultas de hoje
  const getConsultasDeHoje = () => {
    const hoje = new Date();
    const hojeFormatado = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
    
    const todasConsultas = [
      ...consultasData.Agendada,
      ...consultasData.Andamento,
      ...consultasData.Concluídas
    ];
    
    return todasConsultas.filter(consulta => {
      const partesData = consulta.data.split(' | ');
      const dataConsulta = partesData[1]; // "DD/MM/YYYY"
      return dataConsulta === hojeFormatado;
    }).map(consulta => ({
      id: consulta.id,
      clienteNome: `Cliente ${consulta.id}`, // Simulação de nome de cliente
      petNome: consulta.petName,
      tipo: consulta.service,
      descricao: `Consulta agendada para hoje às ${consulta.time}.`,
      status: consulta.status === 'Agendada' ? 'pendente' : consulta.status.toLowerCase(),
      imagem: consulta.imageSource
    }));
  };

  const notificacoesVet = getConsultasDeHoje();

  // Adicionar notificação da PrincipalScreen.jsx
  const notificacaoPrincipalScreen = {
    id: 99,
    clienteNome: 'Cliente Principal',
    petNome: 'Rex',
    tipo: 'exame de sangue',
    descricao: 'esta consulta esta agendada',
    status: 'agendada',
    imagem: require('../assets/dog1.png'),
    tipoNotificacao: 'consulta',
      cor: 'rgb(255, 0, 0)'
  };

  const notificacoesExtras = [
    {
      id: 100,
      clienteNome: 'Cliente Principal 2',
      petNome: 'Buddy',
      tipo: 'consulta de rotina',
      descricao: 'consulta em andamento',
      status: 'andamento',
      imagem: require('../assets/dog2.png'),
      tipoNotificacao: 'consulta'
    },
    {
      id: 101,
      clienteNome: 'Cliente Principal 3',
      petNome: 'Thor',
      tipo: 'consulta de rotina',
      descricao: 'Essa consulta esta completa.',
      status: 'completo',
      imagem: require('../assets/cat1.png'),
      tipoNotificacao: 'consulta'
    }
  ];

  // Combinar notificações do veterinário com a notificação da tela principal
  const todasNotificacoes = [...notificacoesVet, notificacaoPrincipalScreen, ...notificacoesExtras];

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Olá Veterinário(a)</Text>
        <Text style={styles.subtitle}>Bom Dia!</Text>
      </View>

      {/* Card Principal */}
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.promoCard}
      >
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>Visite nosso Website</Text>
          <TouchableOpacity style={styles.promoButton} activeOpacity={0.6} onPress={() => console.log('Botão Clicado')}> 
            <Text style={{ color: styles.promoButton.color, fontWeight: styles.promoButton.fontWeight }}>Clique Aqui</Text>
          </TouchableOpacity>
        </View>
        {/* Placeholder para a imagem do card */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log('DogCat clicked')}>
          <Image source={require('../assets/DogCat.png')} style={styles.promoImage} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Seção de Categorias */}
      <View style={styles.categorySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
        </View>
        <View style={styles.categoryGrid}>
          {/* Category buttons now navigate to different tabs */}
          <CategoryButton
            icon={iconeHome}
            label="Agenda"
            styles={styles}
            onPress={() => navigation.navigate('AgendaVeterinario')}
            isAgenda={true}
          />
          <CategoryButton
            icon={iconeMao}
            label="Chat"
            styles={styles}
            onPress={() => navigation.navigate('ChatVeterinario')}
          />
          <CategoryButton
            icon={iconeVeterinario}
            label="Veterinário"
            styles={styles}
            onPress={() => navigation.navigate('VeterinarioMain')}
          />
          <CategoryButton
            icon={iconePessoa}
            label="Perfil"
            styles={styles}
            onPress={() => navigation.navigate('ConfigurationVeterinario')}
          />
        </View>
      </View>

      {/* Seção de Notificações */}
      <View style={styles.notificacoesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.seeAllLink}>Ver Todas</Text>
          </TouchableOpacity>
        </View>
        {/* Notificações reais da agenda do veterinário */}
        {todasNotificacoes.length > 0 ? (
          todasNotificacoes.slice(0, 2).map((notificacao) => (
            <View key={notificacao.id} style={styles.notificationCard}>
              <Image
                source={notificacao.imagem}
                style={styles.petImage}
              />
              <View style={styles.notificationInfo}>
                <Text style={styles.petName}>{notificacao.petNome}</Text>
                <Text style={styles.notificationType}>{notificacao.tipo}</Text>
                <Text style={styles.notificationTime}>{notificacao.descricao}</Text>
              </View>
              <View style={[
                styles.statusButton,
                { 
                  backgroundColor: notificacao.status === 'pendente' ? '#FFE8E8' : 
                                  notificacao.status === 'andamento' ? 'rgb(255, 232, 232)' : 
                                  notificacao.status === 'completo' ? 'rgb(240, 240, 240)' : '#E8E0FF' 
                }
              ]}>
                <Text style={[
                  styles.statusButtonText,
                  { 
                    color: notificacao.status === 'pendente' ? '#FF6B6B' : 
                            notificacao.status === 'andamento' ? 'rgb(255, 107, 107)' : 
                            notificacao.status === 'completo' ? 'rgb(169, 169, 169)' : '#7F57F1' 
                  }
                ]}>
                  {notificacao.status}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.notificationCard}>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationTime}>Nenhuma consulta agendada para hoje.</Text>
            </View>
          </View>
        )}
      </View>

      {/* Modal de Notificações do Veterinário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            {/* Header do Modal */}
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Notificações do Veterinário</Text>
              <TouchableOpacity 
                style={modalStyles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={modalStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {/* Lista de Notificações */}
            <ScrollView style={modalStyles.notificationList}>
              {todasNotificacoes.length > 0 ? (
                todasNotificacoes.map((notificacao) => (
                  <View key={notificacao.id} style={modalStyles.notificationItem}>
                    <Image
                      source={notificacao.imagem}
                      style={modalStyles.modalPetImage}
                    />
                    <View style={modalStyles.modalNotificationInfo}>
                      <Text style={modalStyles.modalPetName}>{notificacao.petNome}</Text>
                      <Text style={modalStyles.modalNotificationType}>{notificacao.tipo}</Text>
                      <Text style={modalStyles.modalNotificationDesc}>{notificacao.descricao}</Text>
                    </View>
                    <View style={[
                      modalStyles.modalStatusButton,
                      { 
                        backgroundColor: notificacao.status === 'pendente' ? '#FFE8E8' : 
                                        notificacao.status === 'andamento' ? 'rgb(255, 232, 232)' : 
                                        notificacao.status === 'completo' ? 'rgb(240, 240, 240)' : '#E8E0FF' 
                      }
                    ]}>
                      <Text style={[
                        modalStyles.modalStatusText,
                        { 
                          color: notificacao.status === 'pendente' ? '#FF6B6B' : 
                                  notificacao.status === 'andamento' ? 'rgb(255, 107, 107)' : 
                                  notificacao.status === 'completo' ? 'rgb(169, 169, 169)' : '#7F57F1' 
                        }
                      ]}>
                        {notificacao.status}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={modalStyles.emptyNotification}>
                  <Text style={modalStyles.emptyNotificationText}>
                    Nenhuma consulta agendada para hoje.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>


      {/* O rodapé será removido e a navegação será gerenciada pelo Tab.Navigator em App.jsx */}
    </View>
  );
};

// Função para gerar os estilos
const getStyles = (colors) => ({
  container: {
    // fontFamily: 'Poppins_700Bold', // Fontes precisam ser carregadas e configuradas de forma diferente no RN
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    padding: 24,
    position: 'relative',
    paddingBottom: 100,
    paddingTop: Platform.OS === 'ios' ? 24 + (/* valor do safe-area-inset-top */ 0) : 24, // Ajuste para safe area no iOS
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  promoCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFFFFF',
    marginBottom: 32,
    overflow: 'hidden', // Necessário para o LinearGradient
  },
  promoTextContainer: {
    maxWidth: '50%',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  // Botão real (sem Rectangle.png)
  promoButton: {
    backgroundColor: '#FFFFFF',
    color: colors.primary,
    borderRadius: 16,
    width: 150,
    height: 44,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    width: '150px',
    height: '120px',
    borderRadius: '16px',
    resizeMode: 'contain',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  seeAllLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Para distribuir os itens uniformemente
    marginBottom: 32,
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '24%', // Para simular 4 colunas com espaço entre elas
    marginBottom: 16,
  },
  // Quadrado roxo atrás do ícone de categoria (voltando ao que era antes)
  categoryIconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  // Ícone sem fundo branco
  categoryIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  // Ícone maior apenas para "Cuidados"
  categoryIconCare: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  // Ícone maior para "Agenda"
  categoryIconAgenda: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  categoryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  notificacoesSection: {
    marginBottom: 32,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgb(199, 157, 253)',
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 16,
  },
  notificationInfo: {
    flexGrow: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  notificationType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusButton: {
    backgroundColor: '#E8E0FF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  consultaCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // boxShadow: `0 4px 12px ${colors.cardShadow}`, // Sombras são tratadas de forma diferente no RN
  },
  doctorImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden', // Necessário para o LinearGradient
  },
  doctorInfo: {
    flexGrow: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  doctorSpec: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  arrowIcon: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16, // 50% de 32px é 16px
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// Estilos do Modal
const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0FF',
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C3633',
  },
  closeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#7D7C7C',
    fontWeight: 'bold',
  },
  notificationList: {
    maxHeight: '70%',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgb(199, 157, 253)',
  },
  modalPetImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  modalNotificationInfo: {
    flex: 1,
    marginRight: 10,
  },
  modalPetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3633',
    marginBottom: 2,
  },
  modalNotificationType: {
    fontSize: 14,
    color: '#7F57F1',
    fontWeight: '600',
    marginBottom: 2,
  },
  modalNotificationDesc: {
    fontSize: 12,
    color: '#7D7C7C',
    marginBottom: 4,
  },
  modalClientName: {
    fontSize: 11,
    color: '#9E9E9E',
    fontStyle: 'italic',
  },
  modalStatusButton: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  modalStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emptyNotification: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyNotificationText: {
    fontSize: 14,
    color: '#7D7C7C',
    textAlign: 'center',
  },
});

export default PrincipalVetScreen;

  // Componente CategoryButton
  const CategoryButton = ({ icon, label, styles, onPress, isAgenda }) => (
    <TouchableOpacity style={styles.categoryButton} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.categoryIconContainer}>
        <Image source={icon} style={isAgenda ? styles.categoryIconAgenda : (label === 'Cuidados' ? styles.categoryIconCare : styles.categoryIcon)} />
      </View>
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
