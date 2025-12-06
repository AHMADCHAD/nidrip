import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import { PRODUCTS } from "../utils/dummyData"; // Path updated
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import ProductDetailModal from "../components/ProductDetailModal";
import { useState, useMemo, useRef } from "react";
import SearchResults from "../components/home/SearchResults";
import HomeHeader from "../components/home/HomeHeader";
import ProductCard from "../components/ProductCard";
import fonts from "../theme/fonts";

// NOTE: You would get navigation from props, e.g. ({ navigation })
const HomeScreen = ({ navigation }) => {
  const { addToCart, cartItems } = useCart();
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const searchInputRef = useRef(null);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    return PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const productsToShow = useMemo(() => {
    if (activeCategory === "All") {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <Screen isScrollable={true}>
      <HomeHeader
        navigation={navigation}
        cartItemCount={cartItems.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchInputRef={searchInputRef}
      />

      {/* Featured Products Section - Now directly in the ScrollView */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
        </View>
        <FlatList
          numColumns={2}
          scrollEnabled={false}
          data={productsToShow}
          renderItem={({ item }) => {
            const isInCart = cartItems.some(
              (cartItem) => cartItem.id === item.id
            );
            return (
              <ProductCard
                product={item}
                onPress={handleProductPress}
                onAddToCart={addToCart}
                isInCart={isInCart}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productListContainer}
        />
      </View>
      {searchQuery.length > 0 && (
        <SearchResults
          results={searchResults}
          onProductPress={handleProductPress}
        />
      )}

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

const getStyles = (colors) => StyleSheet.create({
  sectionContainer: {
    flex:1,
    marginTop: 20, // Add top margin to create space from the header
    marginBottom: 15,
    backgroundColor: colors.lightBackground,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingVertical: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20, // Keep for sections in scrollable content
    paddingVertical:10
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily:fonts.semiBold,
    color: colors.textDark,
  },
  productListContainer: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
