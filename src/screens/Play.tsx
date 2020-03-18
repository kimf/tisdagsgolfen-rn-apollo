import React from 'react';
import * as Kitten from '@ui-kitten/components';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlayParamList } from '../Routes';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'Play'>;
  route: RouteProp<PlayParamList, 'Play'>;
};

const Play: React.FC<Props> = ({ navigation, route }) => {
  const cancelPlay = () => navigation.goBack();

  return (
    <Kitten.Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Kitten.Text>Play Screen</Kitten.Text>
      <Kitten.Button status="danger" onPress={cancelPlay}>
        AVSLUTA
      </Kitten.Button>
    </Kitten.Layout>
  );
};

export default Play;
