import React from 'react';
import {
  Layout,
  Card,
  Text,
  Button,
  Spinner,
  List,
  ListItem,
  Toggle,
} from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { useImmer } from 'use-immer';

import playSetupQuery from '../graphql/queries/playSetupQuery';
import { playSetupQuery as playSetupQueryType } from '../../generatedTypes';
import { PlayParamList } from '../Routes';
import { ScrollView } from 'react-native';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'Play'>;
};

const Play: React.FC<Props> = ({ navigation }) => {
  const { loading, data } = useQuery<playSetupQueryType>(playSetupQuery);
  const [playState, updatePlayState] = useImmer({
    courseId: null,
    special: false,
    type: 'INDIVIDUAL',
    scoring: 'POINTS',
  });

  if (loading) {
    return null;
  }

  const setCourse = (courseId: string) => {
    updatePlayState(draft => {
      draft.courseId = courseId;
    });
  };

  const toggleSpecial = () => {
    updatePlayState(draft => {
      draft.special = !draft.special;
    });
  };

  const togglePlayType = () => {
    updatePlayState(draft => {
      draft.type = draft.type === 'INDIVIDUAL' ? 'TEAM' : 'INDIVIDUAL';
    });
  };

  const toggleStrokes = () => {
    updatePlayState(draft => {
      draft.scoring = draft.scoring === 'POINTS' ? 'STROKES' : 'POINTS';
    });
  };

  console.log(playState);

  const activeEventId =
    data.activeEvents && data.activeEvents.length > 0
      ? data.activeEvents[0].id
      : false;
  const joinActiveEvent = () =>
    navigation.navigate('SetupScoringSession', { eventId: activeEventId });

  return (
    <Layout style={{ padding: 8 }}>
      {activeEventId ? (
        <Card style={{ marginBottom: 12 }} appearance="filled">
          <Text category="h5">Aktiv runda hittad:</Text>
          <Button onPress={joinActiveEvent} size="small">
            GÅ MED I RUNDA
          </Button>
        </Card>
      ) : (
        <Card style={{ marginBottom: 12 }} appearance="filled">
          <Spinner size="small" />
          <Text category="h6">Väntar på nyskapade rundor</Text>
          <Text status="info" appearance="hint">
            Snacka med varandra, bäst är om 1 person skapar en runda!
          </Text>
        </Card>
      )}
      <Text category="label">Inställningar</Text>
      <Toggle
        checked={playState.special}
        text="Special?"
        onChange={toggleSpecial}
      />
      <Toggle
        checked={playState.type !== 'INDIVIDUAL'}
        text="Lagtävling?"
        onChange={togglePlayType}
      />
      <Toggle
        checked={playState.scoring !== 'POINTS'}
        text="Slag?"
        onChange={toggleStrokes}
      />
      <Text category="label">Välj bana</Text>
      <ScrollView>
        <List
          data={data.courses}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.club} - ${item.name}`}
              description={`Par: ${item.par} - ${item._holesMeta.count} hål`}
              onPress={() => setCourse(item.id)}
              style={{
                backgroundColor: playState.courseId === item.id ? '#feb' : null,
              }}
            />
          )}
        />
      </ScrollView>
      <Button disabled={playState.courseId === null}>VÄLJ SPELARE</Button>
    </Layout>
  );
};

export default Play;
