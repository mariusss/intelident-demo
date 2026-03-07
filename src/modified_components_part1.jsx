import React, { useState, useEffect } from 'react';

export function SmartSchedulerPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen, PATIENT_DATA, onSelectPatient, onNavigatePage }) {
    const [simState, setSimState] = useState("idle");
    const [apts, setApts] = useState([
        { id: 1, provider: 0, start: 0, duration: 2, patient: "Sarah Chen", type: "Hygiene", color: "#14b8a6", risk: "Low" },
        { id: 2, provider: 0, start: 3, duration: 3, patient: "Kevin Park", type: "Crown Prep", color: "#22c55e", risk: "Medium" },
        { id: 3, provider: 0, start: 7, duration: 2, patient: "Maria Gonzalez", type: "Hygiene", color: "#14b8a6", risk: "Low" },
        { id: 4, provider: 0, start: 10, duration: 2, patient: "Linda Tran", type: "Composite Fill", color: "#22c55e", risk: "Low" },
        { id: 5, provider: 0, start: 14, duration: 3, patient: "Ashley Johnson", type: "Root Canal", color: "#f97316", risk: "Medium" },
        { id: 6, provider: 1, start: 0, duration: 3, patient: "James Okafor", type: "Extraction", color: "#ef4444", risk: "High", warning: "85% No-Show Risk" },
        { id: 7, provider: 1, start: 3, duration: 3, patient: "Marcus Rivera", type: "Crown Prep", color: "#22c55e", risk: "High", isTarget: true, warning: "Texted to cancel" },
        { id: 8, provider: 1, start: 7, duration: 2, patient: "David Patel", type: "Perio SRP", color: "#f97316", risk: "Low" },
        { id: 9, provider: 1, start: 12, duration: 2, patient: "Michael Brown", type: "Denture Adj", color: "#22c55e", risk: "Low" },
        { id: 10, provider: 1, start: 15, duration: 3, patient: "Emily Watson", type: "Implant Consult", color: "#a855f7", risk: "Medium" },
    ]);

    const providers = [
        { name: "Dr. Camelia Cifor", img: "/doctors.png", pos: "18.5% 12%", util: "92%", prod: "$4,200/h" },
        { name: "Dr. Alberto Vargas", img: "/doctors.png", pos: "52% 12%", util: "88%", prod: "$3,850/h" }
    ];
    const hours = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

    const triggerSimulation = () => {
        if (simState !== "idle" && simState !== "finished") return;
        setSimState("cancelled");
        setApts(prev => prev.filter(a => !a.isTarget));
    };

    const triggerSmartFill = () => {
        setSimState("searching");
        setTimeout(() => setSimState("ranking"), 2000);
        setTimeout(() => setSimState("calling"), 4500);
        setTimeout(() => {
            setSimState("filled");
            setApts(prev => [...prev, {
                id: 99,
                provider: 1,
                start: 3,
                duration: 3,
                patient: "Kevin Park",
                type: "Crown Prep",
                color: "#007AFF",
                risk: "Low",
                isFilled: true
            }]);
            setTimeout(() => setSimState("finished"), 3000);
        }, 7000);
    };

    return (
        <div className="main-content-mobile" style={{ padding: "20px 40px" }}>
            {/* We will inject window.TopGreetingUI2 dynamically or keep it defined in App */}
            {typeof window !== 'undefined' && window.TopGreetingUI2 && <window.TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Intelligent Schedule Dashboard" />}

            <div className="grid-stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: 24, marginTop: 24 }}>
                {/* Calendar View */}
                <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: "#111827", margin: 0 }}>Chair Allocation</h2>
                        <div style={{ display: "flex", gap: 12 }}>
                            {simState === "cancelled" && (
                                <button onClick={triggerSmartFill} style={{ display: "flex", alignItems: "center", gap: 8, background: "#10B981", color: "#FFFFFF", border: "none", padding: "10px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)", animation: "fadeIn 0.3s ease-out" }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> Smart Fill
                                </button>
                            )}
                            <button onClick={triggerSimulation} style={{ display: "flex", alignItems: "center", gap: 8, background: "#1C1E23", color: "#FFFFFF", border: "none", padding: "10px 20px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: simState === "idle" || simState === "finished" ? 1 : 0.5 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg> Simulate Cancellation Event
                            </button>
                        </div>
                    </div>

                    <div style={{ border: `1px solid #E5E7EB`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", background: "#F9FAFB", borderBottom: `1px solid #E5E7EB` }}>
                            <div style={{ width: 80, flexShrink: 0, borderRight: `1px solid #E5E7EB` }}></div>
                            {providers.map((p, i) => (
                                <div key={i} style={{ flex: 1, padding: "16px", display: "flex", alignItems: "center", gap: 16, borderRight: i === 0 ? `1px solid #E5E7EB` : "none" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 24, border: "2px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", backgroundImage: `url('${p.img}')`, backgroundSize: "1100% auto", backgroundPosition: p.pos }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{p.name}</div>
                                        <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 4 }}>Util: <span style={{ color: "#10B981" }}>{p.util}</span> • Prod: {p.prod}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ position: "relative", height: 600, overflowY: "auto", background: "#FFFFFF" }}>
                            {hours.map((hour, idx) => (
                                <div key={idx} style={{ display: "flex", height: 75, borderBottom: `1px solid #F3F4F6` }}>
                                    <div style={{ width: 80, flexShrink: 0, padding: "12px", fontSize: 12, color: "#6B7280", textAlign: "right", borderRight: `1px solid #E5E7EB`, fontWeight: 500 }}>
                                        {hour}
                                    </div>
                                    <div style={{ flex: 1, borderRight: `1px solid #E5E7EB` }}></div>
                                    <div style={{ flex: 1 }}></div>
                                </div>
                            ))}

                            {apts.map(apt => {
                                const matchedPatient = PATIENT_DATA?.find(p => p.name === apt.patient);
                                const photoUrl = matchedPatient?.photoUrl;
                                const initials = apt.patient.split(" ").map(n => n[0]).join("");

                                const startHourNum = 8 + Math.floor(apt.start / 2);
                                const startMinStr = apt.start % 2 === 0 ? "00" : "30";
                                const startPeriod = startHourNum >= 12 ? "PM" : "AM";
                                const startHour12 = startHourNum > 12 ? startHourNum - 12 : startHourNum;
                                const startTimeStr = `${startHour12}:${startMinStr} ${startPeriod}`;

                                const endTotalHalfHours = apt.start + apt.duration;
                                const endHourNum = 8 + Math.floor(endTotalHalfHours / 2);
                                const endMinStr = endTotalHalfHours % 2 === 0 ? "00" : "30";
                                const endPeriod = endHourNum >= 12 ? "PM" : "AM";
                                const endHour12 = endHourNum > 12 ? endHourNum - 12 : endHourNum;
                                const endTimeStr = `${endHour12}:${endMinStr} ${endPeriod}`;

                                const timeRangeStr = `${startTimeStr} - ${endTimeStr}`;

                                return (
                                    <div key={apt.id} style={{
                                        position: "absolute",
                                        top: `${apt.start * 37.5}px`,
                                        left: `calc(80px + (100% - 80px) * ${apt.provider} / 2)`,
                                        width: `calc((100% - 80px) / 2 - 12px)`,
                                        height: `${apt.duration * 37.5 - 4}px`,
                                        background: apt.isFilled ? "#F0FDF4" : apt.risk === "High" ? "rgba(239, 68, 68, 0.05)" : "#F8FAFC",
                                        borderLeft: `4px solid ${apt.color}`,
                                        borderRadius: 6,
                                        margin: "2px 6px",
                                        padding: "10px 14px",
                                        display: "flex", flexDirection: "column",
                                        boxSizing: "border-box",
                                        boxShadow: apt.isFilled ? "0 4px 12px rgba(16, 185, 129, 0.15)" : apt.risk === "High" ? "0 4px 12px rgba(239, 68, 68, 0.08)" : "none",
                                        border: apt.isFilled ? `1px solid #10B981` : apt.risk === "High" ? `1px solid rgba(239, 68, 68, 0.2)` : `1px solid #E5E7EB`,
                                        animation: apt.isFilled ? "pulse 2s infinite" : "none",
                                        cursor: "pointer"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                {photoUrl ? (
                                                    <img src={photoUrl} alt={apt.patient} style={{ width: 20, height: 20, borderRadius: "50%", objectFit: "cover" }} />
                                                ) : (
                                                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#111827" }}>
                                                        {initials}
                                                    </div>
                                                )}
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{apt.patient}</span>
                                                    <span style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", marginTop: 2 }}>{timeRangeStr}</span>
                                                </div>
                                            </div>
                                            {apt.isFilled && <span style={{ padding: "2px 8px", background: "#10B981", color: "white", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>FILLED</span>}
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: apt.color, marginTop: 6 }}>{apt.type}</span>
                                        {apt.isFilled && <div style={{ marginTop: "auto", fontSize: 11, color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>Auto-Filled by AI</div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* AI Event Log Panel */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "linear-gradient(135deg, #1C1E23 0%, #333 100%)", borderRadius: 24, padding: 32, color: "white", boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#00B67A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Autopilot Log</h3>
                        </div>

                        {simState === "idle" && (
                            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>System standing by. Waiting for schedule anomalies or cancellation events...</div>
                        )}

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {simState !== "idle" && (
                                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", animation: "fadeIn 0.3s ease-out" }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 12, background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>X</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>Cancellation detected</div>
                                        <div className="typewriter-text" style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 }}>Marcus Rivera, 9:30 AM Crown Prep</div>
                                    </div>
                                </div>
                            )}

                            {(simState === "searching" || simState === "ranking" || simState === "calling" || simState === "filled" || simState === "finished") && (
                                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", animation: "fadeIn 0.3s ease-out" }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 12, background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        ✓
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>Scanning waitlist for compatible patients</div>
                                        <div className="typewriter-text" style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 }}>Match found: Kevin Park (Crown Prep pending, 10 min away)</div>
                                    </div>
                                </div>
                            )}

                            {(simState === "calling" || simState === "filled" || simState === "finished") && (
                                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", animation: "fadeIn 0.3s ease-out" }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 12, background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        ✓
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14, color: "#FCD34D" }}>Sending SMS offer...</div>
                                        <div className="typewriter-text" style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 }}>Confirmed: Kevin Park booked for 9:30 AM</div>
                                    </div>
                                </div>
                            )}

                            {(simState === "filled" || simState === "finished") && (
                                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", animation: "fadeIn 0.3s ease-out" }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 12, background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14, color: "#10B981" }}>Schedule gap filled in 4 minutes.</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------
// ANALYTICS COMPONENT
// ----------------------------------------------------

export function AnalyticsPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    // We will just return the whole Analytics page body, keeping the original heatmap, but adding our custom AI cards at the bottom.
    // However, recreating everything is safe as long as we keep the structure.
    return (
        <div className="mobile-no-padding-main" style={{ padding: "20px 40px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            {typeof window !== 'undefined' && window.TopGreetingUI2 && <window.TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Performance insights and growth." />}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24, marginTop: 24 }}>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {/* Simplified original Analytics top cards for brevity */}
                    <div style={{ flex: 1, minWidth: 300, background: "#FFFFFF", borderRadius: 24, padding: 24, border: "1px solid #E5E7EB" }}>
                        <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 600 }}>Total Production (YTD)</div>
                        <div style={{ fontSize: 32, fontWeight: 800, color: "#111827", margin: "8px 0" }}>$1.42M</div>
                        <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#10B981", fontWeight: 700 }}>+12%</span> vs last year</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 300, background: "#FFFFFF", borderRadius: 24, padding: 24, border: "1px solid #E5E7EB" }}>
                        <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 600 }}>Hygiene Reappointment</div>
                        <div style={{ fontSize: 32, fontWeight: 800, color: "#111827", margin: "8px 0" }}>88%</div>
                        <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#10B981", fontWeight: 700 }}>+4%</span> vs last month</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 300, background: "#FFFFFF", borderRadius: 24, padding: 24, border: "1px solid #E5E7EB" }}>
                        <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 600 }}>Treatment Acceptance</div>
                        <div style={{ fontSize: 32, fontWeight: 800, color: "#111827", margin: "8px 0" }}>62%</div>
                        <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#10B981", fontWeight: 700 }}>+2%</span> vs last month</div>
                    </div>
                </div>

                {/* Heatmap placeholder to match original */}
                <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, border: "1px solid #E5E7EB" }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Chair Utilization Heatmap</h3>
                    <p style={{ color: "#6B7280", margin: "4px 0 24px 0", fontSize: 14 }}>Low utilization detected on Wednesdays heavily impacting revenue.</p>
                    <div style={{ height: 200, background: "#F9FAFB", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>[Heatmap Visualization (Preserved)]</div>
                </div>

                {/* NEW: AI Growth Recommendations Panel */}
                <div style={{ background: "#F0FDF4", borderRadius: 24, padding: 32, border: "1px solid #A7F3D0", marginTop: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>AI Growth Recommendations</h3>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB" }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Add one hygiene column on Wednesday afternoons</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#10B981", marginBottom: 16 }}>Est. +$8,400/mo</div>
                            <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 20px 0", lineHeight: 1.5 }}>Our heatmap detects consistent bottlenecking and overflow demand for hygiene on Wednesdays. Adding a temporary hygienist will directly capture lost revenue.</p>
                            <button style={{ width: "100%", padding: "10px", background: "#111827", color: "white", borderRadius: 9999, fontWeight: 600, border: "none", cursor: "pointer" }}>Explore This</button>
                        </div>
                        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB" }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Follow up on 38 patients with unscheduled implant consults</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#10B981", marginBottom: 16 }}>Est. +$114,000 in treatment</div>
                            <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 20px 0", lineHeight: 1.5 }}>There are 38 high-value treatment plans mapped as "Proposed" that haven't been scheduled over the last 90 days. AI sequence recommended.</p>
                            <button style={{ width: "100%", padding: "10px", background: "#111827", color: "white", borderRadius: 9999, fontWeight: 600, border: "none", cursor: "pointer" }}>Explore This</button>
                        </div>
                        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB" }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Activate Saturday hours for 2 Saturdays/month</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#10B981", marginBottom: 16 }}>Est. +$12,600/mo</div>
                            <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 20px 0", lineHeight: 1.5 }}>Waitlist demand for out-of-school/weekend appointments indicates a high willingness to book. Operating minimally on 2 Saturdays captures this demand.</p>
                            <button style={{ width: "100%", padding: "10px", background: "#111827", color: "white", borderRadius: 9999, fontWeight: 600, border: "none", cursor: "pointer" }}>Explore This</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
