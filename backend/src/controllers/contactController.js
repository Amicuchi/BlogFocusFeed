import nodemailer from 'nodemailer';

export const contactAdmin = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Configuração do transporte de email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Nova mensagem de ${name}`,
      text: message,
    });

    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar mensagem: ' + error.message });
  }
};
