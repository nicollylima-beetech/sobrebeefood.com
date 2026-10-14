# Central SDR BeeFood

Site de consulta e apoio aos SDRs da BeeFood. Reúne em um só lugar os roteiros de prospecção, os planos, as funcionalidades do sistema, as dúvidas frequentes, as boas práticas e as regras internas. Tudo fica em um único arquivo: `index.html`.

O site substitui as páginas do Google Sites "Sobre BeeFood" (Bem-vindos, Sobre BeeFood, Prospecção Delivery e Presencial, Dúvidas gerais e Regras BeeFood). Os roteiros seguem o documento **Prospecção 2.0, versão válida desde 21/09**.

---

## Sumário

1. [Seções do site](#seções-do-site)
2. [Como o SDR usa no dia a dia](#como-o-sdr-usa-no-dia-a-dia)
3. [Roteiros de prospecção](#roteiros-de-prospecção)
4. [Como abrir e hospedar](#como-abrir-e-hospedar)
5. [Como atualizar o conteúdo](#como-atualizar-o-conteúdo)
6. [Estrutura técnica](#estrutura-técnica)
7. [Limitações conhecidas](#limitações-conhecidas)
8. [Histórico de mudanças](#histórico-de-mudanças)

---

## Seções do site

| Menu | Grupo | O que tem |
|---|---|---|
| **Início** | — | Boas-vindas, números principais (30+ calls, 10 dias de teste, horário do suporte, 5 GDC), atalhos para as seções e a história da BeeFood |
| **Roteiro Delivery** | Prospecção | Qualificação passo a passo do lead de delivery, com resumo automático para o vendedor |
| **Roteiro Presencial** | Prospecção | Qualificação do lead presencial, dividida em Mesas (garçons) e Balcão (PDV) |
| **Planos e preços** | Consulta | Zangão, Rainha e BeeFood lado a lado (anual, Pix, cartão, mensal e o que cada um inclui), mais as mensagens prontas sobre planos |
| **Funcionalidades** | Consulta | 37 explicações em 7 categorias: Visão geral, Delivery, Presencial, Pagamentos, Gestão e fiscal, Equipamentos e Mensagens prontas |
| **Dúvidas gerais** | Consulta | 27 respostas para perguntas frequentes dos leads |
| **Boas práticas SDR** | Time | Etapas do Bitrix (LEADS → 2 a 5 GDC → GELADEIRA, mais AQUECIMENTO) e 24 boas práticas em 4 grupos |
| **Regras BeeFood** | Time | 13 regras internas (horários, pausas, férias, Discord, código afiliado etc.) |

---

## Como o SDR usa no dia a dia

### Busca
O campo no topo procura ao mesmo tempo em funcionalidades, planos, dúvidas, boas práticas e regras. A busca ignora acentos e maiúsculas e destaca o termo nos resultados. Para voltar, apague o texto ou clique em uma seção do menu.

### Copiar mensagens
Cada mensagem para o lead aparece em um **balão verde** com o botão **Copiar**. Se o navegador bloquear a cópia automática, o site avisa para selecionar o texto e usar Ctrl+C.

### Cores de cada bloco

| Visual | Significado |
|---|---|
| Balão verde | Mensagem para enviar ao lead |
| Caixa amarela ("Para o SDR") | Orientação interna, **não vai para o lead** |
| Cartão com borda vermelha | Regra ou boa prática de atenção (ex.: código afiliado *danielvilela*, nomenclatura do cliente) |

### Resumo para o vendedor
Nos roteiros, cada resposta marcada pelo SDR vai para o painel **Resumo para o vendedor**. No fim da conversa:

1. Clique em **Copiar resumo**.
2. Cole no comentário do card no Bitrix, que é a anotação obrigatória ao passar o lead.
3. Clique em **Novo lead** para limpar o roteiro.

Exemplo do texto copiado:

```
🐝 Resumo do lead (Roteiro Delivery)
• Operação: Delivery
• Entregas: Marketplaces
• Dispositivo: Computador/notebook
• Dificuldade: controle de estoque
• Gestão: Ambos
• Usa sistema: Não
• Fechamento: Pode mostrar
```

---

## Roteiros de prospecção

Em cada etapa o SDR copia a mensagem, espera a resposta e clica na opção que o lead escolheu. O site então leva para a próxima etapa. O **Mapa da conversa** marca com ✓ as etapas já respondidas e permite pular para qualquer uma.

### Roteiro Delivery

| Código | Etapa | Resposta do lead → próxima etapa |
|---|---|---|
| 01 | Abertura (OFC_COMERCIAL) | Delivery → 02 · Presencial → Roteiro Presencial · Delivery + Presencial → 02 |
| 02 | Tipo de entrega | Motoboy próprio → 04 · Marketplaces → 03 · Ambos → 03 (citar também o app de entregadores) |
| 03 | Usa marketplaces (USA MKT_COMERCIAL) | Computador ou Ambos → 07 · Celular → 06 |
| 04 | Usa motoboy (MOTOBOY_COMERCIAL) | Computador ou Ambos → 07 · Celular → 06 |
| 06 | Sem PC (SEM PC_COMERCIAL) | Anotar a previsão → 07 |
| 07 | Principal dificuldade (PROCURA_COMERCIAL) | Anotar a resposta → 08 |
| 08 | Confirmar gestão (GESTÃO_COMERCIAL) | Qualquer opção → 09 |
| 09 | Usa sistema | Sim ou Não → 09B |
| 09B | Dúvida ou plano (FINAL_COMERCIAL) | → 10 |
| 10 | Próximo passo (Continuar.final) | "Estou com dúvida": perguntar qual é a dúvida · "Pode mostrar": resumo e passar ao vendedor |

### Roteiro Presencial

| Código | Etapa | Resposta do lead → próxima etapa |
|---|---|---|
| 01 | Abertura (OFC_COMERCIAL) | Presencial → 02 · Delivery ou Delivery + Presencial → Roteiro Delivery |
| 02 | Mesa ou balcão | Mesa/garçom → M3 · Balcão → B3 · Ambos → M3 |
| M3 | Usa garçons (roteiro Mesas) | Qualquer faixa → M4 |
| M4 | Tem garçons (roteiro Mesas) | Computador → 05 · Celular → Sem PC. Se respondeu "Ambos" na 02, enviar também a frase do PDV |
| B3 | Usa PDV (roteiro Balcão) | Computador → 05 · Celular → Sem PC |
| PC | Sem PC | Anotar a previsão → 05 |
| 05 | Principal dificuldade (PROCURA_COMERCIAL) | Anotar a resposta → 06 |
| 06 | Confirmar gestão (GESTÃO_COMERCIAL) | Qualquer opção → 07 |
| 07 | Usa sistema | Sim ou Não → 08 |
| 08 | Dúvida ou plano (FINAL_COMERCIAL) | → 09 |
| 09 | Próximo passo (Continuar.final) | Igual ao Delivery |

### Decisões combinadas (não estão no documento original)

- **Delivery + Presencial** segue pelo Roteiro Delivery.
- **Ambos em Delivery (motoboy + marketplaces)** vai para a etapa 03, com uma nota para citar o app de entregadores.
- **Ambos no Presencial (mesa + balcão)** segue pelo roteiro Mesas, com a frase extra do PDV na etapa M4.
- **Celular** leva para a mensagem "Sem PC" nos dois roteiros.

---

## Como abrir e hospedar

O site é um arquivo único e não precisa de instalação, servidor ou banco de dados.

- **No computador:** dê dois cliques em `index.html` para abrir no navegador.
- **Na internet:** envie o arquivo para qualquer hospedagem de site estático, como Netlify, Vercel, GitHub Pages ou a hospedagem da própria BeeFood.
- **Link atual:** o site também está publicado como artefato privado no Claude. Os SDRs só acessam depois de receberem o compartilhamento pelo menu **Share**.

**Dependência externa:** as fontes vêm do Google Fonts (Bricolage Grotesque, Figtree e JetBrains Mono). Sem internet, o site funciona normalmente com as fontes do sistema.

---

## Como atualizar o conteúdo

Todo o conteúdo fica no `<script>` do final do `index.html`, na parte marcada `/* ====================== CONTEÚDO ====================== */`. Para editar, abra o arquivo em um editor de texto (VS Code, Notepad++ etc.) e procure a constante certa:

| Constante | Seção do site | Formato de cada item |
|---|---|---|
| `FLOWS` | Roteiros Delivery e Presencial | `{ id, code, title, when, msg, note?, extra?, key, opts? / free? + next? }` |
| `KB` | Funcionalidades | `["Categoria", "Título", { m: "mensagem", n: "orientação" }]` |
| `FAQ` | Dúvidas gerais | `["Pergunta", { m: "mensagem", n: "orientação" }]` |
| `PLANOS` | Cards de planos | `{ n, i, t, anual, pix, x, mensal, inh?, f: [itens], top? }` |
| `PLANO_MSGS` | Mensagens sobre planos | `["Título", { m: "mensagem" }]` |
| `PRATICAS` | Boas práticas | `["Grupo", [["Título", "Texto", 1 = destaque]]]` |
| `BITRIX` | Etapas do Bitrix | `["ETAPA", "Descrição", "hot" ou "cold"]` |
| `REGRAS` | Regras BeeFood | `["Título", "Texto", 1 = destaque]` |

### Regras de edição

- `m` é o texto que o SDR copia para o lead. `n` é a orientação interna, que aparece em amarelo. Os dois são opcionais, mas cada item precisa ter pelo menos um.
- Use `\n` para quebrar linha dentro de uma mensagem.
- Links que começam com `https://` viram clicáveis sozinhos.
- Não use aspas duplas `"` dentro do texto sem escapar (`\"`). Prefira as aspas curvas “ ”.
- Nos roteiros, cada opção é `["texto do botão", "id da próxima etapa"]`. Para mandar o lead para o outro roteiro, use `"@delivery"` ou `"@presencial"`.
- `key` é o nome do campo no resumo para o vendedor. Ele também precisa estar na lista `keys` do roteiro.
- Use `free: "exemplo"` com `next: "id"` nas etapas em que o SDR digita a resposta em vez de clicar em uma opção.

Os contadores do menu (37 funcionalidades, 27 dúvidas) se atualizam sozinhos.

### Exemplo: adicionar uma dúvida

```js
["Tem integração com o Keeta?",{m:"Sim 😊\nOs pedidos do Keeta caem direto no sistema BeeFood 😉"}],
```

Cole a linha dentro da lista `FAQ`, mantendo a vírgula no final, salve o arquivo e recarregue a página.

---

## Estrutura técnica

```
index.html
├── <head>      Fontes do Google Fonts
├── <style>     Visual: cores (variáveis CSS), layout e componentes
├── <div.app>   Menu lateral + área de conteúdo (preenchida pelo JavaScript)
└── <script>
    ├── CONTEÚDO   FLOWS, KB, FAQ, PRATICAS, BITRIX, REGRAS, PLANOS, PLANO_MSGS
    └── APP        Rotas, telas (vInicio, vFlow, vPlanos, vFunc, vDuvidas,
                   vPraticas, vRegras, vBusca), busca, cópia e resumo
```

- **Tecnologia:** HTML, CSS e JavaScript puro, sem frameworks nem bibliotecas.
- **Navegação:** cada seção tem seu endereço com `#`, então dá para mandar o link direto de uma seção. Os endereços são `#inicio`, `#delivery`, `#presencial`, `#planos`, `#funcionalidades`, `#duvidas`, `#praticas` e `#regras`.
- **Tema:** segue o claro ou escuro do sistema operacional. As cores ficam em variáveis no `:root`, com vermelho BeeFood `#C8102E` e mel `#F2B705`.
- **Responsivo:** no celular, o menu lateral vira uma barra horizontal no topo, e o mapa e o resumo do roteiro vão para baixo das mensagens.
- **Acessibilidade:** o foco do teclado fica visível, e o site respeita a configuração de reduzir animações.

> Existe também uma versão com **backend e frontend separados** (pasta `beefood-central-sdr`). Nela o conteúdo fica em arquivos JSON em `backend/data/`, e um servidor Node.js entrega a API e o site. Use essa versão se a equipe de desenvolvimento for hospedar e manter o projeto.

---

## Limitações conhecidas

- **As respostas do roteiro não ficam salvas.** Ao recarregar a página, o resumo é apagado. Copie o resumo para o Bitrix antes de fechar.
- **Cada SDR vê só a própria tela.** O site não registra quem atendeu nem quais leads passaram por ele.
- **O conteúdo é fixo no arquivo.** Para mudar um texto é preciso editar o `index.html` e publicar de novo.
- **O botão "Copiar" pode não funcionar** em alguns navegadores ou apps. Nesse caso, selecione o texto e copie manualmente.

---

## Histórico de mudanças

| Versão | O que mudou |
|---|---|
| 1 | Roteiro Delivery interativo, com o conteúdo da página do Google Sites |
| 2 | Todas as páginas do Google Sites reunidas em um site só, com busca, planos, funcionalidades, dúvidas, boas práticas e regras |
| 3 | Removidos "PIX online no grátis", "Estoque do iFood" e "Fidelização para o presencial" |
| 4 | Roteiros atualizados para o documento Prospecção 2.0 (válido desde 21/09): nova etapa PROCURA, Presencial dividido em Mesas e Balcão |
| 5 | Frase extra do PDV na etapa M4 para leads que atendem em mesa e balcão |

---

Site sempre em atualização. Se procurou alguma informação e não achou, solicite contato com a **Nicolly**.
