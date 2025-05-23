import newsletterService from "../services/newsletterService.js";

const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({
        success: false,
        message: "O campo email é obrigatório"
      });
  }

  try {
    const result = await newsletterService.subscribeToNewsletter(email);
    const statusCode = result.success ? 200 : 409;

    return res
      .status(statusCode)
      .json(result);
  } catch (error) {
    console.log("Erro no controller subscribe:", error.message);
    console.error("Detalhes do erro:", error);

    return res
      .status(500)
      .json({
        success: false,
        message: "Erro interno do servidor"
      });
  }
};

const unsubscribe = async (req, res) => {
  const { token } = req.params;

  try {
    const result = await newsletterService.unsubscribe(token);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const sendNewsletter = async (req, res) => {
  const { subject, content } = req.body;

  if (!subject || !content) {
    return res.status(400).json({
      error: "Os campos 'subject' e 'content' são obrigatórios."
    });
  }

  try {
    await newsletterService.sendNewsletter(subject, content);
    return res.status(200).json({
      message: "Newsletter enviada com sucesso!"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao enviar newsletter."
    });
  }
};

export default { subscribe, unsubscribe, sendNewsletter };