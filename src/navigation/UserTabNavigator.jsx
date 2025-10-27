import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// import DashboardUsuario from '../screens/DashboardUsuario';
import AgendaScreen from '../screens/AgendaScreen';
import AgendamentoScreen from '../screens/AgendamentoScreen';
import ScheduleFormScreen from '../screens/ScheduleFormScreen';
import SelectVetScreen from '../screens/SelectVetScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SuccessScreen from '../screens/SuccessScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import SecurityScreen from '../screens/SecurityScreen';
import PrincipalScreen from '../screens/PrincipalScreen';
import UserConsultasScreen from '../screens/UserConsultasScreen';
import DetalhesConsultaScreen from '../screens/DetalhesConsultaScreen';
import VeterinarioScreen from '../screens/VeterinarioScreen';

// Ícones personalizados
import iconeAgenda from '../assets/Calendario.png.png';
import iconeChat from '../assets/Chat.png.png';
import icone from '../assets/icone.png';
import iconePet from '../assets/pet.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/veterinario.png';

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

// function HomeUserTabStack() {
//   return (
//     <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
//       <Stack.Screen name="Principal" component={PrincipalScreen} options={{ title: 'Home' }} />
//     </Stack.Navigator>
//   );
// }

function ConsultasUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="MinhasConsultas" component={UserConsultasScreen} options={{ title: 'Minhas Consultas' }} />
      <Stack.Screen name="DetalhesConsulta" component={DetalhesConsultaScreen} options={{ title: 'Detalhes da Consulta', headerBackVisible: true, headerLeft: undefined }} />
    </Stack.Navigator>
  );
}

function VeterinarioUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="VeterinarioScreen" component={VeterinarioScreen} options={{ title: 'Veterinário' }} />
    </Stack.Navigator>
  );
}

function ChatUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ChatsList" component={ChatsListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route.params?.name || 'Chat', headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

function ConfigurationUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Configuration" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança' }} />
    </Stack.Navigator>
  );
}

function AgendaUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
      <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ title: 'Agendar Consulta', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ScheduleFormScreen" component={ScheduleFormScreen} options={{ title: 'Detalhes do Agendamento', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="SelectVetScreen" component={SelectVetScreen} options={{ title: 'Selecionar Veterinário', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ title: 'Revisar Agendamento' }} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ title: 'Agendamento Concluído' }} />
    </Stack.Navigator>
  );
}

function PetUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Principal" component={PrincipalScreen} options={{ title: 'Meus Pets' }} />
    </Stack.Navigator>
  );
}

const UserTabNavigator = () => {
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
        name="Agenda"
        component={AgendaUserTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeAgenda}
              style={{
                width: size * 1.8,
                height: size * 1.8,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatUserTabStack}
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
        name="Pet"
        component={PetUserTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconePet}
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
        name="Veterinario"
        component={VeterinarioUserTabStack}
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
        name="Pessoa"
        component={ConfigurationUserTabStack}
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

export default UserTabNavigator;