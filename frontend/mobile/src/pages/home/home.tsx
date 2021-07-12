import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import ibge from '../../services/ibge';

interface IbGEUFResponse {
  sigla: string;
  nome: string;
}

const Home = () => {
  const [brazilianStates, setBrazilianStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('0');

  const [brazilianStateCities, setBrazilianStateCities] = useState<string[]>(
    []
  );
  const [selectedCity, setSelectedCity] = useState<string>('0');

  const navigation = useNavigation();

  function navigateToCollectionPointsIndex() {
    navigation.navigate('CollectionPointsIndex', {
      state: selectedState,
      city: selectedCity,
    });
  }

  useEffect(() => {
    ibge
      .get<IbGEUFResponse[]>('localidades/estados?orderBy=nome')
      .then((res) => {
        setBrazilianStates(res.data.map((state) => state.sigla));
      });
  }, []);

  useEffect(() => {
    if (selectedState === '0') return;

    ibge
      .get<IbGEUFResponse[]>(
        `localidades/estados/${selectedState}/municipios?orderBy=nome`
      )
      .then((res) => {
        setBrazilianStateCities(res.data.map((city) => city.nome));
      });
  }, [selectedState]);

  function selectState(stateName: string) {
    setSelectedState(stateName);
  }

  function selectCity(stateCityName: string) {
    setSelectedCity(stateCityName);
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Your collection points marketplace</Text>
        <Text style={styles.description}>
          We help people to find collection points efficiently
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          style={Pickerselect}
          placeholder={{ label: 'Select your state', value: '0' }}
          onValueChange={(value: string) => selectState(value)}
          items={brazilianStates.map((stateName) => ({
            label: stateName,
            value: stateName,
          }))}
        />
        <RNPickerSelect
          style={Pickerselect}
          placeholder={{ label: 'Select your city', value: '0' }}
          onValueChange={(value: string) => selectCity(value)}
          items={brazilianStateCities.map((cityName) => ({
            label: cityName,
            value: cityName,
          }))}
          disabled={selectedState === '0'}
        />

        <RectButton
          style={styles.button}
          onPress={navigateToCollectionPointsIndex}
          enabled={selectedState !== '0' && selectedCity !== '0'}
        >
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24}></Icon>
          </View>
          <Text style={styles.buttonText}>See collection points</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

const Pickerselect = {
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
};

export default Home;
