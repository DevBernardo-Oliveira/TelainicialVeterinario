import React from 'react';
import { Image, TouchableOpacity, View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Ícones personalizados
import iconeHome from '../assets/Calendario.png.png';
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
          <TouchableOpacity onPress={() => console.log('Ver Todas clicado')}>
            <Text style={styles.seeAllLink}>Ver Todas</Text>
          </TouchableOpacity>
        </View>
        {/* Seção de notificações vazia */}
      </View>


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
    width: 56,
    height: 56,
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
