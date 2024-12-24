import EmailNewsletter from "../models/emailsNewsletter.js";
import sendEmail from '../utils/sendEmail.js';
import User from "../models/User.js";
import crypto from 'crypto';

const subscribeToNewsletter = async (email) => {
    try {
        // Verifica se o e-mail já existe no banco de dados da newsletter
        const existingSubscriber = await EmailNewsletter.findOne({ email });

        // Verifica se o email pertence a um usuário
        const user = await User.findOne({ email });
        const fullName = user?.fullName;

        // Se o e-mail existe e está ativo, retorna mensagem informativa
        if (existingSubscriber && existingSubscriber.active) {
            return {
                success: false,
                message: "O email já está cadastrado e recebendo nossas newsletters normalmente.",
            };
        }

        // Se o e-mail existe, mas está inativo, reativa a inscrição e envia email de reativação
        if (existingSubscriber && !existingSubscriber.active) {
            const unsubscribeToken = crypto.randomBytes(32).toString("hex");
            
            existingSubscriber.active = true;
            existingSubscriber.unsubscribeToken = unsubscribeToken;

            await existingSubscriber.save();

            // Envia email de reativação
            await sendConfirmationEmail(email, existingSubscriber.unsubscribeToken, fullName);

            // Retorna sucesso ao frontend
            return {
                success: true,
                message: "É bom ter você aqui de novo! Sua inscrição foi reativada com sucesso.",
                fullName,
            };
        }

        // Se o e-mail não existe, cria uma nova inscrição
        if (!existingSubscriber) {
            const unsubscribeToken = crypto.randomBytes(32).toString("hex");

            await EmailNewsletter.create({
                email,
                unsubscribeToken,
                active: true,
            });

            // Envia email de boas-vindas
            await sendConfirmationEmail(email, unsubscribeToken, fullName);

            // Retorna sucesso ao frontend
            return {
                success: true,
                message: "Obrigado por se inscrever! Você começará a receber nossas newsletters em breve.",
                fullName,
            };
        }

    } catch (error) {
        console.error("Erro na inscrição da newsletter:", {
            email,
            errorMessage: error.message,
            timestamp: new Date(),
            stack: error.stack
        });
        return {
            success: false,
            message: "Erro no servidor. Tente novamente mais tarde.",
        };
    }
};

const unsubscribe = async (token) => {
    const subscription = await EmailNewsletter.findOne({ unsubscribeToken: token });

    if (!subscription) {
        throw new Error("Token de cancelamento inválido.");
    }

    subscription.active = false;
    await subscription.save();

    return { message: "Cancelamento realizado com sucesso!" };
};

const sendNewsletter = async (subject, content) => {
    const activeSubscribers = await EmailNewsletter.find({ active: true });

    for (const subscriber of activeSubscribers) {
        try {
            await sendEmail(
                subscriber.email,
                subject,
                `
        <p>Vocês está recebendo este e-mail porque se inscreveu na newsletter do FocusFeed.</p>
        <br><br>
        ${content}
        <br><br>
        <p>Para cancelar sua inscrição, 
        <a href="${process.env.FRONTEND_URL}/unsubscribe/${subscriber.unsubscribeToken}">clique aqui</a></p>
        `
            );

            subscriber.lastEmailSent = new Date();
            await subscriber.save();
        } catch (error) {
            console.error(`Erro ao enviar email para ${subscriber.email}:`, error);
        }
    }
};

const sendConfirmationEmail = async (email, unsubscribeToken, fullName) => {
    const htmlContent = `
      <h2>Olá, ${fullName ? fullName : ''}!</h2>
      <p>Obrigado por se inscrever na nossa newsletter.</p>
      <p>Você receberá nossas atualizações regularmente.</p>
      <p>Para cancelar sua inscrição a qualquer momento, 
         <a href="${process.env.FRONTEND_URL}/unsubscribe/${unsubscribeToken}">clique aqui</a>
      </p>
    `;

    const mailOptions = {
        // from: process.env.EMAIL_USER,
        to: email,
        subject: "Bem-vindo à Newsletter do FocusFeed!",
        html: htmlContent,
    };

    await sendEmail(mailOptions);
};

export default {
    subscribeToNewsletter,
    unsubscribe,
    sendNewsletter
};