// Geovea UI2 Extra Pages

export function SchedulerPageUI2({ currentUI, setUI, SCHEDULE_DATA }) {
    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Smart Scheduler</h2>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button style={{ display: "flex", alignItems: "center", gap: 8, background: GEO_BLACK, color: GEO_WHITE, border: "none", padding: "10px 20px", borderRadius: GEO_PILL, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                            <Filter size={16} /> Filters
                        </button>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    <div style={{ flex: 1, background: GEO_WHITE, borderRadius: 16, border: `1px solid #E5E7EB`, overflow: "hidden" }}>
                        <div style={{ display: "flex", background: GEO_BG, borderBottom: `1px solid #E5E7EB` }}>
                            <div style={{ width: 60, borderRight: `1px solid #E5E7EB` }}></div>
                            {SCHEDULE_DATA.providers.map((p, i) => (
                                <div key={p} style={{ flex: 1, padding: "16px", textAlign: "center", fontWeight: 600, fontSize: 14, color: GEO_TEXT_MAIN, borderRight: i === 0 ? `1px solid #E5E7EB` : "none" }}>{p}</div>
                            ))}
                        </div>

                        <div style={{ height: "600px", overflowY: "auto", position: "relative" }}>
                            {SCHEDULE_DATA.hours.map((hour, idx) => (
                                <div key={hour} style={{ display: "flex", height: "60px", borderBottom: `1px solid #F3F4F6` }}>
                                    <div style={{ width: 60, padding: "8px", fontSize: 11, color: GEO_TEXT_MUTED, textAlign: "right", borderRight: `1px solid #E5E7EB`, fontWeight: 500 }}>
                                        {hour}
                                    </div>
                                    <div style={{ flex: 1, borderRight: `1px solid #E5E7EB` }}></div>
                                    <div style={{ flex: 1 }}></div>
                                </div>
                            ))}

                            {SCHEDULE_DATA.appointments.map((apt, i) => (
                                <div key={i} style={{
                                    position: "absolute",
                                    top: `${apt.start * 60}px`,
                                    left: `calc(60px + ${apt.provider * 50}%)`,
                                    width: "calc(50% - 60px)",
                                    height: `${apt.duration * 60 - 4}px`,
                                    background: apt.color === "#28a78d" ? "#E8F5E9" : apt.color === "#f39c12" ? "#FFF3E0" : `${apt.color}15`,
                                    borderLeft: `4px solid ${apt.color === "#28a78d" ? GEO_GREEN : apt.color}`,
                                    borderRadius: 6,
                                    margin: "2px 8px",
                                    padding: "8px 12px",
                                    display: "flex", flexDirection: "column",
                                    overflow: "hidden"
                                }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: GEO_TEXT_MAIN, whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{apt.patient}</span>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: apt.color === "#28a78d" ? GEO_GREEN : apt.color }}>{apt.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ width: 320, background: "linear-gradient(135deg, #E8F5E9 0%, #F0FDF4 100%)", borderRadius: 16, padding: 24, border: `1px solid rgba(0, 182, 122, 0.2)` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 18, background: GEO_GREEN, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0, 182, 122, 0.3)" }}>
                                <Activity size={18} color="white" />
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: GEO_GREEN, margin: 0 }}>AI Gap Detection</h3>
                        </div>
                        <p style={{ fontSize: 14, color: GEO_TEXT_MAIN, marginBottom: 24, lineHeight: 1.5, fontWeight: 500 }}>Intelident found 2 opportunities to optimize today's schedule based on live waitlists and overdue recalls.</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {SCHEDULE_DATA.gaps.map((gap, i) => (
                                <div key={i} style={{ background: "white", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                                        <Clock size={12} /> {gap.time} · {SCHEDULE_DATA.providers[gap.provider]}
                                    </div>
                                    <div style={{ fontSize: 14, color: GEO_TEXT_MAIN, marginBottom: 16, lineHeight: 1.4, fontWeight: 500 }}>{gap.suggestion}</div>
                                    <button style={{ width: "100%", padding: "10px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}>Fix Schedule Gap</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function VoiceAgentPageUI2({ currentUI, setUI }) {
    const [callActive, setCallActive] = React.useState(false);
    const [transcript, setTranscript] = React.useState([]);

    const fullTranscript = [
        { speaker: "ai", text: "Thank you for calling Smile Dental Group. This is Ava, your AI scheduling assistant. How can I help you today?" },
        { speaker: "patient", text: "Hi, I'd like to schedule a cleaning appointment." },
        { speaker: "ai", text: "I'd be happy to help you schedule a cleaning! Can I get your name, please?" },
        { speaker: "patient", text: "Sure, it's Sarah Chen." },
        { speaker: "ai", text: "Welcome back, Sarah! I can see you're due for your 6-month hygiene visit. I have an opening on Wednesday, March 4th at 9:00 AM with hygienist Martinez. Does that work?" },
        { speaker: "patient", text: "Wednesday at 9 sounds perfect." },
        { speaker: "ai", text: "Wonderful! I've scheduled you for Wednesday at 9:00 AM. I've also verified your Delta Dental PPO is active. You'll receive a confirmation text shortly." }
    ];

    const handleStartCall = () => {
        setCallActive(true);
        setTranscript([]);
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullTranscript.length) {
                setTranscript(prev => [...prev, fullTranscript[i]]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setCallActive(false), 2000);
            }
        }, 2000);
    };

    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Voice Agent Insights</h2>
                        <p style={{ color: GEO_TEXT_MUTED, margin: "4px 0 0 0", fontSize: 14 }}>Live call monitoring and AI resolution analytics</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
                    <div style={{ flex: 1, background: GEO_BG, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                            <PhoneCall size={24} color={GEO_TEXT_MAIN} />
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Calls This Month</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>847</div>
                        </div>
                    </div>
                    <div style={{ flex: 1, background: "#E8F5E9", borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16, border: "1px solid rgba(0, 182, 122, 0.2)" }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                            <Activity size={24} color={GEO_GREEN} />
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: GEO_GREEN, fontWeight: 600 }}>AI Resolved</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: GEO_GREEN }}>94%</div>
                        </div>
                    </div>
                    <div style={{ flex: 1, background: GEO_BG, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                            <Clock size={24} color={GEO_TEXT_MAIN} />
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Avg Duration</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>2.3m</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>
                    <div style={{ background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, display: "flex", flexDirection: "column", height: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid #F3F4F6` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: callActive ? "#EF4444" : "#D1D5DB", animation: callActive ? "pulse 2s infinite" : "none" }} />
                                <span style={{ fontSize: 16, fontWeight: 600, color: GEO_TEXT_MAIN, fontFamily: "monospace" }}>+1 (555) 019-8372</span>
                            </div>
                            <div>
                                {!callActive ? (
                                    <button onClick={handleStartCall} style={{ padding: "10px 20px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Play size={14} fill="currentColor" /> Start Call</button>
                                ) : (
                                    <button onClick={() => setCallActive(false)} style={{ padding: "10px 20px", borderRadius: GEO_PILL, border: "none", background: "#EF4444", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Square size={14} fill="currentColor" /> End Call</button>
                                )}
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingRight: 8 }}>
                            {transcript.length === 0 && !callActive && (
                                <div style={{ margin: "auto", textAlign: "center", color: GEO_TEXT_MUTED, fontSize: 14 }}>Press "Start Call" to simulate an incoming AI voice interaction.</div>
                            )}
                            {transcript.map((msg, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.speaker === "ai" ? "flex-start" : "flex-end", maxWidth: "80%", alignSelf: msg.speaker === "ai" ? "flex-start" : "flex-end" }}>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 4, textTransform: "uppercase" }}>{msg.speaker === "ai" ? "Ava (AI)" : "Patient"}</div>
                                    <div style={{ padding: "16px 20px", borderRadius: 20, borderBottomLeftRadius: msg.speaker === "ai" ? 4 : 20, borderBottomRightRadius: msg.speaker === "patient" ? 4 : 20, background: msg.speaker === "ai" ? GEO_BG : "#E8F5E9", color: msg.speaker === "ai" ? GEO_TEXT_MAIN : GEO_GREEN, fontSize: 15, lineHeight: 1.5, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 20px 0" }}>AI Actions Performed</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: transcript.length > 2 ? "#E8F5E9" : GEO_BG, borderRadius: 12, color: transcript.length > 2 ? GEO_GREEN : GEO_TEXT_MUTED, fontWeight: 600, fontSize: 14, transition: "all 0.3s" }}>
                                    <CheckCircle size={18} /> Patient Identified
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: transcript.length > 5 ? "#E8F5E9" : GEO_BG, borderRadius: 12, color: transcript.length > 5 ? GEO_GREEN : GEO_TEXT_MUTED, fontWeight: 600, fontSize: 14, transition: "all 0.3s" }}>
                                    <Calendar size={18} /> Appointment Booked
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: transcript.length > 6 ? "#E8F5E9" : GEO_BG, borderRadius: 12, color: transcript.length > 6 ? GEO_GREEN : GEO_TEXT_MUTED, fontWeight: 600, fontSize: 14, transition: "all 0.3s" }}>
                                    <Shield size={18} /> Insurance Verified
                                </div>
                            </div>
                        </div>

                        <div style={{ background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 20px 0" }}>Connect Methods</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ border: `1px solid #E5E7EB`, borderRadius: 12, padding: 16 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8, textTransform: "uppercase" }}>Phone Number Forwarding</div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: 16, fontWeight: 700, color: GEO_BLACK }}>+1-800-SMILAI</span>
                                        <button style={{ background: "none", border: "none", cursor: "pointer", color: GEO_TEXT_MUTED }}><Copy size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AnalyticsPageUI2({ currentUI, setUI }) {
    const MIX = [
        { name: "Preventive", value: 35, color: "#1C1E23" },
        { name: "Restorative", value: 28, color: "#00B67A" },
        { name: "Endodontic", value: 15, color: "#FFD100" },
        { name: "Prosthetic", value: 12, color: "#FF9800" },
        { name: "Surgical", value: 10, color: "#EF4444" },
    ];

    const PROS = [
        { name: "Dr. Cifor", prod: 18200 }, { name: "Dr. Park", prod: 15800 },
        { name: "RDH Martinez", prod: 8400 }, { name: "RDH Lee", prod: 7600 }
    ];

    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Practice Analytics</h2>
                        <p style={{ color: GEO_TEXT_MUTED, margin: "4px 0 0 0", fontSize: 14 }}>Production tracking and AI-surfaced opportunities</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
                    <div style={{ flex: 1, background: GEO_BG, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                            <Wallet size={24} color={GEO_TEXT_MAIN} />
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Monthly Production</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>$49,800</div>
                        </div>
                    </div>
                    <div style={{ flex: 1, background: GEO_BG, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                            <CheckCircle size={24} color={GEO_GREEN} />
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Treatment Acceptance</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>73%</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                    <div style={{ background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB` }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 24px 0" }}>Provider Production</h3>
                        <div style={{ height: 280 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PROS} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                    <XAxis type="number" tick={{ fontSize: 12, fill: GEO_TEXT_MUTED }} axisLine={false} tickLine={false} />
                                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: GEO_TEXT_MAIN, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: GEO_BG }} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontWeight: 600 }} />
                                    <Bar dataKey="prod" fill={GEO_GREEN} radius={[0, 6, 6, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div style={{ background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, display: "flex", flexDirection: "column" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 0 0" }}>Procedure Mix</h3>
                        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                            <ResponsiveContainer width="50%" height="100%">
                                <PieChart>
                                    <Pie data={MIX} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value">
                                        {MIX.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontWeight: 600 }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ flex: 1, paddingLeft: 20 }}>
                                {MIX.map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 14, height: 14, borderRadius: "50%", background: item.color }} />
                                            <span style={{ fontSize: 15, color: GEO_TEXT_MAIN, fontWeight: 500 }}>{item.name}</span>
                                        </div>
                                        <span style={{ fontSize: 15, fontWeight: 700, color: GEO_TEXT_MAIN }}>{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FormBuilderPageUI2({ currentUI, setUI }) {
    const [previewMode, setPreviewMode] = React.useState(false);
    const [fields, setFields] = React.useState([
        { id: 1, type: "Text", label: "Full Name", icon: Type },
        { id: 2, type: "Date", label: "Date of Birth", icon: CalendarDays },
        { id: 3, type: "Phone", label: "Phone Number", icon: Phone },
        { id: 4, type: "Email", label: "Email Address", icon: Mail },
        { id: 5, type: "Textarea", label: "Chief Complaint", icon: AlignLeft },
        { id: 6, type: "Checkbox", label: "Known Allergies", icon: ListChecks },
    ]);

    const templates = [
        { name: "New Patient Intake (Current)", fields: 24, submissions: 142 },
        { name: "Medical History Update", fields: 18, submissions: 89 },
        { name: "HIPAA Privacy Consent", fields: 6, submissions: 210 },
    ];

    const palette = [
        { type: "Text", icon: Type }, { type: "Number", icon: Hash }, { type: "Date", icon: CalendarDays },
        { type: "Email", icon: Mail }, { type: "Phone", icon: Phone }, { type: "Textarea", icon: AlignLeft },
        { type: "Checkbox", icon: ListChecks }, { type: "Radio", icon: CircleDot }, { type: "Signature", icon: Edit3 }
    ];

    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patient Forms</h2>
                        <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>Drag and drop builder for digital patient intake</div>
                    </div>
                    <div style={{ display: "flex", background: GEO_BG, borderRadius: GEO_PILL, padding: 4, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}>
                        <button onClick={() => setPreviewMode(false)} style={{ padding: "10px 24px", borderRadius: GEO_PILL, border: "none", background: !previewMode ? GEO_WHITE : "transparent", color: !previewMode ? GEO_BLACK : GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: !previewMode ? "0 2px 8px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}>Editor</button>
                        <button onClick={() => setPreviewMode(true)} style={{ padding: "10px 24px", borderRadius: GEO_PILL, border: "none", background: previewMode ? GEO_BLACK : "transparent", color: previewMode ? GEO_WHITE : GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>Preview</button>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    {/* Left: Templates */}
                    <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: GEO_TEXT_MAIN, paddingLeft: 8 }}>Library</div>
                        {templates.map((t, i) => (
                            <div key={i} style={{ background: GEO_WHITE, borderRadius: 16, padding: 16, border: `1px solid #E5E7EB`, cursor: "pointer", borderLeft: i === 0 ? `4px solid ${GEO_BLACK}` : `1px solid #E5E7EB`, boxShadow: i === 0 ? "0 4px 12px rgba(0,0,0,0.02)" : "none" }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 8 }}>{t.name}</div>
                                <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
                                    <span>{t.fields} fields</span>
                                    <span>{t.submissions} submissions</span>
                                </div>
                            </div>
                        ))}
                        <button style={{ padding: "14px", borderRadius: 16, border: `2px dashed #E5E7EB`, background: "transparent", color: GEO_TEXT_MAIN, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Plus size={16} /> New Blank Form</button>
                    </div>

                    {/* Center: Canvas */}
                    <div style={{ flex: 1, background: GEO_WHITE, borderRadius: 16, padding: 40, border: `1px solid #E5E7EB`, minHeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                        <div style={{ background: "#FFF5F0", padding: "16px 20px", borderRadius: 12, marginBottom: 32, display: "flex", alignItems: "center", gap: 12, border: "1px solid #FFEDD5" }}>
                            <Sparkles size={20} color="#EA580C" />
                            <span style={{ fontSize: 14, color: "#EA580C", fontWeight: 600 }}>Describe your form in plain English and AI will auto-build it!</span>
                        </div>

                        <h1 style={{ fontSize: 26, fontWeight: 700, color: GEO_TEXT_MAIN, textAlign: "center", marginBottom: 32 }}>New Patient Intake</h1>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {fields.map((field, i) => (
                                !previewMode ? (
                                    <div key={field.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", border: `1px solid #E5E7EB`, borderRadius: 12, background: GEO_BG }}>
                                        <GripVertical size={16} color={GEO_TEXT_MUTED} style={{ cursor: "grab" }} />
                                        <div style={{ width: 44, height: 44, background: GEO_WHITE, borderRadius: 12, border: `1px solid #E5E7EB`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                                            <field.icon size={20} color={GEO_TEXT_MAIN} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 4 }}>{field.label}</div>
                                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 500 }}>{field.type} Field</div>
                                        </div>
                                        <div style={{ display: "flex", gap: 12 }}>
                                            <button style={{ background: "none", border: "none", cursor: "pointer", color: GEO_TEXT_MUTED }}><Edit3 size={18} /></button>
                                            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={field.id} style={{ marginBottom: 20 }}>
                                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 8 }}>{field.label}</label>
                                        {field.type === "Textarea" ? (
                                            <textarea rows={3} style={{ width: "100%", padding: "14px", borderRadius: 12, border: `1px solid #E5E7EB`, boxSizing: "border-box", background: GEO_BG, fontSize: 15, outline: "none" }} />
                                        ) : field.type === "Checkbox" ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><input type="checkbox" style={{ width: 18, height: 18 }} /> <span style={{ fontSize: 15, color: GEO_TEXT_MAIN, fontWeight: 500 }}>Yes, I confirm</span></div>
                                        ) : (
                                            <input type="text" placeholder={`Enter ${field.label.toLowerCase()}...`} style={{ width: "100%", padding: "14px", borderRadius: 12, border: `1px solid #E5E7EB`, boxSizing: "border-box", background: GEO_BG, fontSize: 15, outline: "none" }} />
                                        )}
                                    </div>
                                )
                            ))}
                        </div>

                        {!previewMode && (
                            <div style={{ marginTop: 24, textAlign: "center" }}>
                                <button style={{ padding: "14px 28px", borderRadius: GEO_PILL, border: `2px dashed #E5E7EB`, background: "transparent", color: GEO_TEXT_MUTED, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}><Plus size={18} /> Add Field</button>
                            </div>
                        )}
                        {previewMode && (
                            <button style={{ width: "100%", marginTop: 32, padding: "16px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: GEO_WHITE, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Submit Intake Form</button>
                        )}
                    </div>

                    {/* Right: Palette */}
                    {!previewMode && (
                        <div style={{ width: 280, background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: GEO_TEXT_MAIN, marginBottom: 16 }}>Form Elements</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {palette.map(p => (
                                    <div key={p.type} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "16px 8px", background: GEO_BG, border: `1px solid transparent`, borderRadius: 12, cursor: "grab", transition: "all 0.2s" }}>
                                        <p.icon size={22} color={GEO_TEXT_MAIN} />
                                        <span style={{ fontSize: 12, fontWeight: 600, color: GEO_TEXT_MAIN }}>{p.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function SettingsPageUI2({ currentUI, setUI }) {
    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 60, boxShadow: GEO_SHADOW, textAlign: "center" }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 16 }}>System Settings</h2>
                <p style={{ fontSize: 16, color: GEO_TEXT_MUTED, maxWidth: 400, margin: "0 auto" }}>Settings controls (Practice Info, Billing, User Roles) will be populated here.</p>
            </div>
        </div>
    );
}

export function IntegrationsPageUI2({ currentUI, setUI }) {
    const APPS = [
        { name: "Dexis Imaging", cat: "Imaging", status: "connected", icon: "🔬", desc: "Intraoral sensors and panoramic imaging" },
        { name: "Carestream", cat: "Imaging", status: "connected", icon: "📷", desc: "CBCT and 2D imaging systems" },
    ];

    const AVAIL = [
        { name: "Google Business", cat: "Marketing", status: "available", icon: "⭐", desc: "Review management and booking" },
        { name: "Pearl AI", cat: "AI/Imaging", status: "available", icon: "🧠", desc: "Second-opinion pathology detection" },
    ];

    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Integrations & API</h2>
                        <p style={{ color: GEO_TEXT_MUTED, margin: "4px 0 0 0", fontSize: 14 }}>Connect Intelident to your existing practice software</p>
                    </div>
                </div>

                <div style={{ background: GEO_BG, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, marginBottom: 32 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 16px 0" }}>Developer API Key</h3>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ flex: 1, background: GEO_WHITE, padding: "16px 20px", borderRadius: 12, border: `1px solid #E5E7EB`, fontFamily: "monospace", fontSize: 15, color: GEO_TEXT_MAIN, letterSpacing: 1, fontWeight: 500, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}>
                            sk_live_intl_******************************q9P
                        </div>
                        <button style={{ padding: "16px 28px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}><Copy size={18} /> Copy</button>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <div style={{ background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 20px 0" }}>Connected Integrations</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {APPS.map((app, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: i < APPS.length - 1 ? `1px solid #F3F4F6` : "none" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: GEO_BG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                                        {app.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                            <span style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{app.name}</span>
                                            <span style={{ background: GEO_BG, color: GEO_TEXT_MUTED, fontSize: 11, fontWeight: 600, padding: "4px 8px", borderRadius: 6, textTransform: "uppercase" }}>{app.cat}</span>
                                        </div>
                                        <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 500 }}>{app.desc}</div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: GEO_GREEN }}>
                                        <CheckCircle size={16} /> Connected
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 20px 0" }}>Available Add-ons</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {AVAIL.map((app, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: i < AVAIL.length - 1 ? `1px solid #F3F4F6` : "none" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: GEO_BG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                                        {app.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 4 }}>{app.name}</div>
                                        <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontWeight: 500 }}>{app.desc}</div>
                                    </div>
                                    <button style={{ padding: "8px 20px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, fontSize: 13, fontWeight: 600, cursor: "pointer", color: GEO_TEXT_MAIN, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>Connect</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

