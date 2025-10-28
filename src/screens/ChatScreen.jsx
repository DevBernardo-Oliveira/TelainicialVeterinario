import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const ChatMessage = ({ message, isMyMessage }) => (
  <View style={[styles.messageBubble, isMyMessage ? styles.myMessage : styles.otherMessage]}>
    <Text style={styles.messageText}>{message.text}</Text>
    <Text style={styles.messageTime}>{message.time}</Text>
  </View>
);

const ChatScreen = ({ route }) => {
  const { vet } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Como posso ajudar?', time: '10:00 AM', sender: 'other' },
    { id: '2', text: 'Oi Dr. João, meu cachorro está com febre.', time: '10:05 AM', sender: 'me' },
    { id: '3', text: 'Entendi. Você pode me dar mais detalhes?', time: '10:10 AM', sender: 'other' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: String(messages.length + 1),
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage message={item} isMyMessage={item.sender === 'me'} />}
        // inverted
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'column',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(232, 224, 255)',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#6E59D9',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;