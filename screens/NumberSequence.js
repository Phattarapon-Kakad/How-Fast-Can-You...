import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = 60;
const HEADER_HEIGHT = 120;
const BOTTOM_MARGIN = 50;

const NumberSequence = () => {
  const [level, setLevel] = useState(1);
  const [buttonData, setButtonData] = useState([]);
  const [targetSequence, setTargetSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNumbers, setShowNumbers] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [completedLevel, setCompletedLevel] = useState(0);
  const [failedLevel, setFailedLevel] = useState(0);

  const containerRef = useRef(null);

  // Generate first level for the background display
  useEffect(() => {
    if (gameState === 'start' && buttonData.length === 0) {
      generateLevel(level);
    }
  }, [gameState]);

  const getRandomPosition = (existingPositions) => {
    let newX, newY, overlapping;
    const maxX = width - BUTTON_SIZE - 10;
    const maxY = height - BUTTON_SIZE - HEADER_HEIGHT - BOTTOM_MARGIN;
    const minX = 10;
    const minY = HEADER_HEIGHT;

    do {
      overlapping = false;
      newX = Math.random() * (maxX - minX) + minX;
      newY = Math.random() * (maxY - minY) + minY;

      for (const pos of existingPositions) {
        const distance = Math.sqrt((newX - pos.x) ** 2 + (newY - pos.y) ** 2);
        if (distance < BUTTON_SIZE * 1.2) {
          overlapping = true;
          break;
        }
      }
    } while (overlapping);

    return { x: newX, y: newY };
  };

  const generateLevel = (currentLevel) => {
    const count = currentLevel + 4;
    const sortedSequence = Array.from({ length: count }, (_, i) => i + 1);
    setTargetSequence(sortedSequence);

    const shuffledSequence = [...sortedSequence].sort(() => Math.random() - 0.5);
    const positions = [];
    const newButtonData = shuffledSequence.map(number => {
      const position = getRandomPosition(positions);
      positions.push(position);
      return { number, ...position };
    });

    setButtonData(newButtonData);
    setCurrentIndex(0);
    setShowNumbers(true);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      generateLevel(level);
    }
  }, [level, gameState]);

  const handleNumberPress = (pressedNumber) => {
    if (gameState !== 'playing') return;

    const expectedNumber = targetSequence[currentIndex];
    if (pressedNumber === expectedNumber) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      if (nextIndex === 1) setShowNumbers(false);

      // ลบปุ่มที่กดถูกออก
      setButtonData(prev =>
        prev.filter(btn => btn.number !== pressedNumber)
      );

      if (nextIndex === targetSequence.length) {
        setCompletedLevel(level);
        setGameState('levelComplete');
      }
    } else {
      setFailedLevel(level);
      setGameState('gameOver');
    }
  };

  const handleNextLevel = () => {
    setLevel(prev => prev + 1);
    setGameState('playing');
  };

  const handleTryAgain = () => {
    setLevel(1); // รีเซตด่านเป็น 1
    setCurrentIndex(0);
    setButtonData([]);
    setTargetSequence([]);
    setShowNumbers(true);
    setGameState('start');
  };

  // Function to start the game from the initial screen
  const startGame = () => {
    setGameState('playing');
  };

  // Render the game board with buttons
  const renderGameBoard = () => {
    return (
      <>
        <Text style={styles.levelText}>Level: {level}</Text>
        <View style={styles.buttonArea}>
          {buttonData.map(({ number, x, y }, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.numberButton, { left: x, top: y, position: 'absolute' }]}
              onPress={() => handleNumberPress(number)}
              disabled={gameState === 'start'}
            >
              <Text style={styles.numberText}>
                {showNumbers ? number : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {gameState === 'playing' && (
          <Text style={styles.instructionText}>
            {currentIndex === 0
              ? 'Click number 1 to start'
              : `Click number ${targetSequence[currentIndex]}`}
          </Text>
        )}
      </>
    );
  };

  const renderGameContent = () => {
    switch (gameState) {
      case 'levelComplete':
        return (
          <View style={styles.resultContainer}>
            <View style={styles.resultCard}>
              <Text style={[styles.resultTitle, styles.successText]}>Level {completedLevel} Complete!</Text>
              <TouchableOpacity style={styles.actionButton} onPress={handleNextLevel}>
                <Text style={styles.actionButtonText}>Next Level</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'gameOver':
        return (
          <View style={styles.resultContainer}>
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Game Over!</Text>
              <Text style={styles.resultSubtitle}>You reached Level {failedLevel}</Text>
              <TouchableOpacity style={styles.actionButton} onPress={handleTryAgain}>
                <Text style={styles.actionButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return renderGameBoard();
    }
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.headerContainer}>
              <Text style={styles.appName}>How many can you Remember?</Text>
            </View>
      
      {/* Game content always visible */}
      {renderGameContent()}
      
      {/* Start overlay */}
      {gameState === 'start' && (
        <View style={styles.overlay}>
          <View style={styles.startText}>
            <Ionicons name="apps" size={150} color={THEME.primary} />
          </View>
            <View style={styles.headerContainer}>
              <Text style={styles.appName}>How many can you Remember?</Text>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={startGame}>
              <Text style={styles.actionButtonText}>Start Game</Text>
            </TouchableOpacity>
            <Text style={styles.startInstructionText}>
              Press number in order
            </Text>
        </View>
      )}
    </View>
  );
};

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
  levelText: {
    position: 'absolute',
    top: 120,
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.primary,
    zIndex: 10,
  },
  buttonArea: { // Container for absolutely positioned buttons
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  numberButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.lightText,
  },
  instructionText: {
    position: 'absolute',
    bottom: 30,
    fontSize: 16,
    color: THEME.darkText,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  startContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 30,
    borderRadius: 15,
    width: '80%',
  },
  startInstructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
    opacity: 0.7,
  },
  startText: {
    color: THEME.primary,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Styles for result screens
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    width: '90%',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: THEME.danger,
    marginBottom: 20,
    textAlign: 'center',
  },
  successText: {
    color: THEME.secondary,
  },
  resultSubtitle: {
    fontSize: 20,
    color: THEME.primary,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: THEME.secondary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
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
});

export default NumberSequence;
