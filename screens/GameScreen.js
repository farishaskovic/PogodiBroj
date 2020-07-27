import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import { setLightEstimationEnabled } from 'expo/build/AR';
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumb = Math.floor(Math.random() * (max - min)) + min;
    if (rndNumb === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNumb;
    }
};

const RenderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //const [rounds, setRounds] = useState(0);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const[availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const[availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

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


    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]
    );

    const nextGuessHandler = direction => {
        if (
            (direction === 'nize' && currentGuess < props.userChoice) ||
            (direction === 'vise' && currentGuess > props.userChoice)
        ) {
            Alert.alert("Ne lazite!", 'Znate da je ovo pogresno...', [
                { text: 'Sorry!', style: 'cancel' }
            ]
            );
            return;
        }
        if (direction === 'nize') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds+1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    };

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>
                    Protivnikova pretpostavka
            </Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'nize')} ><Ionicons name="md-remove" size={24} color="white" /></MainButton>
    
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
    
                    <MainButton onPress={nextGuessHandler.bind(this, 'vise')} ><Ionicons name="md-add" size={24} color="white" /></MainButton>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => RenderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        );
    }

        return (
            <View style={styles.screen}>
                <Text>
                    Protivnikova pretpostavka
        </Text>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'nize')} ><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'vise')} ><Ionicons name="md-add" size={24} color="white" /></MainButton>
                </Card>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => RenderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        );
    
        };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;