import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import RecipeList from '@/presentation/components/recipes/RecipeList';
import { useRecipes } from '@/presentation/hooks/recipes/useRecipes';
import { useUserStore } from '@/presentation/hooks/store/useStore';

const FavouritesScreen = () => {
    const { user } = useUserStore();
    const { queryFavourite } = useRecipes(user?.id);

    const favourites = queryFavourite.data?.flat() ?? [];

    return (
        <ScrollView className='flex-1 bg-white px-4 pt-6'>
            <Text style={{ fontSize: 22, fontWeight: '900' }} className='text-gray-800 mb-4'>
                Mis favoritos
            </Text>

            {queryFavourite.isLoading ? (
                <View className='items-center py-8'>
                    <Ionicons name='heart-outline' size={40} color='#d1d5db' />
                    <Text className='text-gray-400 text-sm mt-2'>Cargando...</Text>
                </View>
            ) : favourites.length === 0 ? (
                <View className='items-center py-8'>
                    <Ionicons name='heart-outline' size={40} color='#d1d5db' />
                    <Text className='text-gray-400 text-sm mt-2'>No tienes recetas favoritas aún</Text>
                </View>
            ) : (
                <RecipeList recipes={favourites} />
            )}
        </ScrollView>
    );
}

export default FavouritesScreen;