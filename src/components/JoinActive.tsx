import * as React from 'react';
import * as Kitten from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { seasonQuery_season_events as ActiveEvent } from '../../types/generatedTypes';

interface IProps {
  onPress: () => void;
  activeEvent: ActiveEvent;
}

const JoinActive: React.FC<IProps> = ({ activeEvent, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.75}
    style={{
      padding: 16,
      flexDirection: 'row',
      backgroundColor: '#feb',
      borderBottomColor: '#ccc',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }}
    onPress={onPress}>
    <Kitten.Text category="label" style={{ marginRight: 16 }}>
      {activeEvent.course.club} / {activeEvent.course.name}
    </Kitten.Text>
    <Kitten.Text category="c1">
      {activeEvent.special && 'Special / '}
      {activeEvent.type === 'INDIVIDUAL' ? 'Individuell' : 'Lag'}
      {' / '}
      {activeEvent.scoring === 'POINTS' ? 'Poäng' : 'Slag'}
    </Kitten.Text>
  </TouchableOpacity>
);

export default JoinActive;
