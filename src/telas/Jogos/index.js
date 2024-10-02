import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import JogosCard from '../../componentes/JogosCard'; // Certifique-se de que o caminho está correto
import jogos from '../../mocks/jogos'; // Importando os dados dos jogos do arquivo mocks

// Obtenha a largura da tela para calcular o tamanho do card
const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // Calcula a largura do card com margens

export default function Jogos() {
    return (
        <View style={styles.container}>
            <FlatList
                data={jogos} // Usando os dados dos jogos
                renderItem={({ item }) => (
                    <JogosCard
                        id={item.id} // Adiciona o ID corretamente
                        nome={item.nome}
                        imagem={item.imagem}
                        preco={item.preco}
                        cardStyle={styles.card} // Passar o estilo de card como prop
                    />
                )}
                keyExtractor={item => item.id.toString()} // Usando o ID como chave única
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        padding: 8, // Ajusta o padding externo
    },
    flatListContent: {
        justifyContent: 'space-between', // Para distribuir os itens
    },
    card: {
        width: cardWidth, // Define a largura do card
        backgroundColor: '#fff',
        margin: 8, // Define o espaçamento entre os cards
        borderRadius: 10, // Bordas arredondadas para os cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4, // Sombra para Android
    },
});
