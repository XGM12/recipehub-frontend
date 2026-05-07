import {View, Text, Animated} from 'react-native'
import React from 'react'
import ScrollView = Animated.ScrollView;
import {useUserStore} from "@/presentation/hooks/store/useStore";
import {useRecipes} from "@/presentation/hooks/recipes/useRecipes";
import RecipeList from "@/presentation/components/recipes/RecipeList";

const HomeScreen = () => {
    const {user} = useUserStore();
    const {querySystemRecipes, queryCommunityRecipes} = useRecipes(user?.id);

    const systemRecipes = querySystemRecipes.data?.flat() ?? [];
    const communityRecipes = queryCommunityRecipes.data?.flat() ?? [];

    return (
        <ScrollView className='flex-1 bg-white px-4 pt-10'>
            <View className='items-center py-6 mb-4'>
                <Text style={{fontSize: 48, fontWeight: '900', fontStyle: 'italic'}} className='text-primary'>
                    Hola, {user?.name}
                </Text>
            </View>

            <View className='mb-6'>
                <Text style={{fontSize: 22, fontWeight: '900'}} className='text-gray-800 mb-3'>
                    Descubrir recetas
                </Text>
                <RecipeList recipes={systemRecipes}/>
            </View>

            <View className='mb-6'>
                <Text style={{fontSize: 22, fontWeight: '900'}} className='text-gray-800 mb-3'>
                    Recetas de la comunidad
                </Text>
                {communityRecipes.length === 0
                    ? <Text className='text-gray-400 text-sm'>No hay recetas de la comunidad</Text>
                    : <RecipeList recipes={communityRecipes}/>
                }
            </View>
        </ScrollView>
    );
}

export default HomeScreen

