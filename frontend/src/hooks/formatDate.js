
function formatDate(dataISO) {
    if (!dataISO) return "";

    try {
        const data = new Date(dataISO);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
};

export default formatDate;