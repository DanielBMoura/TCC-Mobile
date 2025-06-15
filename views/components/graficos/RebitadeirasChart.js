import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Alert, View, Dimensions, Text, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const RebitadeirasChart = () => {
  const [data, setData] = useState([])

  const diasDaSemana = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ]

  useEffect(() => {
      const fetchProdutos = async () => {
        try {
          const response = await fetch('http://10.0.2.2:3000/produtos-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          })
  
          const responseData = await response.json()
          console.log(responseData)
  
          const formatarData = responseData.map((item, i) => ({
            name: diasDaSemana[item.diaSemana - 1],
            population: parseInt(item.totalOrcamentos),
            color: `hsl(${(i * 360) / responseData.length}, 95%, 68%)`
          }))
  
          setData(formatarData)
        } catch (error) {
          console.error('Erro ao buscar os produtos:', error)
        }
      }
  
      fetchProdutos()
    }, [])

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Datas que mais fizeram orçamentos</Text>
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


export default RebitadeirasChart;
