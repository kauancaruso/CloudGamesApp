import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Importa o hook useFocusEffect

const ListaDesejos = () => {
    const [wishlist, setWishlist] = useState([]);

    // Carrega a lista de desejos do AsyncStorage
    const loadWishlist = async () => {
        try {
            const wishlistData = await AsyncStorage.getItem('wishlist');
            if (wishlistData) {
                const parsedWishlist = JSON.parse(wishlistData);
                console.log('Itens carregados do AsyncStorage:', parsedWishlist); // Verifique os itens carregados
                setWishlist(parsedWishlist); // Define os itens no estado
            } else {
                setWishlist([]); // Define uma lista vazia caso não haja dados
            }
        } catch (error) {
            console.error('Erro ao carregar lista de desejos:', error);
        }
    };

    // useFocusEffect é chamado sempre que a tela ganha foco (volta a ser visível)
    useFocusEffect(
        useCallback(() => {
            loadWishlist(); // Recarrega a lista de desejos quando a tela está em foco
        }, [])
    );

    // Função para remover um item da lista de desejos
    const removeItem = async (id) => {
        try {
            const updatedWishlist = wishlist.filter(item => item.id !== id); // Remove o item com o ID
            await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishlist(updatedWishlist); // Atualiza o estado
            console.log('Item removido:', id);
        } catch (error) {
            console.error('Erro ao remover item:', error);
        }
    };

    // Renderiza os itens da lista de desejos
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>{item.preco}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {wishlist.length === 0 ? (
                <Text style={styles.emptyMessage}>Sua lista de desejos está vazia.</Text>
            ) : (
                <FlatList
                    data={wishlist}
                    keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())} // Verifica o ID e evita erro
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F2F2F2',
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
    },
    removeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ce3304',
        borderRadius: 5,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default ListaDesejos;
