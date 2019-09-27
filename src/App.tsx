import React from 'react';
import { Platform, UIManager } from 'react-native';
import { useScreens } from 'react-native-screens';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import client from './apolloClient';
import HomeScreen from './screens/Home';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

useScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationNativeContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationNativeContainer>
    </ApolloProvider>
  );
};

export default App;
