import * as React from 'react';
import { NavigationContainer, InitialState } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import SeasonsScreen from './screens/Seasons/index';
import SeasonScreen from './screens/Season/index';
import PlayScreen from './screens/Play/index';
import EventsScreen from './screens/Events';
import PlayerPicker from './screens/Play/PlayerPicker';

import { useStore } from './store';

export type RootParamList = {
  Seasons: {};
  Season: { seasonId: string };
  Events: {};
  PlayStack: {};
};

export type PlayParamList = {
  Play: {};
  SelectPlayers: {};
  SetupScoringSession: { eventId: string };
};

const MainStack = createNativeStackNavigator<RootParamList>();
const PlayStack = createNativeStackNavigator<PlayParamList>();
const RootStack = createNativeStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName="Seasons"
    screenOptions={{
      // headerStyle: { backgroundColor: '#eee' },
      // headerTitleStyle: { color: '#000' },
      // contentStyle: { backgroundColor: '#eee' },
      headerLargeTitle: true,
    }}>
    <MainStack.Screen
      name="Seasons"
      component={SeasonsScreen}
      options={{
        title: 'Säsonger',
      }}
    />
    <MainStack.Screen
      name="Season"
      component={SeasonScreen}
      options={{
        title: 'Ledartavla',
        headerBackTitleVisible: false,
      }}
    />
    <MainStack.Screen
      name="Events"
      component={EventsScreen}
      options={{
        title: 'Rundor',
        headerBackTitleVisible: false,
      }}
    />
  </MainStack.Navigator>
);

const PlayStackScreen = () => (
  <PlayStack.Navigator
    screenOptions={{
      // headerStyle: { backgroundColor: '#000' },
      // headerTitleStyle: { color: '#fff' },
      // contentStyle: { backgroundColor: '#fefefe' },
      headerLargeTitle: false,
    }}>
    <PlayStack.Screen
      name="Play"
      component={PlayScreen}
      options={{
        title: 'Ny runda',
        headerBackTitleVisible: false,
      }}
    />
    <PlayStack.Screen
      name="SelectPlayers"
      component={PlayerPicker}
      options={{
        title: 'Välj Spelare',
        headerBackTitleVisible: false,
      }}
    />
  </PlayStack.Navigator>
);

const Routes = () => {
  const { readyForStartup, currentSeasonId } = useStore();

  if (!readyForStartup) {
    return null;
  }

  const initialState = currentSeasonId
    ? {
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              index: 1,
              routes: [
                { name: 'Seasons' },
                {
                  name: 'Season',
                  params: { seasonId: currentSeasonId },
                },
              ],
            },
          },
        ],
      }
    : null;

  return (
    <NavigationContainer initialState={initialState}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="PlayStack"
          component={PlayStackScreen}
          options={{
            headerShown: false,
            stackPresentation: 'modal',
            stackAnimation: 'default', // flip, fade, none,
            gestureEnabled: true, // Set this dynamically?
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
