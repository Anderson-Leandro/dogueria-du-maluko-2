import React from "react";
import { Pressable } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

/** Botão de mostrar/ocultar senha dos campos de login e cadastro */
export function PasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  const color = "rgba(255,255,255,0.5)";
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityLabel={visible ? "Ocultar senha" : "Mostrar senha"}
      hitSlop={8}
    >
      {visible ? <EyeOff size={18} color={color} /> : <Eye size={18} color={color} />}
    </Pressable>
  );
}
