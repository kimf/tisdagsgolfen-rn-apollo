import React from 'react';
import { View, Alert } from 'react-native';
import * as Kitten from '@ui-kitten/components';
import { useQuery, useMutation } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';

import playSetupQuery from '../../graphql/queries/playSetupQuery';
import seasonQuery from '../../graphql/queries/seasonQuery';
import {
  playSetupQuery as QueryType,
  createEventMutation_createOneEvent,
  createEventMutationVariables,
  EventType,
  EventScoring,
  seasonQuery as QSeason,
} from '../../../types/generatedTypes';
import createEventMutation from '../../graphql/mutations/createEventMutation';
import { PlayParamList } from '../../Routes';

import styles from './styles';
import SegmentedButton from '../../components/shared/SegmentedButton';
import { useStore } from '../../store';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'Play'>;
};

const CheckedIcon = style => (
  <Kitten.Icon {...style} name="checkmark-square-outline" />
);

const UnCheckedIcon = style => <Kitten.Icon {...style} name="square-outline" />;

const Play: React.FC<Props> = ({ navigation }) => {
  const { loading, data } = useQuery<QueryType>(playSetupQuery);
  const { currentSeasonId } = useStore();
  const [playState, setPlayState] = React.useState<
    createEventMutationVariables
  >({
    seasonId: Number(currentSeasonId),
    courseId: null,
    special: false,
    type: EventType.INDIVIDUAL,
    scoring: EventScoring.POINTS,
  });

  const [createEvent] = useMutation<
    createEventMutation_createOneEvent,
    createEventMutationVariables
  >(createEventMutation, {
    variables: { ...playState },
    // update(cache, { data: result }) {
    //   const course = data.courses.find(c => c.id === playState.courseId);
    //   const { season } = cache.readQuery<QSeason>({ query: seasonQuery });
    //   console.log(season);
    //   cache.writeQuery({
    //     query: seasonQuery,
    //     data: {
    //       season: {
    //         ...season,
    //         events: season.events.concat([
    //           {
    //             ...result,
    //             special: playState.special,
    //             type: playState.type,
    //             scoring: playState.scoring,
    //             course,
    //           },
    //         ]),
    //       },
    //     },
    //   });
    // },
    onCompleted(savedEvent) {
      const course = data.courses.find(c => c.id === playState.courseId);
      navigation.replace('PlayerPicker', {
        event: {
          id: `${savedEvent.id}`,
          special: playState.special,
          type: playState.type,
          scoring: playState.scoring,
          course: {
            club: course.club,
            name: course.name,
          },
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

  const renderCourse = ({ item, index }) => (
    <Kitten.ListItem
      title={`${item.club} - ${item.name}`}
      description={`Par: ${item.par} - ${item.holes.length} hål`}
      onPress={() => setCourse(index)}
      style={{
        backgroundColor:
          playState.courseId === item.id ? 'rgba(0,200,100,0.1)' : null,
      }}
      icon={playState.courseId === item.id ? CheckedIcon : UnCheckedIcon}
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

      <Kitten.Button
        style={styles.nextButton}
        onPress={saveEvent}
        disabled={!playState.courseId}>
        SKAPA RUNDA
      </Kitten.Button>
    </Kitten.Layout>
  );
};

export default Play;
