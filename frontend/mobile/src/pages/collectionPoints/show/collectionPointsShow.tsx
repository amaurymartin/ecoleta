import React, { useState, useEffect } from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Feather, FontAwesome } from '@expo/vector-icons';

import api from '../../../services/api';

type CollectionPointsShowParams = {
  CollectionPoint: {
    collectionPointKey: string;
  };
};

interface Recyclable {
  id: number;
  description: string;
  imageUri: string;
}

type CollectionPoint = {
  key: string;
  name: string;
  nickname: string;
  imageUri: string;
  email: string;
  whatsapp: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
  };
  recyclables: Recyclable[];
};
interface CollectionPointsShowResponse {
  collectionPoint: CollectionPoint;
}
const CollectionPointsShow = () => {
  const navigation = useNavigation();

  const route =
    useRoute<RouteProp<CollectionPointsShowParams, 'CollectionPoint'>>();
  const collectionPointKey = route.params.collectionPointKey;

  const [collectionPoint, setCollectionPoint] =
    useState<CollectionPoint>(Object);

  function navigateBack() {
    navigation.goBack();
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${collectionPoint.whatsapp}`);
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: '',
      recipients: [collectionPoint.email],
    });
  }

  useEffect(() => {
    api
      .get<CollectionPointsShowResponse>(
        `collection-points/${collectionPointKey}`
      )
      .then((res) => {
        setCollectionPoint(res.data.collectionPoint);
      });
    // async function getCollectionPoint() {
    //   await api
    //     .get<CollectionPointsShowResponse>(
    //       `collection-points/${collectionPointKey}`
    //     )
    //     .then((res) => {
    //       setCollectionPoint(res.data.collectionPoint);
    //     });
    // }

    // getCollectionPoint();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Object.keys(collectionPoint).length !== 0 && (
        <>
          <View style={styles.container}>
            <TouchableOpacity onPress={navigateBack}>
              <Feather name="arrow-left" color="#34CB79" size={20} />
            </TouchableOpacity>

            <Image
              style={styles.collectionPointImage}
              source={{
                uri: collectionPoint.imageUri,
              }}
            />

            <Text style={styles.collectionPointName}>
              {collectionPoint.name}
            </Text>
            <Text style={styles.collectionPointRecyclables}>
              {collectionPoint.recyclables
                .map((recyclable) => recyclable.description)
                .join(', ')}
            </Text>

            <View style={styles.collectionPointAddress}>
              <Text style={styles.addressStreet}>
                {[
                  collectionPoint.address.street,
                  collectionPoint.address.number,
                  collectionPoint.address.complement,
                ].join(', ')}
              </Text>
              <Text style={styles.addressContent}>
                {[
                  collectionPoint.address.city,
                  collectionPoint.address.state,
                ].join(', ')}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <RectButton style={styles.button} onPress={sendWhatsapp}>
              <FontAwesome name="whatsapp" color="#FFF" size={20} />
              <Text style={styles.buttonText}>Whatsapp</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={sendEmail}>
              <Feather name="mail" color="#FFF" size={20} />
              <Text style={styles.buttonText}>Email</Text>
            </RectButton>
          </View>
        </>
      )}
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
    textAlign: 'center',
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
