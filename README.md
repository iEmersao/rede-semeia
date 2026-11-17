# Rede Semeia

Aplicação web para organizar doadores e doações de uma ONG comunitária. O projeto integra uma interface em JavaScript com Vite+, uma API Express e um banco MySQL. O nome público do repositório é `rede-semeia`.

O modelo de dados está documentado em [`database/MER.md`](database/MER.md) e implementado em `database/schema.sql`. O MER original do PIE I não foi fornecido junto com os materiais; confira o modelo documentado contra o seu antes de entregar, caso exista uma versão anterior.

## Requisitos

- Windows com PowerShell (os comandos de instalação abaixo são para Windows).
- Vite+ 1.x (`vp`) e internet para instalar as dependências.
- MySQL 8.0 ou superior.

O Vite+ pode gerenciar a versão do Node.js usada pelo projeto. Para uma instalação global do `vp` e instruções para outros sistemas, consulte o [guia oficial de instalação do Vite+](https://www.viteplus.dev/guide/).

## Preparar o ambiente

1. Instale o Vite+ globalmente uma vez no PowerShell:

   ```powershell
   irm https://vite.plus/ps1 | iex
   ```

   Feche e reabra o terminal e confirme a instalação:

   ```powershell
   vp --version
   ```

2. Clone o repositório e entre na pasta:

   ```powershell
   git clone https://github.com/iEmersao/rede-semeia.git
   cd rede-semeia
   ```

3. Instale as dependências:

   ```powershell
   vp install
   ```

4. Inicie o MySQL. Na raiz do projeto, abra o cliente MySQL com o mesmo usuário que será configurado em `.env`:

   ```powershell
   mysql -u root -p
   ```

   No prompt do MySQL, crie o banco e carregue dados fictícios:

   ```sql
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;
   ```

   **Atenção:** `database/schema.sql` apaga e recria o banco local `rede_semeia`. Use-o somente no ambiente local de desenvolvimento. Execute `seed.sql` depois do schema e uma vez por carga inicial.

5. Em outro terminal, crie o arquivo local `.env` a partir do exemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

   Ajuste `DB_USER` e `DB_PASSWORD` para as credenciais do seu MySQL. O `.env` não deve ser enviado ao GitHub.

## Executar

No Windows, você também pode abrir `iniciar-rede-semeia.cmd` para iniciar a API e a interface e abrir o navegador automaticamente.

Abra dois terminais na pasta do projeto. No primeiro, inicie a API:

```powershell
vp run api
```

No segundo, inicie a interface:

```powershell
vp dev
```

Abra [http://localhost:5173](http://localhost:5173). O painel mostra `Status da API: ok`, a conexão com o banco e a data/hora da última verificação. Para as telas de doadores e doações carregarem os dados, o MySQL precisa estar iniciado e o schema e o seed precisam ter sido aplicados.

## Telas

| Rota             | Função                                     |
| ---------------- | ------------------------------------------ |
| `#/doadores`     | Lista, cadastra, edita e exclui doadores.  |
| `#/doacoes/nova` | Registra uma doação com um ou mais itens.  |
| `#/doacoes`      | Consulta doações, doadores, datas e itens. |

O login e a autenticação JWT não fazem parte desta etapa do projeto.

## API

| Método e rota              | Função                                                        |
| -------------------------- | ------------------------------------------------------------- |
| `GET /api/health`          | Informa o status da API, do banco e o horário da verificação. |
| `GET /api/doadores`        | Lista doadores.                                               |
| `GET /api/doadores/:id`    | Consulta um doador.                                           |
| `POST /api/doadores`       | Cadastra um doador.                                           |
| `PUT /api/doadores/:id`    | Atualiza um doador.                                           |
| `DELETE /api/doadores/:id` | Exclui um doador sem doações associadas.                      |
| `GET /api/itens`           | Lista itens por categoria.                                    |
| `GET /api/doacoes`         | Lista doações com doador e itens.                             |
| `POST /api/doacoes`        | Registra uma doação e seus itens em uma transação.            |

Os exemplos de requisição estão em `api.http` e podem ser usados com a extensão REST Client do VS Code.

## Verificações

```powershell
vp check --fix
vp check
vp build
```

O build de produção fica em `dist/`, que é ignorada pelo Git.

## Dados e privacidade

O arquivo `.env.example` contém apenas valores de exemplo; preencha suas credenciais no `.env` local. O `.env` é ignorado pelo Git. Os dados de `database/seed.sql` são fictícios e não devem ser substituídos por dados pessoais reais para esta demonstração.


