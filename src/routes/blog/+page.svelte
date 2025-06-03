<script>
    const posts = [
        {
            title: "Welcome to the Thalasat Blog!",
            date: "2025-05-26",
            author: "Stefanos Papadopoulos",
            summary: "Discover the latest updates, research, and stories from the Thalasat team.",
            content: `Welcome to our new blog! Here you'll find updates on our projects, marine science, and satellite technology. Stay tuned for more!`
        },
        {
            title: "How Satellites Help Protect the Sea",
            date: "2025-05-20",
            author: "Maria Ioannou",
            summary: "A look at how satellite data is used to monitor and protect marine environments.",
            content: `Satellites provide vital data for monitoring ocean health, tracking algal blooms, and supporting conservation efforts. Learn how we use this technology at Thalasat.`
        },
        {
            title: "Meet the Team: Alexandros Georgiou",
            date: "2025-05-15",
            author: "Eleni Kosta",
            summary: "Get to know our product designer and his vision for user experience.",
            content: `Alexandros brings creativity and empathy to our product design. In this post, he shares his approach to building intuitive tools for marine research.`
        }
    ];
    let selected = null;
    function openModal(post) { selected = post; carouselIndex = 0; }
    function closeModal() { selected = null; }
    let carouselIndex = 0;
    const defaultImages = [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
    ];
    function prevImage(images) {
        carouselIndex = (carouselIndex - 1 + images.length) % images.length;
    }
    function nextImage(images) {
        carouselIndex = (carouselIndex + 1) % images.length;
    }
    let imageOverlay = null;
    function openImageOverlay(img) {
        imageOverlay = img;
    }
    function closeImageOverlay() {
        imageOverlay = null;
    }
</script>

<div class="blog-section"
    style="
        --primary: #1481BA;
        --primarySecond: #0CAADC;
        --primaryLight: #11B5E4;
        --primaryDark: #001021;
        --accent: #034748;
        --background: #ffffff;
        --secondaryBackground: #e4e4e4;
        --surface: #ffffff;
        --border: #dddddd;
        --text: #001021;
        --muted: #999999;
        --modal-bg: #e0fcff;
        --modal-border: #cfd8dc;
    "
