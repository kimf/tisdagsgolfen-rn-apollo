import React from 'react';
import { Platform, UIManager } from 'react-native';
import { useScreens } from 'react-native-screens';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import client from './apolloClient';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';

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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Banana' }}
          />
          <Stack.Screen
            name="Events"
            component={EventsScreen}
            options={{ title: 'Eventanados' }}
          />
        </Stack.Navigator>
      </NavigationNativeContainer>
    </ApolloProvider>
  );
};

export default App;
