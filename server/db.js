import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const driver = (process.env.DB_DRIVER || "sqlite").toLowerCase();
let db;

if (driver === "mysql") {
  const { default: mysql } = await import("mysql2/promise");

  db = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "rede_semeia",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true,
  });

  db.driver = "mysql";
} else if (driver === "sqlite") {
  const { DatabaseSync } = await import("node:sqlite");
  const arquivo = path.resolve(process.env.DB_SQLITE_PATH || "database/rede-semeia.sqlite");
  mkdirSync(path.dirname(arquivo), { recursive: true });

  const banco = new DatabaseSync(arquivo);
  banco.exec("PRAGMA foreign_keys = ON");
  banco.exec(readFileSync(new URL("../database/schema.sqlite.sql", import.meta.url), "utf8"));

  if (banco.prepare("SELECT COUNT(*) AS total FROM categoria").get().total === 0) {
    banco.exec(`
      INSERT INTO categoria (nome) VALUES ('Alimentos'), ('Higiene'), ('Vestuário');
      INSERT INTO item (id_categoria, nome, unidade) VALUES
        (1, 'Arroz 5 kg', 'pacote'), (1, 'Feijão 1 kg', 'pacote'),
        (1, 'Óleo de soja 900 ml', 'garrafa'), (1, 'Leite em pó 400 g', 'lata'),
        (2, 'Sabonete', 'unidade'), (2, 'Creme dental', 'unidade'),
        (2, 'Fralda infantil', 'pacote'), (3, 'Agasalho', 'peça'), (3, 'Cobertor', 'unidade');
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
        (1, 1, 10), (1, 2, 15), (1, 3, 8), (2, 5, 12), (2, 6, 12), (3, 8, 20), (3, 9, 6);
    `);
  }

  function executar(sql, valores = []) {
    try {
      const comando = banco.prepare(sql);
      if (/^\s*(SELECT|WITH|PRAGMA)\b/i.test(sql)) return [comando.all(...valores)];
      const resultado = comando.run(...valores);
      return [
        { insertId: Number(resultado.lastInsertRowid), affectedRows: Number(resultado.changes) },
      ];
    } catch (erro) {
      if (erro.message.includes("UNIQUE constraint failed")) erro.code = "ER_DUP_ENTRY";
      if (erro.message.includes("FOREIGN KEY constraint failed")) {
        erro.code = /^\s*DELETE\b/i.test(sql) ? "ER_ROW_IS_REFERENCED_2" : "ER_NO_REFERENCED_ROW_2";
      }
      throw erro;
    }
  }

  db = {
    driver: "sqlite",
    async query(sql, valores) {
      return executar(sql, valores);
    },
    async execute(sql, valores) {
      return executar(sql, valores);
    },
    async getConnection() {
      return {
        async beginTransaction() {
          banco.exec("BEGIN");
        },
        async execute(sql, valores) {
          return executar(sql, valores);
        },
        async commit() {
          banco.exec("COMMIT");
        },
        async rollback() {
          banco.exec("ROLLBACK");
        },
        release() {},
      };
    },
  };
} else {
  throw new Error(`DB_DRIVER inválido: ${driver}. Use "sqlite" ou "mysql".`);
}

export default db;

