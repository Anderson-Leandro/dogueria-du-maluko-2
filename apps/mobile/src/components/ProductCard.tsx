import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product, formatPrice } from "@dogueria/core";
import { useJustAdded } from "@/hooks";
import { colors, fonts, radius, spacing } from "@/theme";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

/** Card de dogue (imagem, selo, descrição, preço e "+ CARRINHO") */
export function ProductCard({ product, onPress }: ProductCardProps) {
  const { justAdded, handleAdd } = useJustAdded(product);

  return (
    <View style={styles.card}>
      {/* Área que abre o detalhe; o botão de adicionar fica fora dela (botões não podem ser aninhados) */}
      <Pressable
        onPress={() => onPress(product)}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalhes de ${product.name}`}
        style={({ pressed }) => pressed && { opacity: 0.92 }}
      >
        <View>
          <Image source={{ uri: product.imageUrl }} style={styles.image} accessibilityIgnoresInvertColors />
          {product.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {product.shortDescription}
          </Text>
        </View>
      </Pressable>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Pressable
          onPress={handleAdd}
          accessibilityRole="button"
          accessibilityLabel={`Adicionar ${product.name} ao carrinho`}
          style={[styles.add, justAdded && styles.added]}
        >
          <Text style={styles.addText}>{justAdded ? "ADICIONADO ✓" : "+ CARRINHO"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: { width: "100%", height: 180, backgroundColor: "#fff7ed" },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { color: colors.white, fontFamily: fonts.black, fontSize: 10, letterSpacing: 1.5 },
  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: 6 },
  name: { color: colors.foreground, fontFamily: fonts.display, fontSize: 22, letterSpacing: 1 },
  description: { color: colors.mutedForeground, fontFamily: fonts.regular, fontSize: 13 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  price: { color: colors.primary, fontFamily: fonts.black, fontSize: 20 },
  add: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 14, paddingVertical: 8 },
  added: { backgroundColor: "#22c55e" },
  addText: { color: colors.white, fontFamily: fonts.black, fontSize: 11, letterSpacing: 1 },
});
