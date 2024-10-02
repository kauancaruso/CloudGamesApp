import React, { useState, useEffect } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JogosCard({ id, nome, imagem, preco }) {
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        checkIfInWishlist();
    }, []);

    // Verifica se o item já está na lista de desejos usando o ID
    const checkIfInWishlist = async () => {
        try {
            const wishlist = await AsyncStorage.getItem('wishlist');
            const parsedWishlist = wishlist ? JSON.parse(wishlist) : [];
            const isInList = parsedWishlist.some(item => item.id === id); // Verifica se o ID já está na lista
            setIsInWishlist(isInList); // Atualiza o estado para definir a estrela
            console.log("Verificando se está na lista de desejos:", id, isInList);
        } catch (error) {
            console.error('Erro ao verificar se o item está na lista de desejos:', error);
        }
    };

    // Função para adicionar/remover da lista de desejos
    const toggleWishlist = async () => {
        try {
            const wishlist = await AsyncStorage.getItem('wishlist');
            const parsedWishlist = wishlist ? JSON.parse(wishlist) : [];
            let updatedWishlist;

            if (isInWishlist) {
                // Remove o item da lista de desejos
                updatedWishlist = parsedWishlist.filter(item => item.id !== id);
                console.log('Item removido da lista de desejos:', id);
            } else {
                // Adiciona o item à lista de desejos
                updatedWishlist = [...parsedWishlist, { id, nome, imagem, preco }];
                console.log('Item adicionado à lista de desejos:', { id, nome, imagem, preco });
            }

            // Atualiza o AsyncStorage
            await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsInWishlist(!isInWishlist); // Atualiza o estado da estrela
            console.log('Lista de desejos atualizada:', updatedWishlist);
        } catch (error) {
            console.error('Erro ao adicionar/remover item da lista de desejos:', error);
        }
    };

    return (
        <Card style={styles.card}>
            <Card.Cover source={imagem} style={styles.imagem} />
            <Card.Content>
                <Title style={styles.nome}>{nome}</Title>
                <View style={styles.precoContainer}>
                    <Paragraph style={styles.preco}>{preco}</Paragraph>
                    <TouchableOpacity onPress={toggleWishlist}>
                        <Ionicons
                            name={isInWishlist ? "star" : "star-outline"} // Exibe a estrela preenchida ou vazia
                            size={20}
                            color={isInWishlist ? "gold" : "gray"} // Define a cor conforme o estado
                        />
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
    },
    imagem: {
        height: 75,
        resizeMode: 'contain',
    },
    nome: {
        fontSize: 18,
        marginTop: 8,
    },
    precoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    preco: {
        fontSize: 16,
        color: '#888',
        marginRight: 8,
    },
});
