import sendEmail from "../utils/sendEmail.js";

export const contactAdmin = async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios.",
        });
    }

    try {
        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: `Mensagem de ${name}`,
            html: `
        <h1>Nova Mensagem de Contato</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
        });

        res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    } catch (error) {
        next(error);
    }
};
