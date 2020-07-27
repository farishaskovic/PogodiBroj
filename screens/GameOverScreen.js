import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors'
import MainButton from '../components/MainButton';
const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);

        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    return (
       
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Gotova igra!</TitleText>
                <View style={{
                    ...styles.imageContainer, ...{
                        width: availableDeviceWidth * 0.7,
                        height: availableDeviceWidth * 0.7,
                        borderRadius: availableDeviceWidth * 0.7 / 2, marginVertical: availableDeviceHeight / 30
                    }
                }}>
                    <Image style={styles.image} source={require('../assets/success.png')} resizeMode="cover" />
                </View>
                <View style={{ ...styles.resultContainer, ...{ marginVertical: availableDeviceHeight / 60 } }}>
                    <BodyText style={{ ...styles.resultText, ...{ fontSize: availableDeviceHeight > 400 ? 16 : 20 } }}>Vas telefon je trebao <Text style={styles.highlight}>{props.roundsNumber}</Text> rundi da pogodi broj <Text style={styles.highlight}>{props.userNumber}.</Text> </BodyText>
                </View>
                <MainButton onPress={props.onRestart} >NOVA IGRA</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    imageContainer: {

        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden'

    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,

    },
    resultText: {
        textAlign: 'center',

    }
});

export default GameOverScreen;