import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recording } from '../interfaces/recordingInterface';

export const loadRecordings = async () => {
    try {
        const storedRecordings = await AsyncStorage.getItem('recordings');
        if (storedRecordings) {
            return JSON.parse(storedRecordings);
        }
        return [];
    } catch (error) {
        console.error('Error loading recordings from AsyncStorage:', error);
        return [];
    }
};

export const saveRecordings = async (recordings: Recording[]) => {
    try {
        const recordingsToSave = JSON.stringify(recordings);
        await AsyncStorage.setItem('recordings', recordingsToSave);
    } catch (error) {
        console.error('Error saving recordings to AsyncStorage:', error);
    }
};