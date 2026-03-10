import { useEffect, useRef } from 'react';

import './Artist.css';

export default function Artist() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.artist-animate');
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="artist-page" ref={sectionRef}>



            {/* ── HERO — LANDING SECTION ───────────────────────────────── */}
            <section className="artist-hero">
                <h1 className="artist-hero-title">ARTISTS</h1>

                <p className="artist-hero-tagline">

                    <span className="tagline-dot">·</span>
                    STARS OF THE NIGHT
                </p>

                <div className="artist-hero-scroll">
                    <div className="artist-hero-scroll-line" />
                    <span className="artist-hero-scroll-text">Scroll</span>
                </div>
            </section>

            {/* ── LOWER SECTIONS ───────────────────────────────────────── */}
            <div className="artist-lower-wrapper">
                <div className="artist-showcase-container">
                    
                    {/* DAY 1 - HORIZONTAL HEADLINER */}
                    <div className="showcase-row artist-animate">
                        <div className="showcase-image">
                            <img src="/Artists/Navjot_Ahuja.webp" alt="Navjot Ahuja" />
                            <div className="glow-orb"></div>
                        </div>
                        <div className="showcase-content">
                            <span className="sh-day">Day 1 &middot; The Awakening</span>
                            <h3 className="sh-name">Navjot Ahuja</h3>
                            <p className="sh-desc">
                                Prepare to be enchanted by soulful melodies and an awakening of the senses. 
                                Navjot Ahuja sets the celestial rhythm of Oneiros 2026, delivering an unforgettable 
                                opening night.
                            </p>
                        </div>
                    </div>

                    {/* DAY 2 - EXPANDING PILLARS */}
                    <div className="showcase-row center artist-animate artist-animate-delay-1">
                        <div className="showcase-header">
                            <span className="sh-day">Day 2 &middot; The Cosmic Synergy</span>
                            <h3 className="sh-subtitle">A Trinity of Stars</h3>
                        </div>
                        <div className="pillars-container">
                            <div className="pillar">
                                <img src="/Artists/Akshay_Barodia.webp" alt="Akshay Barodia" />
                                <div className="pillar-overlay">
                                    <h4>Akshay Barodia</h4>
                                    <p>The groove master</p>
                                </div>
                            </div>
                            <div className="pillar">
                                <img src="/Artists/Dj_Jerry.webp" alt="DJ Jerry" />
                                <div className="pillar-overlay">
                                    <h4>DJ Jerry</h4>
                                    <p>Electrifying beats</p>
                                </div>
                            </div>
                            <div className="pillar">
                                <img src="/Artists/Kamandal.webp" alt="Kamandal" />
                                <div className="pillar-overlay">
                                    <h4>Kamandal</h4>
                                    <p>Rocking the cosmos</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DAY 3 - HORIZONTAL REVERSE HEADLINER */}
                    <div className="showcase-row reverse artist-animate artist-animate-delay-2">
                        <div className="showcase-content">
                            <span className="sh-day">Day 3 &middot; The Grand Finale</span>
                            <h3 className="sh-name">Benny Dayal</h3>
                            <p className="sh-desc">
                                The ultimate crescendo to our celestial journey. Dance the night away with 
                                Benny Dayal's powerhouse vocals and legendary energetic performance.
                            </p>
                        </div>
                        <div className="showcase-image">
                            <img src="/Artists/Benny_Dayal.webp" alt="Benny Dayal" />
                            <div className="glow-orb"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
