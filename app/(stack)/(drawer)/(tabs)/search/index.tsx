import {Ionicons} from '@expo/vector-icons';
import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RecipeList from '@/presentation/components/recipes/RecipeList';
import ThemedTextInput from '@/presentation/components/shared/ThemedTextInput';
import {useSearch} from '@/presentation/hooks/search/useSearch';

const CATEGORIES = ['Entrante', 'Principal', 'Postre'];

const SearchScreen = () => {
    const [name, setName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['Entrante']);

    const {querySearch} = useSearch(name, selectedCategories);
    const recipes = querySearch.data ?? [];

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category) && prev.length === 1) return prev;
            return prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category];
        });
    };

    return (
        <ScrollView className='flex-1 bg-white px-4 pt-6'>

            {/* Barra de búsqueda */}
            <ThemedTextInput
                icon='search-outline'
                placeholder='Buscar recetas...'
                value={name}
                onChangeText={setName}
            />

            {/* Selector de categorías */}
            <View className='flex-row mt-4 mb-6' style={{gap: 8}}>
                {CATEGORIES.map(category => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => toggleCategory(category)}
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 20,
                            backgroundColor: selectedCategories.includes(category) ? '#1A6B3A' : '#f3f4f6',
                        }}
                    >
                        <Text style={{
                            color: selectedCategories.includes(category) ? 'white' : '#6b7280',
                            fontWeight: '600',
                            fontSize: 13,
                        }}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Resultados */}
            {querySearch.isLoading ? (
                <View className='items-center py-8'>
                    <Ionicons name='search-outline' size={40} color='#d1d5db'/>
                    <Text className='text-gray-400 text-sm mt-2'>Buscando...</Text>
                </View>
            ) : recipes.length === 0 && (name.length > 0 || selectedCategories.length > 0) ? (
                <View className='items-center py-8'>
                    <Ionicons name='sad-outline' size={40} color='#d1d5db'/>
                    <Text className='text-gray-400 text-sm mt-2'>No se encontraron recetas</Text>
                </View>
            ) : (
                <RecipeList recipes={recipes}/>
            )}

        </ScrollView>
    );
}

export default SearchScreen;