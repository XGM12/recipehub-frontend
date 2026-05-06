import {Stack} from 'expo-router'
import React from 'react'

const StackLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name='auth/login'
                options={{title: 'Login', headerShown: false}}/>
            <Stack.Screen
                name='auth/register'
                options={{title: 'Register', headerShown: false}}/>
            <Stack.Screen
                name='(drawer)'
                options={{title: 'App', headerShown: false}}/>
            <Stack.Screen
                name='recipe/[id]'
                options={{title: 'Recipe', headerShown: false}}/>
        </Stack>
    )
}

export default StackLayout