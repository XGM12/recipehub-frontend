import {Ionicons} from '@expo/vector-icons'
import {Tabs} from 'expo-router'
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
                    tabBarIcon: ({color}) => <Ionicons size={28} name="home-outline" color={color}/>,
                }}
            />

            <Tabs.Screen
                name="search/index"
                options={{
                    title: 'Búsqueda',
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({color}) => <Ionicons size={28} name="search-outline" color={color}/>,
                }}
            />

            <Tabs.Screen
                name="favourites/index"
                options={{
                    title: "Favoritos",
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({color}) => <Ionicons size={28} name="heart-outline" color={color}/>,
                }}
            />

            <Tabs.Screen
                name="userRecipes/index"
                options={{
                    title: "Mis recetas",
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({color}) => <Ionicons size={28} name="library-outline" color={color}/>
                }}
            />
        </Tabs>
    )
}

export default TabsLayout