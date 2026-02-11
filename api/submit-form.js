/**
 * Vercel Serverless Function - Proxy para FormSubmit
 * Evita problemas de CORS fazendo a requisição do servidor
 */
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/residencialmoaci@gmail.com";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  try {
    let body = req.body;
    if (!body || (typeof body === "object" && Object.keys(body).length === 0)) {
      if (typeof req.json === "function") {
        try {
          body = await req.json();
        } catch (e) {
          body = {};
        }
      }
    }
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(body)) {
      if (value != null && value !== "") {
        params.append(key, String(value));
      }
    }

    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: params.toString(),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && (data.success === true || data.success === "true")) {
      return res.status(200).json({ success: true });
    }

    return res.status(response.status || 500).json({
      success: false,
      message: data.message || "Erro ao enviar o formulário",
    });
  } catch (err) {
    console.error("Erro submit-form:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erro interno do servidor",
    });
  }
};
