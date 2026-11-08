import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Drink, formatPrice, useCart } from "@dogueria/core";
import { colors, fonts, radius, spacing } from "@/theme";

/** Linha de bebida: imagem à esquerda, nome/descrição, preço e botão de adicionar */
export function DrinkRow({ drink }: { drink: Drink }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleAdd = () => {
    addToCart(drink, 1);
    setJustAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <View style={styles.row}>
      <Image source={{ uri: drink.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {drink.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {drink.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(drink.price)}</Text>
          <Pressable
            onPress={handleAdd}
            accessibilityRole="button"
            accessibilityLabel={`Adicionar ${drink.name} ao carrinho`}
            style={[styles.add, justAdded && styles.added]}
          >
            <Text style={styles.addText}>{justAdded ? "ADICIONADO ✓" : "+ CARRINHO"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: 96, alignSelf: "stretch", minHeight: 104, backgroundColor: colors.muted },
  info: { flex: 1, padding: spacing.md, gap: 4 },
  name: { color: colors.foreground, fontFamily: fonts.display, fontSize: 18, letterSpacing: 0.8 },
  description: { color: colors.mutedForeground, fontFamily: fonts.regular, fontSize: 12 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  price: { color: colors.primary, fontFamily: fonts.black, fontSize: 16 },
  add: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6 },
  added: { backgroundColor: "#22c55e" },
  addText: { color: colors.white, fontFamily: fonts.black, fontSize: 10, letterSpacing: 1 },
});
