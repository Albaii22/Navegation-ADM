import React, { useState, useEffect } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadRecordings,saveRecordings } from '../services/RecordingService';
import { Recording } from '../interfaces/recordingInterfaces';


export default function App() {
    const [recording, setRecording] = useState<Audio.Recording | undefined>();
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        (async () => {
            const loadedRecordings = await loadRecordings();
            setRecordings(loadedRecordings);
        })();
        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });
    }, []);
    
    useEffect(() => {
        saveRecordings(recordings);
    }, [recordings]);
    


    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                setIsRecording(true);
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                setMessage("Please grant permission to the app to access the microphone");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (recording) {
            setIsRecording(false);

            await recording.stopAndUnloadAsync();

            try {
                const { sound, status } = await (recording as any).createNewLoadedSoundAsync();

                if (sound) {
                    const updatedRecordings = [...recordings];

                    const newRecording: Recording = {
                        id: Date.now().toString(),
                        duration: getDurationFormatted(status.durationMillis),
                        file: recording.getURI(),
                    };

                    updatedRecordings.push(newRecording);

                    setRecordings(updatedRecordings);
                } else {
                    console.error('Sound object is undefined.');
                }
            } catch (error) {
                console.error('Failed to create a loaded sound from recording', error);
            } finally {
                setRecording(undefined);
            }
        }
    }

    function getDurationFormatted(millis: number): string {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => (
            <View key={index} style={styles.recordItem}>
                <Text style={styles.recordText}>Recording {index + 1} - {recordingLine.duration}</Text>
                <Pressable
                    style={styles.playButton}
                    onPress={() => playRecorFile(recordingLine)}
                >
                    <Text style={styles.playButtonText}>Play</Text>
                </Pressable>
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => deleteRecording(recordingLine.id)}
                >
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                </Pressable>
            </View>
        ));
    }

    const playRecorFile = async (recordFile: Recording): Promise<void> => {
        const playbackobject = new Audio.Sound();
        if (recordFile.file != null) {
            await playbackobject.loadAsync({ uri: recordFile.file });
            await playbackobject.playAsync();
        }
    }

    const deleteRecording = (id: string): void => {
        const updatedRecordings = recordings.filter((recording) => recording.id !== id);
        setRecordings(updatedRecordings);
    }

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('recordings');
            setRecordings([]);
        } catch (e) {
        }
        console.log('Done.');
    }

    return (
        <View style={styles.container}>
            {isRecording && (
                <Text style={styles.recordingText}>
                    Grabando...
                </Text>
            )}

            <Text style={styles.message}>{message}</Text>

            <Button
                title={recording ? 'Stop' : 'Press to record'}
                onPress={recording ? stopRecording : startRecording}
            />

            <ScrollView style={styles.scrollView}>
                {getRecordingLines()}
            </ScrollView>

            <Pressable
                style={styles.deleteAllButton}
                onPress={() => removeValue()}
            >
                <Text style={styles.deleteAllButtonText}>Delete all</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    recordingText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf: 'center',
        opacity: 0.7,
    },
    message: {
        marginVertical: 10,
        color: 'blue',
        fontStyle: 'italic',
    },
    recordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    recordText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    playButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    playButtonText: {
        color: '#fff',
    },
    deleteButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
    },
    scrollView: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    deleteAllButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteAllButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
