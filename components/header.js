import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Header = () => {
    return (
        <View>
            <Text style={styles.container}>
                How fast can you...
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        size: 100,
    },
});

export default Header;

