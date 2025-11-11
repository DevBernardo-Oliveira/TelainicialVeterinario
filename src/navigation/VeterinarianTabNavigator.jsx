import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Importar telas do veterinário
import VeterinarianDashboardScreen from '../screens/VeterinarianDashboardScreen';
import VeterinarioScreen from '../screens/VeterinarioScreen';
import PrincipalVetScreen from '../screens/PrincipalVetScreen';
import AgendaScreen from '../screens/AgendaScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ConfigurationVetScreen from '../screens/ConfigurationVetScreen';
import SecurityScreen from '../screens/SecurityScreen';
import UserConsultasScreen from '../screens/UserConsultasScreen';

// Ícones personalizados
import iconeAgenda from '../assets/Calendario.png';
import iconeChat from '../assets/Chat.png.png';
import iconeVeterinario from '../assets/veterinario.png';
import iconePessoa from '../assets/pessoa.png';
import iconePet from '../assets/pet.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const newHeaderOptions = {
  headerBackground: () => (
    <LinearGradient
      colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
      style={{ flex: 1 }}
    />
  ),
  headerTitleStyle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Geologica_700Bold',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  headerBackVisible: false,
  headerLeft: () => null,
};

const slideTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

// Stack para a aba Agenda do Veterinário
function VeterinarianAgendaTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AgendaVeterinario" component={AgendaScreen} options={{ title: 'Minha Agenda' }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Chat do Veterinário
function VeterinarianChatTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ChatsListVeterinario" component={ChatsListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="ChatVeterinario" component={ChatScreen} options={({ route }) => ({ title: route.params?.name || 'Chat', headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

// Stack para a aba Principal do Veterinário
function VeterinarianMainTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="VeterinarianDashboard" component={UserConsultasScreen} options={{ title: 'Área do Veterinário' }} />
      <Stack.Screen name="VeterinarioMain" component={VeterinarioScreen} options={{ title: 'Veterinário' }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Pets/Principal do Veterinário
function VeterinarianPetsTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="PrincipalVet" component={PrincipalVetScreen} options={{ title: 'Pets' }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Configurações do Veterinário
function VeterinarianConfigTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ConfigurationVeterinario" component={ConfigurationVetScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="SecurityVeterinario" component={SecurityScreen} options={{ title: 'Segurança' }} />
    </Stack.Navigator>
  );
}

const VeterinarianTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
            style={{ flex: 1 }}
          />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >

      <Tab.Screen
        name="AgendaVeterinario"
        component={VeterinarianAgendaTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeAgenda}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ChatVeterinario"
        component={VeterinarianChatTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeChat}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="PetsVeterinario"
        component={VeterinarianPetsTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconePet}
              style={{
                width: size * 1.3,
                height: size * 1.3,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="VeterinarioMain"
        component={VeterinarianMainTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeVeterinario}
              style={{
                width: size * 1.2,
                height: size * 1.2,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ConfigurationVeterinario"
        component={VeterinarianConfigTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconePessoa}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default VeterinarianTabNavigator;