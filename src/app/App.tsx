import { useState, useRef, useEffect } from "react";
import logoComTexto from "@/imports/cachorro_e_texto_sem_fundo.png";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  ChevronRight,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  MapPin,
  Hash,
  Home,
  CheckCircle,
  Trash2,
  ShoppingBag,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  imageUrl: string;
  badge?: string;
  ingredients: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
}

type Screen = "store" | "cardapio" | "login" | "register" | "about";

type Purchasable = { id: number; name: string; price: number; imageUrl: string };

// ── Data ───────────────────────────────────────────────────────────────────

const products: Product[] = [
  {
    id: 1,
    name: "DOG MANEIRO",
    shortDescription: "Com purê, milho, batata palha",
    fullDescription:
      "O clássico que todo mundo ama! Salsicha premium grelhada no pão artesanal crocante, coberto com nosso purê cremoso especial, milho verde refogado na manteiga e bastante batata palha crocante. Uma combinação irresistível que define o sabor da Dogueria Du Maluko.",
    price: 19.9,
    imageUrl:
      "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=600&h=400&fit=crop&auto=format",
    badge: "MAIS PEDIDO",
    ingredients: ["Salsicha premium", "Purê cremoso", "Milho verde", "Batata palha", "Maionese"],
  },
  {
    id: 2,
    name: "DOG FULEIRO",
    shortDescription: "Com purê, batata palha",
    fullDescription:
      "Simples mas poderoso! Nossa salsicha selecionada no pão artesanal quentinho, com purê cremoso feito na hora e finalizado com bastante batata palha crocante. O dog perfeito para quem quer saborear o essencial sem abrir mão do sabor.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1613482084286-41f25b486fa2?w=600&h=400&fit=crop&auto=format",
    ingredients: ["Salsicha", "Purê cremoso", "Batata palha", "Mostarda"],
  },
  {
    id: 3,
    name: "DOG CARAMELO",
    shortDescription: "Com farofa de bacon, bacon em fatias",
    fullDescription:
      "Para os amantes de bacon! Salsicha especial grelhada com generosas fatias de bacon tostado e farofa de bacon caseira, tudo sobre um pão macio e morno. O sabor defumado e crocante vai te conquistar na primeira mordida.",
    price: 24.0,
    imageUrl:
      "https://images.unsplash.com/photo-1678033382919-fa907632fdda?w=600&h=400&fit=crop&auto=format",
    badge: "ESPECIAL",
    ingredients: ["Salsicha especial", "Bacon fatiado", "Farofa de bacon", "Cebola caramelada"],
  },
  {
    id: 4,
    name: "DOG FRANGUINHO",
    shortDescription: "Com frango desfiado temperado",
    fullDescription:
      "Uma opção leve e deliciosa! Pão artesanal recheado com frango desfiado temperado e cozido lentamente em nosso molho secreto, coberto com maionese temperada e cebolinha fresca. Sabor de comida caseira no estilo dogueria.",
    price: 21.9,
    imageUrl:
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&h=400&fit=crop&auto=format",
    ingredients: ["Frango desfiado", "Molho secreto", "Maionese temperada", "Cebolinha"],
  },
  {
    id: 5,
    name: "DOG LOUCO",
    shortDescription: "Com cream cheese, calabresa defumada",
    fullDescription:
      "Esse é para os corajosos! Salsicha grelhada no pão artesanal coberta com cream cheese derretido e rodelas de calabresa defumada levemente apimentada. Uma explosão de sabor que vai deixar você com vontade de pedir de novo.",
    price: 22.9,
    imageUrl:
      "https://images.unsplash.com/photo-1721648373511-fb220d7f043f?w=600&h=400&fit=crop&auto=format",
    badge: "NOVO",
    ingredients: ["Salsicha", "Cream cheese", "Calabresa defumada", "Pimenta biquinho"],
  },
  {
    id: 6,
    name: "DOG ESPECIAL",
    shortDescription: "Com cheddar, bacon crocante, cebola crispy",
    fullDescription:
      "O mais completo da casa! Salsicha premium grelhada no pão brioche artesanal, coberta com cheddar inglês derretido, bacon crocante em pedaços, cebola crispy dourada e molho especial da casa. Uma experiência gastronômica única.",
    price: 26.9,
    imageUrl:
      "https://images.unsplash.com/photo-1695089028533-c6e9cf1ee3cb?w=600&h=400&fit=crop&auto=format",
    badge: "TOP",
    ingredients: ["Salsicha premium", "Cheddar inglês", "Bacon crocante", "Cebola crispy", "Molho especial"],
  },
  {
    id: 7,
    name: "DOG VEGANO",
    shortDescription: "Com salsicha vegetal, guacamole",
    fullDescription:
      "Pensando em todos os amigos! Salsicha 100% vegetal grelhada no pão integral, coberta com guacamole fresco, tomate picado, rúcula e molho tahine. Sabor incrível sem nenhum ingrediente de origem animal.",
    price: 23.9,
    imageUrl:
      "https://images.unsplash.com/photo-1638368593117-f87fb4ebeb74?w=600&h=400&fit=crop&auto=format",
    ingredients: ["Salsicha vegetal", "Guacamole", "Tomate", "Rúcula", "Molho tahine"],
  },
  {
    id: 8,
    name: "DOG DUPLO",
    shortDescription: "Dois dogs, dobro de prazer",
    fullDescription:
      "Para quem não consegue se decidir! Duas salsichas premium grelhadas no mesmo pão XL, com purê, milho, batata palha, cheddar derretido e nosso molho especial da casa. O dog dos campeões.",
    price: 29.9,
    imageUrl:
      "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=600&h=400&fit=crop&auto=format",
    badge: "XL",
    ingredients: ["2x Salsicha premium", "Purê", "Milho", "Batata palha", "Cheddar", "Molho especial"],
  },
];

