import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen font-body bg-background text-foreground flex flex-col">
      <Header
        currentPath={location.pathname}
        onNavigate={(path) => navigate(path)}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={(path) => navigate(path)} />} />
          <Route path="/cardapio" element={<MenuPage />} />
          <Route path="/sobre" element={<AboutPage onNavigate={(path) => navigate(path)} />} />
          <Route path="/login" element={<LoginPage onNavigate={(path) => navigate(path)} />} />
          <Route path="/cadastro" element={<RegisterPage onNavigate={(path) => navigate(path)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
