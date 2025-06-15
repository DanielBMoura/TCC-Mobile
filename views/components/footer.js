// Importa os componentes básicos do React e React Native
import { View, Text } from 'react-native';
// Importa os estilos de um arquivo externo
import styles from '../styles/style';
// Importa ícones FontAwesome da biblioteca de ícones do Expo
import { FontAwesome } from '@expo/vector-icons';

// Define o componente Footer como export padrão
export default function Footer() {
  return (
    // Container principal do footer (usa estilo do arquivo externo)
    <View style={[styles.footerContainer]}>
      {/* Seção azul do footer (contatos) */}
      <View>
        {/* Título da seção de contato */}
        <Text style={styles.contactTitle}>Contato</Text>
        {/* Subtítulo da seção de contato */}
        <Text style={styles.contactSubtitle}>Suporte Administrativo</Text>

        {/* Container com as informações de contato */}
        <View style={styles.contactContainer}>
          {/* Ícone do WhatsApp */}
          <FontAwesome name="whatsapp" size={24} color="white" />
          {/* Número de telefone para WhatsApp */}
          <Text style={styles.contactText}>(11)11111-1111</Text>
          {/* Separador visual entre os contatos */}
          <View style={styles.separator} />
          {/* Ícone de telefone */}
          <FontAwesome name="phone" size={24} color="white" />
          {/* Número de telefone tradicional */}
          <Text style={styles.contactText}>(11)11111-1111</Text>
        </View>
      </View>

      {/* Seção branca inferior (rodapé do footer) */}
      <View style={styles.footerBottom}>
        {/* Texto de créditos/copyright */}
        <Text style={styles.footerText}>
          Desenvolvido por Grupo TechBit-MV -{' '}
        </Text>
        {/* Link/texto da política de privacidade */}
        <Text style={styles.privacyPolicy}>POLÍTICA DE PRIVACIDADE</Text>
      </View>
    </View>
  );
}