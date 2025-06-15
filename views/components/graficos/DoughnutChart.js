import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa os ícones do Expo

const screenWidth = Dimensions.get('window').width;

const DoughnutChart = () => {
  const [chartData, setChartData] = useState([])
  const [totalVendas, setTotalVendas] = useState(0)
  const [loading, setLoading] = useState(true)

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  useEffect(() => {
    const fetchVendasData = async () => {
      const response = await fetch('http://10.0.2.2:3000/vendas-gerais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const responseData = await response.json()

      setTotalVendas(responseData.valor_total_vendas)

      const formattedData = responseData.produtos_mais_vendidos.map((item) => ({
        name: item.nome_produto,
        population: item.quantidade_vendida,
        color: getRandomColor(),
        legendFontColor: '#333',
        legendFontSize: 12
      }));

      setChartData(formattedData);
      setLoading(false);

    }

    fetchVendasData();
  }, [])

  const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return (
      <View style={styles.chartContainer}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Vendas Gerais</Text>

      <View style={styles.valueContainer}>
        <Text style={styles.totalValue}>
          Ganho total: {formatarValor(totalVendas)}
        </Text>

        {/* <TouchableOpacity onPress={() => setShowValue(!showValue)}>
          <Ionicons name={showValue ? 'eye' : 'eye-off'} size={24} color="#333" />
        </TouchableOpacity> */}
      </View>

      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={screenWidth - 30}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={styles.noDataText}>Nenhum dado de venda disponível</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    marginBottom: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
  },
});

export default DoughnutChart;
