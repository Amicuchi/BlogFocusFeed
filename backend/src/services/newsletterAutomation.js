import cron from 'node-cron';
import Post from '../models/Post.js';
import newsletterService from './newsletterService.js';

// Horário de envio da newsletter
const NEWSLETTER_TIME = 2237; // 20:00

const timeToSchedule = (time) => {
    // Converte formato numérico (ex: 1000, 1930) para formato cron
    const timeString = time.toString().padStart(4, '0');
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);
  
    return `${minutes} ${hours} * * *`;
  };

// Lógica de automação da newsletter
const initializeNewsletterAutomation = () => {
    cron.schedule(timeToSchedule(NEWSLETTER_TIME), async () => {
        try {
            // Busca conteúdo mais recente
            const latestContent = await Post.find()
                .sort({ createdAt: -1 })
                .limit(5);

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

            console.log('Newsletter enviada com sucesso:', new Date());
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