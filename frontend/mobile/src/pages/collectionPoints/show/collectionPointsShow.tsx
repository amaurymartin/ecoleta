import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome } from '@expo/vector-icons';

const CollectionPointsShow = () => {
  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" color="#34CB79" size={20} />
        </TouchableOpacity>

        <Image
          style={styles.collectionPointImage}
          source={{
            uri: 'https://unsplash.com/photos/D6Tu_L3chLE/download?force=true&w=640',
          }}
        />

        <Text style={styles.collectionPointName}>{`Corner's market`}</Text>

        <Text style={styles.collectionPointRecyclables}>Lamps, Oil</Text>

        <View style={styles.collectionPointAddress}>
          <Text style={styles.addressStreet}>Rua 1234. n 5678</Text>
          <Text style={styles.addressContent}>Fortaleza, Ceará</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" color="#FFF" size={20} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={() => {}}>
          <Feather name="mail" color="#FFF" size={20} />
          <Text style={styles.buttonText}>Email</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  collectionPointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  collectionPointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    textAlign: 'center',
  },

  collectionPointRecyclables: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
  },

  collectionPointAddress: {
    marginTop: 32,
  },

  addressStreet: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
  },
});

export default CollectionPointsShow;
