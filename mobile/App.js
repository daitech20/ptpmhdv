import { StatusBar } from 'expo-status-bar';
import {Box, NativeBaseProvider, Text} from 'native-base'
import LoginScreen from './src/Screens/LoginScreen';
import HomeScreen from './src/Screens/HomeScreen';
import Navigation from './src/Components/Navigation';
import { AuthProvider } from './src/Context/AuthContext';

const App = () => {
	return (
		<AuthProvider>
			<Navigation />
		</AuthProvider>
	)
};

export default App;