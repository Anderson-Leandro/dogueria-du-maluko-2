import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapPin } from "lucide-react-native";
import { Order, OrderStatus, formatDateTime, formatPrice, formatZipCode } from "@dogueria/core";
import { colors, fonts, radius, spacing } from "@/theme";

const STATUS: Record<OrderStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: "Recebido", bg: "#fef3c7", fg: "#92400e" },
  preparing: { label: "Em preparo", bg: "#ffedd5", fg: "#9a3412" },
  delivering: { label: "Saiu para entrega", bg: "#dbeafe", fg: "#1e40af" },
  delivered: { label: "Entregue", bg: "#dcfce7", fg: "#166534" },
  canceled: { label: "Cancelado", bg: "#fee2e2", fg: "#991b1b" },
};

/** Pedido do histórico: número, data, status, itens, totais e endereço (igual ao web) */
export function OrderCard({ order }: { order: Order }) {
  const status = STATUS[order.status] ?? STATUS.pending;
  const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);
  const addr = order.deliveryAddress;

  return (
    <View style={styles.card} testID={`pedido-${order.id}`}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>PEDIDO #{order.id}</Text>
          <Text style={styles.meta}>
            {formatDateTime(order.createdAt)} · {itemCount} {itemCount === 1 ? "item" : "itens"}
          </Text>
        </View>
        <View style={[styles.status, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.fg }]}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.items}>
        {order.items.map((item) => (
          <View key={item.productId} style={styles.itemRow}>
            <Text style={styles.itemName} numberOfLines={1}>
              <Text style={styles.qty}>{item.qty}x </Text>
              {item.name}
            </Text>
            <Text style={styles.itemTotal}>{formatPrice(item.lineTotal)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totals}>
        <Row label="Subtotal" value={formatPrice(order.subtotal)} />
        <Row
          label="Frete"
          value={order.deliveryFee === 0 ? "Grátis" : formatPrice(order.deliveryFee)}
          valueStyle={order.deliveryFee === 0 ? { color: colors.success, fontFamily: fonts.bold } : undefined}
        />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
        </View>
        <View style={styles.address}>
          <MapPin size={14} color={colors.primary} />
          <Text style={styles.addressText}>
            {addr.street}, {addr.number}
            {addr.complement ? ` — ${addr.complement}` : ""} · CEP {formatZipCode(addr.zipCode)}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Row({ label, value, valueStyle }: { label: string; value: string; valueStyle?: object }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, valueStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: "rgba(229,231,235,0.4)",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { color: colors.foreground, fontFamily: fonts.display, fontSize: 20, letterSpacing: 1.2 },
  meta: { color: colors.mutedForeground, fontFamily: fonts.regular, fontSize: 12, marginTop: 2 },
  status: { borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontFamily: fonts.black, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },
  items: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md, paddingVertical: 6 },
  itemName: { flex: 1, color: colors.foreground, fontFamily: fonts.regular, fontSize: 14 },
  qty: { color: colors.primary, fontFamily: fonts.bold },
  itemTotal: { color: colors.foreground, fontFamily: fonts.semibold, fontSize: 14 },
  totals: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, gap: 4 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  rowLabel: { color: colors.mutedForeground, fontFamily: fonts.regular, fontSize: 14 },
  rowValue: { color: colors.foreground, fontFamily: fonts.regular, fontSize: 14 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  totalLabel: { color: colors.foreground, fontFamily: fonts.bold, fontSize: 15 },
  totalValue: { color: colors.primary, fontFamily: fonts.black, fontSize: 20 },
  address: { flexDirection: "row", gap: 6, marginTop: spacing.sm, alignItems: "flex-start" },
  addressText: { flex: 1, color: colors.mutedForeground, fontFamily: fonts.regular, fontSize: 12 },
});
