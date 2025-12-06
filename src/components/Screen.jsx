import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

function Screen({ children, style, isScrollable = true }) {
  const { colors, isDarkMode } = useTheme();

  const screenStyles = [styles.screen, { backgroundColor: colors.background }, style];

  return (
    <SafeAreaView style={screenStyles} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={colors.header}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        translucent={false}
      />
      {isScrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.view, { backgroundColor: colors.background }]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    // flexGrow: 1, // This was causing the nested FlatList rendering issue
    // This property was causing the nested FlatList rendering issue and has been removed.
  },
  view: {
    flex: 1,
  },
});

export default Screen;