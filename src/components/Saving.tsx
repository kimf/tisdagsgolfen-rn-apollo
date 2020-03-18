import * as React from 'react';
import { View, Modal } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const Saving = React.memo(() => (
  <Modal animationType="fade" transparent>
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000055',
      }}>
      <Spinner size="giant" />
    </View>
  </Modal>
));

export default Saving;
