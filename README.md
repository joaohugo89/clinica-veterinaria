# VitaPet — Template de Landing Page para Clínica Veterinária

React + TypeScript + Vite + Tailwind CSS + Framer Motion.
Landing page comercializável com divisores em onda animados entre todas as seções.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run typecheck  # tsc --noEmit
```

```
clinica-veterinaria/
├─ index.html                  → shell + <title>/meta (SEO)
├─ tailwind.config.ts          → cores apontando para as variáveis CSS
├─ public/img/                 → fotos (hero, clínica, tutores) e favicon
└─ src/
   ├─ main.tsx · App.tsx       → ordem das seções
   ├─ index.css                → base + componentes (.btn, .card, .badge, .field)
   ├─ data/site.ts             → ⚙️ TODO O CONTEÚDO (textos, preços, fotos, FAQ)
   ├─ lib/whatsapp.ts          → montagem do link wa.me
   ├─ styles/theme.css         → ⚙️ PALETA e variáveis das ondas
   ├─ styles/wave.css          → keyframes das ondas
   ├─ components/              → Wave, Reveal, Counter, Header, WhatsAppFab, icons
   └─ sections/                → Hero, About, Services, Testimonials, FaqContact, Footer
```

---

## 1. Trocar o conteúdo (um arquivo só)

Praticamente tudo o que muda de cliente para cliente está em **`src/data/site.ts`**:
nome da clínica, WhatsApp, e-mail, endereço, horários, redes sociais, textos de cada
seção, cards de serviços com preço, depoimentos, perguntas do FAQ e caminhos das fotos.
O objeto é tipado, então o TypeScript avisa se faltar um campo.

| O quê | Onde |
|---|---|
| Título da aba, descrição e SEO | `index.html` |
| Todos os textos e links | `src/data/site.ts` |
| Fotos | arquivos em `public/img/`: `hero-dog.png` (recorte SEM fundo), `clinica.jpg` (5:4), `tutor-1..3.jpg` (quadradas) |
| Ícones dos serviços | `src/components/icons.tsx` (`serviceIcons`) — o card escolhe pelo nome em `site.ts` |
| Ordem das seções | `src/App.tsx` |

**Número do WhatsApp:** `site.contact.whatsapp` (só dígitos, com DDI). Ele alimenta o botão
flutuante, os CTAs e o envio do formulário.

---

## 2. Trocar as cores

Em **`src/styles/theme.css`**, no `:root`. Cada cor aparece duas vezes:

```css
--c-brand-rgb: 140 74 38;            /* canais — edite só esta linha */
--c-brand: rgb(var(--c-brand-rgb));  /* derivada, não edite */
```

Os canais separados são o que permite usar opacidade nas classes do Tailwind
(`bg-brand/10`, `text-onBrand/70`) — `tailwind.config.ts` monta as cores como
`rgb(var(--c-brand-rgb) / <alpha-value>)`.

| Variável | Uso |
|---|---|
| `--c-brand` | fundo do Hero e blocos de destaque |
| `--c-brand-deep` | seção de Serviços |
| `--c-brand-dark` | rodapé |
| `--c-sand` / `--c-sand-2` | seções claras |
| `--c-gold` / `--c-gold-soft` | botões, badges, números |
| `--c-ink` / `--c-ink-soft` | textos |

---

## 3. Como funcionam os divisores em onda

Cada seção termina com o componente:

```tsx
<Wave from="var(--c-brand)" to="var(--c-sand)" offset={0} />
```

- `from` → cor da seção **atual** (fundo do divisor)
- `to` → cor da **próxima** seção (preenchimento das ondas)
- `offset` → defasagem da animação, para que dois divisores nunca fiquem sincronizados

### A estrutura do SVG

```tsx
<svg viewBox="0 0 1200 140" preserveAspectRatio="none">
  <path id={tileId} d="M0,70 C150,15 450,15 600,70 C750,125 1050,125 1200,70 L1200,140 L0,140 Z" />
