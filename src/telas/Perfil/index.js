import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Image, TouchableOpacity, Text, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Texto from '../../componentes/Texto';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const buscarEndereco = async (cep) => {
    const cleanedCep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cleanedCep.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = await response.json();
        if (data.erro) {
          Alert.alert('Erro', 'CEP inválido. Verifique e tente novamente.');
          setEndereco('');
        } else {
          setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar o endereço.');
        setEndereco('');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCadastro = () => {
    if (nome && email && senha && numero) {
      Alert.alert(
        'Cadastro realizado com sucesso!',
        `Nome: ${nome}\nEmail: ${email}\nEndereço: ${endereco}, ${numero} - ${complemento || ''}`
      );
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Texto style={styles.permissionText}>Acesso à câmera foi negado.</Texto>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Texto style={styles.placeholderText}>Tire uma foto</Texto>
            </View>
          )}
        </TouchableOpacity>

        <Texto style={styles.label}>Nome</Texto>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Texto style={styles.label}>CEP</Texto>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CEP"
          value={cep}
          onChangeText={(value) => {
            setCep(value);
            buscarEndereco(value);
          }}
          keyboardType="numeric"
          maxLength={9}
        />

        {loading ? (
          <ActivityIndicator size="small" color="#01426c" />
        ) : (
          endereco && (
            <>
              <Texto style={styles.label}>Endereço: {endereco}</Texto>

              <Texto style={styles.label}>Número</Texto>
              <TextInput
                style={styles.input}
                placeholder="Digite o número"
                value={numero}
                onChangeText={setNumero}
                keyboardType="numeric"
              />

              <Texto style={styles.label}>Complemento</Texto>
              <TextInput
                style={styles.input}
                placeholder="Digite o complemento (opcional)"
                value={complemento}
                onChangeText={setComplemento}
              />
            </>
          )
        )}

        <Texto style={styles.label}>Email</Texto>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Texto style={styles.label}>Senha</Texto>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          keyboardType="numeric"
          secureTextEntry
          maxLength={6}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scrollContainer: {
    padding: 16,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: '#01426c',
  },
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: '#01426c',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    color: '#01426c',
    fontFamily: 'SpaceGBold',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'SpaceGBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontFamily: 'SpaceGRegular',
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
    fontFamily: 'SpaceGBold',
  },
  permissionText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    fontFamily: 'SpaceGRegular',
  },
});
