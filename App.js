import * as React from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Animated } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import haydockImage from './data/Images/haydock.jpg';

const ThemeContext = React.createContext();

function CustomHeader({ title, colors }) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.text + '55',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: '600', color: colors.text }}>
        {title}
      </Text>
    </View>
  );
}

function ReaderScreen() {
  const { colors } = React.useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}></Text>
      <Text style={[styles.text, { color: colors.text }]}>
        Please select the book in the graph and enjoy reading :)
      </Text>
    </View>
  );
}

function GraphScreen() {
  const { colors } = React.useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}></Text>
      <Text style={[styles.text, { color: colors.text }]}>
        This will display your network graph image later.
      </Text>
    </View>
  );
}

function SettingsScreen() {
  const { darkMode, toggleDarkMode, colors } = React.useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          alignItems: 'stretch',
          justifyContent: 'flex-start', 
          paddingTop: 20,              
        },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 14,
          paddingHorizontal: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.text + '33',
        }}
      >
        <Text style={{ fontSize: 18, color: colors.text }}>
          Dark Mode
        </Text>

        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          thumbColor={darkMode ? '#fff' : '#fff'}
          trackColor={{ false: '#999', true: '#4a90e2' }}
        />
      </View>
    </View>
  );
}

function SplashScreen({ onFinish }) {
  const fadeCross = React.useRef(new Animated.Value(0)).current;
  const fadeWelcome = React.useRef(new Animated.Value(0)).current;
  const fadeButton = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.stagger(400, [
      Animated.timing(fadeCross, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(fadeWelcome, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(fadeButton, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleStartPress = () => {
    Animated.parallel([
      Animated.timing(fadeCross, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.timing(fadeWelcome, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.timing(fadeButton, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => onFinish());
  };

  return (
    <ImageBackground
      source={haydockImage}
      style={styles.splashBackground}
      resizeMode="cover"
    >
      <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ opacity: fadeCross, alignItems: 'center' }}>
          <Text style={styles.cross}>✠</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeWelcome, alignItems: 'center' }}>
          <Text style={styles.welcome}>Welcome to the Logos App!</Text>
        </Animated.View>
      </View>

      {/* Bottom menu: Start button */}
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ opacity: fadeButton }}>
          <Text style={styles.startButton} onPress={handleStartPress}>
            Start ➔
          </Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [darkMode, setDarkMode] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);

  const theme = {
    darkMode,
    toggleDarkMode: () => setDarkMode(prev => !prev),
    colors: darkMode
      ? { background: '#03032E', text: '#ffffff' }
      : { background: '#F5EAD6', text: '#2B1D0E' },
  };

  const [currentTitle, setCurrentTitle] = React.useState('Reader');

  React.useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      const routeName = navigationRef.getCurrentRoute()?.name;
      if (routeName) setCurrentTitle(routeName);
    });
    return unsubscribe;
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <NavigationContainer ref={navigationRef}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <CustomHeader title={currentTitle} colors={theme.colors} />

          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: theme.colors.background,
                height: 60,
              },
              tabBarActiveTintColor: darkMode ? '#9bbcff' : '#004aad',
              tabBarInactiveTintColor: darkMode ? '#aaa' : '#777',
              tabBarShowLabel: true,
            }}
          >
            <Tab.Screen
              name="Reader"
              component={ReaderScreen}
              options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>📖</Text> }}
            />
            <Tab.Screen
              name="Graph"
              component={GraphScreen}
              options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>🕸️</Text> }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>⚙️</Text> }}
            />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  splashBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cross: {
    fontSize: 100,
    color: '#fff',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    fontSize: 20,
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 50,
    backgroundColor: '#03032E',
    borderRadius: 30,
    overflow: 'hidden',
    textAlign: 'center',
  },
});
