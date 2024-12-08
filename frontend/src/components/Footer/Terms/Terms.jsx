import styles from './Terms.module.css';

function Terms() {
    return (
        <section className={styles.termsSection}>
            <h2 className={styles.termsH2}>Termos de Uso</h2>
            <p className={styles.termsP}>Estes Termos & Condições regem o uso deste site. Ao acessar ou utilizar este site, você concorda em cumprir e estar vinculado a estes termos. Se você discordar de qualquer parte destes termos, não utilize este site.</p>
            <h3 className={styles.termsH3}>Propriedade do Site</h3>
            <p className={styles.termsP}>Este site é de propriedade e operado por <strong>Portal FocusFeed</strong>. Todo o conteúdo, informações e materiais disponíveis neste site são protegidos por leis de direitos autorais e propriedade intelectual.</p>

            <h3 className={styles.termsH3}>Uso Permitido</h3>
            <p className={styles.termsP}>Você concorda em utilizar este site apenas para fins legítimos e de acordo com estes Termos & Condições. Você não deve usar este site de qualquer forma que possa causar danos ao site ou a terceiros, ou que viole qualquer lei ou regulamento aplicável.</p>

            <h3 className={styles.termsH3}>Conteúdo do Usuário</h3>
            <p className={styles.termsP}>Ao enviar ou publicar qualquer conteúdo neste site, você concede ao <strong>Portal FocusFeed</strong> uma licença mundial, não exclusiva, gratuita e transferível para usar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e exibir esse conteúdo em qualquer meio.</p>

            <h3 className={styles.termsH3}>Limitação de Responsabilidade</h3>
            <p className={styles.termsP}>Este site é fornecido <em>“no estado em que se encontra”</em>, sem garantias de qualquer tipo, expressas ou implícitas. <strong>Portal FocusFeed</strong> não será responsável por quaisquer danos diretos, indiretos, incidentais, consequentes ou punitivos decorrentes do uso ou incapacidade de usar este site.</p>

            <h3 className={styles.termsH3}>Links para Outros Sites</h3>
            <p className={styles.termsP}>Este site pode conter links para sites de terceiros. Esses links são fornecidos apenas para sua conveniência. <strong>Portal FocusFeed</strong> não controla e não é responsável pelo conteúdo ou práticas de privacidade de sites de terceiros.</p>

            <h3 className={styles.termsH3}>Alterações nos Termos & Condições</h3>
            <p className={styles.termsP}>O <strong>Portal FocusFeed</strong> reserva-se o direito de atualizar ou modificar estes Termos & Condições a qualquer momento, sem aviso prévio. O uso continuado deste site após tais alterações constitui sua aceitação dessas alterações.</p>

            <h3 className={styles.termsH3}>Lei Aplicável</h3>
            <p className={styles.termsP}> Estes Termos & Condições serão regidos e interpretados de acordo com as leis, sem levar em consideração seus conflitos de disposições legais.</p>
            <p className={styles.termsP}>Leis de termos de uso e privacidade na internet podem variar de acordo com o país ou região. Abaixo está a Lei Brasileira relacionada à privacidade e termos de uso:</p>
            <br />
            <p className={styles.termsP}><strong><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709compilado.htm" className={styles.termsP}>LGPD (Lei Geral de Proteção de Dados Pessoais do Brasil)</a></strong>: Esta lei brasileira estabelece princípios, direitos e obrigações relacionadas ao tratamento de dados pessoais.</p>
            <br />
            <br />
            <p className={styles.termsP}>Se você tiver alguma dúvida sobre estes Termos & Condições, entre em contato conosco em contato@FocusFeed.com</p>
            <p className={styles.termsP}>Última atualização: 06/12/2024</p>
        </section>
    )
}

export default Terms;