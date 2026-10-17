/* ==========================================================================
   ⚙️ CONTEÚDO DO SITE — É AQUI QUE SE EDITA TUDO PARA CADA CLIENTE
   Textos, links, preços, fotos, depoimentos e perguntas do FAQ.
   Nenhum componente precisa ser aberto para trocar o conteúdo.
   ========================================================================== */

export interface NavLink {
  label: string
  href: string
}

/** Métrica de valor fixo (não usada hoje — útil se preferir texto puro) */
export interface Metric {
  value: string
  label: string
}

/** Métrica com contador animado. `divide` serve para decimais: 49 / 10 → 4,9 */
export interface AnimatedMetric {
  to: number
  suffix?: string
  divide?: number
  label: string
}

export interface HeroHighlight {
  icon: 'pulse' | 'syringe' | 'hospital' | 'heart'
  title: string
  text: string
}

export interface Service {
  title: string
  description: string
  price: string
  priceNote: string
  /** nome do ícone em src/components/icons.tsx */
  icon: 'pulse' | 'syringe' | 'hospital' | 'heart'
  highlight?: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  photo: string
}

export interface FaqItem {
  question: string
  answer: string
}

export const site = {
  /** ⚙️ Identidade */
  brand: {
    name: 'VitaPet',
    tagline: 'Clínica Veterinária',
  },

  /** ⚙️ Contato — o telefone vai para o link do WhatsApp (só dígitos, com DDI) */
  contact: {
    whatsapp: '5511999999999',
    phoneLabel: '(11) 99999-9999',
    email: 'contato@vitapet.com.br',
    address: 'Rua das Acácias, 120 — Pinheiros, São Paulo/SP',
    hours: [
      'Consultas · seg a sáb, 8h às 20h',
      'Domingos e feriados · 9h às 18h',
      'Pronto-socorro · 24 horas, todos os dias',
    ],
    socials: [
      { label: 'Instagram', href: '#', icon: 'instagram' as const },
      { label: 'Facebook', href: '#', icon: 'facebook' as const },
      { label: 'YouTube', href: '#', icon: 'youtube' as const },
    ],
  },

  nav: [
    { label: 'A Clínica', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Dúvidas', href: '#faq' },
  ] satisfies NavLink[],

  /** ⚙️ Seção 1 — Hero */
  hero: {
    badge: 'Pronto-socorro 24 horas',
    titleStart: 'O Cuidado que o Seu',
    titleAccent: 'Melhor Amigo',
    titleEnd: 'Merece',
    subtitle:
      'Clínica veterinária completa, com consultas sem correria, exames no mesmo dia e uma equipe que trata cães e gatos com o carinho que eles têm em casa. Atendimento em São Paulo, todos os dias.',
    ctaPrimary: 'Agendar Consulta',
    ctaSecondary: 'Ver Serviços',
    /**
     * ⚙️ Recorte do pet SEM FUNDO (PNG com transparência), em public/img/.
     * Alternativa pronta: '/img/hero-dog.png' (rosto do cão, close).
     */
    photo: '/img/hero-dog-alt.png',
    photoAlt: 'Filhote de golden retriever sentado, olhando para a câmera',
    /** Selo de credencial exibido logo abaixo dos botões */
    credential: { title: 'CRMV-SP 12.345', subtitle: 'Dra. Camila Ribeiro · Responsável técnica' },
    /** Prova social: nota + quantos tutores (os avatares vêm dos depoimentos) */
    rating: { score: '4.9', label: 'de 1.200+ tutores' },

    /** ⚙️ Cards flutuantes ao redor do pet (3 é o ideal; o ícone vem de serviceIcons) */
    highlights: [
      { icon: 'heart', title: 'Emergência 24h', text: 'Todos os dias' },
      { icon: 'pulse', title: 'Exames no local', text: 'Resultado no mesmo dia' },
      { icon: 'syringe', title: 'Vacinação', text: 'Cães e gatos' },
    ] satisfies HeroHighlight[],

    /** ⚙️ Faixa rolante no rodapé do hero */
    ticker: [
      'Clínica geral',
      'Vacinação',
      'Cirurgia',
      'Ortopedia',
      'Exames de imagem',
      'Internação',
      'Felinos',
      'Emergência 24h',
    ],
    /** Contadores animados (prefix/suffix para "15+", "24h"…) */
    metrics: [
      { to: 15, suffix: '+', label: 'Anos de clínica' },
      { to: 18000, label: 'Pets atendidos' },
      { to: 24, suffix: 'h', label: 'Pronto-socorro' },
      { to: 9, label: 'Especialidades' },
    ] satisfies AnimatedMetric[],
  },

  /** ⚙️ Seção 2 — A Clínica */
  about: {
    badge: 'A clínica',
    titleStart: 'Medicina veterinária séria,',
    titleAccent: 'com jeito de casa',
    paragraphs: [
      'A VitaPet nasceu em 2011 como um consultório de duas salas e hoje é uma clínica completa, com internação, centro cirúrgico e pronto-socorro 24 horas. O que não mudou foi o jeito de atender: consulta sem pressa, explicação clara e decisões tomadas junto com o tutor.',
      'Trabalhamos com manejo de baixo estresse — ambientes separados para cães e gatos, contenção mínima e paciência com o pet que chega assustado.',
    ],
    pillars: [
      {
        title: 'Avaliação completa',
        text: 'anamnese, exame físico, exames laboratoriais e de imagem no mesmo dia.',
      },
      {
        title: 'Plano de tratamento transparente',
        text: 'orçamento e alternativas apresentados antes de qualquer procedimento.',
      },
      {
        title: 'Acompanhamento pós-consulta',
        text: 'retorno incluso e suporte por WhatsApp com a equipe.',
      },
    ],
    /** ⚙️ proporção 5:4 */
    photo: '/img/clinica.jpg',
    photoAlt: 'Veterinária acariciando o gato durante a consulta',
    stamp: { value: '+15 anos', label: 'cuidando do bairro' },
  },

  /** ⚙️ Seção 3 — Serviços (duplique um item para adicionar um card) */
  services: {
    badge: 'Serviços',
    titleStart: 'Tudo o que o Seu Pet Precisa',
    titleAccent: 'em um Só Lugar',
    subtitle: 'Cães e gatos, do filhote ao idoso — com retorno incluso em todas as consultas.',
    items: [
      {
        icon: 'pulse',
        title: 'Consulta & Check-up',
        description:
          'Avaliação clínica completa, exames laboratoriais e orientação de rotina. Retorno em até 15 dias incluso.',
        price: 'R$ 180',
        priceNote: '/consulta',
      },
      {
        icon: 'syringe',
        title: 'Vacinação & Microchip',
        description:
          'Protocolo vacinal completo para cães e gatos, vermifugação, microchipagem e emissão de passaporte.',
        price: 'R$ 120',
        priceNote: '/dose',
      },
      {
        icon: 'hospital',
        title: 'Cirurgia & Ortopedia',
        description:
          'Castração, tecidos moles e ortopedia em centro cirúrgico próprio, com anestesista dedicado e internação.',
        price: 'Sob',
        priceNote: ' avaliação',
        highlight: 'Mais procurado',
      },
      {
        icon: 'heart',
        title: 'Emergência 24h',
        description:
          'Pronto-socorro aberto todos os dias, com oxigenoterapia, raio-X, ultrassom e internação monitorada.',
        price: 'R$ 250',
        priceNote: '/atendimento',
      },
    ] satisfies Service[],
  },

  /** ⚙️ Seção 4 — Depoimentos */
  testimonials: {
    badge: 'Depoimentos',
    titleStart: 'Tutores que Confiam',
    titleAccent: 'a Família de Quatro Patas',
    items: [
      {
        quote:
          'Cheguei com a Mel às 2h da manhã, desesperada. Fui atendida na hora, com calma, e me explicaram cada passo. Hoje ela está ótima — não levo em outro lugar.',
        name: 'Marina Costa',
        role: 'Tutora da Mel · Emergência',
        photo: '/img/tutor-1.jpg',
      },
      {
        quote:
          'O Thor fez cirurgia de joelho e a recuperação foi acompanhada de perto, com retorno e fisioterapia. Em dois meses ele voltou a correr no parque.',
        name: 'Rafael Dantas',
        role: 'Tutor do Thor · Ortopedia',
        photo: '/img/tutor-2.jpg',
      },
      {
        quote:
          'Minha gata odiava veterinário. Aqui ela fica numa sala só para gatos, sem latido nenhum — a consulta passou a ser tranquila para nós duas.',
        name: 'Juliana Reis',
        role: 'Tutora da Nina · Felinos',
        photo: '/img/tutor-3.jpg',
      },
    ] satisfies Testimonial[],
    metrics: [
      { to: 18000, label: 'Pets atendidos' },
      { to: 98, suffix: '%', label: 'Tutores que indicam' },
      { to: 15, suffix: ' min', label: 'Espera média na urgência' },
      { to: 49, divide: 10, label: 'Nota média dos tutores' },
    ] satisfies AnimatedMetric[],
  },

  /** ⚙️ Seção 5 — FAQ e formulário */
  faq: {
    badge: 'Dúvidas frequentes',
    titleStart: 'Perguntas que Mais Ouvimos',
    titleAccent: 'na Recepção',
    items: [
      {
        question: 'Preciso agendar ou posso chegar sem hora marcada?',
        answer:
          'Consultas de rotina são agendadas para não haver espera. Urgências são atendidas por ordem de gravidade, 24 horas por dia, sem necessidade de agendamento.',
      },
      {
        question: 'Atendem gatos? Meu gato fica muito estressado.',
        answer:
          'Sim. Temos sala de espera e consultório exclusivos para felinos, sem contato com cães, e usamos manejo de baixo estresse com feromônios e contenção mínima.',
      },
      {
        question: 'Fazem exames no local?',
        answer:
          'Fazemos raio-X digital, ultrassonografia, eletrocardiograma e coleta laboratorial na própria clínica. A maioria dos resultados sai no mesmo dia.',
      },
      {
        question: 'Aceitam planos de saúde pet?',
        answer:
          'Somos credenciados aos principais planos pet do mercado. Traga a carteirinha e confirmamos a cobertura na recepção antes do atendimento.',
      },
      {
        question: 'Posso acompanhar meu pet na internação?',
        answer:
          'Sim. Temos horário de visita diário e enviamos atualizações por WhatsApp com foto e evolução clínica pela manhã e à noite.',
      },
    ] satisfies FaqItem[],
  },

  /** ⚙️ Formulário de agendamento */
  form: {
    title: 'Agende a consulta',
    subtitle: 'Preencha e envie — a mensagem abre direto no WhatsApp.',
    submit: 'Enviar pelo WhatsApp',
    footnote: 'Urgências: ligue (11) 99999-9999 · Atendemos 24h.',
    serviceOptions: [
      'Consulta e check-up',
      'Vacinação e microchip',
      'Cirurgia e ortopedia',
      'Emergência 24h',
    ],
  },

  /** ⚙️ Rodapé */
  footer: {
    ctaTitleStart: 'Seu pet merece',
    ctaTitleAccent: 'um cuidado de confiança',
    ctaSubtitle: 'Agende hoje e garanta horário sem fila de espera.',
    ctaButton: 'Agendar Consulta',
    about:
      'Clínica veterinária com consultas, exames, centro cirúrgico e pronto-socorro 24 horas para cães e gatos.',
    legal: '© 2026 VitaPet Clínica Veterinária · Resp. técnica Dra. Camila Ribeiro · CRMV-SP 12.345',
    credit: 'Template desenvolvido sob medida',
  },
} as const

export type Site = typeof site
