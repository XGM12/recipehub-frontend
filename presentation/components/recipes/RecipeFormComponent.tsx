import {Ionicons} from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ThemedTextInput from '@/presentation/components/shared/ThemedTextInput';
import {Recipe} from '@/types/Recipes';
import {RecipeForm} from '@/core/actions/recipes_action';
import BackButton from "@/presentation/components/shared/BackButton";

const CATEGORIES = ['Entrante', 'Principal', 'Postre'];

interface RecipeFormProps {
    initialData?: Recipe;
    onSubmit: (recipe: RecipeForm) => void;
    isLoading?: boolean;
    title: string;
    submitLabel: string;
}

const RecipeFormComponent = ({initialData, onSubmit, isLoading, title, submitLabel}: RecipeFormProps) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Principal');
    const [prepTimeMinutes, setPrepTimeMinutes] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [ingredients, setIngredients] = useState([{name: '', quantity: ''}]);
    const [steps, setSteps] = useState([{description: ''}]);

    // Precarga si hay datos iniciales
    useEffect(() => {
        if (!initialData) return;
        setName(initialData.name);
        setCategory(initialData.category);
        setPrepTimeMinutes(initialData.prepTimeMinutes.toString());
        setImageUrl(initialData.imageUrl ?? '');
        setIngredients(initialData.recipeIngredients.map(ri => ({
            name: ri.ingredient.name,
            quantity: ri.quantity,
        })));
        setSteps(initialData.steps
            .sort((a, b) => a.stepOrder - b.stepOrder)
            .map(s => ({description: s.description}))
        );
    }, [initialData]);

    // Ingredientes
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

    // Pasos
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

    // Submit
    const handleSubmit = () => {
        console.log("hanle submit llamado")
        if (!name || !prepTimeMinutes || !imageUrl) {
            setError('Rellena todos los campos obligatorios');
            return;
        }

        setError('');

        onSubmit({
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
        });
    };

    return (
        <ScrollView className='flex-1 bg-white px-4 pt-6 pb-10'>
            <BackButton/>

            <Text style={{fontSize: 22, fontWeight: '900'}} className='text-gray-800 mb-6'>
                {title}
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
                    <View key={index} className='flex-row items-start mb-3' style={{gap: 8}}>
                        <View
                            className='items-center justify-center bg-primary rounded-full'
                            style={{width: 28, height: 28, minWidth: 28, marginTop: 12}}
                        >
                            <Text className='text-white font-work-bold text-sm'>{index + 1}</Text>
                        </View>

                        <View style={{flex: 1}}>
                            <ThemedTextInput
                                placeholder={`Paso ${index + 1}...`}
                                value={step.description}
                                onChangeText={(v) => updateStep(index, v)}
                                multiline
                                textAlignVertical='top'
                                style={{minHeight: 80, width: '100%'}}
                                className='border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 text-gray-800'
                            />
                        </View>

                        <TouchableOpacity onPress={() => removeStep(index)} style={{marginTop: 12}}>
                            <Ionicons name='trash-outline' size={20} color='#ef4444'/>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {error ? (
                <Text className='text-red-500 text-sm text-center mb-4'>{error}</Text>
            ) : null}

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                className='bg-primary rounded-xl py-4 active:opacity-80 mb-10'
                style={{opacity: isLoading ? 0.6 : 1}}
            >
                <Text className='text-white text-center font-work-black text-lg'>
                    {isLoading ? 'Guardando...' : submitLabel}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RecipeFormComponent;