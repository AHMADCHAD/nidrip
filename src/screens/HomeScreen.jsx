import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PRODUCTS, CATEGORIES } from "../utils/dummyData"; // Path updated
import { useCart } from "../context/CartContext";

// NOTE: You would get navigation from props, e.g. ({ navigation })
const HomeScreen = ({ navigation }) => {
  const { addToCart, cartItemCount, cartItems } = useCart();

  return (
    <Screen isScrollable={false}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <Ionicons name="grid-outline" size={32} color="#333" />
          <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={32} color="#333" />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search Appliances"
              style={styles.searchInput}
            />
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollableContent}>
          {/* Gradient Banner */}
          <LinearGradient
            colors={["#fd2153", "#fd23d4", "#20f844"]}
            locations={[0, 0.55, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientContainer}
          >
            <Text style={styles.mainText}>NI DRIP CENTRAL ELECTRONICS</Text>
            <Text style={styles.subText}>delivered fast</Text>
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Rating Text */}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={22} color="#FFD700" />
            <Text style={styles.ratingText}> 5.0 on </Text>
            <Text style={styles.ratingBrandText}>eBay</Text>
          </View>

          {/* Image Banner */}
          <View style={styles.imageBannerContainer}>
            <Image
              source={require("../../assets/klipartz.png")}
              style={styles.bannerImage}
            />
          </View>

          {/* Categories Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 15 }]}>
              Shop By Category
            </Text>
            <FlatList
              data={CATEGORIES}
              numColumns={2}
              keyExtractor={(item) => item.name}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() =>
                    navigation.navigate("Products", { category: item.name })
                  }
                >
                  {/* Left icon */}

                  <View
                    style={[
                      styles.categoryIconWrapper,
                      { backgroundColor: item.color },
                    ]}
                  >
                    <Ionicons name={item.icon} size={24} color="#fff" />
                  </View>

                  {/* Text and chevron */}
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryCardText} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={22} color="#999" />
                </TouchableOpacity>
              )}
              style={styles.categoriesList}
            />
          </View>

          {/* Featured Products Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Products")}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={2}
              scrollEnabled={false}
              data={PRODUCTS.slice(0, 4)} // Show first 4 as featured
              renderItem={({ item }) => {
                const isInCart = cartItems.some(
                  (cartItem) => cartItem.id === item.id
                );
                return (
                  <TouchableOpacity
                    style={styles.productCard}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.productImage}
                    />
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
              }}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productListContainer}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTopRow: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchWrapper: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  scrollableContent: {
    paddingTop: 15, // Add space below the fixed header
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  gradientContainer: {
    padding: 25,
    alignItems: "flex-start",
  },
  mainText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "right",
  },
  subText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  shopButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
  },
  shopButtonText: {
    color: "#fd2153",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  ratingText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 5,
  },
  ratingBrandText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  imageBannerContainer: {
    marginHorizontal: 15,
    marginBottom: 30,
    borderRadius: 15,
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
  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    resizeMode: "cover",
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "semiBold",
    color: "#333",
  },
  viewAllText: {
    fontSize: 14,
    color: "#fd2153",
    fontWeight: "600",
  },
  categoriesList: {
    paddingHorizontal: 10,
    marginTop: 5,
  },
  categoryCard: {
    flex: 1,
    flexDirection: "row", // row layout for icon + right column
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 15,
    margin: 10,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1, // very small offset
    },
    shadowOpacity: 0.03, // very light
    shadowRadius: 2, // small blur
    elevation: 1, // low elevation for Android
  },

  categoryTextContainer: {
    flex: 1, // take remaining space
    marginLeft: 12,
  },

  categoryIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25, // circle
    justifyContent: "center",
    alignItems: "center",
    // Shadow for nice elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },

  categoryCardText: {
    fontSize: 16,
    color: "#333",
  },

  productListContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff", // White background for product cards
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1, // very small offset
    },
    shadowOpacity: 0.03, // very light
    shadowRadius: 2, // small blur
    elevation: 1, // low elevation for Android
  },
  productInfoContainer: {
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productName: {
    fontSize: 15,
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
  cartIconContainer: {
    position: 'relative',
    padding: 5, // Add some padding around the icon for easier tapping
  },
  cartBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#fd2153",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    // Optional: Add a small border for better visibility on white backgrounds
    borderWidth: 1,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default HomeScreen;
