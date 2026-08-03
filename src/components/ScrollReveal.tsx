"use client";

import { useEffect } from "react";

/**
 * Revela elementos conforme entram na tela.
 *
 * Não renderiza nada — só observa tudo que tiver a classe `.reveal` e
 * adiciona `.in` quando o elemento aparece, uma vez por elemento.
 * Montado uma vez no layout, vale pra todas as páginas.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    // quem prefere menos movimento vê tudo direto, sem animação
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target); // dispara uma vez só
          }
        });
      },
      // dispara assim que uma fatia entra, pra já estar nítido na leitura
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
