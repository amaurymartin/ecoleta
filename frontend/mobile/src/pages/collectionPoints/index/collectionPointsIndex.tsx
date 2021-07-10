import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import api from '../../../services/api';

interface RecyclingTypes {
  id: number;
  description: string;
  image_url: string;
}

const CollectionPointsIndex = () => {
  const [recyclingTypes, setRecyclingTypes] = useState<RecyclingTypes[]>([]);
  const [selectedRecyclingTypes, setSelectedRecyclingTypes] = useState<
    number[]
  >([]);
  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToCollectionPointsShow() {
    navigation.navigate('CollectionPointsShow');
  }

  function selectRecyclingType(recyclingTypeId: number) {
    if (selectedRecyclingTypes.includes(recyclingTypeId)) {
      setSelectedRecyclingTypes(
        selectedRecyclingTypes.filter(
          (recyclabe) => recyclabe !== recyclingTypeId
        )
      );
    } else {
      setSelectedRecyclingTypes([...selectedRecyclingTypes, recyclingTypeId]);
    }
  }

  useEffect(() => {
    api.get('recycling-types').then((res) => {
      setRecyclingTypes(res.data);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateBack}>
          <Icon name="arrow-left" color="#34CB79" size={20} />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Find a collection point in the map</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -3.7436121,
              longitude: -38.5194538,
              latitudeDelta: 0.042,
              longitudeDelta: 0.042,
            }}
          >
            <Marker
              style={styles.mapMarker}
              coordinate={{ latitude: -3.7436121, longitude: -38.5194538 }}
              onPress={navigateToCollectionPointsShow}
            >
              <View style={styles.mapMarkerContainer}>
                <Image
                  style={styles.mapMarkerImage}
                  source={{
                    // TODO: get image_uri from api
                    uri: 'https://unsplash.com/photos/D6Tu_L3chLE/download?force=true&w=640',
                  }}
                />
                <Text style={styles.mapMarkerDescription}>Market</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>
      <View style={styles.recyclableTypesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {recyclingTypes.map((recyclingType) => (
            <TouchableOpacity
              style={[
                styles.recyclableType,
                selectedRecyclingTypes.includes(recyclingType.id)
                  ? styles.selectedRecyclableType
                  : {},
              ]}
              onPress={() => selectRecyclingType(recyclingType.id)}
              key={String(recyclingType.id)}
              activeOpacity={0.6}
            >
              <SvgUri height={42} width={42} uri={recyclingType.image_url} />
              <Text style={styles.recyclableTypeDescription}>
                {recyclingType.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  subtitle: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerDescription: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  recyclableTypesContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  recyclableType: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 110,
    width: 110,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedRecyclableType: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  recyclableTypeDescription: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default CollectionPointsIndex;
