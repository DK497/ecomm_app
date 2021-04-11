import { PicovoiceManager } from '@picovoice/picovoice-react-native';

import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Voicerecog = () => {
    var _picovoiceManager;
    const [isListening, setisListening] = useState(false)

    async function createPicovoiceManager() {
        try {
            _picovoiceManager = await PicovoiceManager.create(
                '../speech_recog/file.ppn',
                _wakeWordCallback,
                '../speech_recog/file.rhn',
                _inferenceCallback);
        } catch (err) {
            // handle error
        }
    }

    const _wakeWordCallback=(keywordIndex)=>{
        if(keywordIndex === 0){
          // turn mic blue to show we're listening
          setisListening(true)
         
        }
    }

    function _inferenceCallback(inference) {
        // `inference` is a JSON object with the following fields:
        // (1) isUnderstood
        // (2) intent
        // (3) slots      
    }
    const _requestRecordAudioPermission = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Microphone Permission',
                message: '[Permission explanation]',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        return (granted === PermissionsAndroid.RESULTS.GRANTED)
    }
    let recordAudioRequest;
    if (Platform.OS == 'android') {
        // For Android, we need to explicitly ask
        recordAudioRequest = _requestRecordAudioPermission();
    } else {
        // iOS automatically asks for permission
        recordAudioRequest = new Promise(function (resolve, _) {
            resolve(true);
        });
    }

    recordAudioRequest.then((hasPermission) => {
        if (!hasPermission) {
            console.error('Required microphone permission was not granted.');
            return;
        }

        // start feeding Picovoice
        // Once .start() has been called, Picovoice is listening for our “PicoClock”
        //  keyword and any commands that follow.
        _picovoiceManager?.start().then((didStart) => {
            if (didStart) {
                // let app know we're ready to go
            }
        });

    });




    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Voicerecog

const styles = StyleSheet.create({})


