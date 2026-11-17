# PIE II · Relatório Final

## 1. Identificação

| Campo               | Informação                              |
| ------------------- | --------------------------------------- |
| Seu nome completo   | Emerson de Jesus Franca |
| ONG/Empresa         | Rede Semeia                             |
| Link do repositório | https://github.com/iEmersao/rede-semeia |

## 2. Como rodar o projeto

No Windows, instale o Vite+ globalmente uma vez no PowerShell e reabra o terminal:

```powershell
irm https://vite.plus/ps1 | iex
```

Clone o projeto e instale as dependências:

```powershell
git clone https://github.com/iEmersao/rede-semeia.git
cd rede-semeia
vp install
```

Inicie o MySQL e, no cliente aberto na pasta do projeto, execute:

```sql
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

Copie `.env.example` para `.env` e configure o usuário e a senha locais do MySQL. Em dois terminais:

```powershell
vp run api
```

```powershell
vp dev
```

Abra http://localhost:5173. Não há usuário de demonstração nesta etapa; o login será feito em uma etapa posterior do curso.

## 3. O que funciona e o que ficou pendente

| Funciona                                                                                                                         | Pendente / próxima melhoria                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `vp check` sem erros ou avisos e `vp build` concluído com Vite+ 1.4.0.                                                           | Conferir o MER reconstruído em `database/MER.md` com o MER do PIE I, caso exista uma versão anterior, e ajustar diferenças.             |
| `database/schema.sql` executado duas vezes sem erro no MySQL 8.4.13; seed carregado com 4 doadores, 9 itens e 3 doações.          | Preencher o nome completo na cópia do relatório entregue à plataforma; não publicar dados pessoais no repositório público.              |
| `GET /api/health` respondeu com API e banco `ok` e data/hora. Listagens, criação/edição de doador e doação com vários itens validadas. | Fazer a captura final do navegador em `http://localhost:5173` com o banco ativo para anexar à atividade, se a plataforma a exigir.       |
| As telas de doadores, listagem e registro de doação carregaram os dados de demonstração no navegador. Repositório público, README e `.env` ignorado. | Login e proteção JWT ficam para a etapa de autenticação do curso (Aula 4).                                                               |

