import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RecipeList from '@/presentation/components/recipes/RecipeList';
import {useRecipes} from '@/presentation/hooks/recipes/useRecipes';
import {useUserStore} from '@/presentation/hooks/store/useStore';

const UserRecipesScreen = () => {
    const {user} = useUserStore();
    const {queryUserRecipes} = useRecipes(user?.id);

    const userRecipes = queryUserRecipes.data?.flat() ?? [];

    return (
        <ScrollView className='flex-1 bg-white px-4 pt-6'>
            <View className='flex-row items-center justify-between mb-4'>
                <Text style={{fontSize: 22, fontWeight: '900'}} className='text-gray-800'>
                    Mis recetas
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/recipe/create')}
                    className='flex-row items-center bg-primary px-4 py-2 rounded-xl'
                    style={{gap: 4}}
                >
                    <Ionicons name='add-outline' size={18} color='white'/>
                    <Text className='text-white font-work-bold text-sm'>Nueva</Text>
                </TouchableOpacity>
            </View>

            {queryUserRecipes.isLoading ? (
                <View className='items-center py-8'>
                    <Ionicons name='restaurant-outline' size={40} color='#d1d5db'/>
                    <Text className='text-gray-400 text-sm mt-2'>Cargando...</Text>
                </View>
            ) : userRecipes.length === 0 ? (
                <View className='items-center py-8'>
                    <Ionicons name='restaurant-outline' size={40} color='#d1d5db'/>
                    <Text className='text-gray-400 text-sm mt-2'>No tienes recetas aún</Text>
                    <TouchableOpacity
                        onPress={() => router.push('/recipe/create')}
                        className='mt-4 bg-primary px-6 py-3 rounded-xl'
                    >
                        <Text className='text-white font-work-bold'>Crear mi primera receta</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <RecipeList recipes={userRecipes}/>
            )}
        </ScrollView>
    );
}

export default UserRecipesScreen;