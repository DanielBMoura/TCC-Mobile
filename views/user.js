import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importando o FontAwesome
import Navbar from './components/navbar';
import Footer from './components/footer'; // Importando o Footer
import styles from './styles/style'; // Importando os estilos

export default function User() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsuario] = useState('');
  const [telefoneFormatado, setTelefoneFormatado] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [usuario, setUsuario] = useState(null);

  const formatarTelefone = (telefone) => {
    // Remove todos os caracteres não numéricos
    const numeros = telefone.replace(/\D/g, '');
    
    // Aplica a formatação conforme o tamanho do número
  if (numeros.length <= 2) {
      return `(${numeros}`;
    } else if (numeros.length <= 6) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length <= 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    } else {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }
  };

  const handleTelefoneChange = (text) => {
    const formatado = formatarTelefone(text);
    setTelefoneFormatado(formatado);
    // Armazena apenas os números no estado telefoneUsuario
    setTelefoneUsuario(text.replace(/\D/g, ''));
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await fetch('http://10.0.2.2:3000/Usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })

      const responseData = await response.json()
    
      setUsuario(responseData)

      if (responseData) {
        setNomeUsuario(responseData.nome_usuario);
        setEmailUsuario(responseData.email_usuario);
        setTelefoneFormatado(formatarTelefone(responseData.telefone_usuario || ''));
        setTelefoneUsuario(responseData.telefone_usuario);
        // setSenhaUsuario(responseData.senha_usuario);
        setIdUsuario(responseData.id_usuario);
      }
    }

    fetchUsuarios()
  }, [])

  const handleSave = async () => {
    // Lógica para salvar as alterações, por exemplo, enviar ao backend
    const updatedUsuario = {
      id_usuario: idUsuario,
      nome_usuario: nomeUsuario,
      email_usuario: emailUsuario,
      telefone_usuario: telefoneUsuario,
      senha_usuario: senhaUsuario
    };

    const response = await fetch('http://10.0.2.2:3000/AlterarUsuario', {
      method: 'POST', // ou 'PATCH' se for uma atualização parcial
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUsuario),
    })

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Sucesso', data.mensagem);
    } else {
      Alert.alert('Erro', data.mensagem || 'Erro ao atualizar usuário');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView style={styles.userContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.userTitle}>Alterar Informações de Perfil</Text>
          {/* Ícone de lápis com onPress para alternar entre editar e não editar */}
          {/* <TouchableOpacity onPress={toggleEdit}>
            <FontAwesome name="pencil" size={20} color="#000" />
          </TouchableOpacity> */}
        </View>

        {/* Campos de entrada com base no estado de edição */}
        <TextInput
            style={styles.userInput}
            value={nomeUsuario}
            onChangeText={setNomeUsuario} // Atualiza o estado quando o texto mudar
            placeholder="Nome de usuário"
        />
        <TextInput
            style={styles.userInput}
            value={emailUsuario}
            onChangeText={setEmailUsuario}
            placeholder="E-mail"
        />
        <TextInput
            style={styles.userInput}
            value={telefoneFormatado}
            onChangeText={handleTelefoneChange}
            placeholder="Telefone"
            keyboardType="phone-pad"
            maxLength={15}
        />
        <TextInput
            style={styles.userInput}
            value={senhaUsuario}
            onChangeText={setSenhaUsuario}
            placeholder="Senha"
            secureTextEntry // Pode ser útil para esconder a senha
        />
        {/* Botão para salvar alterações */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

      </ScrollView>
      <Footer />
    </View>
  );
}
