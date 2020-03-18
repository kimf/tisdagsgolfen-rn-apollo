import * as React from 'react';
import { View } from 'react-native';
import * as Kitten from '@ui-kitten/components';

import {
  EventType,
  seasonQuery_season_events,
} from '../../types/generatedTypes';

type Props = {
  event: seasonQuery_season_events;
};

const EventHeader: React.FC<Props> = ({ event }) => (
  <View style={{ padding: 16, flexDirection: 'row', backgroundColor: '#feb' }}>
    <View>
      <Kitten.Text category="label">
        {event.course.club} / {event.course.name}
      </Kitten.Text>
      <Kitten.Text category="c1">
        {event.special && 'Special / '}
        {event.type === EventType.INDIVIDUAL ? 'Individuell' : 'Lag'}
        {' / '}
        {event.scoring === 'POINTS' ? 'Poäng' : 'Slag'}
      </Kitten.Text>
    </View>
  </View>
);

export default EventHeader;
