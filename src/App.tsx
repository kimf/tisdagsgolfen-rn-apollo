import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import storage from './localStorage';
import client from './apolloClient';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import PlayScreen from './screens/Play';
import SeasonPicker from './screens/SeasonPicker';

export type RootParamList = {
  Seasons: {};
  Home: { seasonId: string };
  Events: {};
  Play: { eventId?: string };
};

const Stack = createNativeStackNavigator<RootParamList>();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'noCurrentSeasonId': {
      return {
        ...state,
        currentSeasonId: null,
        readyForStartup: true,
      };
    }

    case 'haveCurrentSeasonId': {
      return {
        ...state,
        currentSeasonId: action.currentSeasonId,
        readyForStartup: true,
      };
    }
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(appReducer, {
    readyForStartup: false,
    currentSeasonId: null,
  });

  React.useEffect(() => {
    const fetchCurrentSeason = async () => {
      // await storage.clearStorage();
      const csId = await storage.get('currentSeasonId');
      if (csId !== null) {
        dispatch({ type: 'haveCurrentSeasonId', currentSeasonId: csId });
      } else {
        dispatch({ type: 'noCurrentSeasonId' });
      }
    };

    fetchCurrentSeason();
  }, []);

  if (!state.readyForStartup) {
    return null;
  }

  const initialState = state.currentSeasonId
    ? {
        index: 1,
        routes: [
          { name: 'Seasons' },
          {
            name: 'Home',
            params: {
              seasonId: state.currentSeasonId,
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
            options={{ title: 'Säsonger' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Ledartavla',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Events"
            component={EventsScreen}
            options={{ title: 'Rundor' }}
          />
          <Stack.Screen
            name="Play"
            component={PlayScreen}
            options={{ title: 'Spela', headerBackTitleVisible: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
