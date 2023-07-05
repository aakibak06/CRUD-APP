/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
import NavigationCon from './Src/CrudApp/CrudNavigation';

AppRegistry.registerComponent(appName, () => NavigationCon);
