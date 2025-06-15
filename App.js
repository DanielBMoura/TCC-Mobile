import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/login';
// import Home from './views/home';
import Vendas from './views/vendas';
import User from './views/user';
import orcamento from './views/orcamentos';

const Stack = createStackNavigator();

// Exporta o componente principal (App) como padrão do arquivo
export default function App() {
  return (
    // Componente NavigationContainer (do React Navigation) que envolve toda a navegação
    <NavigationContainer>
      {/* 
        Stack.Navigator define o sistema de navegação em pilha (stack navigation)
        - initialRouteName="Login" define a tela inicial como "Login"
        - screenOptions={{ headerShown: false }} oculta o cabeçalho padrão em todas as telas 
      */}
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Define a tela de Login, associando o nome "Login" ao componente Login */}
        <Stack.Screen name="Login" component={Login} />
        
        {/* 
          Tela de Home comentada (não está ativa no momento)
          <Stack.Screen name="Home" component={Home} /> 
        */}
        
        {/* Define a tela de Vendas, associando o nome "Vendas" ao componente Vendas */}
        <Stack.Screen name="Vendas" component={Vendas} />
        
        {/* Define a tela de User, associando o nome "User" ao componente User */}
        <Stack.Screen name="User" component={User} />
        
        {/* Define a tela de orçamento, associando o nome "orcamento" ao componente orcamento */}
        <Stack.Screen name="orcamento" component={orcamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}