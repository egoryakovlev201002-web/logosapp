import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// --- Theme Context ---
const ThemeContext = React.createContext();

// --- Screens ---
function ReaderScreen() {
  const { colors } = React.useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>📖 Reader</Text>
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
      <Text style={[styles.title, { color: colors.text }]}>🕸️ Graph View</Text>
      <Text style={[styles.text, { color: colors.text }]}>
        This will display your network graph image later.
      </Text>
    </View>
  );
}

function SettingsScreen() {
  const { darkMode, toggleDarkMode, colors } = React.useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>⚙️ Settings</Text>
      <Text style={[styles.text, { color: colors.text }]}>
        Here you can manage the way you use the app
      </Text>

      <Text
        onPress={toggleDarkMode}
        style={{
          marginTop: 30,
          padding: 12,
          backgroundColor: darkMode ? "#333" : "#ddd",
          color: darkMode ? "#fff" : "#000",
          borderRadius: 8
        }}
      >
        Toggle Dark Mode
      </Text>
    </View>
  );
}

// --- Bottom Tabs Setup ---
const Tab = createBottomTabNavigator();

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = {
    darkMode,
    toggleDarkMode: () => setDarkMode(prev => !prev),
    colors: darkMode
      ? { background: "#1a1a1a", text: "#ffffff" }
      : { background: "#F5EAD6", text: "#2B1D0E" }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.background,
              height: 60,
            },
            tabBarActiveTintColor: darkMode ? '#9bbcff' : '#004aad',
            tabBarInactiveTintColor: darkMode ? '#aaa' : '#777',
            tabBarShowLabel: true, // Set to false if you want icon only
          }}
        >

          <Tab.Screen
            name="Reader"
            component={ReaderScreen}
            options={{
              tabBarIcon: () => <Text style={{ fontSize: 20 }}>📖</Text>,
            }}
          />

          <Tab.Screen
            name="Graph"
            component={GraphScreen}
            options={{
              tabBarIcon: () => <Text style={{ fontSize: 20 }}>🕸️</Text>,
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: () => <Text style={{ fontSize: 20 }}>⚙️</Text>,
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

// --- Styles ---
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
});