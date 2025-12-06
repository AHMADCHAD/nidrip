import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import fonts from '../theme/fonts';

const NidripButton = ({ title, onPress, loading, style, textStyle, disabled }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const isButtonDisabled = loading || disabled;

  return (
    <TouchableOpacity onPress={onPress} disabled={isButtonDisabled} style={style}>
      <LinearGradient
        colors={isButtonDisabled ? [colors.border, colors.subtleText] : colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    button: {
      width: '100%',
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontFamily: fonts.bold,
    },
  });

export default NidripButton;