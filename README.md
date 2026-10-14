# Central SDR BeeFood

Site de consulta dos SDRs: roteiros de prospecção (Delivery e Presencial), planos, funcionalidades, dúvidas gerais, boas práticas e regras.

## Estrutura

```
beefood-central-sdr/
├── backend/                 ← servidor e conteúdo
│   ├── server.js            API + entrega do frontend (Node.js puro, sem dependências)
│   ├── package.json
│   └── data/                ← TODO O CONTEÚDO DO SITE FICA AQUI
│       ├── roteiros.json         Roteiros Delivery e Presencial (mensagens, opções e caminhos)
│       ├── funcionalidades.json  Explicações das funcionalidades
│       ├── duvidas.json          Dúvidas gerais
│       ├── planos.json           Planos, preços e mensagens sobre planos
│       ├── boas-praticas.json    Boas práticas SDR e etapas do Bitrix
│       └── regras.json           Regras BeeFood
└── frontend/                ← só a tela (visual e interação)
    ├── index.html
    ├── css/styles.css
    └── js/app.js            Busca o conteúdo em /api/conteudo e monta as páginas
```

## Como rodar

Precisa do Node.js 18 ou mais novo.

```
cd backend
npm start
```

Abra http://localhost:3000. Para usar outra porta: `PORT=8080 npm start`.

## Como atualizar o conteúdo

Edite o arquivo certo em `backend/data/` e recarregue a página. Não precisa reiniciar o servidor nem mexer no frontend.

- `mensagem`: texto que o SDR copia e envia ao lead.
- `orientacao`: aviso interno (aparece em amarelo, não vai para o lead).
- `destaque: true`: deixa a regra ou boa prática em vermelho.
- Nos roteiros, cada opção é `["texto do botão", "id da próxima etapa"]`. Use `"@delivery"` ou `"@presencial"` para mandar para o outro roteiro.

## API

| Rota | Retorna |
|---|---|
| `GET /api/conteudo` | Todas as seções de uma vez (usado pelo frontend) |
| `GET /api/secoes` | Lista das seções |
| `GET /api/roteiros` | Roteiros |
| `GET /api/funcionalidades` | Funcionalidades |
| `GET /api/duvidas` | Dúvidas gerais |
| `GET /api/planos` | Planos e mensagens |
| `GET /api/boas-praticas` | Boas práticas e Bitrix |
| `GET /api/regras` | Regras |

## Frontend em outro servidor

Se o frontend for hospedado separado do backend, defina o endereço da API antes do `app.js` no `index.html`:

```html
<script>window.BEEFOOD_API = "https://seu-backend.com/api";</script>
```
