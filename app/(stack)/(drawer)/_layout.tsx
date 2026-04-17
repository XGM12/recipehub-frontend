import CustomDrawer from '@/components/shared/CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

const DrawerLayout = () => {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: true,
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: 'Inicio',
                    drawerLabel: 'Inicio',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    )
}

export default DrawerLayout