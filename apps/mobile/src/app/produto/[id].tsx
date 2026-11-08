import React, { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { formatPrice, productService, useApiResource, useCart } from "@dogueria/core";
import { Button } from "@/components/Button";
import { ErrorState, SkeletonList } from "@/components/LoadState";
import { QtyStepper } from "@/components/QtyStepper";
import { useToast } from "@/components/Toast";
import { colors, fonts, radius, spacing } from "@/theme";

/** Detalhe do dogue (equivale ao modal de produto do web) */
export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const fetchProduct = useCallback(() => productService.getProductById(productId), [productId]);
  const { data: product, loading, error, refresh } = useApiResource(fetchProduct, "Erro ao carregar o produto");
  const { addToCart } = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(1);

  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (loading) return <SkeletonList count={1} height={320} />;
  if (!product) return <ErrorState message="Produto não encontrado." />;

  const handleAdd = () => {
    addToCart(product, qty);
    toast.show({
      type: "success",
      title: `${qty}x ${product.name} no carrinho`,
      action: { label: "Ver carrinho", onPress: () => router.navigate("/carrinho") },
    });
    router.back();
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.body}>
          {product.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.description}>{product.fullDescription}</Text>
          <Text style={styles.heading}>INGREDIENTES</Text>
          <View style={styles.tags}>
            {product.ingredients.map((ing) => (
              <View key={ing} style={styles.tag}>
                <Text style={styles.tagText}>{ing}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <QtyStepper value={qty} onChange={setQty} min={1} dark label={product.name} />
        <Button label={`ADICIONAR · ${formatPrice(product.price * qty)}`} onPress={handleAdd} style={{ flex: 1 }} testID="adicionar-produto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  image: { width: "100%", height: 260, backgroundColor: "#fff7ed" },
  body: { padding: spacing.xl, gap: spacing.sm },
  badge: { alignSelf: "flex-start", backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: colors.white, fontFamily: fonts.black, fontSize: 10, letterSpacing: 1.5 },
  name: { color: colors.foreground, fontFamily: fonts.display, fontSize: 34, letterSpacing: 1.5 },
  price: { color: colors.primary, fontFamily: fonts.black, fontSize: 24 },
  description: { color: colors.mutedForeground, fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  heading: { color: colors.foreground, fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 2, marginTop: spacing.lg },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  tag: { backgroundColor: "rgba(255,107,0,0.1)", borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { color: colors.primary, fontFamily: fonts.bold, fontSize: 12 },
  footer: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.lg, backgroundColor: colors.panel },
});
