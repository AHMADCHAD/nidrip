import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import fonts from "../theme/fonts";

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    cartSubtotal,
  } = useCart();
  const shippingFee = cartSubtotal > 0 ? 5.0 : 0;
  const total = cartSubtotal + shippingFee;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Screen isScrollable={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          My Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </Text>
        <View style={styles.headerIcon} />
      </View>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={colors.subtleText} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cartItemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemPrice}>
                    €{item.price.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.quantityControl}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <Ionicons name="remove-circle-outline" size={26} color={colors.subtleText} />
                  </TouchableOpacity>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => addToCart(item)}>
                    <Ionicons name="add-circle" size={26} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>€{cartSubtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={styles.summaryText}>€{shippingFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>€{total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
              <LinearGradient
                colors={colors.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.checkoutButton}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Screen>
  );
};

const getStyles = (colors) => StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the title
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.text,
    textAlign: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 40,
    alignItems: 'flex-start'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.subtleText,
  },
  listContainer: {
    padding: 15,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: colors.cartCardBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.text,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.price,
    fontFamily: fonts.semiBold,
    marginTop: 5,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQuantity: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginHorizontal: 15,
    color: colors.text,
  },
  summaryContainer: {
    backgroundColor: colors.card,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.subtleText,
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingTop: 10,
    marginTop: 5,
  },
  totalText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  checkoutButton: {
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});

export default CartScreen;