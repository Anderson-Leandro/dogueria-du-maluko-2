import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ShoppingBag, Trash2 } from "lucide-react-native";
import { ApiError, formatPrice, getErrorMessage, orderService, useAuth, useCart, useSettings } from "@dogueria/core";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/LoadState";
import { QtyStepper } from "@/components/QtyStepper";
import { useToast } from "@/components/Toast";
import { colors, fonts, radius, spacing } from "@/theme";

/** Carrinho + confirmação do pedido (mesmas regras do web: preço e frete calculados pela API) */
export default function CartScreen() {
  const { items, cartTotal, updateQty, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { deliveryFee, freeDeliveryMin } = useSettings();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const freeDelivery = cartTotal >= freeDeliveryMin;

  const goToLogin = () => router.push({ pathname: "/login", params: { redirect: "/carrinho" } });

  const handleCheckout = async () => {
    if (submitting || items.length === 0) return;
    if (!isAuthenticated) {
      toast.show({ type: "info", title: "Entre na sua conta para confirmar o pedido." });
      goToLogin();
      return;
    }

    setSubmitting(true);
    try {
      const order = await orderService.createOrder(items.map((i) => ({ productId: i.id, qty: i.qty })));
      clearCart();
      toast.show({
        type: "success",
        title: `Pedido #${order.id} confirmado!`,
        description:
          order.deliveryFee > 0
            ? `Total ${formatPrice(order.total)} (inclui frete de ${formatPrice(order.deliveryFee)})`
            : `Total ${formatPrice(order.total)} — frete grátis 🎉`,
        action: { label: "Ver pedidos", onPress: () => router.push("/meus-pedidos") },
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        // O AuthProvider já encerrou a sessão e avisou; volta ao carrinho depois do login
        goToLogin();
        return;
      }
      toast.show({
        type: "error",
        title: getErrorMessage(err, "Não foi possível confirmar o pedido."),
        description: err instanceof ApiError ? err.fields?.items : undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.screen}>
        <EmptyState
          icon={<ShoppingBag size={56} color={colors.mutedForeground} />}
          title="SEU CARRINHO ESTÁ VAZIO"
          subtitle="Que tal escolher um dogue bem maluco?"
          action={<Button label="VER CARDÁPIO" onPress={() => router.navigate("/cardapio")} />}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
              <View style={styles.itemActions}>
                <QtyStepper value={item.qty} onChange={(q) => updateQty(item.id, q)} label={item.name} />
                <Pressable
                  onPress={() => removeFromCart(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remover ${item.name}`}
                  hitSlop={8}
                >
                  <Trash2 size={18} color={colors.mutedForeground} />
                </Pressable>
              </View>
            </View>
            <Text style={styles.lineTotal}>{formatPrice(item.price * item.qty)}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>SUBTOTAL</Text>
          <Text style={styles.totalValue}>{formatPrice(cartTotal)}</Text>
        </View>
        <Text style={[styles.shipping, freeDelivery && { color: "#4ade80" }]}>
          {freeDelivery
            ? "🚚 Frete grátis neste pedido!"
            : `🚚 + frete de ${formatPrice(deliveryFee)} (grátis acima de ${formatPrice(freeDeliveryMin)})`}
        </Text>
        <Button
          label={submitting ? "ENVIANDO..." : "CONFIRMAR COMPRA"}
          size="lg"
          loading={submitting}
          onPress={handleCheckout}
          testID="confirmar-compra"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: 64, height: 64, borderRadius: radius.md, backgroundColor: colors.muted },
  itemInfo: { flex: 1, gap: 4 },
  itemName: { color: colors.foreground, fontFamily: fonts.display, fontSize: 17, letterSpacing: 0.8 },
  itemPrice: { color: colors.primary, fontFamily: fonts.bold, fontSize: 13 },
  itemActions: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  lineTotal: { color: colors.foreground, fontFamily: fonts.black, fontSize: 15 },
  footer: { backgroundColor: colors.panel, padding: spacing.lg, gap: spacing.sm },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { color: colors.whiteMuted, fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 2 },
  totalValue: { color: colors.primary, fontFamily: fonts.black, fontSize: 24 },
  shipping: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.semibold, fontSize: 12, marginBottom: spacing.sm },
});
