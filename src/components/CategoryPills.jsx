import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const CategoryPills = ({ categories, activeCategory, onSelectCategory }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const renderPill = ({ item }) => {
    const isActive = item === activeCategory;
    return (
      <TouchableOpacity
        style={[styles.pill, isActive && styles.activePill]}
        onPress={() => onSelectCategory(item)}
      >
        <Text style={[styles.pillText, isActive && styles.activePillText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={["All", ...categories.map((c) => c.name)]}
        renderItem={renderPill}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  pill: {
    backgroundColor: colors.searchBg,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activePill: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  activePillText: {
    color: colors.badgeText,
  },
});

export default CategoryPills;