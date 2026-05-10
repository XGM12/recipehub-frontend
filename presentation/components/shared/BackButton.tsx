import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {TouchableOpacity} from 'react-native';

interface Props {
    onPress?: () => void;
}

const BackButton = ({onPress}: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress ?? (() => router.back())}
            style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <Ionicons name='arrow-back-outline' size={22} color='#1A6B3A'/>
        </TouchableOpacity>
    );
};

export default BackButton;