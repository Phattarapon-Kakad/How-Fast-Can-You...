import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// Theme colors
const THEME = {
  primary: '#3498db',        // Blue - primary color
  secondary: 'rgb(46, 78, 204)',      // Green - secondary color
  accent: '#9b59b6',         // Purple - accent color
  background: '#f5f9ff',     // Light blue background
  darkText: '#2c3e50',       // Dark blue text
  lightText: '#ecf0f1',      // Light text
  danger: '#e74c3c',         // Red for warnings/errors
  shadow: '#bdc3c7',         // Shadow color
  headerBg: 'rgba(52, 152, 219, 0.05)', // Very light blue for header
};

const MemoryTest = () => {
  const [level, setLevel] = useState(1);
  const [generatedNumber, setGeneratedNumber] = useState('');
  const [showNumber, setShowNumber] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState('start'); // start, playing, win, lose
  const [countdown, setCountdown] = useState(3); // Countdown for showing the number

  useEffect(() => {
    if (gameState === 'playing') {
      const number = generateRandomNumber(level);
      setGeneratedNumber(number);
      setShowNumber(true);
      setCountdown(3);

      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(countdownTimer);
            setShowNumber(false);
          }
          return prev - 1;
        });
      }, 1000);

      const numberTimeout = setTimeout(() => {
        setShowNumber(false);
      }, 3000);

      return () => {
        clearInterval(countdownTimer);
        clearTimeout(numberTimeout);
      };
    }
  }, [gameState, level]);

  const generateRandomNumber = (length) => {
    let number = '';
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10).toString();
    }
    return number;
  };

  const handleSubmit = () => {
    if (userInput === generatedNumber) {
      setLevel(prev => prev + 1);
      setUserInput('');
      setGameState('playing');
    } else {
      setGameState('lose');
    }
  };

  // Called by "Start" button and "Try Again" button
  const initializeGame = () => {
    setLevel(1);
    setUserInput('');
    setGameState('start'); // Set state to start, showing the start button
  };

  // Called only by the initial "Start" button
  const beginPlaying = () => {
     setGameState('playing'); // Set state to playing to start the countdown/game
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.appName}>How fast can you Remember?</Text>
      </View>

      <View style={styles.contentContainer}>
        {gameState === 'start' && (
          <>
            <Text style={styles.startText}>123...</Text>

            <TouchableOpacity onPress={beginPlaying} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Start Memory Game</Text>
            </TouchableOpacity>
            <Text style={styles.instructionText}>
              Write down the number that appears on the screen
            </Text>
          </>
        )}

        {gameState === 'playing' && (
          <>
            <Text style={styles.levelText}>Level {level}</Text>
            {showNumber ? (
              <View style={styles.numberCard}>
                <Text style={styles.numberText}>{generatedNumber}</Text>
                <Text style={styles.countdownText}>Time Left: {countdown}</Text>
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <TextInput
                  value={userInput}
                  onChangeText={setUserInput}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter the number"
                  placeholderTextColor={THEME.darkText + '80'}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {gameState === 'lose' && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Game Over!</Text>
            <Text style={styles.levelResultText}>You reached Level {level}</Text>
            {/* Use initializeGame for the try again button */}
            <TouchableOpacity onPress={initializeGame} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default MemoryTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 30,
    zIndex: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    width: '100%',
  },
  actionButton: {
    backgroundColor: THEME.secondary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
    shadowColor: THEME.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: THEME.lightText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  startText: {
    color: THEME.primary,
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionText: {
    color: THEME.darkText,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
    opacity: 0.7,
  },
  levelText: {
    fontSize: 28,
    color: THEME.primary,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  numberCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: '80%',
  },
  numberText: {
    fontSize: 48,
    color: THEME.primary,
    marginBottom: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  countdownText: {
    fontSize: 24,
    color: THEME.danger,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    fontSize: 20,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: THEME.darkText,
    borderWidth: 1,
    borderColor: THEME.primary + '40',
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: '80%',
  },
  resultText: {
    fontSize: 32,
    color: THEME.danger,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  levelResultText: {
    fontSize: 24,
    color: THEME.primary,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
