import React from 'react';
import { StyleSheet, Dimensions, Image, StatusBar, SafeAreaView} from 'react-native';

import Header from '../../../../assets/produtos/mw3.jpg'
import Texto from '../../../componentes/Texto' //Componente de Exibição de Texto

//Captura o tamanho da tela que está rodando o app
const width = Dimensions.get('screen').width;

export default function Topo({titulo}){
    return <SafeAreaView>
          <StatusBar />
          <Image source={Header} style={styles.topo} />
          <Texto style={styles.titulo}>{titulo}</Texto>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topo: {
      width: "100%",
      height: 1197 / 1600 * width,
    },
    titulo: {
      width: "105%",
      position: "absolute",
      textAlign: "right",
      fontSize: 22,
      color: "white",
      fontWeight: "bold",
<<<<<<< HEAD
      padding: 50,
=======
      padding: 30,
>>>>>>> 54d2ad2919d96b1d7fd4c4d1ac1588536f0c370a
    },
  });