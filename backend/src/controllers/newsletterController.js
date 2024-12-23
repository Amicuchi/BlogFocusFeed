import newsletterService from "../services/newsletterService.js";

const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "O campo 'email' é obrigatório." });
  }

  try {
    const result = await newsletterService.subscribeToNewsletter(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default { subscribe };