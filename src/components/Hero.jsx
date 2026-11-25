function Hero() {
    return (
        <section className="hero">
            <h1>Welcome to IPL 2026</h1>

            <p>
                Book your favourite IPL match tickets
                and enjoy the excitement of cricket!
            </p>

            <button onClick={() => document.getElementById("matches").scrollIntoView({ behavior: "smooth" })}>
    Book Your Tickets
</button>
        </section>
    );
}

export default Hero;