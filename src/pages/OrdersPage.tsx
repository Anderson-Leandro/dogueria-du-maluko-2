import React from "react";
import { MapPin, Package, RefreshCw } from "lucide-react";
import { useMyOrders } from "../hooks/useMyOrders";
import { Order, OrderStatus } from "../types/order";
import { formatDateTime, formatPrice, formatZipCode } from "../utils/formatters";
import { Footer } from "../components/layout/Footer";
import { ErrorState } from "../components/feedback/LoadState";
import { Skeleton } from "../components/ui/skeleton";

interface OrdersPageProps {
  onNavigate?: (path: string) => void;
}

const STATUS_INFO: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Recebido", className: "bg-amber-100 text-amber-800 border-amber-200" },
  preparing: { label: "Em preparo", className: "bg-orange-100 text-orange-800 border-orange-200" },
  delivering: { label: "Saiu para entrega", className: "bg-blue-100 text-blue-800 border-blue-200" },
  delivered: { label: "Entregue", className: "bg-green-100 text-green-800 border-green-200" },
  canceled: { label: "Cancelado", className: "bg-red-100 text-red-800 border-red-200" },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const info = STATUS_INFO[status] ?? STATUS_INFO.pending;
  return (
    <span className={`text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${info.className}`}>
      {info.label}
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  const { deliveryAddress: addr } = order;
  const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <article className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Cabeçalho do pedido */}
      <header className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3.5 border-b border-border bg-muted/40">
        <div className="min-w-0">
          <h2 className="font-display text-xl tracking-widest text-foreground leading-none">
            PEDIDO #{order.id}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDateTime(order.createdAt)} · {itemCount} {itemCount === 1 ? "item" : "itens"}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </header>

      {/* Itens */}
      <ul className="px-4 sm:px-5 py-3 divide-y divide-border">
        {order.items.map((item) => (
          <li key={item.productId} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span className="min-w-0 truncate">
              <span className="font-bold text-primary">{item.qty}x</span>{" "}
              <span className="text-foreground">{item.name}</span>
              <span className="text-muted-foreground text-xs"> · {formatPrice(item.unitPrice)} un.</span>
            </span>
            <span className="font-semibold text-foreground flex-shrink-0">{formatPrice(item.lineTotal)}</span>
          </li>
        ))}
      </ul>

      {/* Totais e endereço */}
      <footer className="px-4 sm:px-5 py-3.5 border-t border-border grid gap-3 sm:grid-cols-2 sm:items-end">
        <p className="flex items-start gap-2 text-xs text-muted-foreground order-2 sm:order-1">
          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
          <span>
            {addr.street}, {addr.number}
            {addr.complement ? ` — ${addr.complement}` : ""} · CEP {formatZipCode(addr.zipCode)}
          </span>
        </p>
        <dl className="text-sm space-y-0.5 order-1 sm:order-2 sm:text-right">
          <div className="flex justify-between sm:justify-end gap-4">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between sm:justify-end gap-4">
            <dt className="text-muted-foreground">Frete</dt>
            <dd className={order.deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>
              {order.deliveryFee === 0 ? "Grátis" : formatPrice(order.deliveryFee)}
            </dd>
          </div>
          <div className="flex justify-between sm:justify-end gap-4 pt-1">
            <dt className="font-bold text-foreground">Total</dt>
            <dd className="font-black text-lg text-primary leading-none">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </footer>
    </article>
  );
}

function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-label="Carregando pedidos">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <Skeleton className="h-6 w-40 bg-muted" />
          <Skeleton className="h-3 w-56 bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-3/4 bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function OrdersPage({ onNavigate }: OrdersPageProps) {
  const { orders, loading, error, refreshOrders } = useMyOrders();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col justify-between">
      <div>
        <div className="bg-[#1a1a2e] py-5 sm:py-6 shadow-xl">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-white text-2xl sm:text-3xl tracking-widest leading-none">
                MEUS PEDIDOS
              </h1>
              <p className="text-white/50 text-xs mt-1.5">Acompanhe o histórico das suas compras</p>
            </div>
            {!loading && !error && orders.length > 0 && (
              <button
                onClick={refreshOrders}
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-bold tracking-widest transition-colors cursor-pointer"
                aria-label="Atualizar pedidos"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ATUALIZAR</span>
              </button>
            )}
          </div>
        </div>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {error ? (
            <ErrorState message={error} onRetry={refreshOrders} />
          ) : loading ? (
            <OrdersSkeleton />
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-4 py-16">
              <Package className="w-14 h-14 text-muted-foreground/50" />
              <div>
                <p className="font-display text-2xl tracking-widest text-foreground">NENHUM PEDIDO AINDA</p>
                <p className="text-sm text-muted-foreground mt-1">Que tal pedir o seu primeiro dogue?</p>
              </div>
              <button
                onClick={() => onNavigate?.("/cardapio")}
                className="bg-primary hover:bg-orange-400 text-white font-display text-lg tracking-widest px-8 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                VER CARDÁPIO
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
