import {Ionicons} from '@expo/vector-icons';
import {router, useLocalSearchParams} from 'expo-router';
import {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useRecipes} from '@/presentation/hooks/recipes/useRecipes';
import {useUserStore} from '@/presentation/hooks/store/useStore';
import BackButton from "@/presentation/components/shared/BackButton";

const RecipeScreen = () => {
    const {id} = useLocalSearchParams();
    const {user} = useUserStore();
    const {queryRecipe, mutateAddFavourite, mutateRemoveFavourite} = useRecipes(id as string);
    const [imageError, setImageError] = useState(false);

    const recipe = queryRecipe.data;

    if (!recipe) return null;

    const isFavourite = recipe.user.some(u => u.id === user?.id);
    const isOwner = recipe.createdBy?.id === user?.id;

    const handleFavourite = () => {
        if (isFavourite) {
            mutateRemoveFavourite.mutate({userId: user!.id, recipeId: recipe.id});
        } else {
            mutateAddFavourite.mutate({userId: user!.id, recipeId: recipe.id});
        }
    };

    return (
        <ScrollView className='flex-1 bg-white'>
            <View style={{position: 'absolute', top: 48, left: 16, zIndex: 10}}>
                <BackButton />
            </View>

            {imageError ? (
                <View style={{height: 250, backgroundColor: '#f3f4f6'}} className='items-center justify-center'>
                    <Ionicons name='image-outline' size={48} color='#d1d5db'/>
                </View>
            ) : (
                <Image
                    source={{uri: recipe.imageUrl}}
                    style={{width: '100%', height: 250}}
                    resizeMode='cover'
                    onError={() => setImageError(true)}
                />
            )}

            <View className='px-4 pt-4 pb-10'>
                <View className='flex-row items-center justify-between mb-2'>
                    <Text className='text-2xl font-work-black text-gray-900 flex-1 mr-4'>
                        {recipe.name}
                    </Text>
                    <View className='flex-row items-center' style={{gap: 12}}>
                        {isOwner && (
                            <TouchableOpacity
                                onPress={() => router.push(`/edit/${recipe?.id}`)}
                            >
                                <Ionicons name='pencil-outline' size={24} color='#6b7280'/>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleFavourite}>
                            <Ionicons
                                name={isFavourite ? 'heart' : 'heart-outline'}
                                size={28}
                                color={isFavourite ? '#ef4444' : '#d1d5db'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='flex-row items-center mb-4' style={{gap: 16}}>
                    <Text className='text-sm text-primary font-work-medium'>
                        {recipe.category}
                    </Text>
                    <View className='flex-row items-center' style={{gap: 4}}>
                        <Ionicons name='time-outline' size={14} color='#6b7280'/>
                        <Text className='text-sm text-gray-500'>{recipe.prepTimeMinutes} min</Text>
                    </View>
                </View>

                <Text style={{fontSize: 18, fontWeight: '900'}} className='text-gray-800 mb-3'>
                    Ingredientes
                </Text>
                <View className='mb-6'>
                    {recipe.recipeIngredients.map((ri, index) => (
                        <View key={index} className='flex-row justify-between py-2 border-b border-gray-100'>
                            <Text className='text-gray-800 font-work-medium'>{ri.ingredient.name}</Text>
                            <Text className='text-gray-500'>{ri.quantity}</Text>
                        </View>
                    ))}
                </View>

                <Text style={{fontSize: 18, fontWeight: '900'}} className='text-gray-800 mb-3'>
                    Preparación
                </Text>
                <View className='mb-6'>
                    {recipe.steps
                        .sort((a, b) => a.stepOrder - b.stepOrder)
                        .map((step) => (
                            <View key={step.id} className='flex-row mb-4'>
                                <View
                                    className='items-center justify-center bg-primary rounded-full mr-3'
                                    style={{width: 28, height: 28, minWidth: 28}}
                                >
                                    <Text className='text-white font-work-bold text-sm'>
                                        {step.stepOrder}
                                    </Text>
                                </View>
                                <Text className='text-gray-700 flex-1 leading-6'>
                                    {step.description}
                                </Text>
                            </View>
                        ))}
                </View>

                <Text style={{fontSize: 18, fontWeight: '900'}} className='text-gray-800 mb-3'>
                    Seguidores
                </Text>
                {recipe.user.length === 0 ? (
                    <Text className='text-gray-400 text-sm'>Esta receta no tiene seguidores aún</Text>
                ) : (
                    <View>
                        {recipe.user.map((u) => (
                            <View key={u.id} className='flex-row items-center py-2 border-b border-gray-100'>
                                <View
                                    className='items-center justify-center bg-gray-100 rounded-full mr-3'
                                    style={{width: 36, height: 36}}
                                >
                                    <Text className='text-gray-600 font-work-bold text-sm'>
                                        {u.name.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                                <Text
                                    className='text-gray-800 font-work-medium'
                                    onPress={() => router.push(`/profile/${u.id}`)}
                                >{u.name}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default RecipeScreen;