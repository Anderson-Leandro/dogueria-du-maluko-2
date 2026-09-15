import { AboutData } from "../types/about";

export const mockAboutData: AboutData = {
  stats: [
    { value: "5+", label: "Anos de história" },
    { value: "200+", label: "Pedidos por dia" },
    { value: "4.9★", label: "No Google" },
    { value: "8", label: "Dogues no cardápio" },
  ],
  timeline: [
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
  ],
  team: [
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
  ],
  values: [
    {
      icon: "🔥",
      title: "Sabor sem limites",
      text: "Cada dogue é pensado para surpreender. Combinamos ingredientes que parecem loucos e ficam incríveis.",
    },
    {
      icon: "🐕",
      title: "Feito com amor",
      text: "Pão fresquinho, salsicha de qualidade, ingredientes selecionados. Nada de atalho no que vai pro seu prato.",
    },
    {
      icon: "🛵",
      title: "Sempre na hora",
      text: "Delivery rápido porque dogue frio não tem graça. Entregamos em até 40 minutos ou a gente se chama de fuleiro.",
    },
  ],
};
