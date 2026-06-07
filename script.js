const API_URL =
" https://newsdata.io/api/1/latest?apikey=pub_573b266e982d4c8da436235c36d38b50&q=tamil%20news";

fetch(API_URL)
.then(response => response.json())
.then(data => {

    const container = document.getElementById("newsList");

    data.results.forEach(news => {

        const card = document.createElement("a");

        card.className = "news-card";

        card.href = news.link;
        card.target = "_blank";

        card.innerHTML = `
            <img
                class="news-image"
                src="${news.image_url || 'https://via.placeholder.com/300x200'}"
                alt="News Image">

            <div class="news-content">

                <div class="news-top">

                    <span class="date">
                        ${new Date(news.pubDate)
                            .toLocaleDateString()}
                    </span>

                    <span class="source">
                        ${news.source_name || ''}
                    </span>

                </div>

                <h2>
                    ${news.title || ''}
                </h2>

                <p>
                    ${(news.description || '')
                        .substring(0, 200)}...
                </p>

                <div class="news-footer">

                    <span class="category">
                        ${news.category?.[0] || 'News'}
                    </span>

                    <span class="read-more">
                        Read Article →
                    </span>

                </div>

            </div>
        `;

        container.appendChild(card);
    });

});