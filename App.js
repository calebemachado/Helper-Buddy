import React, {useState, useEffect, useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  configureDesignSystem,
  getThemeStatusBarStyle,
} from './src/utils/designSystem';

import LoginPage from './src/pages/LoginPage';
import HomePage from './src/pages/HomePage';
import AddHelpTaskPage from './src/pages/AddHelpTaskPage';
import DetailHelpTaskPage from './src/pages/DetailHelpTaskPage';
import {StatusBar, useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useColorScheme();

  const onAuthStateChanged = useCallback(
    firebaseUser => {
      configureDesignSystem();

      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) return null;

  if (!user) {
    return <LoginPage />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle={getThemeStatusBarStyle()} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{title: 'Início'}}
          />
          <Stack.Screen
            name="AddHelpTaskPage"
            component={AddHelpTaskPage}
            options={{title: 'Criar Tarefa'}}
          />
          <Stack.Screen
            name="DetailHelpTaskPage"
            component={DetailHelpTaskPage}
            options={{title: 'Ver Tarefa'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
