import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DifficultyScreen from './components/DifficultyScreen'
import HomeScreen from './components/HomeScreen'
import QuizScreen from './components/QuizScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ title: 'My home', headerShown:false }} component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Difficulty" component={DifficultyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
