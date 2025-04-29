import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

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

const ReactionTest = () => {
  const [status, setStatus] = useState('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [tooFast, setTooFast] = useState(false);

  const startGame = () => {
    setReactionTime(null);
    setTooFast(false);
    setStatus('ready');

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    const id = setTimeout(() => {
      setStatus('now');
      setStartTime(Date.now());
    }, randomDelay);
    setTimeoutId(id);
  };

  const handlePress = () => {
    if (reactionTime !== null) {
      return;
    }

    if (status === 'ready') {
      clearTimeout(timeoutId);
      setTooFast(true);
      setReactionTime(0);
      setStatus('waiting');
    } else if (status === 'now') {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setStatus('waiting');
    } else if (status === 'waiting') {
      startGame();
    }
  };

  const getBackgroundColor = () => {
    if (status === 'ready') return '#e74c3c';
    if (status === 'now') return '#2ecc71';
    return THEME.background;
  };

  const playAgain = () => {
    setReactionTime(null);
    setTooFast(false);
    setTimeout(() => {
      setStatus('waiting');
    }, 100);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.fullTouchable, { backgroundColor: getBackgroundColor() }]} 
        onPress={handlePress}
        activeOpacity={1}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.appName}>How fast can you React?</Text>
        </View>
        
        <View style={styles.contentContainer}>
          {reactionTime === null ? (
            status === 'waiting' ? (
              <>
                <View style={styles.colorBoxContainer}>
                  <View style={styles.colorBoxRed} />
                  <View style={styles.colorBoxGreen} />
                </View>
                <View style={styles.actionButton}>
                    <Text style={styles.startText}>Start Game</Text>
                </View>

                <Text style={styles.instructionText}>
                  Click as fast as you can when the green button appears
                </Text>
              </>
            ) : (
              <Text style={styles.text}>
                {status === 'ready' ? 'Click When It Turns Green...' : 'CLICK NOW!!'}
              </Text>
            )
          ) : (
            <>
              <View style={styles.resultCard}>
                <Text style={styles.resultText}>
                  {tooFast ? "You pressed too soon!" : `Reaction Time: ${reactionTime} ms`}
                </Text>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={playAgain}
                >
                  <Text style={styles.actionButtonText}>Play Again</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReactionTest;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  appName: { 
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.primary,
  },
  text: {
    color: THEME.lightText,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    color: THEME.primary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButton: {
    marginTop: 10,
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
  startText: {
    color: THEME.lightText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorBoxContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  colorBoxRed: {
    width: 50,
    height: 50,
    backgroundColor: THEME.danger,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: THEME.danger,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  colorBoxGreen: {
    width: 50,
    height: 50,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: THEME.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },  
  instructionText: {
    color: THEME.darkText,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
    opacity: 0.7,
  },
});
