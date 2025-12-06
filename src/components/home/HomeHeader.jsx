import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { CATEGORIES } from "../../utils/dummyData";
import fonts from "../../theme/fonts";

const HomeHeader = ({
  navigation,
  cartItemCount,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  searchInputRef,
}) => {
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors, isDarkMode);

  const allCategories = useMemo(
    () => [
      {
        name: "All",
        icon: "grid-outline",
        image: "https://i.imgur.com/c4VAgkC.png",
      },
      ...CATEGORIES,
    ],
    []
  );

  return (
    <>
      {/* Top Bar with Icons */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.topBarIcon}>
          <Ionicons name="apps-outline" size={28} color={colors.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={32} color={colors.icon} />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* New Combined Header */}
      <View style={styles.newHeaderContainer}>
        <View style={styles.circleOne} />
        <View style={styles.circleTwo} />

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={colors.subtleText}
            style={styles.searchIcon}
          />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={colors.subtleText}
            value={searchQuery}
            onChangeText={onSearchChange}
          />
        </View>

        <View style={styles.headerCategoriesSection}>
          <Text style={styles.headerSectionTitle}>Popular Categories</Text>
          <FlatList
            data={allCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryCircleItem}
                onPress={() => onCategoryChange(item.name)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryCircleText} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoriesListContent}
          />
        </View>
      </View>
    </>
  );
};

const getStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    topBarContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 8,
      backgroundColor: colors.backgroundColor,
    },
    topBarIcon: { padding: 5 },
    cartIconContainer: { position: "relative", padding: 5 },
    cartBadge: {
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: colors.badge,
      borderRadius: 9,
      width: 18,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    cartBadgeText: {
      color: colors.badgeText,
      fontSize: 10,
      fontFamily: fonts.bold,
    },
    newHeaderContainer: {
      backgroundColor: isDarkMode ? colors.superDarkHeader : colors.headerDark,
      paddingHorizontal: 0, // Ensuring no horizontal padding on the container
      paddingBottom: 25,
      paddingTop: 0,
      overflow: "hidden",
    },
    circleOne: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "rgba(255, 255, 255, 0.06)",
      top: -50,
      right: -80,
    },
    circleTwo: {
      position: "absolute",
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      top: 50,
      right: -60,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      marginHorizontal: 20, // Added horizontal margin
      borderRadius: 10,
      paddingHorizontal: 15, // Added internal horizontal padding
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: { marginRight: 10 },
    searchInput: {
      flex: 1,
      height: 45,
      color: colors.text,
      fontFamily: fonts.medium,
      fontSize: 16,
    },
    headerCategoriesSection: { marginTop: 30 }, // Added horizontal padding
    headerSectionTitle: {
      fontSize: 20,
      fontFamily: fonts.semiBold,
      color: colors.text,
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    categoriesListContent: { paddingLeft: 0, paddingRight: 15 }, // Adjusted padding
    categoryCircleItem: {
      width: 80,
      alignItems: "center",
      marginHorizontal: 5,
    },
    categoryImage: {
      width: 64,
      height: 64,
      borderRadius: 32,
      resizeMode: "cover",
      marginBottom: 8,
      backgroundColor: colors.card,
    },
    categoryCircleText: {
      fontSize: 13,
      color: colors.subtleText,
      fontFamily: fonts.medium,
      textAlign: "center",
    },
  });

export default HomeHeader;
