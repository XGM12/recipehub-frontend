import {Ionicons} from '@expo/vector-icons'
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useRouter} from "expo-router";
import {useUserStore} from "@/presentation/hooks/store/useStore";
import {APIHandler} from "@/core/api/api_handler";

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const {logout, user} = useUserStore();
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
            <View className='items-center py-6 px-4 mb-2'>
                <View
                    className='items-center justify-center bg-primary rounded-full mb-3'
                    style={{width: 72, height: 72}}
                >
                    <Text className='text-white font-work-black text-2xl'>RH</Text>
                </View>
                <Text style={{fontSize: 20, fontWeight: '900'}} className='text-gray-900'>
                    RecipeHub
                </Text>
                <Text className='text-gray-400 text-sm mt-1'>{user?.name}</Text>
            </View>

            <DrawerItem
                label="Inicio"
                icon={({color, size}) => (
                    <Ionicons name="home-outline" size={size} color={color}/>
                )}
                onPress={() => router.push('/home')}
            />

            <DrawerItem
                label={"Perfil"}
                icon={({color, size}) => (
                    <Ionicons name="person-outline" size={size} color={color}/>
                )}
                onPress={() => router.push("/profile")}
            />

            <DrawerItem
                label="Cerrar sesión"
                icon={({color, size}) => (
                    <Ionicons name="log-out-outline" size={size} color={color}/>
                )}
                onPress={handleLogout}
            />

            <View style={{marginHorizontal: 16, marginTop: 8}}>
                <TouchableOpacity
                    style={{backgroundColor: '#dc2626', padding: 12, borderRadius: 12}}
                    onPress={handleDeleteUser}
                >
                    <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
                        Borrar usuario
                    </Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer