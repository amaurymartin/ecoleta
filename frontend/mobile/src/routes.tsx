import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home/home';
import CollectionPointsIndex from './pages/collectionPoints/index/collectionPointsIndex';
import CollectionPointsShow from './pages/collectionPoints/show/collectionPointsShow';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#F0F0F5',
          },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen
          name="CollectionPointsIndex"
          component={CollectionPointsIndex}
        />
        <AppStack.Screen
          name="CollectionPointsShow"
          component={CollectionPointsShow}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
