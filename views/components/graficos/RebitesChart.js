import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Alert, View, Dimensions, Text, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const RebitesChart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/produtos-orcamentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })

        const responseData = await response.json()

        const formatarData = responseData.map((item, i) => ({
          name: `/ ${item.nome}`,
          population: parseInt(item.quantidade),
          color: `hsl(${(i * 360) / responseData.length}, 95%, 68%)`
        }))

        setData(formatarData)
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error)
      }
    }

    fetchProdutos()
  }, [])

  const totalPopulation = data.reduce((sum, item) => sum + item.population, 0)

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Produtos mais adicionados no carrinho</Text>
      <Text style={styles.totalValue}>Total: {totalPopulation}</Text>

      <PieChart
        data={data}
        width={screenWidth - 30}
        height={250}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    padding: 15,
    marginVertical: 20, // Maior espaçamento entre os gráficos
    marginHorizontal: 10,
    alignItems: 'center',
    marginBottom: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 17,
    marginBottom: 15,
  },
})


export default RebitesChart;