```

- `preserveAspectRatio="none"` faz a onda **esticar** na largura da tela — é isso que a
  torna responsiva sem nenhuma media query de desenho.
- O `path` é um **tile de 1200px** usado duas vezes por camada (`x=0` e `x=1200`),
  formando 2400px contínuos. A animação translada `-1200px` e volta ao ponto inicial:
  loop sem emenda.
- São **3 camadas** (`--back`, `--mid`, `--front`) com opacidades 0.35 / 0.6 / 1 e
  deslocamentos verticais diferentes, criando profundidade. A do meio roda em
  `animation-direction: reverse` para as curvas se cruzarem.
- O sobe-e-desce fica num `<g>` **separado** do que desliza: os dois animam `transform`
  e um sobrescreveria o outro. É a soma dos dois, em velocidades distintas, que dá a
  sensação de morphing orgânico — sem o custo de animar os pontos do path.
- `useId()` gera um `id` único por instância; sem isso o 2º divisor reaproveitaria o
  `<path>` do 1º.

### Personalizar velocidade e tamanho

Em `src/styles/theme.css`:

```css
--wave-speed-back:  26s;   /* camada de trás — maior = mais lenta */
--wave-speed-mid:   18s;
--wave-speed-front: 12s;
--wave-bob:          7s;   /* respiração vertical */
--wave-height:     110px;  /* altura no desktop */
--wave-height-sm:   64px;  /* altura no mobile  */
```

Mantenha a camada da frente **mais rápida** que a de trás (efeito parallax). Para ondas
mais calmas, multiplique os três valores por 1.5; para ondas mais altas, suba
`--wave-height` e exagere os números do `d` do path (os `15` e `125`).

### A "linha" que às vezes aparece sob a onda

Dois detalhes a respeitar ao criar uma seção nova com onda:

1. A seção **não pode ter `padding-bottom`** — ele ficaria depois do SVG e viraria uma
   listra da cor da seção anterior.
2. `.wave { margin-bottom: -1px }` (já em `wave.css`) cobre o arredondamento de
   sub-pixel do SVG esticado.

---

## 4. O pet recortado do Hero

O hero usa um **PNG com fundo transparente** (`public/img/hero-dog-alt.png`), em altura
total ao lado do conteúdo — no desktop ele é posicionado em `absolute` e a coluna de texto
fica limitada a 56% da largura, por isso o pet ocupa o resto da seção. Abaixo de `lg`,
entra uma cópia do pet logo depois dos botões.

Camadas e animações do hero:

| Elemento | Animação |
|---|---|
| Pet | entrada (`opacity`+`scale`+`y`), **parallax** no scroll, fade ao sair e **parallax do ponteiro** (`useSpring`) |
| Palco do pet | disco de luz, dois anéis girando em sentidos opostos (um com ponto luminoso) e sombra no chão |
| Cards de destaque (`site.hero.highlights`) | entram em cascata e flutuam; viram chips embaixo do pet no mobile |
| Título | entra **palavra a palavra**, de baixo para cima |
| Faixa rolante (`site.hero.ticker`) | marquee infinito acima da onda (duas cópias emendadas) |
| Anel tracejado atrás do pet | rotação contínua de 70s |
| Halo dourado + clarão radial | estáticos, dão volume ao recorte |
| Trilhas de patinhas (`pawTrails`) | pegadas acendem em sequência, como um pet atravessando a seção; cada trilha tem caminho, atraso e opacidade próprios, em % da seção |
| Ponto do badge | pulso tipo "ao vivo" |
| Traço sob a última palavra em destaque | largura 0 → 100% após a entrada do título |
| CTA primário | anel pulsante atrás do botão |
| Métricas | contador de 0 até o valor |
| Indicador de rolagem | sobe e desce |

Credencial (CRMV) e prova social (avatares + nota) ficam **ancoradas abaixo dos botões**,
não como cartões flutuantes soltos sobre a foto.

**Telas muito grandes:** a seção é um `flex flex-col` com o conteúdo em `flex-1` e a onda
em `mt-auto`. Sem isso, a sobra do `min-h-[94vh]` apareceria *depois* da onda, como uma
faixa marrom. O pet é ancorado em `bottom: calc(var(--wave-height) - 46px)` — ou seja, ao
topo da onda, não ao fim da seção — e tem `max-h` para não gigantizar em monitores altos.

Já vem uma alternativa pronta: `/img/hero-dog.png` (close do rosto do cão).
Troque em `site.hero.photo`.

**Para recortar outra foto**, qualquer ferramenta de remoção de fundo serve
(remove.bg, Photoroom) — ou localmente com Python:

```bash
pip install rembg pillow
python -c "from rembg import remove; from PIL import Image; im = remove(Image.open('foto.jpg')); im.crop(im.getbbox()).save('public/img/hero-dog.png')"
```

Exporte com o fundo já recortado e as bordas transparentes aparadas (`getbbox`), largura
máxima de ~1000px.

---

## 5. Ritmo de espaçamento

Todas as seções usam as mesmas classes, definidas em `src/index.css`:

```
.section-top  → padding-top: var(--space-section)
.section-gap  → margin-top:  var(--space-section)   (usada no <Wave/>)
```

O valor vem de `--space-section` no `theme.css` (96px no mobile, 128px a partir de `lg`).
Mudar esse número reescala o ritmo vertical da página inteira.

---

## 6. Animações de entrada

```tsx
<Reveal direction="up">        {/* bloco: fade + deslocamento de 48px */}
  <RevealItem>…</RevealItem>   {/* filhos entram em cascata (stagger 0.09s) */}
