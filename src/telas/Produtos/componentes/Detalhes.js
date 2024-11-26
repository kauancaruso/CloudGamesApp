import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage
import Texto from '../../../componentes/Texto'; // Corrigido o caminho
import produto from '../../../mocks/produto'; // Importe os detalhes do produto

export default function DetalhesPacote() {
  const [wishlist, setWishlist] = useState([]);
  const [image, setImage] = useState(produto.detalhes.logo); // Imagem do produto
  const { nome, detalhes, preco, botao } = produto.detalhes;

  // Adiciona o pacote à lista de desejos
  const addToWishlist = async () => {
    try {
      const currentWishlist = await AsyncStorage.getItem('wishlist');
      const parsedWishlist = currentWishlist ? JSON.parse(currentWishlist) : [];
      const updatedWishlist = [
        ...parsedWishlist,
        { id: Math.random().toString(), nome, preco }, // Adiciona um novo item com ID único
      ];
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      Alert.alert('Sucesso', 'Pacote adicionado à lista de desejos!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar à lista de desejos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Texto style={styles.title}>{nome}</Texto>
      <Texto style={styles.details}>{detalhes}</Texto>
      <Texto style={styles.price}>{preco}</Texto>
      <TouchableOpacity style={styles.button} onPress={addToWishlist}>
        <Texto style={styles.buttonText}>{botao}</Texto>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F2F2F2',
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#01426c',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#01426c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
