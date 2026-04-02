import pool from "./db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "GET 요청만 가능합니다." });
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS calculator_logs (
        id SERIAL PRIMARY KEY,
        num1 DOUBLE PRECISION NOT NULL,
        num2 DOUBLE PRECISION NOT NULL,
        result DOUBLE PRECISION NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    const result = await pool.query(
      `SELECT id, num1, num2, result, created_at
       FROM calculator_logs
       ORDER BY created_at DESC
       LIMIT 50`
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "로그 조회 중 오류가 발생했습니다." });
  }
}