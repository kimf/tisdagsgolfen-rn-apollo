import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Kitten from '@ui-kitten/components';
import { useQuery, useMutation } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';

import coursesQuery from '../graphql/queries/coursesQuery';
import {
  coursesQuery as QueryType,
  createEventVariables,
  EventType,
  EventScoring,
  createEvent,
} from '../../types/generatedTypes';
import createEventMutation from '../graphql/mutations/createEventMutation';
import { PlaySetupParamList } from '../Routes';

import SegmentedButton from '../components/shared/SegmentedButton';
import { useStore } from '../store';
import Saving from '../components/Saving';

type Props = {
  navigation: StackNavigationProp<PlaySetupParamList, 'NewEvent'>;
};

const CheckedIcon = style => (
  <Kitten.Icon {...style} name="checkmark-square-outline" />
);

const UnCheckedIcon = style => <Kitten.Icon {...style} name="square-outline" />;

const Play: React.FC<Props> = ({ navigation }) => {
  const { loading, data } = useQuery<QueryType>(coursesQuery);
  const { currentSeasonId } = useStore();
  const [playState, setPlayState] = React.useState<createEventVariables>({
    seasonId: Number(currentSeasonId),
    courseId: null,
    special: false,
    type: EventType.INDIVIDUAL,
    scoring: EventScoring.POINTS,
  });

  const [createEvent, { loading: saving }] = useMutation<
    createEvent,
    createEventVariables
  >(createEventMutation, {
    variables: { ...playState },
    onCompleted({ createOneEvent }) {
      const course = data.courses.find(c => c.id === playState.courseId);
      navigation.replace('PlayerPicker', {
        event: {
          id: createOneEvent.id,
          status: createOneEvent.status,
          special: playState.special,
          type: playState.type,
          scoring: playState.scoring,
          course: course,
        },
      });
    },
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
      type:
        playState.type === EventType.INDIVIDUAL
          ? EventType.TEAM
          : EventType.INDIVIDUAL,
    });
  };

  const toggleStrokes = () => {
    setPlayState({
      ...playState,
      scoring:
        playState.scoring === EventScoring.POINTS
          ? EventScoring.STROKES
          : EventScoring.POINTS,
    });
  };

  const saveEvent = async () => {
    await createEvent();
  };

  const renderCourse = ({ item, index }) => {
    const isSelected = playState.courseId === item.id;
    return (
      <Kitten.ListItem
        title={`${item.club} - ${item.name}`}
        description={`Par: ${item.par} - ${item.holes.length} hål`}
        onPress={() => setCourse(index)}
        activeOpacity={isSelected ? 0.9 : 0.75}
        style={{
          backgroundColor: isSelected ? 'rgba(0,200,100,0.1)' : null,
        }}
        icon={isSelected ? CheckedIcon : UnCheckedIcon}
      />
    );
  };

  return (
    <React.Fragment>
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

        <Kitten.Button
          style={styles.nextButton}
          onPress={saveEvent}
          disabled={!playState.courseId || saving}>
          SKAPA RUNDA
        </Kitten.Button>
      </Kitten.Layout>
      {saving && <Saving />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 8,
  },
  sectionLabel: {
    marginVertical: 8,
  },
  row: {
    flex: 1,
  },
  formRow: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  nextButton: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
});

export default Play;
