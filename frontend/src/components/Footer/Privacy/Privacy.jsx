import styles from './Privacy.module.css';

function Privacy() {
    return (
        <section className={styles.termsSection}>
            <h2 className={styles.termsH2}>Política de Privacidade e Segurança</h2>
            <p className={styles.termsP}>Esta Política de Privacidade destina-se a informar como são coletadas, usadas e divulgadas as informações pessoais de visitantes do site, em conformidade com as leis de proteção de dados aplicáveis.</p>

            <h3 className={styles.termsH3}>Coleta de Informações</h3>
            <p className={styles.termsP}>Ao utilizar nosso site, podem ser coletadas informações pessoais, como nome, endereço de e-mail, informações de contato e outras informações relevantes para fornecer serviços ou responder a consultas. Essas informações são coletadas apenas com o consentimento explícito do usuário.</p>

            <h3 className={styles.termsH3}>Uso de Informações</h3>

            <p className={styles.termsP}>As informações pessoais coletadas podem ser utilizadas para:</p>
            <ul>
                <li>Fornecer e manter os serviços oferecidos no site;</li>
                <li>Personalizar a experiência do usuário e fornecer conteúdo relevante;</li>
                <li>Enviar comunicações relacionadas aos serviços, incluindo atualizações, alertas e boletins informativos;</li>
                <li>Responder a consultas e fornecer suporte ao cliente.</li>
            </ul>

            <h3 className={styles.termsH3}>Divulgação a Terceiros</h3>
            <p className={styles.termsP}>Não compartilhamos informações pessoais com terceiros, exceto quando necessário para fornecer os serviços solicitados pelo usuário ou quando exigido por lei.</p>

            <h3 className={styles.termsH3}>Segurança das Informações</h3>
            <p className={styles.termsP}>Implementamos medidas de segurança para proteger as informações pessoais contra acesso não autorizado, uso indevido ou divulgação não autorizada.</p>

            <h3 className={styles.termsH3}>Cookies</h3>
            <p className={styles.termsP}>Nosso site pode usar cookies e tecnologias semelhantes para melhorar a experiência do usuário. Os cookies podem ser desativados nas configurações do navegador, mas isso pode afetar a funcionalidade do site.</p>

            <h3 className={styles.termsH3}>Links para Sites de Terceiros</h3>
            <p className={styles.termsP}>Nosso site pode conter links para sites de terceiros. Não nos responsabilizamos pelas práticas de privacidade ou conteúdo desses sites. Recomendamos que os usuários revisem as políticas de privacidade desses sites antes de fornecer informações pessoais.</p>

            <h3 className={styles.termsH3}>Alterações na Política de Privacidade</h3>
            <p className={styles.termsP}>Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. As alterações entrarão em vigor após a publicação da versão atualizada no site.</p>

            <h3 className={styles.termsH3}>Contato</h3>
            <p className={styles.termsP}>Se tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de suas informações pessoais, entre em contato conosco em contato@FocusFeed.com</p>
            <p className={styles.termsP}>Ao utilizar nosso site, você concorda com o processamento de suas informações pessoais conforme descrito nesta Política de Privacidade.</p>
            <br />
            <br />
            <p className={styles.termsP}>Última atualização: 06/12/2024</p>
            <p className={styles.termsP}>Portal Focus Feed</p>
        </section>
    )
}

export default Privacy;