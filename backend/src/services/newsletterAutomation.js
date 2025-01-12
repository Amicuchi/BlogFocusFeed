import cron from 'node-cron';
import Post from '../models/Post.js';
import newsletterService from './newsletterService.js';
import formatDate from '../utils/formatDate.js';

// Horário e dia padrão para envio da newsletter
const NEWSLETTER_TIME = 1000;   // 10:00
const NEWSLETTER_DAY = 1;       // Segunda-feira (1 = segunda, 7 = domingo) null indica envio diário
const LIMIT_BY_TIME = 5;       // Quantidade máxima de posts

// Função para gerar expressão cron
const timeToSchedule = (time, day = null) => {
    // Converte formato numérico (ex: 1000) para horário e dia no formato cron
    const timeString = time.toString().padStart(4, '0');
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);

    // Retorna o formato cron, incluindo o dia da semana
    // Se o dia for fornecido (1-7), inclui na expressão. Caso contrário, dispara diariamente.
    return day ? `${minutes} ${hours} * * ${day}` : `${minutes} ${hours} * * *`;
};

// Lógica de automação da newsletter
const initializeNewsletterAutomation = (time = NEWSLETTER_TIME, day = NEWSLETTER_DAY, limitByTime = LIMIT_BY_TIME) => {
    const cronExpression = timeToSchedule(time, day);

    cron.schedule(cronExpression, async () => {
        try {
            // Busca conteúdo mais recente
            const latestContent = await Post.find()
                .sort({ createdAt: -1 })
                .limit(limitByTime);

            if (latestContent.length === 0) {
                console.log('Sem conteúdo novo para enviar');
                return;
            }

            // Formata o conteúdo
            const htmlContent = formatNewsletterContent(latestContent);

            // Envia newsletter
            await newsletterService.sendNewsletter(
                'Novidades do FocusFeed',
                htmlContent
            );

            const sendedAt = formatDate(new Date());
            console.log('Newsletter enviada com sucesso:', sendedAt);
        } catch (error) {
            console.error('Erro ao enviar newsletter:', error);
        }
    });
};

const formatNewsletterContent = (posts) => {
    return `
    <h1>Novidades do FocusFeed</h1>
    ${posts
            .map(post => `
      <article>
        <h2>${post.title}</h2>
        <p>${post.description}</p>
        <a href="${process.env.FRONTEND_URL}/news/${post._id}">Ler mais</a>
      </article>
    `)
            .join('')}
  `;
};

export default initializeNewsletterAutomation;