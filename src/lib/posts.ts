export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  data: string;
  categoria: string;
  tempoLeitura: string;
  conteudo: string;
};

export const posts: Post[] = [
  {
    slug: "claude-fable-5-o-que-muda",
    titulo: "Claude Fable 5: o que muda para quem usa IA no dia a dia",
    resumo:
      "A Anthropic acaba de lançar o Fable 5, o modelo mais avançado da família Claude. Entenda o que muda na prática para empreendedores e criadores de conteúdo.",
    data: "2026-07-02",
    categoria: "IA",
    tempoLeitura: "5 min",
    conteudo: `
O Claude Fable 5 é o modelo mais avançado lançado pela Anthropic até agora. Mas o que isso significa na prática, fora dos benchmarks técnicos?

## O que é o Fable 5

O Fable 5 representa uma geração inteiramente nova da família Claude. Diferente dos modelos anteriores (Opus, Sonnet, Haiku), o Fable opera em um nível de raciocínio muito mais próximo de um especialista humano — não apenas gerando texto, mas planejando, revisando e corrigindo o próprio trabalho.

Na prática, isso significa:

- **Respostas mais longas e consistentes** sem perder o fio
- **Capacidade de trabalhar com múltiplos arquivos e contextos** ao mesmo tempo
- **Raciocínio melhorado** em tarefas complexas como estratégia de negócios, código e análise de mercado

## O que muda para empreendedores

Se você usa IA para criar conteúdo, automatizar processos ou estruturar seu negócio, o Fable 5 reduz drasticamente o tempo de prompting.

Com modelos anteriores, você precisava ser muito específico nas instruções. Com o Fable, dar o contexto do negócio uma vez é suficiente para ele manter a coerência em dezenas de tarefas diferentes.

Para quem trabalha com:
- **Criação de conteúdo:** roteiros mais naturais, tom consistente sem repetir briefing
- **Automações:** código mais limpo e funcional de primeira
- **Estratégia:** análise de concorrência e plano de ação muito mais densos

## O impacto no KODY OS

O sistema que estou desenvolvendo — o KODY OS — é baseado exatamente nessa evolução dos modelos de IA. A ideia é que qualquer empresa, mesmo sem equipe técnica, consiga ter um sistema de IA rodando para estruturar seu perfil online, produzir conteúdo e automatizar o atendimento.

O Fable 5 torna isso possível em um nível que não era viável há 12 meses.

## Como acessar

Por ora, o acesso ao Fable 5 está disponível via Claude Code e para contas com planos pagos da Anthropic. No Brasil, a forma mais prática de usar é via API.

Se você quer entender como aplicar isso no seu negócio antes de todo mundo, é exatamente para isso que estou abrindo o acesso antecipado ao KODY OS.
    `.trim(),
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (a.data > b.data ? -1 : 1));
}
