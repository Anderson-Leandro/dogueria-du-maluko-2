import React, { useMemo, useState } from "react";
import { FlatList, Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Drink, Product, useDrinks, useProducts } from "@dogueria/core";
import { ProductCard } from "@/components/ProductCard";
import { DrinkRow } from "@/components/DrinkRow";
import { ErrorState, SkeletonList } from "@/components/LoadState";
import { colors, fonts, radius, spacing } from "@/theme";

type Tab = "dogues" | "bebidas";

/** Cardápio com abas Dogues/Bebidas; bebidas agrupadas por categoria */
export default function MenuScreen() {
  const [tab, setTab] = useState<Tab>("dogues");
  const { products, loading: productsLoading, error: productsError, refreshProducts } = useProducts();
  const { drinks, categories, loading: drinksLoading, error: drinksError, refreshDrinks } = useDrinks();

  const sections = useMemo(
    () =>
      categories
        .map((cat) => ({ key: cat.key, title: `${cat.emoji}  ${cat.label}`, data: drinks.filter((d) => d.category === cat.key) }))
        .filter((s) => s.data.length > 0),
    [categories, drinks]
  );

  const openProduct = (p: Product) => router.push(`/produto/${p.id}`);

  return (
    <View style={styles.screen}>
      <View style={styles.tabs} accessibilityRole="tablist">
        {(
          [
            { id: "dogues", emoji: "🌭", label: "DOGUES", count: products.length },
            { id: "bebidas", emoji: "🥤", label: "BEBIDAS", count: sections.reduce((n, s) => n + s.data.length, 0) },
          ] as const
        ).map((t) => {
          const active = tab === t.id;
          return (
            <Pressable
              key={t.id}
              onPress={() => setTab(t.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              style={[styles.tab, active && styles.tabActive]}
            >
              {/* Emoji e rótulo separados: sem espaço no texto, o Android não tem onde quebrar a linha */}
              <Text style={styles.tabEmoji}>{t.emoji}</Text>
              <Text numberOfLines={1} textBreakStrategy="simple" style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {t.label}
              </Text>
              <View style={[styles.count, active && styles.countActive]}>
                <Text style={[styles.countText, active && { color: colors.white }]}>{t.count}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {tab === "dogues" ? (
        productsError ? (
          <ErrorState message={productsError} onRetry={refreshProducts} />
        ) : productsLoading ? (
          <SkeletonList count={3} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(p) => String(p.id)}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
            renderItem={({ item }) => <ProductCard product={item} onPress={openProduct} />}
          />
        )
      ) : drinksError ? (
        <ErrorState message={drinksError} onRetry={refreshDrinks} />
      ) : drinksLoading ? (
        <SkeletonList count={4} height={104} />
      ) : (
        <SectionList<Drink>
          sections={sections}
          keyExtractor={(d) => String(d.id)}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          renderItem={({ item }) => <DrinkRow drink={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  tabs: { flexDirection: "row", gap: 4, backgroundColor: colors.dark, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  tab: {
    // Cada aba ocupa metade da largura: o tamanho não depende da medição do texto
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  tabActive: { backgroundColor: colors.background },
  tabEmoji: { fontSize: 16 },
  tabLabel: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.display, fontSize: 18, letterSpacing: 1.5, flexShrink: 1 },
  tabLabelActive: { color: colors.foreground },
  count: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 1 },
  countActive: { backgroundColor: colors.primary },
  countText: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.black, fontSize: 11 },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  sectionTitle: {
    color: colors.foreground,
    fontFamily: fonts.display,
    fontSize: 22,
    letterSpacing: 1.5,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});