</Reveal>
```

`direction` aceita `up | left | right`; `delay` e `stagger` são opcionais. A animação
dispara uma única vez (`viewport={{ once: true }}`). Para mudar o ritmo de toda a página,
edite `duration` e `stagger` em `src/components/Reveal.tsx` — é o único lugar.

`<Counter to={18000} />` anima o número de 0 até o valor quando entra na tela
(`divide={10}` exibe decimais: 49 → "4,9").

**Acessibilidade:** com `prefers-reduced-motion: reduce`, as ondas param e os blocos
aparecem estáticos (`useReducedMotion` + regra no `wave.css`).

---

## 7. Antes de entregar

- [ ] Trocar as fotos de `public/img/` por imagens reais da clínica e da equipe
      (as atuais são do Unsplash — uso livre, mas genéricas).
- [ ] Preencher `site.contact` com WhatsApp, e-mail, endereço e redes reais.
- [ ] Revisar preços e textos dos serviços em `site.services.items`.
- [ ] Adicionar Open Graph no `index.html` e o analytics/pixel do cliente.
- [ ] `npm run build` e publicar a pasta `dist/` (Vercel, Netlify ou hospedagem estática).

---

## 8. Deploy (GitHub Pages)

O repositório já traz `.github/workflows/deploy.yml`: a cada push na `main` ele instala,
builda e publica a pasta `dist/` no GitHub Pages.

**Configuração única, no repositório:**
Settings → Pages → *Build and deployment* → **Source: GitHub Actions**.
(Se ficar em "Deploy from a branch", o Pages serve os arquivos crus do repositório e a
página aparece em branco, porque `index.html` aponta para `/src/main.tsx`.)

O site fica em `https://<usuario>.github.io/<nome-do-repo>/`. O workflow define
`VITE_BASE=/<nome-do-repo>/`, e `src/lib/asset.ts` aplica essa base nas imagens de
`public/` — por isso nada quebra no subdiretório.

**Domínio próprio:** adicione o domínio em Settings → Pages → Custom domain e, no
workflow, troque `VITE_BASE` por `/`.

**Outras hospedagens:** em Vercel/Netlify basta apontar para o repositório
(build `npm run build`, saída `dist`) — sem `VITE_BASE`, porque o site fica na raiz.
