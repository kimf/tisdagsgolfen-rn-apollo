import * as React from 'react';
import * as Kitten from '@ui-kitten/components';
import { View } from 'react-native';

import { seasonQuery_season_events as ActiveEvent } from '../../types/generatedTypes';

interface IProps {
  onJoin: () => void;
  activeEvent: ActiveEvent;
}

const JoinActive: React.FC<IProps> = ({ activeEvent, onJoin }) => (
  <View style={{ padding: 16, flexDirection: 'row', backgroundColor: '#feb' }}>
    <View style={{ width: '70%' }}>
      <Kitten.Text category="label">
        {activeEvent.course.club} / {activeEvent.course.name}
      </Kitten.Text>
      <Kitten.Text category="c1">
        {activeEvent.special && 'Special / '}
        {activeEvent.type === 'INDIVIDUAL' ? 'Individuell' : 'Lag'}
        {' / '}
        {activeEvent.scoring === 'POINTS' ? 'Poäng' : 'Slag'}
      </Kitten.Text>
    </View>
    <View style={{ width: '30%' }}>
      <Kitten.Button onPress={onJoin} size="small" status="danger">
        GÅ MED
      </Kitten.Button>
    </View>
  </View>
);

export default JoinActive;
