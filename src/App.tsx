import React from 'react';
import { Platform, UIManager } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import client from './apolloClient';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import SeasonPicker from './screens/SeasonPicker';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationNativeContainer>
        <Stack.Navigator initialRouteName="Seasons">
          <Stack.Screen
            name="Seasons"
            component={SeasonPicker}
            options={{ title: 'Seasons' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Leaderboard',
            }}
          />
          <Stack.Screen
            name="Events"
            component={EventsScreen}
            options={{ title: 'Events' }}
          />
        </Stack.Navigator>
      </NavigationNativeContainer>
    </ApolloProvider>
  );
};

export default App;
