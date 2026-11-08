import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Product, useProducts } from "@dogueria/core";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { ErrorState, SkeletonList } from "@/components/LoadState";
import { colors, fonts, radius, spacing } from "@/theme";

const PERKS = [
  { icon: "🛵", title: "ENTREGA RÁPIDA", sub: "Em até 40 minutos" },
  { icon: "⭐", title: "NOTA 4.9", sub: "No Google" },
  { icon: "🌭", title: "SEMPRE FRESQUINHO", sub: "Feito na hora" },
  { icon: "💳", title: "TODOS OS CARTÕES", sub: "Débito e crédito" },
];

/** Início: hero, dogues mais pedidos (featured) e diferenciais — igual à Home do web */
export default function HomeScreen() {
  const { products, loading, error, refreshProducts } = useProducts();

  const featured = useMemo(() => {
    const list = products.filter((p) => p.featured);
    return list.length > 0 ? list : products.slice(0, 4);
  }, [products]);

  const openProduct = (p: Product) => router.push(`/produto/${p.id}`);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>🔥 SEU HOT DOG MAIS DIVERTIDO</Text>
        <Text style={[styles.heroLine, { color: colors.accent }]}>A DOGUERIA</Text>
        <Text style={[styles.heroLine, { color: colors.white }]}>MAIS MALUCA</Text>
        <Text style={[styles.heroSub, { color: colors.accent }]}>DE RIBEIRÃO PIRES!</Text>
        <Button label="PEÇA JÁ SEU DOGUE!" size="lg" onPress={() => router.navigate("/cardapio")} style={{ marginTop: spacing.xl }} />
        <View style={styles.freeShipping}>
          <Text style={styles.freeShippingText}>🚚 Entrega grátis acima de R$60,00</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MAIS PEDIDOS</Text>
          <Text style={styles.link} onPress={() => router.navigate("/cardapio")} accessibilityRole="link">
            Ver todos <ChevronRight size={14} color={colors.primary} />
          </Text>
        </View>
        {error ? (
          <ErrorState message={error} onRetry={refreshProducts} />
        ) : loading ? (
          <SkeletonList count={2} />
        ) : (
          <View style={styles.list}>
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onPress={openProduct} />
            ))}
          </View>
        )}
      </View>

      <View style={styles.perks}>
        {PERKS.map((perk) => (
          <View key={perk.title} style={styles.perk}>
            <Text style={styles.perkIcon}>{perk.icon}</Text>
            <Text style={styles.perkTitle}>{perk.title}</Text>
            <Text style={styles.perkSub}>{perk.sub}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xxl },
  hero: { backgroundColor: colors.secondary, paddingVertical: 40, paddingHorizontal: spacing.xl, alignItems: "center" },
  kicker: { color: "rgba(255,255,255,0.8)", fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 2, marginBottom: spacing.md },
  heroLine: { fontFamily: fonts.display, fontSize: 44, letterSpacing: 2, lineHeight: 48, textAlign: "center" },
  heroSub: { fontFamily: fonts.display, fontSize: 30, letterSpacing: 2, textAlign: "center" },
  freeShipping: {
    marginTop: spacing.md,
    backgroundColor: "rgba(34,197,94,0.2)",
    borderColor: "rgba(34,197,94,0.3)",
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  freeShippingText: { color: "#86efac", fontFamily: fonts.bold, fontSize: 13 },
  section: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: fonts.display, fontSize: 30, letterSpacing: 1.5 },
  link: { color: colors.primary, fontFamily: fonts.bold, fontSize: 13 },
  list: { gap: spacing.lg },
  perks: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, padding: spacing.lg, paddingTop: spacing.xl },
  perk: { flexBasis: "47%", flexGrow: 1, backgroundColor: colors.dark, borderRadius: radius.lg, padding: spacing.lg, alignItems: "center", gap: 4 },
  perkIcon: { fontSize: 26 },
  perkTitle: { color: colors.accent, fontFamily: fonts.display, fontSize: 16, letterSpacing: 1, textAlign: "center" },
  perkSub: { color: colors.whiteMuted, fontFamily: fonts.regular, fontSize: 12, textAlign: "center" },
});
