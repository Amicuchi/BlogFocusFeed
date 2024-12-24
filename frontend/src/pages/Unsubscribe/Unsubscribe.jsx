import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiServices from '../../services/apiServices';
import styles from './Unsubscribe.module.css';

function Unsubscribe() {
    const { token } = useParams();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = async () => {
            try {
                const response = await apiServices.unsubscribeNewsletter(token);
                setStatus('success');
                setMessage(response.data.message);
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.error || 'Erro ao processar cancelamento.');
            }
        };

        if (token) {
            unsubscribe();
        }
    }, [token]);

    return (
        <div className={styles.unsubscribe}>
            <h2>Cancelamento de Newsletter</h2>

            {status === 'loading' && (
                <div className={styles.loading}>Processando seu cancelamento...</div>
            )}

            {status === 'success' && (
                <div className={styles.success}>
                    <p>{message}</p>
                    <p>Sentiremos sua falta! Você pode se inscrever novamente a qualquer momento.</p>
                </div>
            )}

            {status === 'error' && (
                <div className={styles.error}>
                    <p>{message}</p>
                    <p>Por favor, tente novamente ou entre em contato com nosso suporte.</p>
                </div>
            )}
        </div>
    );
}

export default Unsubscribe;