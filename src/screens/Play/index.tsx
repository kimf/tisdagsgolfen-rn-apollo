import React from 'react';
import { View } from 'react-native';
import * as Kitten from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks';
import { StackNavigationProp } from '@react-navigation/stack';

import playSetupQuery from '../../graphql/queries/playSetupQuery';
import {
  playSetupQuery as QueryType,
  playSetupQuery_courses as Course,
  playSetupQuery_players as Player,
} from '../../../generatedTypes';
import { PlayParamList } from '../../Routes';

import styles from './styles';
import SegmentedButton from '../../components/shared/SegmentedButton';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'Play'>;
};

type PlayState = {
  courseId: string;
  special: boolean;
  type: 'INDIVIDUAL' | 'TEAM';
  scoring: 'POINTS' | 'STROKES';
};

const Play: React.FC<Props> = ({ navigation }) => {
  const { loading, data } = useQuery<QueryType>(playSetupQuery);
  const [playState, setPlayState] = React.useState<PlayState>({
    courseId: '',
    special: false,
    type: 'INDIVIDUAL',
    scoring: 'POINTS',
  });

  if (loading) {
    return null;
  }

  const setCourse = (courseIndex: string) => {
    setPlayState({ ...playState, courseId: data.courses[courseIndex].id });
  };

  const toggleSpecial = () => {
    setPlayState({ ...playState, special: !playState.special });
  };

  const togglePlayType = () => {
    setPlayState({
      ...playState,
      type: playState.type === 'INDIVIDUAL' ? 'TEAM' : 'INDIVIDUAL',
    });
  };

  const toggleStrokes = () => {
    setPlayState({
      ...playState,
      scoring: playState.scoring === 'POINTS' ? 'STROKES' : 'POINTS',
    });
  };

  const selectPlayers = () =>
    navigation.navigate('SetupScoringSession', { ...playState });

  const renderCourse = ({ item, index }) => (
    <Kitten.ListItem
      title={`${item.club} - ${item.name}`}
      description={`Par: ${item.par} - ${item._holesMeta.count} hål`}
      onPress={() => setCourse(index)}
      style={{
        backgroundColor:
          playState.courseId === item.id ? 'rgba(0,200,100,0.1)' : null,
      }}
      icon={() => <Kitten.CheckBox checked={playState.courseId === item.id} />}
    />
  );

  return (
    <Kitten.Layout style={styles.container}>
      <Kitten.Text category="h6" style={styles.sectionLabel}>
        Inställningar
      </Kitten.Text>
      <View style={[styles.formRow, { flexDirection: 'row' }]}>
        <View style={{ flex: 1 }}>
          <Kitten.CheckBox
            checked={playState.special}
            text="Specialvecka"
            onChange={toggleSpecial}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Kitten.CheckBox
            checked={playState.type === 'TEAM'}
            text="Lagtävling"
            onChange={togglePlayType}
          />
        </View>
      </View>
      <View style={styles.formRow}>
        <SegmentedButton
          value={playState.scoring === 'POINTS'}
          toggleValue={toggleStrokes}
          trueLabel="POÄNG"
          falseLabel="SLAG"
        />
      </View>

      <View style={styles.row}>
        <Kitten.Text category="h6" style={styles.sectionLabel}>
          Bana
        </Kitten.Text>

        <Kitten.List data={data.courses} renderItem={renderCourse} />
      </View>

      <Kitten.Button style={styles.nextButton} onPress={selectPlayers}>
        VÄLJ SPELARE
      </Kitten.Button>
    </Kitten.Layout>
  );
};

export default Play;
