<script>
    // Fake team data
    const team = [
        {
            name: "Stefanos Siathas",
            role: "Founder & CEO",
            img: "https://64.media.tumblr.com/65309735019a5e4e67cd1c097d1afed1/109ed6c6631898ed-23/s1280x1920/e948cab221e41afe0f514945c5f62c71b013be4a.png",
            bio: "Visionary leader with a passion for technology and the sea.",
            work: "Oversees company vision, strategy, and partnerships. Leads the team and ensures the mission is achieved."
        },
        {
            name: "Michalis Chatzittofi",
            role: "Lead Engineer",
            img: "https://th.bing.com/th/id/OIP.oluc_qBZ3jEqV_lz9YP0lwHaEK?rs=1&pid=ImgDetMain",
            bio: "Engineering wizard and problem solver.",
            work: "Architects and develops core systems. Mentors engineers and ensures technical excellence."
        },
        {
            name: "Christos kati",
            role: "Product Designer",
            img: "https://randomuser.me/api/portraits/men/65.jpg",
            bio: "Designs with empathy and creativity.",
            work: "Designs user experiences and interfaces. Works closely with engineering and marketing."
        },
        {
            name: "Adolf Hitler",
            role: "Marketing Lead",
            img: "https://th.bing.com/th/id/R.9732564c3448d7ca2d4025f4c03415cb?rik=AwJfQTT9r5tmVA&pid=ImgRaw&r=0",
            bio: "Connecting people with our mission.",
            work: "Leads marketing campaigns and outreach. Builds brand awareness and community."
        }
    ];

    const color_palette_light = {
        primary: "#1481BA",
        primarySecond: "#0CAADC",
        primaryLight: "#11B5E4",
        primaryDark: "#001021",
        accent: "#034748",
        background: "#ffffff",
        secondaryBackground: "#e4e4e4",
        surface: "#ffffff",
        border: "#dddddd",
        text: "#001021",
        muted: "#999999"
    };

    let selected = null;
    function openModal(member) {
        selected = member;
    }
    function closeModal() {
        selected = null;
    }
</script>

<!-- Set CSS variables on a wrapper div -->
<div class="team-section"
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
    <h2 class="team-title">Meet the Team</h2>
    <div class="team-grid">
        {#each team as member}
            <div class="member-card" on:click={() => openModal(member)}>
                <img class="member-img" src={member.img} alt={member.name} />
                <div class="member-name">{member.name}</div>
                <div class="member-role">{member.role}</div>
                <div class="member-bio">{member.bio}</div>
            </div>
        {/each}
    </div>

    {#if selected}
        <div class="modal-backdrop" on:click={closeModal}>
            <div class="modal-content large" on:click|stopPropagation>
                <button class="modal-close" on:click={closeModal}>&times;</button>
                <div class="modal-header">
                    <img class="modal-img" src={selected.img} alt={selected.name} />
                    <div>
                        <div class="modal-name">{selected.name}</div>
                        <div class="modal-role">{selected.role}</div>
                    </div>
                </div>
                <div class="modal-bio">{selected.bio}</div>
                <div class="modal-section">
                    <div class="modal-section-title">What I do</div>
                    <div class="modal-section-content">{selected.work}</div>
                </div>
                <div class="modal-section">
                    <div class="modal-section-title">About</div>
                    <div class="modal-section-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, nisl erat dictum enim, at cursus enim erat nec enim. Etiam euismod, nisl eget consectetur cursus, nisl erat dictum enim, at cursus enim erat nec enim.
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .team-section {
        background: var(--background);
        min-height: 100vh;
        padding: 4vw 0 6vw 0;
    }
    .team-title {
        color: var(--primaryDark);
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 2vw;
        letter-spacing: 0.05em;
    }
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 2.5vw;
        max-width: 1100px;
        margin: 0 auto 3vw auto;
    }
    .member-card {
        background: var(--secondaryBackground);
        border-radius: 1rem;
        box-shadow: 0 4px 16px rgba(20,129,186,0.07);
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.15s, box-shadow 0.15s;
        cursor: pointer;
        user-select: none;
        border: 1.5px solid var(--border);
    }
    .member-card:hover {
        transform: translateY(-6px) scale(1.03);
        box-shadow: 0 8px 24px rgba(20,129,186,0.13);
    }
    .member-img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--primarySecond);
        margin-bottom: 1.2rem;
        background: #fff;
    }
    .member-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--primaryDark);
        margin-bottom: 0.3rem;
    }
    .member-role {
        font-size: 1rem;
        color: var(--primarySecond);
        margin-bottom: 0.7rem;
        letter-spacing: 0.02em;
    }
    .member-bio {
        font-size: 0.98rem;
        color: var(--text);
        text-align: center;
        margin-bottom: 0.2rem;
    }

    /* Modal styles */
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
    .modal-content {
        background: var(--modal-bg);
        border: 2.5px solid var(--modal-border);
        border-radius: 1.5rem;
        box-shadow: 0 8px 32px rgba(20,129,186,0.13);
        padding: 2.5rem 2rem 2rem 2rem;
        max-width: 400px;
        width: 90vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        animation: zoomIn 0.18s;
    }
    .modal-content.large {
        max-width: 700px;
        min-width: 340px;
        width: 95vw;
        padding: 3rem 2.5rem 2.5rem 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.2rem;
    }
    .modal-close {
        position: absolute;
        top: 1.1rem;
        right: 1.3rem;
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--primaryDark);
        cursor: pointer;
        z-index: 1;
        transition: color 0.15s;
    }
    .modal-close:hover {
        color: var(--primarySecond);
    }
    .modal-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        width: 100%;
        margin-bottom: 0.5rem;
    }
    .modal-img {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--primarySecond);
        background: #fff;
        box-shadow: 0 2px 12px rgba(20,129,186,0.09);
    }
    .modal-name {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primaryDark);
        margin-bottom: 0.2rem;
        text-align: left;
    }
    .modal-role {
        font-size: 1.2rem;
        color: var(--primarySecond);
        margin-bottom: 0.7rem;
        letter-spacing: 0.02em;
        text-align: left;
    }
    .modal-bio {
        font-size: 1.1rem;
        color: var(--text);
        text-align: left;
        margin-bottom: 0.5rem;
        width: 100%;
    }
    .modal-section {
        margin-bottom: 0.5rem;
        width: 100%;
    }
    .modal-section-title {
        font-size: 1.08rem;
        font-weight: 600;
        color: var(--primaryDark);
        margin-bottom: 0.2rem;
    }
    .modal-section-content {
        font-size: 1.02rem;
        color: var(--text);
        background: rgba(255,255,255,0.6);
        border-radius: 0.5rem;
        padding: 0.7rem 1rem;
        box-shadow: 0 1px 4px rgba(20,129,186,0.04);
    }
    @media (max-width: 900px) {
        .modal-content.large {
            max-width: 98vw;
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
        }
        .modal-header {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        .modal-img {
            width: 100px;
            height: 100px;
        }
        .modal-name { font-size: 1.3rem; }
        .modal-role { font-size: 1rem; }
    }
    @media (max-width: 600px) {
        .team-title { font-size: 2rem; }
        .team-grid { gap: 1.2rem; }
        .modal-content { padding: 1.2rem 0.5rem 1.2rem 0.5rem; }
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