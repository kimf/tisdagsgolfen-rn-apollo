import * as React from 'react';
import { NavigationContainer, InitialState } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import PlayScreen from './screens/Play';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import SeasonPicker from './screens/SeasonPicker';
import { useStore } from './store';

export type RootParamList = {
  Seasons: {};
  Home: { seasonId: string };
  Events: {};
  PlayStack: {};
};

export type PlayParamList = {
  Play: {};
  SetupScoringSession: { eventId: string };
};

const MainStack = createNativeStackNavigator<RootParamList>();
const PlayStack = createNativeStackNavigator<PlayParamList>();
const RootStack = createNativeStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName="Seasons"
    screenOptions={{
      headerStyle: { backgroundColor: '#eee' },
      headerTitleStyle: { color: '#000' },
      contentStyle: { backgroundColor: '#eee' },
      headerLargeTitle: true,
    }}>
    <MainStack.Screen
      name="Seasons"
      component={SeasonPicker}
      options={{
        title: 'Säsonger',
      }}
    />
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Ledartavla',
        headerBackTitleVisible: true,
      }}
    />
    <MainStack.Screen
      name="Events"
      component={EventsScreen}
      options={{
        title: 'Rundor',
        headerBackTitleVisible: true,
      }}
    />
  </MainStack.Navigator>
);

const PlayStackScreen = () => (
  <PlayStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#ccc' },
      headerTitleStyle: { color: '#c00' },
      contentStyle: { backgroundColor: '#eee' },
      headerLargeTitle: true,
    }}>
    <PlayStack.Screen
      name="Play"
      component={PlayScreen}
      options={{
        title: 'Spela golf',
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
                  name: 'Home',
                  params: { seasonId: currentSeasonId },
                },
              ],
            },
          },
        ],
      }
    : null;

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        console.log(state.routes.map(r => r.state.routes))
      }>
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
            stackAnimation: 'default', // flip, fade, none
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
