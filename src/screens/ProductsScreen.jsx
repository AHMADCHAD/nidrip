import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import { PRODUCTS, CATEGORIES } from "../utils/dummyData"; // Path updated
import { Ionicons } from "@expo/vector-icons";
import CategoryPills from "../components/CategoryPills";
import { useCart } from "../context/CartContext";

const ProductsScreen = ({ navigation, route }) => {
  // Get the category from navigation parameters, if it exists
  const initialCategory = route?.params?.category || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const { addToCart, cartItemCount, cartItems } = useCart();

  const productsToShow =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const renderProductItem = ({ item }) => {
    const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    return (
      <TouchableOpacity style={styles.productCard} activeOpacity={0.9}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFC700" />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviewCount})
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>
              €{item.price.toFixed(2)}
            </Text>
            {!isInCart && (
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // Use isScrollable={false} because FlatList provides its own scrolling
    <Screen isScrollable={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View>
            <Ionicons name="cart-outline" size={30} color="#333" />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <CategoryPills
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <FlatList
        data={productsToShow}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Screen>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "#fd2153",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  productInfoContainer: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1, // very small offset
    },
    shadowOpacity: 0.03, // very light
    shadowRadius: 2, // small blur
    elevation: 1, // low elevation for Android
  },
  productImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fd2153",
  },
  addToCartButton: {
    backgroundColor: "#fd2153",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
