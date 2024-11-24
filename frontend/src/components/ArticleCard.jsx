function ArticleCard({ article }) {
    if (!article) return null;

    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group">
            <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                        {article.date}
                    </span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {article.title}
                </h2>
                <p className="text-gray-600 mb-4">
                    {article.excerpt}
                </p>
                <button className="btn-primary">
                    Leia mais
                </button>
            </div>
        </article>
    );
};

export default ArticleCard;