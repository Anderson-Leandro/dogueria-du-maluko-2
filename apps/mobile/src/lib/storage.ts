import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { AUTH_STORAGE_KEY, type KeyValueStorage } from "@dogueria/core";

/** A sessão (token JWT) vai para o armazenamento seguro do sistema; o resto, para o AsyncStorage */
const isSecureKey = (key: string) => Platform.OS !== "web" && key === AUTH_STORAGE_KEY;

/**
 * Storage assíncrono do app:
 * - Sessão: SecureStore (Keychain no iOS, Keystore no Android)
 * - Carrinho e demais dados: AsyncStorage
 * No navegador o SecureStore não existe, então tudo usa AsyncStorage (localStorage).
 */
export const mobileStorage: KeyValueStorage = {
  getItem: (key) => (isSecureKey(key) ? SecureStore.getItemAsync(key) : AsyncStorage.getItem(key)),
  setItem: (key, value) => (isSecureKey(key) ? SecureStore.setItemAsync(key, value) : AsyncStorage.setItem(key, value)),
  removeItem: (key) => (isSecureKey(key) ? SecureStore.deleteItemAsync(key) : AsyncStorage.removeItem(key)),
};
