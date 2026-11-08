import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts, radius, spacing } from "@/theme";

type ToastType = "success" | "error" | "info";

interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  action?: { label: string; onPress: () => void };
}

interface ToastContextValue {
  show: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ACCENT: Record<ToastType, string> = {
  success: colors.success,
  error: colors.destructive,
  info: colors.secondary,
};

/** Aviso flutuante no topo (equivalente ao toast "sonner" do web; funciona em Android, iOS e web) */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<(ToastOptions & { key: number }) | null>(null);
  const translateY = useRef(new Animated.Value(-120)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const keySeq = useRef(0);

  /**
   * Esconde apenas o aviso `key`. Se um aviso novo interromper a animação de saída,
   * o callback roda com finished=false (ou com outra key) e não apaga o aviso novo.
   */
  const hide = useCallback(
    (key: number) => {
      Animated.timing(translateY, { toValue: -160, duration: 200, useNativeDriver: true }).start(({ finished }) => {
        if (finished) setToast((current) => (current?.key === key ? null : current));
      });
    },
    [translateY]
  );

  const show = useCallback(
    (options: ToastOptions) => {
      if (timer.current) clearTimeout(timer.current);
      const key = ++keySeq.current;
      setToast({ ...options, key });
      timer.current = setTimeout(() => hide(key), options.action ? 5000 : 3500);
    },
    [hide, translateY]
  );

  // Animação de entrada só depois de renderizar o aviso novo. A view não é remontada
  // (sem `key`): desmontar uma Animated.View interrompe as animações do valor compartilhado.
  const toastKey = toast?.key;
  useEffect(() => {
    if (toastKey === undefined) return;
    translateY.stopAnimation();
    translateY.setValue(-120);
    Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6 }).start();
  }, [toastKey, translateY]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <Animated.View
          pointerEvents="box-none"
          style={[styles.wrapper, { top: insets.top + spacing.sm, transform: [{ translateY }] }]}
        >
          <View accessibilityRole="alert" testID="toast" style={[styles.toast, { borderLeftColor: ACCENT[toast.type ?? "info"] }]}>
            <View style={styles.texts}>
              <Text style={styles.title}>{toast.title}</Text>
              {toast.description ? <Text style={styles.description}>{toast.description}</Text> : null}
            </View>
            {toast.action ? (
              <Pressable
                onPress={() => {
                  toast.action?.onPress();
                  if (timer.current) clearTimeout(timer.current);
                  hide(toast.key);
                }}
                style={styles.action}
                accessibilityRole="button"
              >
                <Text style={styles.actionText}>{toast.action.label}</Text>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return ctx;
}

const styles = StyleSheet.create({
  wrapper: { position: "absolute", left: spacing.md, right: spacing.md, zIndex: 1000 },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  texts: { flex: 1 },
  title: { color: colors.white, fontFamily: fonts.bold, fontSize: 14 },
  description: { color: colors.whiteMuted, fontFamily: fonts.regular, fontSize: 12, marginTop: 2 },
  action: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6 },
  actionText: { color: colors.white, fontFamily: fonts.extrabold, fontSize: 12 },
});
