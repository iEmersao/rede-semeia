-- Rede Semeia · seed.sql
-- Execute depois de database/schema.sql para carregar dados fictícios de demonstração.

SET NAMES utf8mb4;
USE rede_semeia;

INSERT INTO categoria (nome) VALUES
  ('Alimentos'),
  ('Higiene'),
  ('Vestuário');

INSERT INTO item (id_categoria, nome, unidade) VALUES
  (1, 'Arroz 5 kg', 'pacote'),
  (1, 'Feijão 1 kg', 'pacote'),
  (1, 'Óleo de soja 900 ml', 'garrafa'),
  (1, 'Leite em pó 400 g', 'lata'),
  (2, 'Sabonete', 'unidade'),
  (2, 'Creme dental', 'unidade'),
  (2, 'Fralda infantil', 'pacote'),
  (3, 'Agasalho', 'peça'),
  (3, 'Cobertor', 'unidade');

INSERT INTO doador (nome, email, telefone) VALUES
  ('Mercado Solidário', 'contato@mercadosolidario.example.org', '(11) 90000-0101'),
  ('Ana Exemplo', 'ana@example.org', '(11) 90000-0102'),
  ('Comunidade do Jardim', NULL, '(11) 90000-0103'),
  ('Coletivo Semeando', 'coletivo@example.org', NULL);

INSERT INTO doacao (id_doador, data_doacao, observacao) VALUES
  (1, '2026-10-05', 'Campanha de alimentos'),
  (2, '2026-10-12', NULL),
  (4, '2026-10-18', 'Campanha de inverno');

INSERT INTO doacao_item (id_doacao, id_item, quantidade) VALUES
  (1, 1, 10), (1, 2, 15), (1, 3, 8),
  (2, 5, 12), (2, 6, 12),
  (3, 8, 20), (3, 9, 6);