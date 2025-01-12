function formatDateForUser (isoDateString) {
    const date = new Date(isoDateString);

    // Configura para exibir em formato legível e no fuso horário local
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
};

export default formatDateForUser;