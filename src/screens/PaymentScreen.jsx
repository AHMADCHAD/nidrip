import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import fonts from "../theme/fonts";

const PaymentScreen = ({ navigation }) => {
  const { cartSubtotal } = useCart();
  const shippingFee = cartSubtotal > 0 ? 5.0 : 0;
  const total = cartSubtotal + shippingFee;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Screen isScrollable={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerIcon} />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>€{cartSubtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>€{shippingFee.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>€{total.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedMethod === "paypal" && styles.selectedPaymentMethod,
          ]}
          onPress={() => setSelectedMethod("paypal")}
        >
          <View style={styles.paymentMethodInfo}>
            <Ionicons name="logo-paypal" size={30} color="#003087" />
            <Text style={styles.paymentMethodText}>Pay with PayPal</Text>
          </View>
          {selectedMethod === "paypal" && (
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedMethod === "google" && styles.selectedPaymentMethod,
          ]}
          onPress={() => setSelectedMethod("google")}
        >
          <View style={styles.paymentMethodInfo}>
            <Ionicons name="logo-google" size={30} color="#DB4437" />
            <Text style={styles.paymentMethodText}>Google Pay</Text>
          </View>
          {selectedMethod === "google" && (
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.payButton}
          >
            <Text style={styles.payButtonText}>Pay €{total.toFixed(2)}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const getStyles = (colors) => StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    textAlign: 'center',
    flex: 1,
    color: colors.text,
  },
  headerIcon: {
    width: 40,
    alignItems: 'flex-start'
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: 15,
    marginTop: 10,
  },
  summaryBox: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.subtleText,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.medium,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "space-between",
  },
  selectedPaymentMethod: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  paymentMethodInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginLeft: 15,
    color: colors.text,
  },
  payButton: {
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});

export default PaymentScreen;
          