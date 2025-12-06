import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import fonts from "../theme/fonts";

const ProductDetailModal = ({
  visible,
  product,
  onClose,
  onAddToCart,
  isInCart,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors);

  if (!product) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContainer, { paddingBottom: insets.bottom }]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.productName}>{product.name}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={20} color="#FFC700" />
              <Text style={styles.productRatingText}>
                {product.rating} ({product.reviewCount} reviews)
              </Text>
            </View>

            <Text style={styles.productDescription}>
              This is a great product that you will surely love. It's built with
              the highest quality materials.
            </Text>

            <View style={styles.footer}>
              <Text style={styles.productPrice}>
                €{product.price.toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => onAddToCart(product)}
                disabled={isInCart}
              >
                <LinearGradient
                  colors={isInCart ? ["#aaa", "#888"] : colors.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.addToCartButton}
                >
                  <Text style={styles.addToCartButtonText}>
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      height: "75%",
    },
    header: {
      alignItems: "flex-end",
      padding: 20,
      paddingBottom: 10,
    },
    closeButton: {
      backgroundColor: colors.card,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    imageWrapper:{
        paddingHorizontal:20
    },
    productImage: {
      width: "100%",
      height: 250,
      borderRadius: 16,
      resizeMode: "cover",
    },
    contentContainer: {
      flex: 1,
      padding: 20,
      paddingTop: 15,
    },
    productName: {
      fontSize: 24,
      fontFamily: fonts.bold,
      color: colors.text,
      marginBottom: 8,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    productRatingText: {
      marginLeft: 8,
      fontSize: 14,
      fontFamily: fonts.medium,
      color: colors.subtleText,
    },
    productDescription: {
      fontSize: 16,
      color: colors.text,
      fontFamily: fonts.medium,
      lineHeight: 24,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "auto",
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    productPrice: {
      fontSize: 28,
      fontFamily: fonts.bold,
      color: colors.primary,
    },
    addToCartButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 30,
    },
    addToCartButtonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: fonts.bold,
    },
  });

export default ProductDetailModal;
