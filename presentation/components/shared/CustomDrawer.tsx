import { Ionicons } from '@expo/vector-icons'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useRouter} from "expo-router";
import {useUserStore} from "@/presentation/hooks/store/useStore";
import {APIHandler} from "@/core/api/api_handler";

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const { logout, user } = useUserStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/auth/login');
    };

    const handleDeleteUser = async () => {
        try {
            await APIHandler.delete(`/users/${user?.id}`);
            handleLogout();
        } catch (error) {
            console.log("Cannot delete user");
        }
    };

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

            <DrawerItem
                label="Cerrar sesión"
                icon={({ color, size }) => (
                    <Ionicons name="log-out-outline" size={size} color={color} />
                )}
                onPress={handleLogout}
            />

            <View style={{ marginHorizontal: 16, marginTop: 8 }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#dc2626', padding: 12, borderRadius: 12 }}
                    onPress={handleDeleteUser}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                        Borrar usuario
                    </Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer