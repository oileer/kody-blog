<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# blog.eullerlolato.com

Blog de artigos sobre IA, automação e conteúdo. Next 16 · React 19 · Tailwind 4.
Hospedado na Vercel, deploy automático a cada push em `master`.

## Sistema de motion

Componentes em `src/components/`, montados no `layout.tsx` (valem para a home e
para as páginas de artigo):

| Componente | O que faz |
|---|---|
| `SmoothScroll.tsx` | Scroll com inércia via [Lenis](https://github.com/darkroomengineering/lenis) |
| `Parallax.tsx` | Desloca fundos marcados com `data-parallax` |
| `ScrollReveal.tsx` | Revela `.reveal` conforme entra na tela (IntersectionObserver) |

Referência de origem dos efeitos: `fourdesignestudio` no acervo
`kodyos/referencias/` — ver `EFFECTS.md` lá para o catálogo completo.

### Scroll suave (Lenis)

Config em `SmoothScroll.tsx`: `lerp: 0.1` (quanto menor, mais "pesado"),
âncoras e scroll aninhado resolvidos pela própria lib.

Dois detalhes que não são óbvios:

- **`html:not(.lenis)` no `globals.css`.** O Lenis marca `<html class="lenis">`
  quando assume o scroll. O `scroll-behavior: smooth` nativo precisa sair do
  caminho nesse momento, senão os dois disputam a mesma rolagem. Fora do Lenis
  (reduced-motion, JS off) o nativo segue valendo.
- **Reset ao trocar de rota.** O Lenis guarda a posição por conta própria, então
  sem o `scrollTo(0)` no `usePathname` um artigo aberto pela listagem começaria
  na altura em que a listagem estava. O primeiro render fica de fora para não
  atropelar link com âncora vindo de fora.

### Parallax

`Parallax.tsx` só escreve a variável `--parallax-y`; quem aplica o `transform` é
o CSS. Assim o efeito é opcional por elemento e o JS não precisa saber de layout.

Hoje está só no hero da home (`data-parallax="10"` na `.hero-section`). Para
ativar num elemento novo:

```tsx
<section className="hero-section" data-parallax="10">
```

```css
.hero-section::before {
  inset: -14% 0;   /* folga > amplitude, senão a borda da imagem aparece */
  transform: translate3d(0, var(--parallax-y, 0%), 0);
  will-change: transform;
}
```

O número em `data-parallax` é a amplitude em %, padrão 10. **A folga do `inset`
precisa ser maior que a amplitude** — o `::before` esticado tem altura maior que
o pai, então a margem real encolhe proporcionalmente.

### Acessibilidade

Os três componentes checam `prefers-reduced-motion` e não inicializam sob essa
flag. O `<noscript>` no `layout.tsx` força `.reveal` visível para quem está sem
JS — sem isso o conteúdo do blog ficaria invisível.

## Snap

Não está ativo. A home tem 3 seções e comportaria snap, mas as páginas de artigo
são texto corrido — snap ali brigaria com a leitura. Se for adicionar, escopar
**só na home**, nunca em `/artigo/[slug]`. Implementação de referência
(`lenis/snap` com offset de header) está no repo `kodyos-site`.

