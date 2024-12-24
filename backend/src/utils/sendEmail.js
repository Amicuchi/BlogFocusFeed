import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Email do remetente
        pass: process.env.EMAIL_PASS, // Senha ou App Password do email
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error.message);
    console.error("Detalhes do erro:", error);
    throw new Error("Erro ao enviar e-mail");
  }
};

export default sendEmail;
