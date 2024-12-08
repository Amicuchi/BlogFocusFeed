import PropTypes from 'prop-types';
import styles from './LoadingError.module.css';

function LoadingError({ 
    isLoading, 
    error, 
    loadingMessage = 'Carregando...', 
    errorMessage = 'Erro ao carregar conteúdo' 
}) {
    if (isLoading) {
        return <div className={styles.loadingContainer}>{loadingMessage}</div>;
    }

    if (error) {
        return <div className={styles.errorContainer}>{errorMessage}</div>;
    }

    return null;
}

LoadingError.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    loadingMessage: PropTypes.string,
    errorMessage: PropTypes.string
};

export default LoadingError;