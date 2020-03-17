import * as React from 'react';
import * as Kitten from '@ui-kitten/components';

import { seasonQuery_season as Season } from '../../types/generatedTypes';

const CurrentSeason: React.FC<{ season: Season }> = ({ season }) => {
  return (
    <Kitten.Layout style={{ padding: 16 }}>
      <Kitten.Text category="h6">
        {season.name} - {season.status}
      </Kitten.Text>
    </Kitten.Layout>
  );
};

export default CurrentSeason;
