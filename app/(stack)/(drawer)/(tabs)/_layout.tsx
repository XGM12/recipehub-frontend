import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
        }}>
            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Home',
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
                }}
            />
        </Tabs>
    )
}

export default TabsLayout