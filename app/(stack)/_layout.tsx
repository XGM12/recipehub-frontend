import { Stack } from 'expo-router'
import React from 'react'

const StackLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name='auth/index'
                options={{ title: 'Login', headerShown: false }} />
            <Stack.Screen
                name='(drawer)'
                options={{ title: 'App', headerShown: false }} />
        </Stack>
    )
}

export default StackLayout