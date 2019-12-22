import { AppRegistry, processColor } from 'react-native';
import 'react-native-gesture-handler';
// import Instabug from 'instabug-reactnative';

import App from './src/App';
import { name as appName } from './app.json';

// Instabug.startWithToken('2610c5febca442457463f2b18fb57ce1', [
//   Instabug.invocationEvent.shake,
// ]);
// Instabug.setColorTheme(Instabug.colorTheme.dark);
// Instabug.setPrimaryColor(processColor('#3290FC'));

AppRegistry.registerComponent(appName, () => App);
