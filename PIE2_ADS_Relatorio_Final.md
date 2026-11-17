# PIE II · Relatório Final

## 1. Identificação

| Campo               | Informação                              |
| ------------------- | --------------------------------------- |
| Seu nome completo   | [preencher antes de entregar]           |
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

| Funciona                                                                                                      | Pendente / próxima melhoria                                                                                                           |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `vp check` sem erros ou avisos e `vp build` concluído.                                                        | Iniciar o MySQL, aplicar schema e seed e validar as telas CRUD com o banco disponível.                                                |
| Rota `GET /api/health` responde com status da API e data/hora; o frontend integra o endpoint pelo proxy Vite. | Comparar o schema com o MER oficial do PIE I, que não foi incluído nos materiais recebidos, e ajustar caso haja entidades diferentes. |
| Implementação das telas de doadores e de consulta/registro de doações, com rotas Express e validações.        | Preencher o nome completo do estudante antes de entregar.                                                                             |
| Repositório público, README com instruções e `.env` fora do Git.                                              | Login e proteção JWT, previstos para a etapa de autenticação do curso.                                                                |

