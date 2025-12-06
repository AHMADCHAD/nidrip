import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import fonts from "../../theme/fonts";

const SearchResults = ({ results, onProductPress }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  if (results.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => onProductPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.resultImage} />
            <Text style={styles.resultText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 125, // Adjust this based on your header's height
      left: 15,
      right: 15,
      maxHeight: 300,
      backgroundColor: colors.card,
      borderRadius: 12,
      borderColor: colors.border,
      borderWidth: 1,
      zIndex: 5,
      elevation: 5,
    },
    resultItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    resultImage: {
      width: 40,
      height: 40,
      borderRadius: 8,
      marginRight: 10,
    },
    resultText: {
      fontSize: 15,
      fontFamily: fonts.medium,
      color: colors.text,
      flex: 1,
    },
  });
export default SearchResults;