const formatPrice = (value: number) =>
  `R$${value.toFixed(2).replace(".", ",")}`;

// ── Cart Dropdown ──────────────────────────────────────────────────────────

function CartDropdown({
  items,
  onRemove,
  onUpdateQty,
  onClose,
}: {
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
  onClose: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isEmpty = items.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute top-full right-0 mt-3 z-50 w-80 sm:w-96 bg-[#1a1a2e] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="font-display text-lg text-white tracking-widest">MEU CARRINHO</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.1)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item list — scrollable */}
        <div className="overflow-y-auto flex-1 max-h-72 overscroll-contain">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
              <ShoppingBag className="w-10 h-10 text-white/20" />
              <p className="text-white/40 text-sm font-semibold">Seu carrinho está vazio</p>
              <p className="text-white/25 text-xs">Adicione algum dogue para continuar!</p>
            </div>
          ) : (
            <ul className="divide-y divide-[rgba(255,255,255,0.05)]">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                  {/* Thumb */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-orange-900/20"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-white text-sm tracking-widest truncate leading-tight">
                      {item.name}
                    </p>
                    <p className="text-primary font-black text-xs mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] rounded-full border border-white/10 px-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        item.qty > 1
                          ? onUpdateQty(item.id, item.qty - 1)
                          : onRemove(item.id)
                      }
                      className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-white font-black text-xs">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-white/70 font-bold text-xs">
                      {formatPrice(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-white/25 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fixed footer — always visible */}
        <div className="border-t border-white/10 px-4 pt-3 pb-4 flex-shrink-0 bg-[#13132a]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Total do pedido</span>
            <span className="font-black text-xl text-primary">{formatPrice(total)}</span>
          </div>
          <button
            disabled={isEmpty}
            className="w-full bg-primary hover:bg-orange-400 disabled:bg-[rgba(255,255,255,0.1)] disabled:text-white/30 disabled:cursor-not-allowed text-white font-display text-xl tracking-widest py-3 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            CONFIRMAR COMPRA
          </button>
        </div>
      </div>
    </>
  );
}

// ── Shared Header ──────────────────────────────────────────────────────────

function Header({
  screen,
  cartItems,
  cartBounce,
  onUserClick,
  onLogoClick,
  onNavigate,
  onRemoveItem,
  onUpdateQty,
}: {
  screen: Screen;
  cartItems: CartItem[];
  cartBounce: boolean;
  onUserClick: () => void;
  onLogoClick: () => void;
  onNavigate: (link: string) => void;
  onRemoveItem: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Close dropdown when navigating away
  useEffect(() => { setCartOpen(false); }, [screen]);

  return (
    <header className="bg-[#1a1a2e] sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <button onClick={onLogoClick} className="flex items-center flex-shrink-0 focus:outline-none">
          <img src={logoComTexto} alt="Dogueria Du Maluko" className="h-12 w-auto object-contain" />
        </button>

        {/* Nav — visible on store, cardapio & about */}
        {(screen === "store" || screen === "cardapio" || screen === "about") && (
          <nav className="hidden lg:flex items-center gap-5 ml-8">
            {["INÍCIO", "CARDÁPIO", "SOBRE NÓS", "DELIVERY", "CONTATO"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(link); }}
                className={`text-xs font-bold tracking-widest transition-colors duration-200 ${
                  (link === "SOBRE NÓS" && screen === "about") ||
                  (link === "CARDÁPIO" && screen === "cardapio") ||
                  (link === "INÍCIO" && screen === "store")
                    ? "text-accent"
                    : "text-white/70 hover:text-accent"
                }`}
              >
                {link}
              </a>
            ))}
          </nav>
        )}

        <div className="flex-1" />

        {/* Delivery badge */}
        {(screen === "store" || screen === "cardapio" || screen === "about") && (
          <div className="hidden sm:flex items-center gap-1.5 text-white/60 text-xs font-semibold">
            <span className="text-green-400">🛵</span>
            DELIVERY EM RIBEIRÃO PIRES
          </div>
        )}

        {/* Back button — only on auth screens */}
        {(screen === "login" || screen === "register") && (
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">VOLTAR À LOJA</span>
          </button>
        )}

        {/* User button */}
        <button
          onClick={onUserClick}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
            screen !== "store"
              ? "border-primary/60 text-primary bg-primary/10"
              : "border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-[rgba(255,255,255,0.1)]"
          }`}
        >
          <User className="w-4 h-4" />
        </button>

        {/* Cart button + dropdown */}
        <div className="relative">
          <button
            onClick={() => setCartOpen((v) => !v)}
            className={`relative flex items-center gap-2 bg-primary hover:bg-orange-400 text-white px-4 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg ${
              cartBounce ? "scale-110" : ""
            } ${cartOpen ? "ring-2 ring-white/30" : ""}`}
          >
            <ShoppingCart className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">CARRINHO</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-foreground rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-xs font-black shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {cartOpen && (
            <CartDropdown
              items={cartItems}
              onRemove={onRemoveItem}
              onUpdateQty={onUpdateQty}
              onClose={() => setCartOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}

// ── Input helper ───────────────────────────────────────────────────────────

function Field({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  rightSlot,
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/80 text-xs font-bold tracking-widest uppercase">{label}</label>
      <div
        className={`flex items-center gap-3 bg-[rgba(255,255,255,0.05)] border rounded-xl px-4 py-3 focus-within:border-primary transition-colors ${
          error ? "border-red-500/70" : "border-white/15"
        }`}
      >
        <span className="text-white/40 flex-shrink-0">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none font-body"
        />
        {rightSlot}
      </div>
      {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}
    </div>
  );
}

// ── Login Screen ───────────────────────────────────────────────────────────

function LoginScreen({ onGoRegister, onBack }: { onGoRegister: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.includes("@")) e.email = "Informe um e-mail válido.";
    if (password.length < 6) e.password = "A senha deve ter ao menos 6 caracteres.";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSuccess(true);
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400" />
          <h2 className="font-display text-3xl text-accent tracking-widest">BEM-VINDO DE VOLTA!</h2>
          <p className="text-white/60 text-sm">Login realizado com sucesso.</p>
          <button
            onClick={onBack}
            className="mt-4 bg-primary hover:bg-orange-400 text-white font-display text-xl tracking-widest px-10 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            IR À LOJA
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h2 className="font-display text-4xl text-accent tracking-widest leading-none">ENTRAR</h2>
        <p className="text-white/50 text-sm mt-2">Acesse sua conta para pedir seus dogues favoritos</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          label="E-mail"
          icon={<Mail className="w-4 h-4" />}
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <Field
          label="Senha"
          icon={<Lock className="w-4 h-4" />}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          error={errors.password}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        <div className="flex justify-end">
          <a href="#" className="text-primary hover:text-orange-400 text-xs font-bold transition-colors">
            Esqueci minha senha
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-2"
        >
          ENTRAR
        </button>
      </form>

      <p className="text-center text-white/40 text-sm mt-6">
        Ainda não tem conta?{" "}
        <button onClick={onGoRegister} className="text-accent font-bold hover:underline">
          Cadastre-se
        </button>
      </p>
    </AuthLayout>
  );
}

// ── Register Screen ────────────────────────────────────────────────────────

function RegisterScreen({ onGoLogin, onBack }: { onGoLogin: () => void; onBack: () => void }) {
  const [form, setForm] = useState({
    nome: "", email: "", senha: "", confirmSenha: "",
    cep: "", rua: "", numero: "", complemento: "",
  });
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const handleCep = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 8);
    const formatted = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    set("cep")(formatted);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.nome.trim().split(" ").length < 2) e.nome = "Informe seu nome completo.";
    if (!form.email.includes("@")) e.email = "Informe um e-mail válido.";
    if (form.senha.length < 6) e.senha = "A senha deve ter ao menos 6 caracteres.";
    if (form.senha !== form.confirmSenha) e.confirmSenha = "As senhas não coincidem.";
    if (form.cep.replace(/\D/g, "").length !== 8) e.cep = "CEP inválido (8 dígitos).";
    if (!form.rua.trim()) e.rua = "Informe a rua.";
    if (!form.numero.trim()) e.numero = "Informe o número.";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSuccess(true);
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400" />
          <h2 className="font-display text-3xl text-accent tracking-widest">CADASTRO REALIZADO!</h2>
          <p className="text-white/60 text-sm">
            Bem-vindo(a), {form.nome.split(" ")[0]}! Sua conta foi criada com sucesso.
          </p>
          <button
            onClick={onBack}
            className="mt-4 bg-primary hover:bg-orange-400 text-white font-display text-xl tracking-widest px-10 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            IR À LOJA
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout wide>
      <div className="mb-6 text-center">
        <h2 className="font-display text-4xl text-accent tracking-widest leading-none">CADASTRO</h2>
        <p className="text-white/50 text-sm mt-2">Crie sua conta e peça seus dogues favoritos</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />DADOS PESSOAIS<span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
          </p>
          <div className="flex flex-col gap-3">
            <Field label="Nome completo" icon={<User className="w-4 h-4" />} placeholder="João da Silva" value={form.nome} onChange={set("nome")} error={errors.nome} />
            <Field label="E-mail" icon={<Mail className="w-4 h-4" />} type="email" placeholder="seu@email.com" value={form.email} onChange={set("email")} error={errors.email} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Senha" icon={<Lock className="w-4 h-4" />}
                type={showSenha ? "text" : "password"} placeholder="••••••••"
                value={form.senha} onChange={set("senha")} error={errors.senha}
                rightSlot={
                  <button type="button" onClick={() => setShowSenha((v) => !v)} className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0">
                    {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
              <Field
                label="Confirmar senha" icon={<Lock className="w-4 h-4" />}
                type={showConfirm ? "text" : "password"} placeholder="••••••••"
                value={form.confirmSenha} onChange={set("confirmSenha")} error={errors.confirmSenha}
                rightSlot={
                  <button type="button" onClick={() => setShowConfirm((v) => !v)} className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />ENDEREÇO DE ENTREGA<span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
          </p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="CEP" icon={<MapPin className="w-4 h-4" />} placeholder="00000-000" value={form.cep} onChange={handleCep} error={errors.cep} />
              <div className="sm:col-span-2">
                <Field label="Rua / Avenida" icon={<Home className="w-4 h-4" />} placeholder="Rua das Palmeiras" value={form.rua} onChange={set("rua")} error={errors.rua} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Número" icon={<Hash className="w-4 h-4" />} placeholder="123" value={form.numero} onChange={set("numero")} error={errors.numero} />
              <Field label="Complemento" icon={<Home className="w-4 h-4" />} placeholder="Apto 4B, Bloco C (opcional)" value={form.complemento} onChange={set("complemento")} />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-1">
          CRIAR CONTA
        </button>
      </form>

      <p className="text-center text-white/40 text-sm mt-5">
        Já tem uma conta?{" "}
        <button onClick={onGoLogin} className="text-accent font-bold hover:underline">Entrar</button>
      </p>
    </AuthLayout>
  );
}

// ── Auth Layout wrapper ────────────────────────────────────────────────────

function AuthLayout({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f0f1a] flex items-start justify-center px-4 py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>
      <div className={`relative w-full ${wide ? "max-w-xl" : "max-w-md"} bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm`}>
        <div className="flex justify-center mb-6">
          <img src={logoComTexto} alt="Dogueria Du Maluko" className="h-16 w-auto object-contain" />
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Store Screen ───────────────────────────────────────────────────────────

function StoreScreen({ addToCart, onGoCardapio }: { addToCart: (item: Purchasable, qty: number) => void; onGoCardapio: () => void }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [justAdded, setJustAdded] = useState<Record<number, boolean>>({});

  const handleAddToCart = (product: Product, qty: number) => {
    addToCart(product, qty);
    setJustAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setJustAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  const openModal = (p: Product) => { setSelectedProduct(p); setModalQty(1); };
  const closeModal = () => setSelectedProduct(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-[rgba(255,255,255,0.05)] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[rgba(255,255,255,0.05)] rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[rgba(255,255,255,0.05)] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center relative z-10">
          <p className="text-white/80 font-bold text-sm tracking-widest uppercase mb-4">
            🔥 Seu hot dog mais divertido
          </p>
          <h1 className="font-display tracking-widest leading-none">
            <span className="block text-accent text-6xl sm:text-8xl">A DOGUERIA</span>
            <span className="block text-white text-6xl sm:text-8xl">MAIS MALUCA</span>
            <span className="block text-accent text-5xl sm:text-6xl">DE RIBEIRÃO PIRES!</span>
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button className="bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest px-10 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl">
              PEÇA JÁ SEU DOGUE!
            </button>
            <div className="flex items-center gap-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full px-4 py-2 text-sm font-bold">
              🚚 Entrega grátis acima de R$60,00
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl text-foreground tracking-widest">
              NOSSOS DOGUES MAIS PEDIDOS
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Clique no produto para ver os detalhes completos
            </p>
          </div>
          <button onClick={onGoCardapio} className="hidden sm:flex items-center gap-1.5 text-primary font-bold text-sm hover:underline transition-colors hover:text-orange-400">
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <article
              key={product.id}
              onClick={() => openModal(product)}
              className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group border border-border"
            >
              <div className="relative h-48 bg-orange-50 overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md">
                    {product.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl tracking-widest text-foreground mb-0.5">{product.name}</h3>
                <p className="text-muted-foreground text-xs leading-snug mb-3 line-clamp-2">{product.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-xl text-primary">{formatPrice(product.price)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product, 1); }}
                    className={`text-[11px] font-black px-3 py-2 rounded-full tracking-wider transition-all duration-300 ${
                      justAdded[product.id]
                        ? "bg-green-500 text-white scale-95"
                        : "bg-primary hover:bg-orange-400 text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    {justAdded[product.id] ? "ADICIONADO ✓" : "+ CARRINHO"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Promo strip */}
      <section className="bg-[#1a1a2e] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          {[
            { icon: "🛵", title: "ENTREGA RÁPIDA", sub: "Até 40 minutos" },
            { icon: "⭐", title: "4.9 NO GOOGLE", sub: "+500 avaliações" },
            { icon: "🔥", title: "SEMPRE FRESQUINHO", sub: "Feito na hora" },
            { icon: "💳", title: "ACEITA TODOS OS CARTÕES", sub: "Débito e crédito" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="text-3xl">{item.icon}</span>
              <div className="text-left">
                <div className="font-display text-accent tracking-wider text-base">{item.title}</div>
                <div className="text-white/50 text-xs">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f1a] text-white/50 py-8 px-4 text-center text-xs">
        <div className="font-display text-accent text-2xl tracking-widest mb-1">DOGUERIA DU MALUKO</div>
        <p className="mb-1">Seu hot dog mais divertido de Ribeirão Pires!</p>
        <p className="text-white/30">© 2024 — Todos os direitos reservados</p>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 bg-orange-50 overflow-hidden flex-shrink-0">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-black px-3 py-1 rounded-full tracking-widest">
                  {selectedProduct.badge}
                </span>
              )}
              <button onClick={closeModal} className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4">
                <h2 className="font-display text-white text-3xl tracking-widest drop-shadow-lg">{selectedProduct.name}</h2>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-5 sm:p-6">
              <p className="text-primary font-bold text-sm mb-3">{selectedProduct.shortDescription}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{selectedProduct.fullDescription}</p>
              <div className="mb-5">
                <h4 className="font-bold text-foreground text-xs tracking-widest uppercase mb-2">Ingredientes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.ingredients.map((ing) => (
                    <span key={ing} className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full border border-border">{ing}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border p-4 sm:p-5 flex-shrink-0 bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-0 bg-muted rounded-full overflow-hidden border border-border">
                  <button onClick={() => setModalQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-black text-foreground text-sm">{modalQty}</span>
                  <button onClick={() => setModalQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-xs text-muted-foreground font-semibold">TOTAL</div>
                  <div className="font-black text-2xl text-primary leading-none">{formatPrice(selectedProduct.price * modalQty)}</div>
                </div>
              </div>
              <button
                onClick={() => { handleAddToCart(selectedProduct, modalQty); closeModal(); }}
                className="w-full bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                ADICIONAR AO CARRINHO
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── About Screen ──────────────────────────────────────────────────────────

function AboutScreen({ onGoStore }: { onGoStore: () => void }) {
  const stats = [
    { value: "5+", label: "Anos de história" },
    { value: "200+", label: "Pedidos por dia" },
    { value: "4.9★", label: "No Google" },
    { value: "8", label: "Dogues no cardápio" },
  ];

  const timeline = [
    {
      year: "2019",
      title: "O carrinho maluco",
      text: "Tudo começou com um carrinho vermelho na feira do Parque da Cidade. Lucas Ferreira, apaixonado por culinária desde criança, resolveu vender hot dogs com combinações nada convencionais. Os clientes chamavam de maluco — e o apelido ficou.",
    },
    {
      year: "2020",
      title: "A virada pelo delivery",
      text: "Com a pandemia, o carrinho fechou. Mas o Maluko não parou: em duas semanas montou o delivery e começou a atender pelo WhatsApp. Foi aí que o povo de Ribeirão Pires descobriu o dogue de vez — e o negócio decolou.",
    },
    {
      year: "2022",
      title: "A loja física",
      text: "Com a demanda crescendo, veio a loja própria na Rua das Palmeiras. A irmã Ana assumiu o atendimento, o Rodrigo cuidou das entregas e o Lucas ficou no que faz de melhor: criar dogues absurdamente bons.",
    },
    {
      year: "2024",
      title: "Mais maluco do que nunca",
      text: "Hoje somos a dogueria mais pedida de Ribeirão Pires, com nota 4.9 no Google e mais de 200 pedidos por dia. A receita nunca mudou: ingredientes de verdade, combinações ousadas e muito amor em cada dogue.",
    },
  ];

  const team = [
    {
      name: "Lucas Ferreira",
      role: "Fundador & Chef Maluko",
      bio: "O cara por trás de tudo. Cozinheiro autodidata, amante de hot dog e inventor de combinações que todo mundo acha loucura — até provar.",
      img: "https://images.unsplash.com/photo-1629407119384-d42320c3e576?w=400&h=400&fit=crop&auto=format",
    },
    {
      name: "Ana Ferreira",
      role: "Gestão & Alma do Negócio",
      bio: "Irmã do Lucas e responsável por manter tudo funcionando. É ela quem garante que cada cliente seja tratado como parte da família.",
      img: "https://images.unsplash.com/photo-1683105693841-8c81235be472?w=400&h=400&fit=crop&auto=format",
    },
    {
      name: "Rodrigo Costa",
      role: "Rei das Entregas",
      bio: "Nenhum dogue chega frio na casa do cliente quando o Rodrigo está na moto. Pontual, simpático e fã número 1 do Dog Caramelo.",
      img: "https://images.unsplash.com/photo-1778078985242-d2bc75199f05?w=400&h=400&fit=crop&auto=format",
    },
  ];

  const values = [
    { icon: "🔥", title: "Sabor sem limites", text: "Cada dogue é pensado para surpreender. Combinamos ingredientes que parecem loucos e ficam incríveis." },
    { icon: "🐕", title: "Feito com amor", text: "Pão fresquinho, salsicha de qualidade, ingredientes selecionados. Nada de atalho no que vai pro seu prato." },
    { icon: "🛵", title: "Sempre na hora", text: "Delivery rápido porque dogue frio não tem graça. Entregamos em até 40 minutos ou a gente se chama de fuleiro." },
  ];

  return (
    <div className="bg-[#0f0f1a] text-white min-h-[calc(100vh-64px)]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1779430901079-07d4b6f0481c?w=1400&h=600&fit=crop&auto=format"
            alt="Nossa cozinha"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <p className="text-accent font-bold text-xs tracking-widest uppercase mb-3">🐕 Ribeirão Pires, SP</p>
          <h1 className="font-display tracking-widest leading-none mb-4">
            <span className="block text-white text-5xl sm:text-7xl">NOSSA</span>
            <span className="block text-accent text-5xl sm:text-7xl">HISTÓRIA</span>
          </h1>
          <p className="text-white/70 max-w-md text-base leading-relaxed">
            De um carrinho vermelho na feira ao delivery mais pedido de Ribeirão Pires. Essa é a história da dogueria mais maluca da cidade.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-white text-3xl sm:text-4xl tracking-widest">{s.value}</div>
              <div className="text-white/70 text-xs font-bold tracking-wider uppercase mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-4xl text-accent tracking-widest mb-12 text-center">COMO TUDO COMEÇOU</h2>
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px hidden sm:block" />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className="flex-1 sm:text-right last:text-left">
                  {i % 2 === 1 && <div className="hidden sm:block" />}
                  <div
                    className={`bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-2xl p-6 ${
                      i % 2 === 1 ? "sm:ml-8" : "sm:mr-8"
                    }`}
                  >
                    <span className="font-display text-primary text-2xl tracking-widest">{item.year}</span>
                    <h3 className="font-display text-white text-xl tracking-widest mt-1 mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>

                {/* Year dot on the line */}
                <div className="hidden sm:flex absolute left-1/2 top-6 -translate-x-1/2 w-10 h-10 bg-primary rounded-full items-center justify-center shadow-lg flex-shrink-0 z-10">
                  <span className="text-white font-black text-xs">{item.year.slice(2)}</span>
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-[#13132a] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-accent tracking-widest mb-2 text-center">NOSSO TIME</h2>
          <p className="text-white/40 text-sm text-center mb-10">As pessoas por trás de cada dogue</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-2xl overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-white text-xl tracking-widest leading-tight">{member.name}</h3>
                  <p className="text-primary font-bold text-xs tracking-widest uppercase mt-0.5 mb-3">{member.role}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-4xl text-accent tracking-widest mb-10 text-center">NOSSOS VALORES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-2xl p-7 text-center">
              <div className="text-5xl mb-4">{v.icon}</div>
              <h3 className="font-display text-white text-xl tracking-widest mb-2">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-secondary py-16 px-4 text-center">
        <h2 className="font-display text-accent text-5xl sm:text-6xl tracking-widest leading-none mb-3">
          BORA PEDIR
        </h2>
        <h2 className="font-display text-white text-5xl sm:text-6xl tracking-widest leading-none mb-8">
          UM DOGUE?
        </h2>
        <button
          onClick={onGoStore}
          className="bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest px-12 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          VER O CARDÁPIO
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a14] text-white/30 py-8 px-4 text-center text-xs">
        <div className="font-display text-accent text-2xl tracking-widest mb-1">DOGUERIA DU MALUKO</div>
        <p className="mb-1">Seu hot dog mais divertido de Ribeirão Pires!</p>
        <p>© 2024 — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

// ── Cardápio Screen ────────────────────────────────────────────────────────

interface Drink extends Purchasable {
  description: string;
  category: "refrigerante" | "suco" | "cerveja" | "agua";
}

const drinks: Drink[] = [
  {
    id: 101, category: "refrigerante",
    name: "Coca-Cola Lata",
    description: "Lata gelada 350ml. O clássico que combina com qualquer dogue.",
    price: 6.0,
    imageUrl: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 102, category: "refrigerante",
    name: "Guaraná Antarctica",
    description: "Lata gelada 350ml. O sabor brasileiro que todo mundo ama.",
    price: 6.0,
    imageUrl: "https://images.unsplash.com/photo-1674176508097-463b009c6004?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 103, category: "refrigerante",
    name: "Sprite Lata",
    description: "Lata gelada 350ml. Refrescante, leve e perfeita pra cortar a gordura.",
    price: 6.0,
    imageUrl: "https://images.unsplash.com/photo-1588238142232-7108fb7dcbb6?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 104, category: "refrigerante",
    name: "Fanta Laranja Lata",
    description: "Lata gelada 350ml. Doce e frutada, a queridinha da garotada.",
    price: 6.0,
    imageUrl: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 105, category: "suco",
    name: "Suco de Maracujá",
    description: "500ml feito na hora, bem gelado. Azedinho na medida certa.",
    price: 12.0,
    imageUrl: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 106, category: "suco",
    name: "Suco de Laranja Natural",
    description: "500ml espremido na hora. Puro, sem conservante, sem frescura.",
    price: 12.0,
    imageUrl: "https://images.unsplash.com/photo-1622597467821-df79dcb4f94d?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 107, category: "cerveja",
    name: "Heineken Long Neck",
    description: "330ml bem gelada. Pra quem quer um dogue com aquela cerveja especial.",
    price: 14.0,
    imageUrl: "https://images.unsplash.com/photo-1642647237318-3e30ff181a3c?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 108, category: "cerveja",
    name: "Brahma Long Neck",
    description: "330ml gelada. O clássico brasileiro que cai muito bem com qualquer dogue.",
    price: 10.0,
    imageUrl: "https://images.unsplash.com/photo-1625409363042-1f7e6771ca83?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 109, category: "agua",
    name: "Água Mineral",
    description: "Garrafa 500ml sem gás. Simples e necessária.",
    price: 4.0,
    imageUrl: "https://images.unsplash.com/photo-1588238142232-7108fb7dcbb6?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 110, category: "agua",
    name: "Água com Gás",
    description: "Garrafa 500ml com gás. Para os apreciadores do borbulhante.",
    price: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1588238142232-7108fb7dcbb6?w=400&h=300&fit=crop&auto=format",
  },
];

const drinkCategories: { key: Drink["category"]; label: string; emoji: string }[] = [
  { key: "refrigerante", label: "Refrigerantes", emoji: "🥤" },
  { key: "suco",         label: "Sucos da Casa", emoji: "🍊" },
  { key: "cerveja",      label: "Cervejas",       emoji: "🍺" },
  { key: "agua",         label: "Águas",          emoji: "💧" },
];

function CardapioScreen({ addToCart }: { addToCart: (item: Purchasable, qty: number) => void }) {
  const [tab, setTab] = useState<"dogues" | "bebidas">("dogues");
  const [justAdded, setJustAdded] = useState<Record<number, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQty, setModalQty] = useState(1);

  const handleAdd = (item: Purchasable, qty = 1) => {
    addToCart(item, qty);
    setJustAdded((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => setJustAdded((prev) => ({ ...prev, [item.id]: false })), 1500);
  };

  const openModal = (p: Product) => { setSelectedProduct(p); setModalQty(1); };
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">

      {/* Hero strip */}
      <div className="bg-[#1a1a2e] px-4 sm:px-6 pt-4 pb-0 sticky top-[72px] z-30 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-white text-3xl tracking-widest leading-none mb-3">
            CARDÁPIO
          </h1>

          {/* Tabs */}
          <div className="flex gap-1">
            {([
              { id: "dogues",   label: "🌭  DOGUES",   count: products.length },
              { id: "bebidas",  label: "🥤  BEBIDAS",  count: drinks.length },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-6 py-2.5 font-display text-lg tracking-widest rounded-t-xl transition-all duration-200 flex items-center gap-2 ${
                  tab === t.id
                    ? "bg-background text-foreground"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {t.label}
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                  tab === t.id ? "bg-primary text-white" : "bg-[rgba(255,255,255,0.1)] text-white/50"
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DOGUES tab ── */}
      {tab === "dogues" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <article
                key={product.id}
                onClick={() => openModal(product)}
                className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group border border-border"
              >
                <div className="relative h-48 bg-orange-50 overflow-hidden">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl tracking-widest text-foreground mb-0.5">{product.name}</h3>
                  <p className="text-muted-foreground text-xs leading-snug mb-3 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xl text-primary">{formatPrice(product.price)}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                      className={`text-[11px] font-black px-3 py-2 rounded-full tracking-wider transition-all duration-300 ${
                        justAdded[product.id]
                          ? "bg-green-500 text-white scale-95"
                          : "bg-primary hover:bg-orange-400 text-white hover:scale-105 active:scale-95"
                      }`}
                    >
                      {justAdded[product.id] ? "ADICIONADO ✓" : "+ CARRINHO"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── BEBIDAS tab ── */}
      {tab === "bebidas" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-10">
          {drinkCategories.map((cat) => {
            const items = drinks.filter((d) => d.category === cat.key);
            return (
              <div key={cat.key}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h2 className="font-display text-2xl text-foreground tracking-widest">{cat.label}</h2>
                  <span className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {items.map((drink) => (
                    <div
                      key={drink.id}
                      className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="h-36 overflow-hidden bg-muted">
                        <img src={drink.imageUrl} alt={drink.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg tracking-widest text-foreground mb-0.5">{drink.name}</h3>
                        <p className="text-muted-foreground text-xs leading-snug mb-3">{drink.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-black text-lg text-primary">{formatPrice(drink.price)}</span>
                          <button
                            onClick={() => handleAdd(drink)}
                            className={`text-[11px] font-black px-3 py-2 rounded-full tracking-wider transition-all duration-300 ${
                              justAdded[drink.id]
                                ? "bg-green-500 text-white scale-95"
                                : "bg-primary hover:bg-orange-400 text-white hover:scale-105 active:scale-95"
                            }`}
                          >
                            {justAdded[drink.id] ? "ADICIONADO ✓" : "+ CARRINHO"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Product detail modal (dogues only) */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 bg-orange-50 overflow-hidden flex-shrink-0">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-black px-3 py-1 rounded-full tracking-widest">
                  {selectedProduct.badge}
                </span>
              )}
              <button onClick={closeModal} className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4">
                <h2 className="font-display text-white text-3xl tracking-widest drop-shadow-lg">{selectedProduct.name}</h2>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-5 sm:p-6">
              <p className="text-primary font-bold text-sm mb-3">{selectedProduct.shortDescription}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{selectedProduct.fullDescription}</p>
              <div className="mb-5">
                <h4 className="font-bold text-foreground text-xs tracking-widest uppercase mb-2">Ingredientes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.ingredients.map((ing) => (
                    <span key={ing} className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full border border-border">{ing}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-border p-4 sm:p-5 flex-shrink-0 bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center bg-muted rounded-full overflow-hidden border border-border">
                  <button onClick={() => setModalQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-black text-foreground text-sm">{modalQty}</span>
                  <button onClick={() => setModalQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-xs text-muted-foreground font-semibold">TOTAL</div>
                  <div className="font-black text-2xl text-primary leading-none">{formatPrice(selectedProduct.price * modalQty)}</div>
                </div>
              </div>
              <button
                onClick={() => { handleAdd(selectedProduct, modalQty); closeModal(); }}
                className="w-full bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                ADICIONAR AO CARRINHO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("store");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartBounce, setCartBounce] = useState(false);

  const triggerCartBounce = () => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 400);
  };

  const addToCart = (item: Purchasable, qty: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl, qty }];
    });
    triggerCartBounce();
  };

  const removeFromCart = (id: number) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, qty: number) =>
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));

  const handleUserClick = () =>
    setScreen((s) => (s === "login" || s === "register" ? "store" : "login"));

  const handleNavigate = (link: string) => {
    if (link === "SOBRE NÓS") setScreen("about");
    else if (link === "CARDÁPIO") setScreen("cardapio");
    else if (link === "INÍCIO") setScreen("store");
  };

  return (
    <div className="min-h-screen font-body bg-background text-foreground">
      <Header
        screen={screen}
        cartItems={cartItems}
        cartBounce={cartBounce}
        onUserClick={handleUserClick}
        onLogoClick={() => setScreen("store")}
        onNavigate={handleNavigate}
        onRemoveItem={removeFromCart}
        onUpdateQty={updateQty}
      />

      {screen === "store" && <StoreScreen addToCart={addToCart} onGoCardapio={() => setScreen("cardapio")} />}
      {screen === "cardapio" && <CardapioScreen addToCart={addToCart} />}
      {screen === "about" && <AboutScreen onGoStore={() => setScreen("cardapio")} />}
      {screen === "login" && (
        <LoginScreen onGoRegister={() => setScreen("register")} onBack={() => setScreen("store")} />
      )}
      {screen === "register" && (
        <RegisterScreen onGoLogin={() => setScreen("login")} onBack={() => setScreen("store")} />
      )}
    </div>
  );
}
