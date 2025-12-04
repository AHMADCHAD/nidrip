import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CategoryPills = ({ categories, activeCategory, onSelectCategory }) => {
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  pill: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activePill: {
    backgroundColor: "#fd2153",
  },
  pillText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  activePillText: {
    color: "#fff",
  },
});

export default CategoryPills;