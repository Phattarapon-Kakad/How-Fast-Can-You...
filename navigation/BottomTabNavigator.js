import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CPS from '../screens/CPS';
import ReactionTest from '../screens/ReactionTest';
import MemoryTest from '../screens/MemoryTest';
import NumberSequence from '../screens/NumberSequence';

// Theme colors
const THEME = {
  primary: '#3498db',        // Blue - primary color
  secondary: '#2ecc71',      // Green - secondary color
  accent: '#9b59b6',         // Purple - accent color
  background: '#f5f9ff',     // Light blue background
  darkText: '#2c3e50',       // Dark blue text
  lightText: '#ecf0f1',      // Light text
  danger: '#e74c3c',         // Red for warnings/errors
  shadow: '#bdc3c7',         // Shadow color
  headerBg: 'rgba(52, 152, 219, 0.05)', // Very light blue for header
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="CPS"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'CPS') {
            iconName = 'play';
          } else if (route.name === 'Reflect') {
            iconName = 'flash';
          } else if (route.name === 'Number') {
            iconName = 'eye';
          } else if (route.name === 'Memory') {
            iconName = 'hourglass';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: THEME.primary,
        tabBarInactiveTintColor: '#777',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          elevation: 8,
          shadowColor: THEME.shadow,
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="CPS" 
        component={CPS} 
        options={{
          tabBarLabel: 'Click Speed'
        }}
      />
      <Tab.Screen 
        name="Reflect" 
        component={ReactionTest} 
        options={{
          tabBarLabel: 'Reaction'
        }}
      />
      <Tab.Screen 
        name="Number" 
        component={NumberSequence} 
        options={{
          tabBarLabel: 'Sequence'
        }}
      />
      <Tab.Screen 
        name="Memory" 
        component={MemoryTest} 
        options={{
          tabBarLabel: 'Memory'
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
