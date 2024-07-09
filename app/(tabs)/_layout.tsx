import {Tabs} from 'expo-router';
import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
          <Tabs.Screen
              name="index"
              options={{
                  title: 'Home',
                  headerShown : false,
                  tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
              }}
          />
          <Tabs.Screen
              name="garage"
              options={{
                  title: 'Garage',
                  headerShown : false,
                  tabBarIcon: ({ color }) => <MaterialCommunityIcons size={35   } name="garage" color={color} />,
              }}
          />
          <Tabs.Screen
              name="settings"
              options={{
                  title: 'Settings',
                  headerShown : false,
                  tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
              }}
          />
      </Tabs>

  );
}
