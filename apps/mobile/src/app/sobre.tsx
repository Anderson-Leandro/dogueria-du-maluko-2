import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useAbout } from "@dogueria/core";
import { Button } from "@/components/Button";
import { ErrorState, SkeletonList } from "@/components/LoadState";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts, radius, spacing } from "@/theme";

/** Sobre: estatísticas, linha do tempo, equipe e valores (dados da API /about) */
export default function AboutScreen() {
  const { aboutData, loading, error, refreshAboutData } = useAbout();
  const insets = useSafeAreaInsets();

  if (error) return <ErrorState message={error} onRetry={refreshAboutData} dark />;
  if (loading || !aboutData) return <SkeletonList count={3} height={140} />;

  return (
    <ScrollView contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + insets.bottom }]}>
      <Text style={styles.kicker}>🐕 RIBEIRÃO PIRES, SP</Text>
      <Text style={styles.lead}>
        De um carrinho vermelho na feira ao delivery mais pedido de Ribeirão Pires. Essa é a história da dogueria mais maluca da cidade.
      </Text>

      <View style={styles.stats}>
        {aboutData.stats.map((s) => (
          <View key={s.label} style={styles.stat}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.heading}>NOSSA TRAJETÓRIA</Text>
      <View style={styles.timeline}>
        {aboutData.timeline.map((t) => (
          <View key={t.year} style={styles.timelineItem}>
            <View style={styles.dot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.year}>{t.year}</Text>
              <Text style={styles.itemTitle}>{t.title}</Text>
              <Text style={styles.itemText}>{t.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.heading}>A TURMA DO MALUKO</Text>
      {aboutData.team.map((m) => (
        <View key={m.name} style={styles.member}>
          <Image source={{ uri: m.img }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{m.name}</Text>
            <Text style={styles.role}>{m.role}</Text>
            <Text style={styles.itemText}>{m.bio}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.heading}>NOSSOS VALORES</Text>
      {aboutData.values.map((v) => (
        <View key={v.title} style={styles.value}>
          <Text style={styles.valueIcon}>{v.icon}</Text>
          <Text style={styles.itemTitle}>{v.title}</Text>
          <Text style={styles.itemText}>{v.text}</Text>
        </View>
      ))}

      <Button label="VER CARDÁPIO" size="lg" onPress={() => router.navigate("/cardapio")} style={{ marginTop: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: 48, gap: spacing.md },
  kicker: { color: colors.accent, fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 2 },
  lead: { color: "rgba(255,255,255,0.75)", fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  stats: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginTop: spacing.md },
  stat: { flexBasis: "47%", flexGrow: 1, backgroundColor: colors.dark, borderRadius: radius.lg, padding: spacing.lg, alignItems: "center" },
  statValue: { color: colors.accent, fontFamily: fonts.display, fontSize: 30, letterSpacing: 1 },
  statLabel: { color: colors.whiteMuted, fontFamily: fonts.semibold, fontSize: 12, textAlign: "center" },
  heading: { color: colors.white, fontFamily: fonts.display, fontSize: 26, letterSpacing: 1.5, marginTop: spacing.xl },
  timeline: { gap: spacing.lg, borderLeftWidth: 2, borderLeftColor: "rgba(255,107,0,0.4)", paddingLeft: spacing.lg, marginLeft: 6 },
  timelineItem: { flexDirection: "row", gap: spacing.md },
  dot: { position: "absolute", left: -spacing.lg - 7, top: 4, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  year: { color: colors.primary, fontFamily: fonts.display, fontSize: 20, letterSpacing: 1 },
  itemTitle: { color: colors.white, fontFamily: fonts.extrabold, fontSize: 16 },
  itemText: { color: "rgba(255,255,255,0.65)", fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, marginTop: 2 },
  member: { flexDirection: "row", gap: spacing.lg, backgroundColor: colors.dark, borderRadius: radius.lg, padding: spacing.lg, alignItems: "center" },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.panel },
  role: { color: colors.primary, fontFamily: fonts.bold, fontSize: 12, marginBottom: 2 },
  value: { backgroundColor: colors.dark, borderRadius: radius.lg, padding: spacing.lg },
  valueIcon: { fontSize: 28, marginBottom: 4 },
});
