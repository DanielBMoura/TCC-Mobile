import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Navbar from './components/navbar';
import Footer from './components/footer';
import styles from './styles/style'; // Importando os estilos
import React, { useState, useEffect } from 'react';

const BudgetScreen = () => {
  const [budgetItems, setBudgetItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [valor, setValor] = useState('');
  const [valorRaw, setValorRaw] = useState('')

  const formatarValor = (input) => {
    // Remove todos os caracteres não numéricos
    let numericValue = input.replace(/[^0-9]/g, '');
    
    // Converte para número e divide por 100 para obter decimais
    const number = parseFloat(numericValue) / 100;
    
    // Formata como moeda brasileira
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  const handleValorChange = (text) => {
    // Atualiza o valor bruto (sem formatação)
    const rawValue = text.replace(/[^0-9]/g, '');
    setValorRaw(rawValue);
    
    // Formata o valor para exibição
    const formattedValue = formatarValor(text);
    setValor(formattedValue);
  };

  useEffect(() => {
      const fetchOrcamentos = async () => {
        const response = await fetch('http://10.0.2.2:3000/orcamentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
  
        const responseData = await response.json()

        setBudgetItems(responseData)
        setLoading(false)
      }
  
      fetchOrcamentos();
    }, [])

  const confirmarAcao = (acao, item) => {
    if (acao === 'Aprovar') {
      setSelectedItem(item);
      setModalVisible(true);
    } else {
      Alert.alert(
        `Confirmar ${acao}?`,
        `Tem certeza que deseja ${acao.toLowerCase()} o orçamento de ${item.nome_usuario}?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Confirmar", onPress: () => handleAcao(acao, item) }
        ]
      );
    }
  };

  const handleAprovarComValor = () => {
    if (!valor) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }
    
    setModalVisible(false);
    Alert.alert(
      'Confirmar Aprovação?',
      `Tem certeza que deseja aprovar o orçamento de ${selectedItem.nome_usuario} com o valor R$ ${valor}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            handleAcao('Aprovar', {...selectedItem, valor: valor});
            setValor('');
          }
        }
      ]
    );
  };

  const handleAcao = async (acao, item) => {
    const valorNumerico = parseFloat(valorRaw) / 100;

    const response = await fetch('http://10.0.2.2:3000/AprovarRecusar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_orcamento: item.id_orcamento,
        acao: acao,
        valor: valorNumerico.toString(),
        id_usuario: item.id_usuario,
        itens: item.itens
      })
    })

    const data = await response.json()

    Alert.alert('Sucesso', `Orçamento ${data.acao} com sucesso!`, [
      { 
        text: 'OK', 
        onPress: () => {
          setBudgetItems(prev => 
            prev.filter(orc => orc.id_orcamento !== item.id_orcamento)
          )
        }
      }
    ])
  };

  return (
    <View style={{ flex: 1 }}>
      <Navbar />

      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.header}>Role para aprovar ou recusar orçamentos</Text>
          {budgetItems.map((item) => (
            <View key={item.id_orcamento} style={styles.card}>
              <Text style={styles.title}>{item.nome_usuario}:</Text>

                {item.itens.map((produto, index) => (
                  <Text key={index} style={styles.detail}>
                    {produto.nome_produto}: {produto.quantidade}x
                  </Text>
                ))}

              <Text style={styles.date}>
                { new Date(item.data_orcamento).toLocaleString('pt-BR')}
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.approveButton} 
                  onPress={() => confirmarAcao('Aprovar', item)}
                >
                  <FontAwesome name="check" size={16} color="white" />
                  <Text style={styles.buttonText}> Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.rejectButton} 
                  onPress={() => confirmarAcao('Recusar', item)}
                >
                  <FontAwesome name="times" size={16} color="white" />
                  <Text style={styles.buttonText}> Recusar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setValor('');
          setValorRaw('');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Informe o valor do orçamento:</Text>
            
            <TextInput
              style={styles.inputValor}
              onChangeText={handleValorChange}
              value={valor}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              returnKeyType="done"
            />
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setValor('');
                  setValorRaw('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAprovarComValor}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
};

export default BudgetScreen;
