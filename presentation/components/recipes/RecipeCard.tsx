import {Ionicons} from '@expo/vector-icons';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Recipe} from "@/types/Recipes";
import {router} from "expo-router";
import {useState} from "react";
import { useUser } from '@/presentation/hooks/user/useUser';

interface Props {
    recipe: Recipe;
    onPress?: () => void;
}

const RecipeCard = ({recipe}: Props) => {
    const [imageError, setImageError] = useState(false);
	const {queryUserById} = useUser(recipe.createdBy as number);
	const creator = queryUserById.data;

    return (
        <TouchableOpacity
            onPress={() => router.push(`/recipe/${recipe.id}`)}
            className='flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100'
        >
            {imageError ? (
                <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#f3f4f6' }}
                      className='items-center justify-center'>
                    <Ionicons name='image-outline' size={28} color='#d1d5db' />
                </View>
            ) : (
                <Image
                    source={{ uri: recipe.imageUrl }}
                    style={{ width: 72, height: 72, borderRadius: 36 }}
                    resizeMode='cover'
                    onError={() => setImageError(true)}
                />
            )}

            <View className='flex-1 ml-4'>
                <Text className='text-lg font-work-bold text-gray-900' numberOfLines={1}>
                    {recipe.name}
                </Text>

                <Text className='text-sm text-primary font-work-medium mt-1'>
                    {recipe.category}
                </Text>

				<TouchableOpacity
                    onPress={() => router.push(`/profile/${recipe.createdBy}`)}
                    className='flex-row items-center mt-1'
                    style={{gap: 4}}
                >
                    <Ionicons name='person-circle-outline' size={14} color='#9ca3af'/>
                    <Text className='text-xs text-gray-400'>
                        {recipe.createdBy === null
                            ? 'RecipeHub'
                            : creator?.name ?? '...'
                        }
                    </Text>
                </TouchableOpacity>

                <View className='flex-row items-center mt-2' style={{gap: 16}}>
                    <View className='flex-row items-center' style={{gap: 4}}>
                        <Ionicons name='time-outline' size={14} color='#6b7280'/>
                        <Text className='text-xs text-gray-500'>{recipe.prepTimeMinutes} min</Text>
                    </View>

                    <View className='flex-row items-center' style={{gap: 4}}>
                        <Ionicons name='people-outline' size={14} color='#6b7280'/>
                        <Text className='text-xs text-gray-500'>{recipe.user.length}</Text>
                    </View>
                </View>
            </View>

            <Ionicons name='chevron-forward-outline' size={20} color='#d1d5db'/>
        </TouchableOpacity>
    );
};

export default RecipeCard;