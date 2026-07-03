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
    slug: "prompts-eficientes-claude-fable-5",
    titulo: "Como fazer prompts eficientes para o Claude Fable 5",
    resumo:
      "A Anthropic publicou um guia oficial de como fazer prompts pro Fable 5. Traduzimos aqui na íntegra — com as principais mudanças de comportamento e o que ajustar no seu scaffolding.",
    data: "2026-07-02",
    categoria: "IA",
    tempoLeitura: "8 min",
    conteudo: `O Claude Fable 5 é o modelo mais capaz da Anthropic — e ele se comporta diferente dos anteriores. A Anthropic publicou um guia oficial de como fazer prompts pra ele, e traduzimos aqui na íntegra.

O Fable 5 encara problemas que antes eram complexos, longos ou ambíguos demais pros modelos anteriores, e é especialmente eficaz em trabalho de ponta a ponta que levaria horas, dias ou semanas pra uma pessoa completar. Os times com melhores resultados aplicam o Fable 5 nos problemas mais difíceis ainda não resolvidos — testá-lo só em tarefas simples subestima o alcance dele.

## Em que ele melhorou

Comparado ao Claude Opus 4.8, o Fable 5 melhora em:

- **Autonomia de longo prazo** — sustenta produção por períodos estendidos, completando execuções de vários dias sem perder as instruções
- **Acerto de primeira** — em problemas complexos e bem especificados, testadores relataram implementações de uma passada só em sistemas que antes levavam dias de iteração
- **Visão** — interpreta imagens técnicas densas e screenshots detalhados com muito mais precisão
- **Fluxos corporativos** — análise financeira, planilhas, apresentações e documentos com qualidade profissional
- **Code review e debugging** — encontra bem mais bugs, inclusive vasculhando o histórico do repositório
- **Ambiguidade** — se vira bem com pedidos complexos e de múltiplas frentes quando precisa decidir os próximos passos
- **Delegação** — despacha e coordena subagentes paralelos com muito mais confiabilidade

## Turnos mais longos por padrão

Requisições em tarefas difíceis podem rodar por muitos minutos em níveis altos de effort, e execuções autônomas podem se estender por horas. Essa é uma das maiores mudanças que os times encontram. Ajuste timeouts, streaming e indicadores de progresso antes de migrar. Pra evitar que ele planeje demais em tarefas ambíguas:

> Quando tiver informação suficiente para agir, aja. Não re-derive fatos já estabelecidos na conversa, não reabra decisões que o usuário já tomou e não narre opções que você não vai seguir. Se estiver pesando uma escolha, dê uma recomendação, não um inventário exaustivo.

## Considere todos os níveis de effort

O effort é o controle principal entre inteligência, latência e custo. Use high como padrão, xhigh pros trabalhos mais sensíveis e medium ou low pro rotineiro — os níveis baixos do Fable 5 ainda superam o xhigh dos modelos anteriores.

Em effort alto, ele pode arrumar e refatorar além do pedido. Pra evitar:

> Não adicione features, refatore ou introduza abstrações além do que a tarefa exige. Uma correção de bug não precisa de limpeza ao redor. Não projete para requisitos futuros hipotéticos: faça a coisa mais simples que funciona bem. Só valide nas fronteiras do sistema (input do usuário, APIs externas).

## Instruções curtas funcionam

O seguimento de instruções melhorou a ponto de você conseguir direcionar a maioria dos comportamentos com uma instrução breve, em vez de enumerar cada caso. Por exemplo, pra respostas mais diretas:

> Comece pelo resultado. Sua primeira frase deve responder "o que aconteceu" ou "o que você encontrou" — o TLDR que o usuário pediria. Detalhes e justificativas vêm depois. Ser legível e ser conciso são coisas diferentes, e legibilidade importa mais.

E pra ele só parar quando realmente precisa de você:

> Pause para o usuário apenas quando o trabalho genuinamente exigir: uma ação destrutiva ou irreversível, uma mudança real de escopo, ou um input que só ele pode dar. Nesses casos, pergunte e encerre o turno — em vez de encerrar com uma promessa.

## Exija evidência nos relatórios de progresso

Em execuções autônomas longas, instrua o Fable 5 a auditar o progresso contra resultados reais de ferramentas. Nos testes da Anthropic, isso praticamente eliminou relatórios de status inventados:

> Antes de reportar progresso, audite cada afirmação contra um resultado de ferramenta desta sessão. Só reporte trabalho que você pode apontar evidência; se algo ainda não foi verificado, diga isso explicitamente. Se testes falharam, diga com o output; se um passo foi pulado, diga; quando algo está pronto e verificado, afirme sem rodeios.

## Defina as fronteiras

O Fable 5 pode ocasionalmente tomar ações não pedidas (rascunhar um e-mail que ninguém pediu, criar branches de backup). Defina limites explícitos:

> Quando o usuário está descrevendo um problema, fazendo uma pergunta ou pensando alto — e não pedindo uma mudança — a entrega é a sua análise. Reporte o que encontrou e pare. Não aplique correção até que peçam.

## Subagentes paralelos

O Fable 5 despacha subagentes paralelos com muito mais naturalidade. Use subagentes com frequência e prefira comunicação assíncrona entre orquestrador e subagentes em vez de bloquear esperando cada um:

> Delegue subtarefas independentes a subagentes e continue trabalhando enquanto eles rodam. Intervenha se um subagente sair do rumo ou estiver sem contexto relevante.

## Monte um sistema de memória

O Fable 5 rende muito quando pode registrar lições de execuções anteriores e consultá-las depois. Um arquivo Markdown já basta:

> Guarde uma lição por arquivo com um resumo de uma linha no topo. Registre correções e abordagens confirmadas, incluindo por que importaram. Não salve o que o repositório ou o histórico já registram; atualize uma nota existente em vez de duplicar; apague notas que se mostrarem erradas.

## Casos raros de parada precoce

Bem no fundo de uma sessão longa, o Fable 5 pode ocasionalmente encerrar o turno declarando a intenção sem executar, ou pedir permissão quando já tinha o suficiente pra seguir. Um "continua" resolve. Pra pipelines autônomos, adicione:

> Você está operando de forma autônoma. O usuário não está assistindo em tempo real e não pode responder perguntas no meio da tarefa. Para ações reversíveis que decorrem do pedido original, prossiga sem perguntar. Antes de encerrar o turno, cheque seu último parágrafo: se for um plano, uma análise, uma pergunta ou uma promessa de trabalho não feito, faça esse trabalho agora.

## Dê o porquê, não só o pedido

O Fable 5 rende mais quando entende a intenção por trás do pedido — o contexto deixa ele conectar a tarefa à informação relevante:

> Estou trabalhando em [tarefa maior] para [para quem é]. Eles precisam de [o que o resultado destrava]. Com isso em mente: [pedido].

## Legibilidade nas respostas

Em conversas longas e cheias de tool calls, o Fable 5 pode produzir texto difícil de acompanhar. Um adendo de estilo resolve:

> Quando escrever o resumo final, abandone a taquigrafia de trabalho. Escreva frases completas. Nada de cadeias de setas ou rótulos que você inventou no meio do caminho. Abra com o desfecho: uma frase sobre o que aconteceu ou o que encontrou. Depois, o detalhe. Se tiver que escolher entre curto e claro, escolha claro.

## Mudanças recomendadas no scaffolding

- **Comece pelo topo da sua régua de dificuldade** — escolha uma tarefa mais difícil do que você daria aos modelos anteriores
- **Torne a autoverificação explícita** — subagentes verificadores com contexto limpo superam a autocrítica
- **Refatore prompts e skills antigos** — instruções feitas pra modelos anteriores costumam ser prescritivas demais pro Fable 5 e podem degradar a qualidade
- **Não peça pra ele reproduzir o raciocínio na resposta** — isso pode disparar recusas; se precisar de visibilidade, leia os blocos de thinking do adaptive thinking
- **Crie uma ferramenta send-to-user** — pra agentes longos e assíncronos entregarem mensagens ao usuário sem encerrar o turno

---

Este é um artigo traduzido. O original, em inglês, foi publicado pela Anthropic na documentação oficial do Claude.`,
  },
  {
    slug: "claude-fable-5-o-que-muda",
    titulo: "Claude Fable 5: o que muda para quem usa IA no dia a dia",
    resumo:
      "A Anthropic acaba de lançar o Fable 5, o modelo mais avançado da família Claude. Entenda o que muda na prática para empreendedores e criadores de conteúdo.",
    data: "2026-07-01",
    categoria: "IA",
    tempoLeitura: "5 min",
    conteudo: `O Claude Fable 5 é o modelo mais avançado lançado pela Anthropic até agora. Mas o que isso significa na prática, fora dos benchmarks técnicos?

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

Se você quer entender como aplicar isso no seu negócio antes de todo mundo, é exatamente para isso que estou abrindo o acesso antecipado ao KODY OS.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (a.data > b.data ? -1 : 1));
}
