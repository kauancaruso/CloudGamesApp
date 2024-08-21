import React from 'react';
import { FlatList, ScrollView, View, StyleSheet } from 'react-native';
import JogosCard from '../../componentes/JogosCard.js';

import jogos from '../../mocks/jogos.js';

export default function Jogos() {
    return (
        <View style={styles.container}>
            <FlatList
                data={jogos}
                renderItem={({ item }) => (
                    <JogosCard nome={item.nome} imagem={item.imagem} preco={item.preco} />
                )}
                keyExtractor={item => item.id}
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
    },
    flatListContent: {
        padding: 16,
    },
});
