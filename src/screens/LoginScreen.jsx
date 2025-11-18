import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importe o hook de navegação
import { Colors, CommonStyles } from '../Utils/Theme';

const LoginScreen = () => {
  const navigation = useNavigation(); // Obtenha o objeto de navegação
  const route = useRoute();
  const [userType, setUserType] = useState(route.params?.userType || 'usuario'); // 'usuario' ou 'veterinario'
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem('userCredentials');
        if (savedCredentials) {
          const { email, password } = JSON.parse(savedCredentials);
          setEmail(email);
          setPassword(password);
          setRememberMe(true);
        }
      } catch (e) {
        console.error('Failed to load credentials', e);
      }
    };

    loadCredentials();
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Inicial'); // Volta para a tela inicial
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o email e a senha.');
      return;
    }

    try {
      if (rememberMe) {
        await AsyncStorage.setItem('userCredentials', JSON.stringify({ email, password }));
      } else {
        await AsyncStorage.removeItem('userCredentials');
      }
    } catch (e) {
      console.error('Failed to save credentials', e);
      Alert.alert('Erro', 'Não foi possível salvar as informações de login.');
    }

    // Lógica de autenticação aqui
    if (userType === 'usuario') {
      navigation.navigate('UserMainApp');
    } else if (userType === 'veterinario') {
      navigation.navigate('VeterinarianMainApp');
    }
  };

  const handlePasswordReset = () => {
    if (!resetEmail) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }
    // Lógica para enviar o e-mail de redefinição de senha
    Alert.alert('Sucesso', 'Um e-mail de redefinição de senha foi enviado para ' + resetEmail);
    setModalVisible(false);
    setResetEmail('');
  };

  return (
    <View style={styles.container}>
      {/* Imagem de fundo que ocupa a tela inteira */}
      <Image
        source={require('../assets/Vector.png')}
        style={styles.fullScreenImage}
        accessibilityLabel="Desenho de uma pessoa com um gato"
      />

      {/* O container de login completo sobre a imagem */}
      <View style={styles.loginContainer}>
        {/* Botões de seleção de tipo de usuário */}
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'usuario' && styles.userTypeButtonActive]}
            onPress={() => setUserType('usuario')}
          >
            <Text style={[styles.userTypeButtonText, userType === 'usuario' && styles.userTypeButtonTextActive]}>
              Usuário
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'veterinario' && styles.userTypeButtonActive]}
            onPress={() => setUserType('veterinario')}
          >
            <Text style={[styles.userTypeButtonText, userType === 'veterinario' && styles.userTypeButtonTextActive]}>
              Veterinário
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logo Pet Vita agora é uma imagem */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/petvita2.png')} // Caminho da nova imagem
            style={styles.logoImage}
            accessibilityLabel="Logo Pet Vita com desenhos de um cachorro e um gato"
          />
        </View>

        {/* Campo de Email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Exemplo@gmail.com"
            placeholderTextColor={Colors.lightPurple}
            keyboardType="email-address"
            maxLength={40} // Limit email to 40 characters
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Campo de Senha */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor={Colors.lightPurple}
              secureTextEntry={!showPassword}
              maxLength={15} // Limit password to 15 characters
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={showPassword ? require('../assets/olhoaberto.png') : require('../assets/olhofechado.png')}
                style={{ width: 24, height: 24, tintColor: Colors.darkGray }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Lembre-me e Esqueci a Senha */}
        <View style={styles.rememberForgotContainer}>
          <View style={styles.rememberMeContainer}>
                        <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)}>
              {rememberMe && <Text style={styles.checkboxX}>X</Text>}
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Lembre-me</Text>
          </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.forgotPasswordText}>Esqueci a Senha</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Esqueceu sua senha?</Text>
            <Text style={styles.modalSubtitle}>
              Não se preocupe! Insira seu e-mail abaixo para receber um link de redefinição.
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={Colors.lightPurple}
              keyboardType="email-address"
              autoCapitalize="none"
              value={resetEmail}
              onChangeText={setResetEmail}
            />
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonPrimary]}
              onPress={handlePasswordReset}
            >
              <Text style={styles.modalButtonText}>Redefinir Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  fullScreenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 1,
  },
  loginContainer: {
    ...CommonStyles.card,
    width: '90%',
    maxWidth: 400,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.bluePurple,
    marginHorizontal: 5,
  },
  userTypeButtonActive: {
    backgroundColor: Colors.bluePurple,
  },
  userTypeButtonText: {
    color: Colors.bluePurple,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.purple,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.veryLightPurple,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonPrimary: {
    backgroundColor: Colors.bluePurple,
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.lightPurple,
  },
  modalButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonTextSecondary: {
    color: Colors.bluePurple,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: Colors.bluePurple,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  userTypeButtonTextActive: {
    color: Colors.white,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.purple,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.veryLightPurple,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: Colors.veryLightPurple,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.darkGray,
  },
  eyeIcon: {
    padding: 10,
  },
  rememberForgotContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 14,
    color: Colors.purple,
  },
  checkboxX: {
    fontSize: 14,
    color: Colors.bluePurple,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.bluePurple,
    fontWeight: '600',
  },
  loginButton: {
    ...CommonStyles.button,
    width: '100%',
    height: 50,
    backgroundColor: Colors.bluePurple,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    ...CommonStyles.buttonText,
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.bluePurple,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
