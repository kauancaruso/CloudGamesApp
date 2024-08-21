import React from "react";
import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Video, ResizeMode, Audio } from "expo-av";

import Texto from '../../componentes/Texto';
import Styles from './estilos';

// Importando o arquivo de vídeo local
import videoFile from '../../../assets/Disco Elysium_ Final Cut Trailer _ Game Awards 2020.mp4';

export default function Index({ textos }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  React.useEffect(() => {
    // Configuração do áudio para garantir que o som seja reproduzido
    async function setAudioMode() {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true, // Garante que o som toque mesmo no modo silencioso no iOS
      });
    }
    setAudioMode();
  }, []);

  return (
    <ScrollView style={Styles.sobre}>
      <Image source={textos.logo} style={Styles.logo} resizeMode="contain" />
      <Texto style={Styles.textoSobre}>{textos.historia}</Texto>
      <Image source={textos.img_producao} style={Styles.fotoFitas} resizeMode="contain" />
      <Texto style={Styles.textoSobre}>{textos.texto_imagem}</Texto>

      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={videoFile}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    marginTop: 25
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
