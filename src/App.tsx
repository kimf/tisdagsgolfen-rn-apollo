import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import storage from './localStorage';
import client from './apolloClient';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import SeasonPicker from './screens/SeasonPicker';

export type RootParamList = {
  Seasons: {};
  Home: { seasonId: string };
  Events: {};
};

const Stack = createNativeStackNavigator<RootParamList>();

const App = () => {
  const [readyForStartup, setReadyForStartup] = React.useState(false);
  const [currentSeasonId, setCurrentSeasonId] = React.useState();

  React.useEffect(() => {
    const fetchCurrentSeason = async () => {
      // await storage.clearStorage();
      const csId = await storage.get('currentSeasonId');
      if (csId !== null) {
        setCurrentSeasonId(csId);
      }
      setReadyForStartup(true);
    };

    fetchCurrentSeason();
  }, []);

  if (!readyForStartup) {
    return null;
  }

  const initialState = currentSeasonId
    ? {
        index: 1,
        routes: [
          { name: 'Seasons' },
          {
            name: 'Home',
            params: {
              seasonId: currentSeasonId,
            },
          },
        ],
      }
    : null;

  return (
    <ApolloProvider client={client}>
      <NavigationContainer initialState={initialState}>
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
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Events"
            component={EventsScreen}
            options={{ title: 'Events' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
