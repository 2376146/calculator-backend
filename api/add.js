export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "GET 요청만 가능합니다." });
  }

  const { a, b } = req.query;

  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return res.status(400).json({ error: "a와 b에 숫자를 입력하세요." });
  }

  return res.status(200).json({
    a: numA,
    b: numB,
    result: numA + numB
  });
}