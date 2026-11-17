# PIE II · Relatório Final

## 1. Identificação

| Campo               | Informação                         |
| ------------------- | ---------------------------------- |
| Seu nome completo   | [preencher antes de entregar]      |
| ONG/Empresa         | Rede Semeia                        |
| Link do repositório | https://github.com/iEmersao/suaong |

## 2. Como rodar o projeto

```bash
git clone https://github.com/iEmersao/suaong.git
cd suaong
vp install
```

No cliente MySQL aberto na pasta do projeto:

```sql
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

Copie `.env.example` para `.env` e configure o usuário e a senha do MySQL. Em dois terminais, rode:

```bash
vp run api
vp dev
```

Abra http://localhost:5173. Não há usuário de demonstração nesta etapa; o login será implementado na etapa de autenticação do curso.

## 3. O que funciona e o que ficou pendente

| Funciona                                                    | Pendente / próxima melhoria                                                             |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Cadastro, edição, listagem e exclusão de doadores           | Login e proteção JWT, previstos para a etapa de autenticação                            |
| Registro de doações com vários itens e consulta das doações | Publicação em hospedagem, prevista para a etapa de implantação                          |
| Rotas da API conectadas ao MySQL com validações e transação | Usar o MER oficial do PIE I caso ele tenha entidades diferentes do modelo de referência |
| Indicador de saúde da API e do banco com data e hora        |                                                                                         |
