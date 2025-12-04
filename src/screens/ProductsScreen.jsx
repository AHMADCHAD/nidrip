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
import { useTheme } from "../context/ThemeContext";
import ProductDetailModal from "../components/ProductDetailModal";

const ProductsScreen = ({ navigation, route }) => {
  // Get the category from navigation parameters, if it exists
  const initialCategory = route?.params?.category || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, cartItemCount, cartItems } = useCart();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const productsToShow =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const renderProductItem = ({ item }) => {
    const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    return (
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.8}
        onPress={() => handleProductPress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFC700" />
            <Text style={styles.ratingText} >
              {item.rating} ({item.reviewCount})
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>
              €{item.price.toFixed(2)}
            </Text>
            {isInCart ? (
              <View style={styles.addToCartButtonPlaceholder} />
            ) : (
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
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={30} color={colors.icon} />
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
      <ProductDetailModal
        visible={!!selectedProduct}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={addToCart}
        isInCart={
          selectedProduct && cartItems.some((i) => i.id === selectedProduct.id)
        }
      />
    </Screen>
  );
};

export default ProductsScreen;

const getStyles = (colors) => StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  cartIconContainer: {
    position: 'relative',
    padding: 5,
  },
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
    borderWidth: 1,
    borderColor: colors.header,
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
    margin: 10,
    borderRadius: 16,
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    minHeight: 42, // Ensures consistent height for 1 or 2 lines
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: colors.subtleText,
    fontWeight: "500",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.price,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonPlaceholder: {
    width: 32,
    height: 32,
  },
});
