// Configura o core (URL da API e storage) antes de qualquer tela
import "@/lib/setup";

import React, { useCallback, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Bangers_400Regular } from "@expo-google-fonts/bangers";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import { AuthProvider, CartProvider, useAuth } from "@dogueria/core";
import { ToastProvider, useToast } from "@/components/Toast";
import { colors, fonts } from "@/theme";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

/** Providers do core; o aviso de sessão expirada usa o toast do app */
function Providers({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  const handleSessionExpired = useCallback(
    () => toast.show({ type: "error", title: "Sua sessão expirou. Entre novamente." }),
    [toast]
  );
  return (
    <AuthProvider onSessionExpired={handleSessionExpired}>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

/** Mantém a splash até as fontes e a sessão salva estarem prontas */
function RootStack({ fontsReady }: { fontsReady: boolean }) {
  const { isReady } = useAuth();
  const ready = fontsReady && isReady;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!ready) return null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.dark },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.display, fontSize: 22 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "ENTRAR", contentStyle: { backgroundColor: colors.darker } }} />
      <Stack.Screen name="cadastro" options={{ title: "CRIAR CONTA", contentStyle: { backgroundColor: colors.darker } }} />
      <Stack.Screen name="meus-pedidos" options={{ title: "MEUS PEDIDOS" }} />
      <Stack.Screen name="sobre" options={{ title: "NOSSA HISTÓRIA", contentStyle: { backgroundColor: colors.darker } }} />
      <Stack.Screen name="produto/[id]" options={{ title: "", presentation: "modal" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Bangers_400Regular,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <Providers>
          <StatusBar style="light" />
          {/* Se a fonte falhar, segue com a fonte do sistema em vez de travar na splash */}
          <RootStack fontsReady={fontsLoaded || !!fontError} />
        </Providers>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
