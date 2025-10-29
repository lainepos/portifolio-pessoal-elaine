
# Escopo inicial — Escala Ministerial

Escopo inicial
-------------
Escala ministerial da minha igreja para que as pessoas não sejam escaladas no mesmo dia.

O objetivo é construir um sistema onde:
- Haja um calendário mensal com todos os dias da semana.
- Sejam inseridos os principais eventos da semana.
- Cada ministério tem pessoas cadastradas (nome e telefone) e líderes.
- Líderes podem selecionar pessoas para escalas nos eventos.
- A mesma pessoa não pode ser escalada em mais de um evento no mesmo dia.

Requisitos básicos:
- Cadastro de todos os ministérios da igreja
- Calendário mensal
- Cadastro de pessoas por ministério (nome, telefone, role)
- Home com listagem de ministérios, pessoas e calendário, e possibilidade de criar eventos

Onde estão os casos de teste
---------------------------
Os casos de teste estão mapeados em uma planilha (Google Sheets) e também no repositório em `docs/TestPlan.md`.

Planilha com casos de teste (Google Sheets):
https://docs.google.com/spreadsheets/d/10ZKafG-q_R8GDS9wyyPhxHKUMcKZc6JknlgHDwsWu0k/edit?gid=911841702#gid=911841702

Também há uma cópia dos casos em: `docs/TestPlan.md` (mantida junto ao código para referências off-line).

Bugs e issues
-------------
Bugs identificados e tarefas de melhoria serão registrados como Issues no GitHub (use a aba Issues do repositório).

Estrutura do projeto
--------------------
Arquivos e pastas principais criados neste projeto (resumo):

- `src/` - código fonte do backend
	- `index.js` - ponto de entrada (configura CORS, rotas e Swagger)
	- `routes/` - definição das rotas da API
	- `controllers/` - lógica de entrada (validação e formatação de respostas)
	- `services/` - regras de negócio e acesso ao DB em memória
	- `middleware/` - middlewares (ex.: autenticação JWT)
	- `db/` - armazenamento em memória (seed inicial)
- `resources/` - arquivos de suporte
	- `swagger.json` - documentação OpenAPI (Swagger)
- `docs/` - documentação e planos de teste (ex.: `TestPlan.md`)
- `package.json` - dependências e scripts
- `README.md` - este arquivo

Como executar localmente
------------------------
1. Instalar dependências:

```powershell
npm install
```

2. Iniciar o servidor:

```powershell
npm start
```

O Swagger UI ficará disponível em `http://localhost:3000/api-docs` e a API em `http://localhost:3000/api`.

Observações
-----------
- Há um usuário seed inicial: `leader1` / `password`.
- A persistência atualmente é em memória (reiniciar o servidor zera os dados). Para produção, migrar para um banco persistente.

