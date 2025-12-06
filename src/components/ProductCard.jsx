import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import fonts from '../theme/fonts';

const ProductCard = ({ product, onPress, onAddToCart, isInCart }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() => onPress(product)}
    >
      {product.discountPercentage > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {product.discountPercentage}% OFF
          </Text>
        </View>
      )}
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.brandContainer}>
          <Text style={styles.productBrand} numberOfLines={1}>
            {product.brand}
          </Text>
          <Ionicons name="checkmark-circle" size={16} color={colors.verifiedBlue} style={styles.verifiedIcon} />
        </View>
        <Text style={styles.productPrice}>
          €{product.price.toFixed(2)}
        </Text>
      </View>
      {isInCart ? (
        <View style={styles.addToCartButtonPlaceholder} />
      ) : (
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={(e) => { e.stopPropagation(); onAddToCart(product); }}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (colors) => StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 10,
    borderRadius: 16,
    backgroundColor: colors.lightBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 0, // Removed the border
  },
  productInfoContainer: {
    padding: 12,
  },
  productImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  productName: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textDark,
    minHeight: 44,
    marginBottom: 1, // Reduced space
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4, // Reduced space
  },
  productBrand: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.subtleText,
  },
  verifiedIcon: {
    marginLeft: 5,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.price,
    marginTop: 4, // Reduced space
    marginBottom: 30, // Add space for the absolute positioned button
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonPlaceholder: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.discountBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  discountText: {
    color: colors.discountText,
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
});

export default ProductCard;