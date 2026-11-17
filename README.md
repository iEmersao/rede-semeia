# SemeiaViva — gestão da Rede Semeia

SemeiaViva é o sistema de gestão comunitária de doadores e doações da Rede Semeia. A aplicação integra interface JavaScript com Vite+, API Express e banco local SQLite por padrão. O repositório público mantém o endereço `rede-semeia`.

O modelo de dados está documentado em [`database/MER.md`](database/MER.md), com esquemas em `database/schema.sqlite.sql` (SQLite local) e `database/schema.sql` (MySQL). O MER original do PIE I não foi fornecido junto com os materiais; confira o modelo documentado contra o seu antes de entregar, caso exista uma versão anterior.

## Requisitos

- Windows com PowerShell (os comandos de instalação abaixo são para Windows).
- Vite+ 1.x (`vp`) e internet para instalar as dependências.
- MySQL 8.0 ou superior somente se optar por esse banco; SQLite já vem no Node.js usado pelo projeto.

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

4. Crie o arquivo local `.env` a partir do exemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

   Por padrão, a aplicação usa SQLite. Na primeira inicialização, ela cria `database/rede-semeia.sqlite` e carrega dados fictícios automaticamente; não é necessário instalar ou iniciar um serviço de banco. Se preferir MySQL, configure `DB_DRIVER=mysql` e ajuste `DB_USER` e `DB_PASSWORD` no `.env`.

5. Para usar MySQL, inicie o serviço e abra o cliente com o mesmo usuário configurado no `.env`:

   ```powershell
   mysql -u root -p
   ```

   No prompt do MySQL, crie o banco e carregue dados fictícios:

   ```sql
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;
   ```

   **Atenção:** `database/schema.sql` apaga e recria o banco local `rede_semeia`. Use-o somente no ambiente local de desenvolvimento. Execute `seed.sql` depois do schema e uma vez por carga inicial. O `.env` não deve ser enviado ao GitHub.

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

Abra [http://localhost:5173](http://localhost:5173). O painel mostra o status da API, do banco escolhido e a data/hora da última verificação. O arquivo SQLite local é ignorado pelo Git e persiste os registros entre execuções. No modo MySQL, o serviço precisa estar iniciado e o schema e o seed precisam ter sido aplicados.

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

O arquivo `.env.example` contém apenas valores de exemplo; preencha suas credenciais no `.env` local se usar MySQL. O `.env` e o banco SQLite local são ignorados pelo Git. Os registros de demonstração são fictícios e não devem ser substituídos por dados pessoais reais.

