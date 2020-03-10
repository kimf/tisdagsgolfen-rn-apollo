import React from 'react';
import { Text } from '@ui-kitten/components';

const CurrentSeason: React.FC<{ season: Season }> = ({ season }) => {
  return (
    <Text key={season.id}>
      {season.name} - {season.status}
    </Text>
  );
};

export default CurrentSeason;
