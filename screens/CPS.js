import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LinearGradient } from 'react-native';
import CPSstat from '../json/CPSstat.json';

// Theme colors
const THEME = {
  primary: '#3498db',        // Blue - primary color
  secondary: 'rgb(46, 78, 204)',     // Green - secondary color
  accent: '#9b59b6',         // Purple - accent color
  background: '#f5f9ff',     // Light blue background
  darkText: '#2c3e50',       // Dark blue text
  lightText: '#ecf0f1',      // Light text
  danger: '#e74c3c',         // Red for warnings/errors
  shadow: '#bdc3c7',         // Shadow color
};

const CPS = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(5.00);
  const [isGameOver, setIsGameOver] = useState(false);
  const startTimeRef = useRef(null);
  const [level, setLevel] = useState("");

  useEffect(() => {
    let interval = null;
    if (isStarted) {
      startTimeRef.current = Date.now();
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const timeLeft = Math.max(0, (5.00 - elapsed));
        setTimer(parseFloat(timeLeft.toFixed(2)));

        if (timeLeft <= 0) {
          clearInterval(interval);
          setIsStarted(false);
          setIsGameOver(true);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isStarted]);

  const handleButtonPress = () => {
    if (isGameOver) return;

    if (!isStarted) {
      setIsStarted(true);
      setClickCount(0);
      setTimer(5.00);
    } else {
      setClickCount(prev => prev + 1);
    }
  };

  const cps = (clickCount / 5).toFixed(2);

  const determineLevel = (cps) => {
    const cpsValue = parseFloat(cps);
    const levelInfo = CPSstat.levels.find(level => cpsValue >= level.minCPS && cpsValue <= level.maxCPS);
    return levelInfo ? levelInfo : { level: "ไม่ระบุ", description: "ข้อมูลไม่ครบถ้วน" };
  };

  useEffect(() => {
    if (isGameOver) {
      const levelInfo = determineLevel(cps);
      setLevel(levelInfo);
    }
  }, [isGameOver]);

  const playAgain = () => {
    setIsGameOver(false);
    setClickCount(0);
    setTimer(5.00);
    setLevel(""); // รีเซ็ทระดับ
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.AppName}>How fast can you Click?</Text>
      </View>

      <View style={styles.contentContainer}>
        {isGameOver ? (
          <>
            <View style={styles.resultCard}>
              <Text style={styles.resultText}>Your CPS: {cps}</Text>
              <Text style={styles.levelText}>
                Level: {level.level}
              </Text>
              <Text style={styles.levelDescription}>
                {level.description}
              </Text>
              <TouchableOpacity style={styles.actionButton} onPress={playAgain}>
                <Text style={styles.actionButtonText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.timerText}>
              {isStarted ? `Time Left: ${timer.toFixed(2)}s` : 'Ready?'}
            </Text>
            <Text style={styles.clickCountText}>
              Clicks: {clickCount}
            </Text>
            <TouchableOpacity 
              style={[styles.circleButton, isStarted ? styles.circleButtonActive : null]} 
              onPress={handleButtonPress}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>
                {isStarted ? 'CLICK!' : 'START'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.instructionText}>
                  Click as fast as you can in 5 seconds
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default CPS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  AppName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: THEME.darkText,
  },
  clickCountText: {
    fontSize: 20,
    marginBottom: 30,
    color: THEME.darkText,
  },
  circleButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  circleButtonActive: {
    backgroundColor: THEME.secondary,
    transform: [{ scale: 1.05 }],
  },
  buttonText: {
    color: THEME.lightText,
    fontSize: 28,
    fontWeight: 'bold',
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: THEME.primary,
  },
  actionButton: {
    marginTop: 30,
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
  levelText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: THEME.accent,
  },
  levelDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: THEME.darkText,
    opacity: 0.8,
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
