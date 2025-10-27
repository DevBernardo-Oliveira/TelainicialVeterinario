import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatScreen = ({ route }) => {
  const { vet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat com {vet.name}</Text>
      {/* Aqui você pode adicionar a lógica e os componentes para o chat */}
      <Text>Em breve: Funcionalidade de chat.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ChatScreen;