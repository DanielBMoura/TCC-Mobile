import { useState } from 'react';
import { Alert, View, TextInput, Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import styles from "./styles/style";

// Define o componente Login como export padrão do arquivo
export default function Login({ navigation }) { 
  // Estado para controlar a visibilidade da senha (inicialmente oculta)
  const [showPassword, setShowPassword] = useState(false);
  
  // Estado para armazenar o email digitado (inicialmente vazio)
  const [email, setEmail] = useState('');
  
  // Estado para armazenar a senha digitada (inicialmente vazio)
  const [senha, setSenha] = useState('');

  // Função assíncrona para lidar com o processo de login
  const handleLogin = async () => {
    try {
      // Faz uma requisição POST para a rota de login da API
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }) // envia email e senha como JSON
      });
      // Converte a resposta para JSON
      const data = await response.json();
  
      // Se a resposta for bem-sucedida (status 200-299)
      if (response.ok) {
        // Navega para a tela 'Vendas'
        navigation.navigate('Vendas');
      } else {
        // Se houver erro, exibe alerta com a mensagem do servidor
        Alert.alert('Erro', data.mensagem);
      }
    } catch (error) {
      // Se ocorrer erro na conexão, exibe alerta genérico
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.containerLogin}>
        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={17} color="black" style={styles.icon} />
          <TextInput 
            placeholder="Digite seu Email" 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox value={showPassword} onValueChange={setShowPassword} />
          <Text>Mostrar senha</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ACESSAR</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
