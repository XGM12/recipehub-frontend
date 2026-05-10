import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {useState} from 'react';
import {Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ThemedTextInput from '@/presentation/components/shared/ThemedTextInput';
import {useRecipes} from '@/presentation/hooks/recipes/useRecipes';
import {useUserStore} from '@/presentation/hooks/store/useStore';

const CATEGORIES = ['Entrante', 'Principal', 'Postre'];

const CreateFormScreen = () => {
    const {user} = useUserStore();
    const {createRecipe} = useRecipes(user?.id);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('Principal');
    const [prepTimeMinutes, setPrepTimeMinutes] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const [ingredients, setIngredients] = useState([
        {name: '', quantity: ''}
    ]);

    const [steps, setSteps] = useState([
        {description: ''}
    ]);

    const addIngredient = () => setIngredients([...ingredients, {name: '', quantity: ''}]);

    const removeIngredient = (index: number) => {
        if (ingredients.length === 1) return;
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const updateIngredient = (index: number, field: 'name' | 'quantity', value: string) => {
        const updated = [...ingredients];
        updated[index][field] = value;
        setIngredients(updated);
    };

    const addStep = () => setSteps([...steps, {description: ''}]);

    const removeStep = (index: number) => {
        if (steps.length === 1) return;
        setSteps(steps.filter((_, i) => i !== index));
    };

    const updateStep = (index: number, value: string) => {
        const updated = [...steps];
        updated[index].description = value;
        setSteps(updated);
    };

    const handleSubmit = () => {
        if (!name || !prepTimeMinutes || !imageUrl) {
            setError('Rellena todos los campos obligatorios');
            return;
        }

        setError('');

        createRecipe.mutate(
            {
                id: user!.id,
                recipe: {
                    name,
                    category,
                    prepTimeMinutes: parseInt(prepTimeMinutes),
                    imageUrl,
                    steps: steps.map((s, i) => ({
                        step_order: i + 1,
                        description: s.description,
                    })),
                    ingredients: ingredients.map(i => ({
                        name: i.name,
                        quantity: i.quantity,
                    })),
                }
            },
            {
                onSuccess: () => router.back(),
                onError: () => setError('No se pudo crear la receta'),
            }
        );
    };

    return (
        <ScrollView className='flex-1 bg-white px-4 pt-6 pb-10'>
            <Text style={{fontSize: 22, fontWeight: '900'}} className='text-gray-800 mb-6'>
                Nueva receta
            </Text>

            {/* Datos básicos */}
            <View style={{gap: 12}} className='mb-6'>
                <View style={{gap: 6}}>
                    <Text className='text-gray-600 font-work-medium text-sm'>Nombre *</Text>
                    <ThemedTextInput
                        placeholder='Nombre de la receta'
                        value={name}
                        onChangeText={setName}
                        className='border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-800'
                    />
                </View>

                <View style={{gap: 6}}>
                    <Text className='text-gray-600 font-work-medium text-sm'>Categoría *</Text>
                    <View className='flex-row' style={{gap: 8}}>
                        {CATEGORIES.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setCategory(cat)}
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    backgroundColor: category === cat ? '#1A6B3A' : '#f3f4f6',
                                }}
                            >
                                <Text style={{
                                    color: category === cat ? 'white' : '#6b7280',
                                    fontWeight: '600',
                                    fontSize: 13,
                                }}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{gap: 6}}>
                    <Text className='text-gray-600 font-work-medium text-sm'>Tiempo de preparación (min) *</Text>
                    <ThemedTextInput
                        placeholder='30'
                        keyboardType='numeric'
                        value={prepTimeMinutes}
                        onChangeText={setPrepTimeMinutes}
                        className='border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-800'
                    />
                </View>

                <View style={{gap: 6}}>
                    <Text className='text-gray-600 font-work-medium text-sm'>URL de la imagen *</Text>
                    <ThemedTextInput
                        placeholder='https://...'
                        value={imageUrl}
                        onChangeText={setImageUrl}
                        autoCapitalize='none'
                        className='border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-800'
                    />
                </View>
            </View>

            {/* Ingredientes */}
            <View className='mb-6'>
                <View className='flex-row items-center justify-between mb-3'>
                    <Text style={{fontSize: 18, fontWeight: '900'}} className='text-gray-800'>
                        Ingredientes
                    </Text>
                    <TouchableOpacity
                        onPress={addIngredient}
                        className='flex-row items-center bg-primary px-3 py-2 rounded-xl'
                        style={{gap: 4}}
                    >
                        <Ionicons name='add-outline' size={16} color='white'/>
                        <Text className='text-white text-sm font-work-bold'>Añadir</Text>
                    </TouchableOpacity>
                </View>

                {ingredients.map((ingredient, index) => (
                    <View key={index} className='flex-row items-center mb-2' style={{gap: 8}}>
                        <ThemedTextInput
                            placeholder='Nombre'
                            value={ingredient.name}
                            onChangeText={(v) => updateIngredient(index, 'name', v)}
                            className='border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 text-gray-800 flex-1'
                        />
                        <ThemedTextInput
                            placeholder='Cantidad'
                            value={ingredient.quantity}
                            onChangeText={(v) => updateIngredient(index, 'quantity', v)}
                            className='border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 text-gray-800'
                            style={{width: 100}}
                        />
                        <TouchableOpacity onPress={() => removeIngredient(index)}>
                            <Ionicons name='trash-outline' size={20} color='#ef4444'/>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Pasos */}
            <View className='mb-6'>
                <View className='flex-row items-center justify-between mb-3'>
                    <Text style={{fontSize: 18, fontWeight: '900'}} className='text-gray-800'>
                        Pasos
                    </Text>
                    <TouchableOpacity
                        onPress={addStep}
                        className='flex-row items-center bg-primary px-3 py-2 rounded-xl'
                        style={{gap: 4}}
                    >
                        <Ionicons name='add-outline' size={16} color='white'/>
                        <Text className='text-white text-sm font-work-bold'>Añadir</Text>
                    </TouchableOpacity>
                </View>

                {steps.map((step, index) => (
                    <View key={index} className='flex-row items-start mb-2' style={{gap: 8}}>
                        <View
                            className='items-center justify-center bg-primary rounded-full mt-3'
                            style={{width: 28, height: 28, minWidth: 28}}
                        >
                            <Text className='text-white font-work-bold text-sm'>{index + 1}</Text>
                        </View>
                        <ThemedTextInput
                            placeholder={`Paso ${index + 1}...`}
                            value={step.description}
                            onChangeText={(v) => updateStep(index, v)}
                            multiline
                            className='border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 text-gray-800 flex-1'
                        />
                        <TouchableOpacity onPress={() => removeStep(index)} className='mt-3'>
                            <Ionicons name='trash-outline' size={20} color='#ef4444'/>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {error ? (
                <Text className='text-red-500 text-sm text-center mb-4'>{error}</Text>
            ) : null}

            <Pressable
                onPress={handleSubmit}
                className='bg-primary rounded-xl py-4 active:opacity-80 mb-10'
            >
                <Text className='text-white text-center font-work-black text-lg'>
                    Guardar receta
                </Text>
            </Pressable>
        </ScrollView>
    );
}

export default CreateFormScreen;