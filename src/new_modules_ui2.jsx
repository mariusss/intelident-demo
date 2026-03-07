// ==========================================
// NEW FEATURES FOR INTELIDENT AI
// ==========================================

export function ClinicalChartPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [activeTab, setActiveTab] = useState("tooth");
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [dictation, setDictation] = useState("");
    const [analyzingXray, setAnalyzingXray] = useState(false);
    const [xrayAnalyzed, setXrayAnalyzed] = useState(false);
    
    const [toothData, setToothData] = useState(() => {
        const initial = Array.from({length: 32}, (_, i) => ({
            number: i + 1,
            status: "Healthy",
            condition: "None"
        }));
        // some demo data
        initial[2].status = "Existing Restoration"; initial[2].condition = "Crown - PFM";
        initial[13].status = "Proposed Treatment"; initial[13].condition = "Caries - Mesial";
        initial[18].status = "Proposed Treatment"; initial[18].condition = "Cracked Cusp";
        initial[31].status = "Missing"; initial[31].condition = "Extracted";
        return initial;
    });

    const getToothColor = (status) => {
        switch(status) {
            case "Existing Restoration": return "#3B82F6"; // blue
            case "Proposed Treatment": return "#EF4444"; // red
            case "Missing": return "#9CA3AF"; // grey
            case "Watch": return "#F59E0B"; // yellow
            default: return "#10B981"; // green (Healthy)
        }
    };

    const handleToothClick = (t) => {
        setSelectedTooth(t);
    };

    const handleSimulateDictation = () => {
        setGenerating(true);
        let i = 0;
        const text = "Tooth 19 has a cracked cusp, recommend full coverage crown.";
        setDictation("");
        const interval = setInterval(() => {
            setDictation(prev => prev + text[i]);
            i++;
            if (i >= text.length - 1) {
                clearInterval(interval);
                setTimeout(() => {
                    setGenerating(false);
                    // update tooth 19
                    const newData = [...toothData];
                    newData[18] = { number: 19, status: "Proposed Treatment", condition: "Cracked Cusp" };
                    setToothData(newData);
                }, 1000);
            }
        }, 30);
    };

    const handleAnalyzeXray = () => {
        setAnalyzingXray(true);
        setTimeout(() => {
            setAnalyzingXray(false);
            setXrayAnalyzed(true);
        }, 1500);
    };

    // Split arches
    const upperArch = toothData.slice(0, 16);
    const lowerArch = toothData.slice(16, 32).reverse();

    return (
        <div style={{ padding: "20px 40px", height: "100%", display: "flex", flexDirection: "column" }}>
            <TopGreetingUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Clinical Chart for Sarah Chen." />
            
            <div style={{ display: "flex", gap: 24, flex: 1, minHeight: 600 }}>
                {/* Left Panel: Chart */}
                <div style={{ flex: 1.5, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: 16, marginBottom: 24, borderBottom: `1px solid #E5E7EB`, paddingBottom: 16 }}>
                        <button onClick={() => setActiveTab("tooth")} style={{ background: activeTab === "tooth" ? GEO_BG : "transparent", color: activeTab === "tooth" ? GEO_BLACK : GEO_TEXT_MUTED, border: "none", padding: "8px 16px", borderRadius: GEO_PILL, fontWeight: 600, cursor: "pointer" }}>Tooth Chart</button>
                        <button onClick={() => setActiveTab("perio")} style={{ background: activeTab === "perio" ? GEO_BG : "transparent", color: activeTab === "perio" ? GEO_BLACK : GEO_TEXT_MUTED, border: "none", padding: "8px 16px", borderRadius: GEO_PILL, fontWeight: 600, cursor: "pointer" }}>Perio Chart</button>
                    </div>

                    {activeTab === "tooth" ? (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 40, alignItems: "center", justifyContent: "center", position: "relative" }}>
                            {/* Upper Arch */}
                            <div style={{ display: "flex", gap: 4, justifyContent: "center", width: "100%" }}>
                                {upperArch.map(t => (
                                    <div key={t.number} onClick={() => handleToothClick(t)} style={{ width: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: GEO_TEXT_MUTED }}>{t.number}</div>
                                        <div style={{ width: 28, height: 40, background: getToothColor(t.status), borderRadius: "4px 4px 12px 12px", transition: "transform 0.1s", transform: selectedTooth?.number === t.number ? "scale(1.1)" : "none", boxShadow: selectedTooth?.number === t.number ? "0 0 0 2px #111" : "none" }}></div>
                                    </div>
                                ))}
                            </div>
                            {/* Lower Arch */}
                            <div style={{ display: "flex", gap: 4, justifyContent: "center", width: "100%" }}>
                                {lowerArch.map(t => (
                                    <div key={t.number} onClick={() => handleToothClick(t)} style={{ width: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
                                        <div style={{ width: 28, height: 40, background: getToothColor(t.status), borderRadius: "12px 12px 4px 4px", transition: "transform 0.1s", transform: selectedTooth?.number === t.number ? "scale(1.1)" : "none", boxShadow: selectedTooth?.number === t.number ? "0 0 0 2px #111" : "none" }}></div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: GEO_TEXT_MUTED }}>{t.number}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Legend */}
                            <div style={{ display: "flex", gap: 16, marginTop: "auto", padding: 16, background: GEO_BG, borderRadius: 16, width: "100%", justifyContent: "center", flexWrap: "wrap" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}><div style={{ width: 12, height: 12, borderRadius: 6, background: "#10B981" }}></div>Healthy</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}><div style={{ width: 12, height: 12, borderRadius: 6, background: "#3B82F6" }}></div>Existing Restoration</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}><div style={{ width: 12, height: 12, borderRadius: 6, background: "#EF4444" }}></div>Proposed Treatment</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}><div style={{ width: 12, height: 12, borderRadius: 6, background: "#F59E0B" }}></div>Watch</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}><div style={{ width: 12, height: 12, borderRadius: 6, background: "#9CA3AF" }}></div>Missing</div>
                            </div>
                            
                            {/* Selected popup */}
                            {selectedTooth && (
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: GEO_WHITE, borderRadius: 16, padding: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.15)", border: "1px solid #E5E7EB", width: 260, zIndex: 10 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                        <div style={{ fontSize: 18, fontWeight: 700 }}>Tooth #{selectedTooth.number}</div>
                                        <button onClick={() => setSelectedTooth(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
                                    </div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8 }}>Condition</div>
                                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{selectedTooth.condition}</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8 }}>Status</div>
                                    <select value={selectedTooth.status} onChange={(e) => {
                                        const newData = [...toothData];
                                        const idx = newData.findIndex(t => t.number === selectedTooth.number);
                                        newData[idx].status = e.target.value;
                                        setToothData(newData);
                                        setSelectedTooth(newData[idx]);
                                    }} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }}>
                                        <option value="Healthy">Healthy</option>
                                        <option value="Existing Restoration">Existing Restoration</option>
                                        <option value="Proposed Treatment">Proposed Treatment</option>
                                        <option value="Watch">Watch</option>
                                        <option value="Missing">Missing</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                            {/* Perio Chart Grid */}
                            <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", background: GEO_BG, padding: "12px 16px", borderRadius: 12 }}>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>Periodontal Pocket Depths</div>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}><span style={{ color: "#10B981", fontWeight: 700 }}>1-3mm</span> Healthy</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}><span style={{ color: "#F59E0B", fontWeight: 700 }}>4-5mm</span> Watch</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}><span style={{ color: "#EF4444", fontWeight: 700 }}>6mm+</span> Concern</div>
                                </div>
                            </div>
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "center" }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: "left", fontWeight: 600, padding: 8 }}>Facial</td>
                                            {upperArch.map(t => (
                                                <td key={t.number} style={{ padding: 4, border: "1px solid #E5E7EB" }}>
                                                    <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                                        <div style={{ width: 12, color: [2,3,14].includes(t.number) ? "#F59E0B" : "#10B981" }}>{[2,3,14].includes(t.number) ? "4" : "2"}</div>
                                                        <div style={{ width: 12, color: t.number===14 ? "#EF4444" : "#10B981" }}>{t.number===14 ? "6" : "3"}</div>
                                                        <div style={{ width: 12, color: "#10B981" }}>2</div>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: "left", fontWeight: 600, padding: 8 }}>Tooth</td>
                                            {upperArch.map(t => <td key={t.number} style={{ padding: 4, background: GEO_BG, fontWeight: 600 }}>{t.number}</td>)}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Trend Line Chart */}
                            <div style={{ height: 200, marginTop: "auto" }}>
                                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Historical Trend (Average Depth)</div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[{date: "Jan 2024", avg: 2.8}, {date: "Jul 2024", avg: 3.1}, {date: "Jan 2025", avg: 3.4}, {date: "Today", avg: 3.8}]}>
                                        <XAxis dataKey="date" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                        <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="avg" stroke={GEO_GREEN} fill="#E8F5E9" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: AI Tools */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Dictation */}
                    <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Sparkles size={18} color={GEO_GREEN} />
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>AI Dictation</h3>
                        </div>
                        <div style={{ background: GEO_BG, borderRadius: 16, padding: 20, minHeight: 120, fontSize: 15, border: "1px solid #E5E7EB", marginBottom: 16, position: "relative" }}>
                            {generating ? (
                                <div style={{ color: GEO_TEXT_MAIN, fontFamily: "monospace" }}>{dictation}<span className="blink">|</span></div>
                            ) : (
                                dictation ? <div style={{ color: GEO_TEXT_MAIN }}>{dictation}</div> : <div style={{ color: GEO_TEXT_MUTED }}>Tap microphone to dictate clinical findings...</div>
                            )}
                            {generating && <div style={{ position: "absolute", bottom: 16, right: 16 }}><Loader2 size={20} className="lucide-spin" style={{ animation: "spin 2s linear infinite" }} color={GEO_GREEN} /></div>}
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button onClick={handleSimulateDictation} style={{ flex: 1, padding: "12px", background: GEO_BLACK, color: GEO_WHITE, borderRadius: GEO_PILL, border: "none", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
                                <Mic size={16} /> Start Dictation
                            </button>
                            <button style={{ flex: 1, padding: "12px", background: GEO_WHITE, color: GEO_GREEN, border: `1px solid ${GEO_GREEN}`, borderRadius: GEO_PILL, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
                                <Printer size={16} /> Treatment Plan
                            </button>
                        </div>
                    </div>

                    {/* AI Diagnostic Assist */}
                    <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Eye size={18} color={GEO_GREEN} />
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>AI Diagnostic Assist</h3>
                        </div>
                        <div style={{ position: "relative", width: "100%", height: 160, background: "#111", borderRadius: 16, overflow: "hidden", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src="https://images.unsplash.com/photo-1579543169004-cb722108518c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="X-Ray placeholder" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6, filter: "grayscale(100%) contrast(1.2)" }} />
                            
                            {xrayAnalyzed && (
                                <>
                                    <div style={{ position: "absolute", top: "30%", left: "20%", width: 24, height: 24, borderRadius: 12, border: "2px solid #F59E0B", color: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.8)" }}>1</div>
                                    <div style={{ position: "absolute", top: "45%", left: "65%", width: 24, height: 24, borderRadius: 12, border: "2px solid #EF4444", color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.8)" }}>2</div>
                                    <div style={{ position: "absolute", bottom: "20%", left: "50%", width: 24, height: 24, borderRadius: 12, border: "2px solid #F59E0B", color: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.8)" }}>3</div>
                                </>
                            )}

                            {!xrayAnalyzed && !analyzingXray && (
                                <button onClick={handleAnalyzeXray} style={{ position: "absolute", background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "10px 20px", borderRadius: GEO_PILL, backdropFilter: "blur(4px)", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                                    <Sparkles size={16} color={GEO_GREEN} /> Analyze X-Ray
                                </button>
                            )}
                            {analyzingXray && (
                                <div style={{ position: "absolute", color: "white", display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                                    <Loader2 size={20} style={{ animation: "spin 2s linear infinite" }} /> Scanning...
                                </div>
                            )}
                        </div>

                        {xrayAnalyzed && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, overflowY: "auto" }}>
                                <div style={{ display: "flex", gap: 12, fontSize: 13, background: GEO_BG, padding: "10px 12px", borderRadius: 8, alignItems: "center" }}>
                                    <div style={{ width: 20, height: 20, borderRadius: 10, background: "#F59E0B", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>1</div>
                                    <div style={{ flex: 1 }}><strong>Tooth #3</strong> — Possible periapical radiolucency</div>
                                    <div style={{ fontWeight: 700, color: GEO_GREEN }}>72%</div>
                                </div>
                                <div style={{ display: "flex", gap: 12, fontSize: 13, background: GEO_BG, padding: "10px 12px", borderRadius: 8, alignItems: "center" }}>
                                    <div style={{ width: 20, height: 20, borderRadius: 10, background: "#EF4444", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>2</div>
                                    <div style={{ flex: 1 }}><strong>Tooth #14</strong> — Interproximal caries suspected</div>
                                    <div style={{ fontWeight: 700, color: GEO_GREEN }}>85%</div>
                                </div>
                                <div style={{ display: "flex", gap: 12, fontSize: 13, background: GEO_BG, padding: "10px 12px", borderRadius: 8, alignItems: "center" }}>
                                    <div style={{ width: 20, height: 20, borderRadius: 10, background: "#F59E0B", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>3</div>
                                    <div style={{ flex: 1 }}>Bone loss pattern — Moderate generalized</div>
                                    <div style={{ fontWeight: 700, color: GEO_GREEN }}>68%</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                .blink { animation: blinker 1s linear infinite; }
                @keyframes blinker { 50% { opacity: 0; } }
            `}</style>
        </div>
    );
}

export function CommunicationsHubPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [activeTab, setActiveTab] = useState("inbox");
    
    return (
        <div style={{ padding: "20px 40px", height: "100%", display: "flex", flexDirection: "column" }}>
            <TopGreetingUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Patient Communication Hub." />
            
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: "32px 32px 0 32px", boxShadow: GEO_SHADOW, marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 32, borderBottom: `1px solid #E5E7EB` }}>
                    <div onClick={() => setActiveTab("inbox")} style={{ paddingBottom: 16, cursor: "pointer", fontWeight: 600, color: activeTab === "inbox" ? GEO_GREEN : GEO_TEXT_MUTED, borderBottom: activeTab === "inbox" ? `3px solid ${GEO_GREEN}` : "3px solid transparent", transition: "all 0.2s" }}>Inbox</div>
                    <div onClick={() => setActiveTab("campaigns")} style={{ paddingBottom: 16, cursor: "pointer", fontWeight: 600, color: activeTab === "campaigns" ? GEO_GREEN : GEO_TEXT_MUTED, borderBottom: activeTab === "campaigns" ? `3px solid ${GEO_GREEN}` : "3px solid transparent", transition: "all 0.2s" }}>Automated Campaigns</div>
                    <div onClick={() => setActiveTab("noshow")} style={{ paddingBottom: 16, cursor: "pointer", fontWeight: 600, color: activeTab === "noshow" ? GEO_GREEN : GEO_TEXT_MUTED, borderBottom: activeTab === "noshow" ? `3px solid ${GEO_GREEN}` : "3px solid transparent", transition: "all 0.2s" }}>No-Show Prevention</div>
                </div>
            </div>

            <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
                {activeTab === "inbox" && (
                    <div style={{ display: "flex", gap: 24, width: "100%", height: "100%" }}>
                        {/* Threads */}
                        <div style={{ width: 320, background: GEO_WHITE, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                            <div style={{ padding: 20, borderBottom: "1px solid #E5E7EB", fontWeight: 700, fontSize: 18 }}>Recent Messages</div>
                            <div style={{ overflowY: "auto", flex: 1 }}>
                                {/* Thread 1 */}
                                <div style={{ padding: 16, borderBottom: "1px solid #F1F5F9", background: GEO_BG, cursor: "pointer" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                        <div style={{ fontWeight: 600, fontSize: 15 }}>James Okafor</div>
                                        <div style={{ fontSize: 12, color: GEO_TEXT_MUTED }}>10m ago</div>
                                    </div>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MAIN, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>I'm having some pain where the tooth was pulled.</div>
                                    <div style={{ marginTop: 8, display: "inline-block", background: "#FEE2E2", color: "#EF4444", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>AI Flag: Clinical Concern</div>
                                </div>
                                {/* Thread 2 */}
                                <div style={{ padding: 16, borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                        <div style={{ fontWeight: 600, fontSize: 15 }}>Linda Tran</div>
                                        <div style={{ fontSize: 12, color: GEO_TEXT_MUTED }}>1h ago</div>
                                    </div>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Can we reschedule my cleaning to next Tuesday?</div>
                                </div>
                                {/* Thread 3 */}
                                <div style={{ padding: 16, borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                        <div style={{ fontWeight: 600, fontSize: 15 }}>Marcus Rivera</div>
                                        <div style={{ fontSize: 12, color: GEO_TEXT_MUTED }}>Yesterday</div>
                                    </div>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>I have a question about my bill.</div>
                                </div>
                            </div>
                        </div>
                        {/* Chat */}
                        <div style={{ flex: 1, background: GEO_WHITE, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column" }}>
                            <div style={{ padding: 20, borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 18 }}>James Okafor</div>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MUTED }}>SMS / Mobile</div>
                                </div>
                            </div>
                            <div style={{ padding: 20, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ alignSelf: "center", fontSize: 12, color: GEO_TEXT_MUTED, marginBottom: 16 }}>Today, 9:20 AM</div>
                                <div style={{ alignSelf: "flex-end", background: GEO_BLACK, color: "white", padding: "12px 16px", borderRadius: "16px 16px 4px 16px", fontSize: 14 }}>
                                    Hi James, following up on your extraction yesterday. How are you feeling today?
                                </div>
                                <div style={{ alignSelf: "flex-start", background: GEO_BG, color: GEO_TEXT_MAIN, padding: "12px 16px", borderRadius: "16px 16px 16px 4px", fontSize: 14 }}>
                                    I'm having some pain where the tooth was pulled. Also tastes a bit metallic.
                                </div>
                                <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: 16, display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
                                    <AlertTriangle color="#EF4444" size={24} />
                                    <div>
                                        <div style={{ fontWeight: 700, color: "#EF4444", fontSize: 14 }}>AI Flagged: Possible Clinical Concern</div>
                                        <div style={{ fontSize: 13, color: "#B91C1C" }}>Keywords "pain", "tastes metallic" suggest possible dry socket or infection. Recommend callback.</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: 20, borderTop: "1px solid #E5E7EB" }}>
                                <button style={{ background: "#E8F5E9", color: GEO_GREEN, border: "none", padding: "10px 16px", borderRadius: GEO_PILL, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <Sparkles size={14} /> Reply with AI Draft
                                </button>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: "12px 16px", borderRadius: 20, border: "1px solid #E5E7EB", outline: "none", fontSize: 14 }} />
                                    <button style={{ background: GEO_BLACK, color: "white", border: "none", padding: "0 20px", borderRadius: 20, fontWeight: 600, cursor: "pointer" }}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === "campaigns" && (
                    <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, width: "100%", overflowY: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Active Campaigns</h2>
                            <button style={{ background: GEO_BLACK, color: "white", border: "none", padding: "10px 20px", borderRadius: GEO_PILL, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                <Sparkles size={16} /> New AI Campaign
                            </button>
                        </div>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
                                    <th style={{ padding: "16px 8px", fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Campaign</th>
                                    <th style={{ padding: "16px 8px", fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Trigger</th>
                                    <th style={{ padding: "16px 8px", fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Channel</th>
                                    <th style={{ padding: "16px 8px", fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Enrolled</th>
                                    <th style={{ padding: "16px 8px", fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Open Rate</th>
                                    <th style={{ padding: "16px 8px", fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "2-Day Appt Reminder", trigger: "48h before", channel: "SMS + Email", count: 142, rate: "94%" },
                                    { name: "Post-Visit Follow-Up", trigger: "24h after", channel: "SMS", count: 85, rate: "88%" },
                                    { name: "Overdue Recall (6mo)", trigger: "6 months past", channel: "Email", count: 312, rate: "41%" },
                                    { name: "Unscheduled Treatment Nudge", trigger: "List match", channel: "SMS + Email", count: 48, rate: "56%" }
                                ].map((c, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                                        <td style={{ padding: "16px 8px", fontWeight: 600, fontSize: 14 }}>{c.name}</td>
                                        <td style={{ padding: "16px 8px", fontSize: 14 }}>{c.trigger}</td>
                                        <td style={{ padding: "16px 8px", fontSize: 14 }}>{c.channel}</td>
                                        <td style={{ padding: "16px 8px", fontSize: 14, fontWeight: 600 }}>{c.count}</td>
                                        <td style={{ padding: "16px 8px", fontSize: 14, color: GEO_GREEN, fontWeight: 600 }}>{c.rate}</td>
                                        <td style={{ padding: "16px 8px" }}>
                                            <div style={{ width: 44, height: 24, borderRadius: 12, background: GEO_GREEN, position: "relative", cursor: "pointer" }}>
                                                <div style={{ width: 20, height: 20, borderRadius: 10, background: "white", position: "absolute", top: 2, right: 2 }}></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "noshow" && (
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: GEO_SHADOW, display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 24, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <CalendarCheck size={24} color={GEO_GREEN} />
                            </div>
                            <div>
                                <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, fontWeight: 600 }}>No-Show Reduction</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>AI has reduced no-shows by 34% this month.</div>
                            </div>
                        </div>

                        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, flex: 1, overflowY: "auto" }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 24px 0" }}>Tomorrow's Risk Forecast</h2>
                            {[
                                { name: "Robert Kim", time: "2:00 PM", proc: "Crown Prep", risk: "78%", color: "#EF4444", factor: "Missed last 2 reminders" },
                                { name: "Emily Watson", time: "9:30 AM", proc: "Hygiene", risk: "45%", color: "#F59E0B", factor: "History of same-day cancellations" },
                                { name: "David Patel", time: "11:00 AM", proc: "SRP", risk: "12%", color: "#10B981", factor: "Completed forms, confirmed" }
                            ].map((r, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 20, background: GEO_BG, borderRadius: 16, marginBottom: 16 }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                            <div style={{ fontWeight: 700, fontSize: 16 }}>{r.name}</div>
                                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED }}>{r.time} • {r.proc}</div>
                                        </div>
                                        <div style={{ fontSize: 13, color: GEO_TEXT_MAIN, display: "flex", alignItems: "center", gap: 6 }}>
                                            <AlertTriangle size={14} color={r.color} /> {r.factor}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right", marginRight: 24 }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 4 }}>Risk Score</div>
                                        <div style={{ fontSize: 18, fontWeight: 700, color: r.color }}>{r.risk}</div>
                                    </div>
                                    <button style={{ background: GEO_WHITE, border: `1px solid ${GEO_GREEN}`, color: GEO_GREEN, padding: "10px 16px", borderRadius: GEO_PILL, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                        <Sparkles size={14} /> Send Risk-Based Reminder
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