>
    <h2 class="blog-title">Blog</h2>
    <div class="blog-grid">
        {#each posts as post}
            <div class="blog-card" on:click={() => openModal(post)}>
                <div class="blog-card-title">{post.title}</div>
                <div class="blog-card-meta">{post.date} &middot; {post.author}</div>
                <div class="blog-card-summary">{post.summary}</div>
            </div>
        {/each}
    </div>

    {#if selected}
        <div class="modal-backdrop" on:click={closeModal}>
            <div class="modal-content blog-modal fullscreen" on:click|stopPropagation>
                <button class="modal-close modal-close-topright" on:click={closeModal}>&times;</button>
                <div class="modal-main-layout">
                    <div class="modal-info">
                        <div class="modal-post-title">{selected.title}</div>
                        <div class="modal-post-meta">{selected.date} &middot; {selected.author}</div>
                        <div class="modal-post-content">{selected.content}</div>
                    </div>
                    <div class="carousel-outer">
                        <div class="carousel-inner">
                            {#each (selected.images || defaultImages) as img, i}
                                <img
                                    src={img}
                                    class="carousel-img {i === carouselIndex ? 'active' : ''}"
                                    style="
                                        {i === carouselIndex
                                            ? 'transform: rotateY(0deg) scale(1.1); z-index:2;'
                                            : i < carouselIndex
                                                ? 'transform: rotateY(-40deg) scale(0.9); z-index:1;'
                                                : 'transform: rotateY(40deg) scale(0.9); z-index:1;'}"
                                    alt="Blog image {i+1}"
                                    on:click={() => openImageOverlay(img)}
                                />
                            {/each}
                        </div>
                        <button class="carousel-btn left" on:click={() => prevImage(selected.images || defaultImages)}>&lt;</button>
                        <button class="carousel-btn right" on:click={() => nextImage(selected.images || defaultImages)}>&gt;</button>
                    </div>
                </div>
            </div>
            {#if imageOverlay}
                <div class="image-overlay" on:click={closeImageOverlay}>
                    <img src={imageOverlay} class="image-overlay-img" alt="Full view" />
                    <button class="image-overlay-close" on:click|stopPropagation={closeImageOverlay}>&times;</button>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
.blog-section {
    background: var(--background);
    min-height: 100vh;
    padding: 4vw 0 6vw 0;
}
.blog-title {
    color: var(--primaryDark);
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2vw;
    letter-spacing: 0.05em;
}
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 3vw;
    max-width: 1400px;
    margin: 0 auto 3vw auto;
}
.blog-card {
    background: var(--secondaryBackground);
    border-radius: 1rem;
    box-shadow: 0 6px 24px rgba(20,129,186,0.10);
    padding: 3rem 2.5rem 2.5rem 2.5rem;
    min-height: 220px;
    min-width: 340px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.15s, box-shadow 0.15s;
    cursor: pointer;
    user-select: none;
    border: 1.5px solid var(--border);
}
.blog-card:hover {
    transform: translateY(-10px) scale(1.04);
    box-shadow: 0 12px 32px rgba(20,129,186,0.18);
}
.blog-card-title {
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--primaryDark);
    margin-bottom: 0.7rem;
}
.blog-card-meta {
    font-size: 1.1rem;
    color: var(--primarySecond);
    margin-bottom: 1.2rem;
}
.blog-card-summary {
    font-size: 1.2rem;
    color: var(--text);
}
.modal-backdrop {
    position: fixed;
    z-index: 1000;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s;
}
.modal-content.blog-modal {
    background: var(--modal-bg);
    border: 2.5px solid var(--modal-border);
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px rgba(20,129,186,0.13);
    padding: 2.5rem 2rem 2rem 2rem;
    max-width: 600px;
    width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    animation: zoomIn 0.18s;
}
.modal-content.blog-modal.fullscreen {
    width: 98vw;
    height: 92vh;
    max-width: 1800px;
    max-height: 98vh;
    border-radius: 2.2rem;
    padding: 2.5rem 2.5rem 2.5rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
}
.modal-main-layout {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    gap: 2vw;
}
.modal-info {
    flex: 2 1 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-right: 2vw;
    min-width: 0;
    color: var(--text);
}
.modal-post-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primaryDark);
    margin-bottom: 0.2rem;
    text-align: left;
}
.modal-post-meta {
    font-size: 1.08rem;
    color: var(--primarySecond);
    margin-bottom: 1.2rem;
    text-align: left;
}
.modal-post-content {
    font-size: 1.1rem;
    color: var(--text);
    text-align: left;
    width: 100%;
}
.carousel-outer {
    flex: 1 1 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    min-width: 320px;
    max-width: 420px;
    height: 340px;
    margin-top: 0.5rem;
    background: var(--background);
    border-radius: 1.2rem;
    box-shadow: 0 8px 32px rgba(20,129,186,0.13);
}
.carousel-inner {
    width: 100%;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1200px;
    position: relative;
}
.carousel-img {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1.2rem;
    box-shadow: 0 8px 32px rgba(20,129,186,0.13);
    opacity: 0;
    transition: transform 0.5s cubic-bezier(.4,2,.6,1), opacity 0.3s;
    pointer-events: none;
}
.carousel-img.active {
    opacity: 1;
    pointer-events: auto;
    box-shadow: 0 12px 32px rgba(20,129,186,0.18);
}
.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--primarySecond);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 3;
    box-shadow: 0 2px 8px rgba(20,129,186,0.13);
    transition: background 0.2s;
}
.carousel-btn.left { left: 0.5rem; }
.carousel-btn.right { right: 0.5rem; }
.carousel-btn:hover { background: var(--primary); }
.modal-close {
    position: absolute;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--primaryDark);
    cursor: pointer;
    z-index: 10;
    transition: color 0.15s;
}
.modal-close-topright {
    top: 1.2rem;
    right: 1.7rem;
}
.modal-close:hover {
    color: var(--primarySecond);
}
.image-overlay {
    position: fixed;
    z-index: 2000;
    inset: 0;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s;
}
.image-overlay-img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 1.2rem;
    box-shadow: 0 8px 32px rgba(20,129,186,0.25);
    background: #fff;
}
.image-overlay-close {
    position: absolute;
    top: 2.5rem;
    right: 3.5rem;
    background: none;
    border: none;
    font-size: 3rem;
    color: #fff;
    cursor: pointer;
    z-index: 2100;
    transition: color 0.15s;
}
.image-overlay-close:hover {
    color: var(--primarySecond);
}
@media (max-width: 900px) {
    .blog-grid {
        grid-template-columns: 1fr;
        gap: 2vw;
    }
    .blog-card {
        min-width: 0;
        padding: 2rem 1rem 1.5rem 1rem;
    }
    .modal-main-layout { flex-direction: column; }
    .carousel-outer { align-items: center; margin: 0 auto; }
    .modal-info { padding-right: 0; }
}
@media (max-width: 600px) {
    .blog-title { font-size: 2rem; }
    .blog-grid { gap: 1.2rem; }
    .modal-content.blog-modal { padding: 1.2rem 0.5rem 1.2rem 0.5rem; }
    .blog-card-title { font-size: 1.2rem; }
    .blog-card-summary { font-size: 1rem; }
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes zoomIn {
    from { transform: scale(0.85);}
    to { transform: scale(1);}
}
</style>
