import React from 'react';
import { Text } from 'react-native';

import { seasonQuery_season as Season } from '../../generatedTypes';

const CurrentSeason: React.FC<{ season: Season }> = ({ season }) => {
  return (
    <Text key={season.id}>
      {season.name} - {season.status}
    </Text>
  );
};

export default CurrentSeason;
