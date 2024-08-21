import React, { useState, useEffect } from 'react';
import { useFonts, SpaceGrotesk_300Light, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Audio } from 'expo-av';

import Produto from './src/telas/Produtos/';
import mock from './src/mocks/produto';

import Sobre from './src/telas/Sobre';
import mock_sobre from './src/mocks/sobre';

import Jogos from './src/telas/Jogos';
import mock_jogos from './src/mocks/jogos';
import Texto from './src/componentes/Texto';

function MenuKit() {
  return <Produto {...mock} />;
}

function MenuSobre() {
  return <Sobre {...mock_sobre} />;
}

function MenuAudio() {
  const [audioStatus, setAudioStatus] = useState(false);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      console.log('status', audioStatus);
      if (audioStatus) {
        setLoading(true);
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/sounds/toque para celular, GTA San Andreas, Mp3.mp3')
        );
        setSound(sound);
        try {
          await sound.playAsync();
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      } else {
        if (sound) {
          try {
            await sound.stopAsync();
            await sound.unloadAsync();
          } catch (e) {
            console.log(e);
          }
        }
      }
    })();
  }, [audioStatus]);

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity
        style={styles.audioButton}
        onPress={() => {
          if (!loading) {
            setAudioStatus(!audioStatus);
          }
        }}>
        <Texto style={styles.audioButtonText}>ON/OFF</Texto>
      </TouchableOpacity>
    </View>
  );
}

function MenuJogos() {
  return <Jogos {...mock_jogos} />;
}

const Tab = createBottomTabNavigator();

function TabsMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Pacote') {
            iconName = focused ? 'basket' : 'basket-outline';
          } else if (route.name === 'Sobre nós') {
            iconName = focused ? 'bulb' : 'bulb-outline';
          } else if (route.name === 'Produtos') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Lista de Desejos') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#01426c',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}>
      <Tab.Screen name="Pacote" component={MenuKit} />
      <Tab.Screen name="Sobre nós" component={MenuSobre} />
      <Tab.Screen name="Produtos" component={MenuJogos} />
      <Tab.Screen name="Lista de Desejos" component={MenuKit} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  audioContainer: {
    position: 'absolute',
    bottom: "10%", // Ajuste este valor para posicionar o botão mais alto ou mais baixo
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioButton: {
    backgroundColor: '#ce3304',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000', // Cor da sombra (normalmente preto)
    shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
    shadowOpacity: 0.7, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 5, // Propriedade específica para Android (aumenta a altura da sombra)
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'SpaceGBold',
  },
});


export default function App() {
  // Carrega a fonte para o projeto
  const [fonteCarregada] = useFonts({
    SpaceGRegular: SpaceGrotesk_300Light,
    SpaceGBold: SpaceGrotesk_700Bold,
  });

  // Checa se as fontes já foram carregadas
  if (!fonteCarregada) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <TabsMenu />
      <MenuAudio />
    </NavigationContainer>
  );
}
