import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Topo from './componentes/Topo'
import Detalhes from './componentes/Detalhes'
import Item from './componentes/Item'
import Texto from '../../componentes/Texto'
import { View } from 'react-native';

const styles = StyleSheet.create({
    titulo: {
      width: "100%",
      textAlign: "left",
      fontSize: 22,
      color: "#01426c",
      fontWeight: "bold",
      padding: 10,
    }
  });

export default function Produto({topo, detalhes, itens}){
    
    return <FlatList 
            data={itens.lista}
            renderItem={Item}
            keyExtractor={itens.lista.id}
            ListHeaderComponent={()=>{
                return <>
                    <Topo {...topo} />
                    <View>
                    <Detalhes {...detalhes} />
                    <Texto style={styles.titulo}>{itens.titulo}</Texto>
                    </View>
                </>
            }}
        />
}