<script lang="ts">
    let name: string = '';
    let email: string = '';
    let message: string = '';
    let sent: boolean = false;
    function handleSubmit(e: Event) {
        e.preventDefault();
        sent = true;
    }
</script>

<div class="contact-section"
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
    "
>
    <h2 class="contact-title">Contact Us</h2>
    <div class="contact-layout">
        <form class="contact-form" on:submit={handleSubmit}>
            <label for="name">Name</label>
            <input id="name" type="text" bind:value={name} required />
            <label for="email">Email</label>
            <input id="email" type="email" bind:value={email} required />
            <label for="message">Message</label>
            <textarea id="message" rows="5" bind:value={message} required></textarea>
            <button type="submit">Send Message</button>
            {#if sent}
                <div class="contact-success">Thank you for reaching out! We'll get back to you soon.</div>
            {/if}
        </form>
        <div class="contact-info">
            <h3>Get in touch</h3>
            <p>Email: <a href="mailto:info@thalasat.com">info@thalasat.com</a></p>
            <p>Phone: <a href="tel:+35712345678">+357 12345678</a></p>
            <p>Address: 123 Ocean Drive, Limassol, Cyprus</p>
            <div class="contact-socials">
                <a href="#" aria-label="Twitter"><svg width="24" height="24" fill="none" stroke="var(--primarySecond)" stroke-width="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.48 4.48 0 0016.11 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 010 19.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/></svg></a>
                <a href="#" aria-label="LinkedIn"><svg width="24" height="24" fill="none" stroke="var(--primarySecond)" stroke-width="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
            </div>
        </div>
    </div>
</div>

<style>
.contact-section {
    background: var(--background);
    min-height: 100vh;
    padding: 4vw 0 6vw 0;
}
.contact-title {
    color: var(--primaryDark);
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2vw;
    letter-spacing: 0.05em;
}
.contact-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 4vw;
    max-width: 900px;
    margin: 0 auto;
    justify-content: center;
}
.contact-form {
    background: var(--secondaryBackground);
    border-radius: 1rem;
    box-shadow: 0 4px 16px rgba(20,129,186,0.07);
    padding: 2.5rem 2rem 2rem 2rem;
    min-width: 320px;
    max-width: 400px;
    flex: 1 1 340px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.contact-form label {
    color: var(--primaryDark);
    font-weight: 600;
}
.contact-form input,
.contact-form textarea {
    border: 1.5px solid var(--primarySecond);
    border-radius: 0.5rem;
    padding: 0.7rem 1rem;
    font-size: 1rem;
    background: #fff;
    color: var(--text);
    outline: none;
    transition: border 0.2s;
}
.contact-form input:focus,
.contact-form textarea:focus {
    border: 2px solid var(--primaryDark);
}
.contact-form button {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
}
.contact-form button:hover {
    background: var(--primarySecond);
}
.contact-success {
    color: var(--primaryDark);
    background: #e0fcff;
    border-radius: 0.5rem;
    padding: 0.7rem 1rem;
    margin-top: 1rem;
    font-size: 1rem;
    text-align: center;
}
.contact-info {
    background: var(--secondaryBackground);
    border-radius: 1.2rem;
    box-shadow: 0 4px 16px rgba(20,129,186,0.07);
    padding: 2.5rem 2rem 2rem 2rem;
    min-width: 260px;
    max-width: 340px;
    flex: 1 1 260px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--text);
}
.contact-info h3 {
    color: var(--primaryDark);
    margin-bottom: 0.5rem;
}
.contact-info a {
    color: var(--primarySecond);
    text-decoration: none;
}
.contact-info a:hover {
    text-decoration: underline;
}
.contact-socials {
    display: flex;
    gap: 1.2rem;
    margin-top: 1rem;
}
.contact-socials svg {
    vertical-align: middle;
    transition: stroke 0.2s;
}
.contact-socials a:hover svg {
    stroke: var(--primary);
}
@media (max-width: 800px) {
    .contact-layout {
        flex-direction: column;
        align-items: center;
        gap: 2vw;
    }
    .contact-form, .contact-info {
        max-width: 98vw;
        min-width: 0;
    }
}
</style>
