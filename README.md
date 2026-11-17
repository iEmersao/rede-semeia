# Rede Semeia

Aplicação web de gestão de doadores e doações para uma ONG comunitária. Esta etapa do PIE II integra uma página feita com JavaScript e Vite+ a uma API Express e a um banco MySQL.

## Requisitos

- Node.js 22.18 ou superior
- Vite+ (comando `vp`): https://viteplus.dev
- MySQL 8.0 ou superior

## Como preparar

1. Clone o repositório e abra a pasta do projeto.
2. Instale as dependências com `vp install`.
3. Inicie o MySQL e, no cliente `mysql` aberto na raiz do projeto, execute:

   ```sql
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;
   ```

   O `schema.sql` recria o banco local `rede_semeia` do zero. O `seed.sql` carrega dados fictícios de demonstração; execute-o uma vez após o schema.

4. Copie `.env.example` para `.env` e ajuste `DB_USER` e `DB_PASSWORD` conforme a configuração local do MySQL. No PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

## Como executar

Abra dois terminais na pasta do projeto:

```bash
vp run api
```

```bash
vp dev
```

Acesse [http://localhost:5173](http://localhost:5173). O painel no topo mostra o estado da API, do banco e o horário da última verificação.

## Telas

| Endereço         | O que permite fazer                          |
| ---------------- | -------------------------------------------- |
| `#/doadores`     | Listar, cadastrar, editar e excluir doadores |
| `#/doacoes/nova` | Registrar uma doação com um ou mais itens    |
| `#/doacoes`      | Consultar doações com doador, data e itens   |

Esta entrega segue o escopo de frontend/API das Aulas 2 e 3. O login e JWT ficam para a etapa de autenticação indicada no material do curso.

## API

| Método e rota              | Resultado                                  |
| -------------------------- | ------------------------------------------ |
| `GET /api/health`          | Estado da API, conexão do banco e horário  |
| `GET /api/doadores`        | Lista doadores                             |
| `GET /api/doadores/:id`    | Consulta um doador                         |
| `POST /api/doadores`       | Cadastra um doador                         |
| `PUT /api/doadores/:id`    | Atualiza um doador                         |
| `DELETE /api/doadores/:id` | Exclui um doador sem doações associadas    |
| `GET /api/itens`            | Lista o catálogo de itens por categoria    |
| `GET /api/doacoes`          | Lista doações com doador e itens           |
| `POST /api/doacoes`        | Registra uma doação com itens em transação |

Os exemplos para conferir as rotas estão em `api.http` (extensão REST Client do VS Code).

## Verificação e build

```bash
vp check --fix
vp check
vp build
```

O build de produção vai para `dist/`, que não deve ser enviado ao Git.

## Dados e privacidade

O `.env` guarda configurações locais e é ignorado pelo Git. Envie apenas `.env.example`, sem senhas. Os dados do `seed.sql` são fictícios.
