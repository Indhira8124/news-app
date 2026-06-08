const API_URL =
"https://newsdata.io/api/1/latest?apikey=pub_573b266e982d4c8da436235c36d38b50&q=tamil news";

fetch(API_URL)
.then(response => response.json())
.then(data => {

    const container = document.getElementById("newsList");

    container.innerHTML = "";

    if (!data.results || data.results.length === 0) {
        container.innerHTML = "<h2>No news found</h2>";
        return;
    }

    data.results.forEach(news => {

        const imageUrl =
            news.image_url &&
            news.image_url.trim() !== ""
                ? news.image_url
                : "https://picsum.photos/400/250";

        const card = document.createElement("a");

        card.className = "news-card";
        card.href = news.link || "#";
        card.target = "_blank";

        card.innerHTML = `
            <img
                class="news-image"
                src="${imageUrl}"
                alt="News"
                onerror="this.src='https://picsum.photos/400/250';">

            <div class="news-content">

                <div class="news-top">
                   <span class="date">
    ${news.pubDate ? news.pubDate.substring(0, 10) : ''}
</span>

                    <span class="source">
                        ${news.source_name || ''}
                    </span>
                </div>

                <h2>
                    ${news.title || 'No Title'}
                </h2>

                <p>
                    ${(news.description || 'No Description')
                        .substring(0, 200)}
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

})
.catch(error => {
    console.error(error);

    document.getElementById("newsList").innerHTML =
        "<h2>Failed to load news.</h2>";
});