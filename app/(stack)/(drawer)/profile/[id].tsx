import {Ionicons} from '@expo/vector-icons';
import {useLocalSearchParams} from "expo-router";
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecipes} from '@/presentation/hooks/recipes/useRecipes';
import {useUser} from '@/presentation/hooks/user/useUser';
import RecipeList from '@/presentation/components/recipes/RecipeList';

const UserProfile = () => {
    const {id} = useLocalSearchParams();
    const {queryUserById} = useUser(id as string);
    const user = queryUserById.data;

    const {queryFavourite} = useRecipes(user?.id);
    const recipes = queryFavourite.data?.flat() ?? [];

    if (!user) return null;

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView className='flex-1 px-4'>

                {/* Avatar + nombre */}
                <View className='items-center py-8'>
                    <View
                        className='items-center justify-center bg-gray-100 rounded-full mb-4'
                        style={{width: 100, height: 100}}
                    >
                        <Ionicons name='person' size={56} color='#9ca3af'/>
                    </View>

                    <Text style={{fontSize: 26, fontWeight: '900'}} className='text-gray-900'>
                        {user.name}
                    </Text>
                    <Text className='text-gray-400 text-sm mt-1'>{user.email}</Text>
                </View>

                {/* Datos */}
                <View className='bg-gray-50 rounded-2xl p-4 mb-6'>
                    <Text style={{fontWeight: '900'}} className='text-gray-500 text-xs mb-3 uppercase tracking-widest'>
                        Información
                    </Text>

                    <View className='flex-row items-center py-3 border-b border-gray-100'>
                        <Ionicons name='person-outline' size={18} color='#6b7280'/>
                        <Text className='text-gray-500 ml-3 w-24'>Nombre</Text>
                        <Text className='text-gray-900 font-work-medium flex-1'>{user.name}</Text>
                    </View>

                    <View className='flex-row items-center py-3 border-b border-gray-100'>
                        <Ionicons name='mail-outline' size={18} color='#6b7280'/>
                        <Text className='text-gray-500 ml-3 w-24'>Email</Text>
                        <Text className='text-gray-900 font-work-medium flex-1'>{user.email}</Text>
                    </View>

                    <View className='flex-row items-center py-3'>
                        <Ionicons name='calendar-outline' size={18} color='#6b7280'/>
                        <Text className='text-gray-500 ml-3 w-24'>Miembro desde</Text>
                        <Text className='text-gray-900 font-work-medium flex-1'>
                            {new Date(user.createdAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Text>
                    </View>
                </View>

                {/* Favoritos */}
                <Text style={{fontSize: 18, fontWeight: '900'}} className='text-gray-800 mb-3'>
                    Recetas favoritas
                </Text>

                {queryFavourite.isLoading ? (
                    <View className='items-center py-8'>
                        <Ionicons name='restaurant-outline' size={40} color='#d1d5db'/>
                        <Text className='text-gray-400 text-sm mt-2'>Cargando recetas...</Text>
                    </View>
                ) : recipes.length === 0 ? (
                    <View className='items-center py-8 bg-gray-50 rounded-2xl'>
                        <Ionicons name='heart-outline' size={40} color='#d1d5db'/>
                        <Text className='text-gray-400 text-sm mt-2'>Este usuario no tiene favoritos aún</Text>
                    </View>
                ) : (
                    <RecipeList recipes={recipes}/>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

export default UserProfile;