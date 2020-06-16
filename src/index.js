import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DrawerNavigator, UnauthNavigator } from './navigation';
import useLinking from './navigation/useLinking';
import Images from '../assets/images';
import { useAuth } from './containers/Auth';
import { Color } from './constants';

export default function Root(props) {
  const { authenticate, isAuthenticated } = useAuth();
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
          antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
        });

        await Images.downloadAsync();
        await authenticate();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <View />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.white} barStyle="dark-content" />
        <SafeAreaProvider>
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            {isAuthenticated ? <DrawerNavigator /> : <UnauthNavigator />}
          </NavigationContainer>
        </SafeAreaProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
