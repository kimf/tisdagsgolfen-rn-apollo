import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  const goToEvents = () => navigation.navigate('Events');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Events" onPress={goToEvents} />
    </View>
  );
};

export default Home;
