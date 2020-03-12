import * as React from 'react';
import * as Kitten from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
  },
  leftButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

interface IProps {
  value: boolean;
  toggleValue: () => void;
  trueLabel?: string;
  falseLabel?: string;
}

const SegmentedButton: React.FC<IProps> = ({
  value,
  toggleValue,
  trueLabel = 'TRUE',
  falseLabel = 'FALSE',
}) => (
  <View style={styles.wrapper}>
    <Kitten.Button
      size="small"
      style={[styles.button, styles.leftButton]}
      onPress={toggleValue}
      status={value ? 'info' : 'basic'}>
      {trueLabel}
    </Kitten.Button>
    <Kitten.Button
      style={[styles.button, styles.rightButton]}
      onPress={toggleValue}
      size="small"
      status={value ? 'basic' : 'info'}>
      {falseLabel}
    </Kitten.Button>
  </View>
);

export default SegmentedButton;
