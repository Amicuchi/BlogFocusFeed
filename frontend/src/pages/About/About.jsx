import styles from './About.module.css';

function About() {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.aboutSection}>
                <h2 className={styles.aboutH2}>Bem-vindo ao FocusFeed</h2>
                <p className={styles.aboutP}>
                    O FocusFeed é seu destino diário para as notícias mais relevantes, fofocas quentes,
                    curiosidades fascinantes e dicas valiosas. Nossa missão é manter você informado e
                    entretido, trazendo conteúdo de qualidade em diversas áreas. Seja um leitor assíduo
                    ou um colaborador, aqui você encontra seu espaço para explorar, aprender e compartilhar.
                </p>
            </section>
        </div>
    )
}

export default About;