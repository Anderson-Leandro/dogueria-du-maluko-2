import React from "react";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

/** Grade de cards "fantasma" exibida enquanto o catálogo carrega */
export function CardGridSkeleton({ count = 4, imageHeight = "h-48" }: { count?: number; imageHeight?: string }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      aria-busy="true"
      aria-label="Carregando"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
          <Skeleton className={`${imageHeight} w-full rounded-none bg-muted`} />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-2/3 bg-muted" />
            <Skeleton className="h-3 w-full bg-muted" />
            <Skeleton className="h-9 w-full rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  /** Cores para fundo escuro */
  dark?: boolean;
}

/** Mensagem de erro com botão "Tentar novamente" */
export function ErrorState({ message, onRetry, dark = false }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center text-center gap-4 py-16 px-4">
      <span className="text-5xl" aria-hidden>🌭💥</span>
      <p className={`text-sm font-semibold max-w-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-primary hover:bg-orange-400 text-white font-display tracking-widest px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          TENTAR NOVAMENTE
        </button>
      )}
    </div>
  );
}
