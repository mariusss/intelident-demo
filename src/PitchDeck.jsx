import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Activity, TrendingUp, Shield, Sparkles, AlertTriangle, Clock, UsersRound } from 'lucide-react';

export default function PitchDeck() {
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper for complex scroll-linked animations
    const useScrollTransform = (start, end, minVal, maxVal) => {
        if (scrollY < start) return minVal;
        if (scrollY > end) return maxVal;
        const progress = (scrollY - start) / (end - start);
        return minVal + (maxVal - minVal) * progress;
    };

    const vh = window.innerHeight;

    return (
        <div ref={containerRef} style={{ backgroundColor: '#000000', color: '#FFFFFF', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' }}>

            <style>
                {`
                    body { margin: 0; background: #000; }
                    .gradient-text {
                        background: linear-gradient(135deg, #FFFFFF 0%, #71717A 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    .neon-green-text {
                        background: linear-gradient(135deg, #34D399 0%, #059669 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    .neon-red-text {
                        background: linear-gradient(135deg, #F87171 0%, #DC2626 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    @keyframes pulseGlow {
                        0% { box-shadow: 0 0 0 0 rgba(0, 182, 122, 0.4); }
                        70% { box-shadow: 0 0 0 20px rgba(0, 182, 122, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(0, 182, 122, 0); }
                    }
                    .stat-card {
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid rgba(255,255,255,0.05);
                        border-radius: 24px;
                        padding: 40px;
                        backdrop-filter: blur(20px);
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s;
                    }
                    .stat-card:hover {
                        transform: translateY(-10px);
                        background: rgba(255, 255, 255, 0.05);
                    }
                    .image-container {
                        position: sticky;
                        top: 15vh;
                        height: 70vh;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .image-wrapper {
                        width: 90%;
                        height: 100%;
                        border-radius: 24px;
                        overflow: hidden;
                        border: 1px solid rgba(255,255,255,0.1);
                        box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                        position: relative;
                    }
                    .image-wrapper img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: top;
                        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    /* Slow continual pan for sticky images */
                    @keyframes breathePan {
                        0% { transform: scale(1.05) translateY(0%); }
                        50% { transform: scale(1.08) translateY(-3%); }
                        100% { transform: scale(1.05) translateY(0%); }
                    }
                    .image-wrapper img.active {
                        animation: breathePan 20s infinite ease-in-out;
                    }
                `}
            </style>

            {/* =========================================
                HERO: THE PROBLEM 
            ========================================= */}
            <section style={{ height: '150vh', position: 'relative' }}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 5vw', textAlign: 'center' }}>

                    <div style={{ opacity: useScrollTransform(0, vh / 2, 1, 0), transform: `translateY(${useScrollTransform(0, vh / 2, 0, -100)}px)` }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 40, padding: '12px 24px', background: 'rgba(239,68,68,0.1)', borderRadius: 100, border: '1px solid rgba(239,68,68,0.2)' }}>
                            <AlertTriangle color="#F87171" size={20} />
                            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, color: '#F87171', textTransform: 'uppercase' }}>The Industry Crisis</span>
                        </div>

                        <h1 style={{ fontSize: '6vw', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 24 }}>
                            Dental software is <br />
                            <span className="neon-red-text" style={{ fontStyle: 'italic' }}>bleeding revenue.</span>
                        </h1>

                        <p style={{ fontSize: '1.5rem', color: '#A1A1AA', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
                            Legacy systems like Dentrix and Eaglesoft were built in the 1990s. They require massive manual labor, ignore cancellations, and cause billions in uncollected production annually.
                        </p>
                    </div>

                </div>
            </section>


            {/* =========================================
                THE SOLUTION HERO
            ========================================= */}
            <section style={{ height: '200vh', position: 'relative', background: '#09090B' }}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 5vw', textAlign: 'center' }}>

                    <div style={{
                        opacity: useScrollTransform(vh, vh * 1.5, 0, 1),
                        transform: `scale(${useScrollTransform(vh, vh * 1.5, 0.9, 1)})`,
                        filter: `blur(${useScrollTransform(vh, vh * 1.5, 20, 0)}px)`
                    }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 40, padding: '16px 32px', background: 'rgba(0,182,122,0.1)', borderRadius: 100, border: '1px solid rgba(0,182,122,0.3)', animation: 'pulseGlow 3s infinite' }}>
                            <Activity color="#34D399" size={28} />
                            <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, color: '#34D399' }}>INTELIDENT.AI</span>
                        </div>

                        <h2 style={{ fontSize: '7vw', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', margin: 0, className: 'gradient-text' }}>
                            The Operating System <br />
                            for the <span className="neon-green-text">Future</span>.
                        </h2>
                    </div>

                </div>
            </section>


            {/* =========================================
                MASSIVE WALKTHROUGH SECTIONS
            ========================================= */}

            {/* MODULE 1: SMART SCHEDULING (ROI DRIVEN) */}
            <section style={{ height: '200vh', position: 'relative' }}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4vw', padding: '0 5vw' }}>

                    <div style={{ opacity: useScrollTransform(vh * 2.5, vh * 3, 0, 1), transform: `translateY(${useScrollTransform(vh * 2.5, vh * 3, 50, 0)}px)` }}>
                        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 3, color: '#8B5CF6', textTransform: 'uppercase', marginBottom: 24 }}>01 // Intelligent Orchestration</div>
                        <h2 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: 32 }}>Never lose a<br />cancellation again.</h2>

                        <p style={{ fontSize: '1.4rem', color: '#A1A1AA', lineHeight: 1.6, marginBottom: 48 }}>
                            An empty chair costs a practice **$250-$500 per hour**. Intelident's AI instantly detects cancellations, scans the waitlist for matching procedure lengths, and automatically fills the gap.
                        </p>

                        <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: 24, padding: 32 }}>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#A78BFA', marginBottom: 8 }}>+$50,000</div>
                            <div style={{ fontSize: '1.2rem', color: '#D8B4FE', fontWeight: 600 }}>Average Annual Revenue Recovered Per Doctor</div>
                        </div>
                    </div>

                    <div className="image-wrapper" style={{ boxShadow: '0 0 100px rgba(139, 92, 246, 0.2)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 80%, #000 100%)', zIndex: 10 }} />
                        <img src="/screenshots/03_schedule.png" alt="Smart Scheduler" className={scrollY > vh * 2 ? 'active' : ''} />
                    </div>

                </div>
            </section>

            {/* MODULE 2: AMBIENT NOTES (LABOR SAVINGS) */}
            <section style={{ height: '200vh', position: 'relative', background: '#09090B' }}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4vw', padding: '0 5vw' }}>

                    <div className="image-wrapper" style={{ boxShadow: '0 0 100px rgba(234, 179, 8, 0.15)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 80%, #09090B 100%)', zIndex: 10 }} />
                        <img src="/screenshots/05_notes.png" alt="AI Notes" className={scrollY > vh * 4 ? 'active' : ''} />
                    </div>

                    <div style={{ opacity: useScrollTransform(vh * 4.5, vh * 5, 0, 1), transform: `translateY(${useScrollTransform(vh * 4.5, vh * 5, 50, 0)}px)` }}>
                        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 3, color: '#EAB308', textTransform: 'uppercase', marginBottom: 24 }}>02 // Ambient AI Documentation</div>
                        <h2 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: 32 }}>Zero hours spent<br />typing clinical notes.</h2>

                        <p style={{ fontSize: '1.4rem', color: '#A1A1AA', lineHeight: 1.6, marginBottom: 48 }}>
                            Dentists spend 1-2 hours *every day* writing SOAP notes. Intelident's Ambient Assistant generates perfect, legally compliant clinical narratives instantly based on billed ADA codes.
                        </p>

                        <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 24, padding: 32 }}>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FDE047', marginBottom: 8 }}>30+ Days</div>
                            <div style={{ fontSize: '1.2rem', color: '#FEF08A', fontWeight: 600 }}>Of doctor time saved back per year.</div>
                        </div>
                    </div>

                </div>
            </section>

            {/* MODULE 3: REACTIVATION (PATIENT RETENTION) */}
            <section style={{ height: '200vh', position: 'relative' }}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4vw', padding: '0 5vw' }}>

                    <div style={{ opacity: useScrollTransform(vh * 6.5, vh * 7, 0, 1), transform: `translateY(${useScrollTransform(vh * 6.5, vh * 7, 50, 0)}px)` }}>
                        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 3, color: '#EA580C', textTransform: 'uppercase', marginBottom: 24 }}>03 // Automated Reactivation</div>
                        <h2 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: 32 }}>The ultimate<br />retention machine.</h2>

                        <p style={{ fontSize: '1.4rem', color: '#A1A1AA', lineHeight: 1.6, marginBottom: 48 }}>
                            Stop forcing the front desk to dial through endless lists of overdue patients. The AI Reactivation Engine autonomously messages, monitors, and explicitly tracks the exact dollar amount of revenue it generates.
                        </p>

                        <div style={{ background: 'rgba(234, 88, 12, 0.1)', border: '1px solid rgba(234, 88, 12, 0.3)', borderRadius: 24, padding: 32 }}>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FDBA74', marginBottom: 8 }}>4.8x ROI</div>
                            <div style={{ fontSize: '1.2rem', color: '#FED7AA', fontWeight: 600 }}>Average return on automated SMS/Email campaigns.</div>
                        </div>
                    </div>

                    <div className="image-wrapper" style={{ boxShadow: '0 0 100px rgba(234, 88, 12, 0.15)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 80%, #000 100%)', zIndex: 10 }} />
                        <img src="/screenshots/04_reactivation.png" alt="Reactivation" className={scrollY > vh * 6 ? 'active' : ''} />
                    </div>

                </div>
            </section>


            {/* =========================================
                THE FINANCIAL KILLSHOT (DENTRIX COMPARISON)
            ========================================= */}
            <section style={{ position: 'relative', background: '#000', padding: '15vh 5vw', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

                <div style={{ textAlign: 'center', marginBottom: 100 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: '12px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Shield color="#FFF" size={20} />
                        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: '#FFF', textTransform: 'uppercase' }}>The Bottom Line</span>
                    </div>
                    <h2 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 24 }}>
                        Intelident vs. Status Quo
                    </h2>
                    <p style={{ fontSize: '1.5rem', color: '#A1A1AA', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
                        Legacy platforms are giant filing cabinets. Intelident is an active AI participant driving massive financial returns.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, maxWidth: 1400, margin: '0 auto' }}>

                    <div className="stat-card">
                        <Clock size={40} color="#3B82F6" style={{ marginBottom: 32 }} />
                        <div style={{ fontSize: '1.2rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 16 }}>Labor Costs</div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 24 }}>- 40 Hours</h3>
                        <p style={{ fontSize: '1.2rem', color: '#A1A1AA', lineHeight: 1.6, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Saved weekly by eliminating manual claims typing, scheduling phone calls, and SOAP note dictation.</p>
                        <div style={{ marginTop: 24, fontSize: '1rem', color: '#3B82F6', fontWeight: 700 }}>Equivalent to 1 Full-Time Employee</div>
                    </div>

                    <div className="stat-card" style={{ background: 'rgba(0,182,122,0.05)', borderColor: 'rgba(0,182,122,0.3)' }}>
                        <TrendingUp size={40} color="#00B67A" style={{ marginBottom: 32 }} />
                        <div style={{ fontSize: '1.2rem', color: '#00B67A', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 16 }}>Top-Line Revenue</div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 24, color: '#00B67A' }}>+$120,000 /yr</h3>
                        <p style={{ fontSize: '1.2rem', color: '#A1A1AA', lineHeight: 1.6, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Generated strictly by AI finding hidden production in unscheduled treatment plans and filling cancellations.</p>
                        <div style={{ marginTop: 24, fontSize: '1rem', color: '#00B67A', fontWeight: 700 }}>Direct Return on Investment</div>
                    </div>

                    <div className="stat-card">
                        <UsersRound size={40} color="#F59E0B" style={{ marginBottom: 32 }} />
                        <div style={{ fontSize: '1.2rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 16 }}>Patient Attrition</div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 24 }}>- 65% Drop</h3>
                        <p style={{ fontSize: '1.2rem', color: '#A1A1AA', lineHeight: 1.6, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Through relentless, automated AI reactivation sequences that prevent patients from falling through the cracks.</p>
                        <div style={{ marginTop: 24, fontSize: '1rem', color: '#F59E0B', fontWeight: 700 }}>Massive Lifetime Value Increase</div>
                    </div>

                </div>
            </section>

            {/* =========================================
                CLOSING CTA
            ========================================= */}
            <section style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vw', background: 'radial-gradient(circle, rgba(0,182,122,0.1) 0%, rgba(0,0,0,0) 60%)', zIndex: 0 }} />

                <h2 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 40, zIndex: 10 }}>
                    Ready to see it live?
                </h2>

                <button onClick={() => window.open('https://intelident-demo.vercel.app', '_blank')} style={{ padding: '24px 56px', fontSize: 24, fontWeight: 800, backgroundColor: '#00B67A', color: '#000', border: 'none', borderRadius: 100, cursor: 'pointer', zIndex: 10, boxShadow: '0 0 40px rgba(0,182,122,0.4)', transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.backgroundColor = '#00D18C' }} onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#00B67A' }}>
                    Access Live Prototype
                </button>
            </section>

        </div>
    );
}
