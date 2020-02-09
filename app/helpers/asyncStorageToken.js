import { AsyncStorage } from 'react-native';

const setTokenAsyncStorage = async (userToken) => {
    try {
        await AsyncStorage.setItem('ctsToken', userToken);
    }catch (error) {
        // TODO
    }
};

const getTokenAsyncStorage = async () => {
    return AsyncStorage.getItem('ctsToken').then((token) => {
        // return ' 5cef07ef-ad97-44ca-94cb-a9c6b03e9138';
        return 'Basic IDVjZWYwN2VmLWFkOTctNDRjYS05NGNiLWE5YzZiMDNlOTEzODogNWNlZjA3ZWYtYWQ5Ny00NGNhLTk0Y2ItYTljNmIwM2U5MTM4';
        // return token;
    }).catch(error => console.log(error));
};

const removeTokenAsyncStorage = async () => {
    try {
        await AsyncStorage.removeItem('ctsToken');
        return true;
    }catch (error) {
        // TODO
        return false;
    }
};

export default {
    setTokenAsyncStorage,
    getTokenAsyncStorage,
    removeTokenAsyncStorage
};