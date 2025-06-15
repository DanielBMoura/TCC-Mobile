// Importa o componente StyleSheet do React Native para criar estilos
import { StyleSheet } from "react-native";

// Cria um objeto de estilos usando StyleSheet.create
const styles = StyleSheet.create({
  // Estilo para um container principal
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    justifyContent: "center", // Centraliza verticalmente os itens filhos
    alignItems: "center", // Centraliza horizontalmente os itens filhos
  },

  // Estilo para textos
  text: {
    fontSize: 20, // Tamanho da fonte
    color: "#fff", // Cor do texto (branco)
  },

  // Estilo para telas (screens)
  screen: {
    flex: 1, // Ocupa todo o espaço disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#f5f5f5', // Cor de fundo (cinza claro)
  },
  
  containerLogin: {
    width: 350,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#2176d3',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'flex-start',
    gap: "5"
  },
  button: {
    backgroundColor: '#2176d3',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  //NAVBAR

  navbar: {
    paddingTop: "45",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00BFFF',
    padding: 10,
    paddingRight: 25,
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 40,
    marginEnd: '10'
  },

  userMenu: {
    position: 'absolute',
    right: 10,
    top: 95,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
  },

  menuText: {
    fontSize: 16,
    color: '#333',
  },

  // rodapé

  footerContainer: {
    backgroundColor: '#003366',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
  },

  contactTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactSubtitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    color: 'white',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  footerBottom: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 12,
  },
  privacyPolicy: {
    color: '#ffcc00',
  },

  // vendas

  vendas: {
    flex: 1,
  },

  textVendas: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  textVendas1: {
    textAlign: 'center',
    margin: 10,
    fontSize: 17,
    margin: 10
  },
  textContainer: {
    backgroundColor: '#d3d3d3',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20, 
    marginTop: 25,
    width: '95%',
    alignSelf: 'center',
  },



  // usuario

  containerUser: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },

  // TELA USER
  userContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  titleContainer: {
    flexDirection: 'row',  // Alinha o ícone e o texto lado a lado
    alignItems: 'center',  // Alinha verticalmente o ícone e o texto
    marginBottom: 10,
    gap: 10
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,  // Espaço entre o ícone e o título
  },
  userInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },

  // orçamento

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 25,
    width: '95%',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  detail: {
    fontSize: 14,
  },
  date: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  approveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50', // Cor de fundo verde
    paddingVertical: 12, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento horizontal
    borderRadius: 25, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto dentro do botão
    justifyContent: 'center', // Garante que o texto fique centralizado
    marginTop: 20, // Espaço entre o botão e os campos
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS
    shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
  },
  saveButtonText: {
    color: '#fff', // Cor do texto branco
    fontSize: 16, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
    textAlign: 'center', // Centraliza o texto
  },
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  width: '80%',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
},
inputValor: {
  height: 40,
  width: '100%',
  margin: 12,
  borderWidth: 1,
  padding: 10,
  borderRadius: 5,
  borderColor: '#ccc',
},
modalButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
modalButton: {
  borderRadius: 5,
  padding: 10,
  elevation: 2,
  width: '48%',
},
cancelButton: {
  backgroundColor: '#dc3545',
},
confirmButton: {
  backgroundColor: '#28a745',
},
modalButtonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
});


export default styles;