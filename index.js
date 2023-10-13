
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Navigator from './src/navigation/navigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/common/store';

const ProvideNavigator = () => {
    return (
        <Provider store={store}>
            
            <Navigator />
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => ProvideNavigator);