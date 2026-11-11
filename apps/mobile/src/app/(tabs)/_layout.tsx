import React from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Home, ShoppingCart, User, UtensilsCrossed } from "lucide-react-native";
import { useCart } from "@dogueria/core";
import { colors, fonts } from "@/theme";

function HeaderLogo() {
  return (
    <Image
      source={require("../../../assets/logo.png")}
      style={styles.logo}
      resizeMode="contain"
      accessibilityLabel="Dogueria Du Maluko"
    />
  );
}

/** Navegação principal por abas (equivale ao header + menu hambúrguer do web) */
export default function TabsLayout() {
  const { cartCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.dark },
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "rgba(255,255,255,0.55)",
        tabBarStyle: {
          backgroundColor: colors.dark,
          borderTopColor: "rgba(255,255,255,0.08)",
          // No navegador não há área segura: altura extra para o rótulo não ser cortado
          ...(Platform.OS === "web" ? { height: 64 } : null),
        },
        // No web o item da aba não cresce com a barra e o rótulo era espremido (cortado)
        tabBarItemStyle: Platform.OS === "web" ? { height: 60, paddingVertical: 6 } : undefined,
        // lineHeight explícito: a Nunito corta letras com perna (ex.: "p") sem ele
        tabBarLabelStyle: { fontFamily: fonts.extrabold, fontSize: 11, lineHeight: 16, flexShrink: 0 },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Início", tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="cardapio"
        options={{ title: "Cardápio", tabBarIcon: ({ color, size }) => <UtensilsCrossed color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.accent, color: colors.foreground, fontFamily: fonts.black },
        }}
      />
      <Tabs.Screen
        name="conta"
        options={{ title: "Conta", tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: { height: 38, width: 130 },
});
