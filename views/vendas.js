import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Navbar from './components/navbar';
import Footer from './components/footer';
import DoughnutChart from './components/graficos/DoughnutChart';
import RebitesChart from './components/graficos/RebitesChart';
import RebitadeirasChart from './components/graficos/RebitadeirasChart';

import styles from "./styles/style";

export default function Vendas() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textVendas}>Gráficos de Vendas!</Text>
          <Text style={styles.textVendas1}>Role para acompanhar suas vendas:</Text>
        </View>
        <DoughnutChart />
        <RebitesChart />
        <RebitadeirasChart />
        <Footer />
      </ScrollView>
    </View>
  );
} 
