import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
// import IntroScreen from './src/screens/Intro/IntroScreen';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/navigator';
function App(): JSX.Element {
  
    return (
      <NavigationContainer>
        {/* <IntroScreen/> */}
      </NavigationContainer>
    );
  }
  
  
  export default App;