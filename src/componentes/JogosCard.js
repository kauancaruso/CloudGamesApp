import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function JogosCard({ nome, imagem, preco }) {
    return (
        <Card style={styles.card}>
            <Card.Cover source={imagem} style={styles.imagem} />
            <Card.Content>
                <Title style={styles.nome}>{nome}</Title>
                <Paragraph style={styles.preco}>{preco}</Paragraph>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 8
    },
    imagem: {
        height: 75,
        resizeMode: 'contain',
    },
    nome: {
        fontSize: 18,
        marginTop: 8,
    },
    preco: {
        fontSize: 16,
        color: '#888',
        marginTop: 4,
    },
});
