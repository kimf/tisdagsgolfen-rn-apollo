import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import SeasonsScreen from './screens/SeasonsList';
import SeasonScreen from './screens/Season';
import EventsScreen from './screens/Events';
import EventScreen from './screens/Event';
import NewEventScreen from './screens/NewEvent';

import PlayerPicker from './screens/NewScoringSession/PlayerPicker';
import PlayerSettings from './screens/NewScoringSession/PlayerSettings';
import TeamSettings from './screens/NewScoringSession/TeamSettings';

import { useStore } from './store';
import {
  seasonQuery_season_events,
  playersQuery_players,
} from '../types/generatedTypes';

export type RootParamList = {
  Seasons: {};
  Season: { seasonId: string };
  Events: {};
  Event: { event: seasonQuery_season_events };
  PlayStack: {};
};

export type PlayParamList = {
  Play: {};
  PlayerPicker: {
    event: seasonQuery_season_events;
  };
  PlayerSettings: {
    event: seasonQuery_season_events;
    players: playersQuery_players[];
  };
  TeamSettings: {
    event: seasonQuery_season_events;
    players: playersQuery_players[];
  };
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
    <MainStack.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: 'Runda',
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
      component={NewEventScreen}
      options={{
        title: 'Ny runda',
        headerBackTitleVisible: false,
      }}
    />
    <PlayStack.Screen
      name="PlayerPicker"
      component={PlayerPicker}
      options={{
        title: 'Välj Spelare',
        headerBackTitleVisible: false,
      }}
    />
    <PlayStack.Screen
      name="TeamSettings"
      component={TeamSettings}
      options={{
        title: 'Ställ in Lag & Slag',
        headerBackTitleVisible: false,
      }}
    />
    <PlayStack.Screen
      name="PlayerSettings"
      component={PlayerSettings}
      options={{
        title: 'Ställ in Slag',
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
