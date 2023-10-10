
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Navigator from './src/navigation/navigator';
import { NavigationContainer } from '@react-navigation/native';

const ProvideNavigator = () => {
    return (
        <Navigator />
    )
}
AppRegistry.registerComponent(appName, () => ProvideNavigator);