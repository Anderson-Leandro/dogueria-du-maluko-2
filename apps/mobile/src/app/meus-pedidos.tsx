import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Package } from "lucide-react-native";
import { useAuth, useMyOrders } from "@dogueria/core";
import { Button } from "@/components/Button";
import { EmptyState, ErrorState, SkeletonList } from "@/components/LoadState";
import { OrderCard } from "@/components/OrderCard";
import { colors, spacing } from "@/theme";

function OrdersList() {
  const { orders, loading, error, refreshOrders } = useMyOrders();

  if (error) return <ErrorState message={error} onRetry={refreshOrders} />;
  if (loading && orders.length === 0) return <SkeletonList count={3} height={180} />;

  return (
    <FlatList
      data={orders}
      keyExtractor={(o) => String(o.id)}
      contentContainerStyle={orders.length === 0 ? { flexGrow: 1 } : styles.list}
      ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
      renderItem={({ item }) => <OrderCard order={item} />}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshOrders} tintColor={colors.primary} />}
      ListEmptyComponent={
        <EmptyState
          icon={<Package size={56} color={colors.mutedForeground} />}
          title="NENHUM PEDIDO AINDA"
          subtitle="Que tal pedir o seu primeiro dogue?"
          action={<Button label="VER CARDÁPIO" onPress={() => router.navigate("/cardapio")} />}
        />
      }
    />
  );
}

/** Histórico de pedidos (rota protegida, como /meus-pedidos no web) */
export default function MyOrdersScreen() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Redirect href={{ pathname: "/login", params: { redirect: "/meus-pedidos" } }} />;
  return <OrdersList />;
}

const styles = StyleSheet.create({
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
});
