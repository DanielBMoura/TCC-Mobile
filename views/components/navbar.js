import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/style';
import AlterarInformacoes from '../user';
import { AsyncStorage } from 'react-native';

export default function Navbar() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {

    const response = await fetch('http://10.0.2.2:3000/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    const data = await response.json()

    // Fechar o menu
    setMenuVisible(false);
    
    // Navegar para a tela de login
    navigation.navigate('Login');

  };

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View style={styles.navbar}>
        {/* Logo que leva para a Home */}
        <TouchableOpacity onPress={() => navigation.navigate('Vendas')}>
          <Image source={require('../images/Techbit_mv.png')} style={styles.logo} />
        </TouchableOpacity>

        {/* Ícones de navegação */}
        <View style={styles.iconContainer}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <FontAwesome name="home" size={30} color="white" />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => navigation.navigate('Vendas')}>
            <FontAwesome name="bar-chart" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('orcamento')}>
            <FontAwesome name="money" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <FontAwesome name="user" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Menu do usuário */}
        {menuVisible && (
          <View style={styles.userMenu}>
            <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.menuItem}>
              <Text style={styles.menuText}>Gerenciar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Text style={styles.menuText}>Sair</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
