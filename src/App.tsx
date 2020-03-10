import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, dark, light } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import client from './apolloClient';
import Routes from './Routes';
import { StoreProvider } from './store';

const themes = { light, dark };

const App = () => {
  const colorScheme = useColorScheme();
  const theme = themes[colorScheme];

  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        <ApplicationProvider mapping={mapping} theme={theme}>
          <StoreProvider>
            <Routes />
          </StoreProvider>
        </ApplicationProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
};

export default App;
