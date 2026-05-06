import { Ionicons } from '@expo/vector-icons'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { router } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View className='flex justify-center items-center bg-white rounded-full h-32 w-32'>
                <Text className='text-primary font-work-black text-sm text-center'>RecipeHub</Text>
            </View>

            <DrawerItem
                label="Inicio"
                icon={({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                )}
                onPress={() => router.push('/home')}
            />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer