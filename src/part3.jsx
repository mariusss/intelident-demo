
// ═══════════════════════════════════════════
// 6. VOICE AGENT
// ═══════════════════════════════════════════
function VoiceAgentPage({ currentUI, setUI }) {
    const [callActive, setCallActive] = useState(false);
    const [transcript, setTranscript] = useState([]);

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
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <SectionHeader title="Voice Agent Insights" subtitle="Live call monitoring and AI resolution analytics" />

            {/* Stats */}
            <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
                <StatCard icon={PhoneCall} label="Calls This Month" value="847" />
                <StatCard icon={Activity} label="AI Resolved" value="94%" color={TEAL} />
                <StatCard icon={Clock} label="Avg Duration" value="2.3m" />
                <StatCard icon={Wallet} label="Staff Hours Saved" value="$12,400" color="#22c55e" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>
                {/* Call Simulator */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, display: "flex", flexDirection: "column", height: 500 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${GRAY[100]}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: callActive ? RED : GRAY[300], animation: callActive ? "pulse 2s infinite" : "none" }} />
                            <span style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], fontFamily: "monospace" }}>+1 (555) 019-8372</span>
                        </div>
                        <div>
                            {!callActive ? (
                                <button onClick={handleStartCall} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: TEAL, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Play size={14} /> Start Call</button>
                            ) : (
                                <button onClick={() => setCallActive(false)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: RED, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Square size={14} /> End Call</button>
                            )}
                        </div>
                    </div>

                    {/* Transcript Area */}
                    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingRight: 8 }}>
                        {transcript.length === 0 && !callActive && (
                            <div style={{ margin: "auto", textAlign: "center", color: GRAY[400], fontSize: 14 }}>Press "Start Call" to simulate an incoming AI voice interaction.</div>
                        )}
                        {transcript.map((msg, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.speaker === "ai" ? "flex-start" : "flex-end", maxWidth: "80%", alignSelf: msg.speaker === "ai" ? "flex-start" : "flex-end" }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: GRAY[500], marginBottom: 4, textTransform: "uppercase" }}>{msg.speaker === "ai" ? "Ava (AI)" : "Patient"}</div>
                                <div style={{ padding: "12px 16px", borderRadius: 16, borderBottomLeftRadius: msg.speaker === "ai" ? 4 : 16, borderBottomRightRadius: msg.speaker === "patient" ? 4 : 16, background: msg.speaker === "ai" ? GRAY[100] : TEAL_LIGHT, color: msg.speaker === "ai" ? GRAY[800] : TEAL, fontSize: 14, lineHeight: 1.5 }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* AI Actions */}
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>AI Actions Performed</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px", background: transcript.length > 2 ? TEAL_LIGHT : GRAY[50], borderRadius: 8, color: transcript.length > 2 ? TEAL : GRAY[400], fontWeight: 600, fontSize: 13, transition: "all 0.3s" }}>
                                <CheckCircle size={16} /> Patient Identified
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px", background: transcript.length > 5 ? TEAL_LIGHT : GRAY[50], borderRadius: 8, color: transcript.length > 5 ? TEAL : GRAY[400], fontWeight: 600, fontSize: 13, transition: "all 0.3s" }}>
                                <Calendar size={16} /> Appointment Booked
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px", background: transcript.length > 6 ? TEAL_LIGHT : GRAY[50], borderRadius: 8, color: transcript.length > 6 ? TEAL : GRAY[400], fontWeight: 600, fontSize: 13, transition: "all 0.3s" }}>
                                <Shield size={16} /> Insurance Verified
                            </div>
                        </div>
                    </div>

                    {/* Connect Methods */}
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Connect Methods</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ border: `1px solid ${GRAY[200]}`, borderRadius: 8, padding: 16 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: GRAY[500], marginBottom: 8, textTransform: "uppercase" }}>Phone Number Forwarding</div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: TEAL }}>+1-800-SMILAI</span>
                                    <button style={{ background: "none", border: "none", cursor: "pointer", color: GRAY[400] }}><Copy size={16} /></button>
                                </div>
                            </div>
                            <div style={{ border: `1px solid ${GRAY[200]}`, borderRadius: 8, padding: 16 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: GRAY[500], marginBottom: 8, textTransform: "uppercase" }}>Website Embed Snippet</div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: GRAY[800], padding: 10, borderRadius: 6 }}>
                                    <span style={{ fontSize: 12, color: "#e2e8f0", fontFamily: "monospace" }}>&lt;script src="intelident.js"&gt;</span>
                                    <button style={{ background: "none", border: "none", cursor: "pointer", color: GRAY[400] }}><Copy size={14} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════
// 7. FORM BUILDER
// ═══════════════════════════════════════════
function FormBuilderPage({ currentUI, setUI }) {
    const [previewMode, setPreviewMode] = useState(false);
    const [fields, setFields] = useState([
        { id: 1, type: "Text", label: "Full Name", icon: Type },
        { id: 2, type: "Date", label: "Date of Birth", icon: CalendarDays },
        { id: 3, type: "Phone", label: "Phone Number", icon: Phone },
        { id: 4, type: "Email", label: "Email Address", icon: Mail },
        { id: 5, type: "Textarea", label: "Chief Complaint", icon: AlignLeft },
        { id: 6, type: "Checkbox", label: "Known Allergies", icon: ListChecks },
    ]);

    // Handle missing AlignLeft icon locally specifically for this module to avoid recompiling imports
    function AlignLeft(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>; }

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
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <TopGreeting currentUI={currentUI} setUI={setUI} />
                {/* We override the top greeting right side intentionally */}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: GRAY[800], margin: "0 0 4px 0" }}>Patient Forms</h2>
                    <div style={{ fontSize: 14, color: GRAY[500] }}>Drag and drop builder for digital patient intake</div>
                </div>
                <div style={{ display: "flex", background: GRAY[200], borderRadius: 8, padding: 4 }}>
                    <button onClick={() => setPreviewMode(false)} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: !previewMode ? "white" : "transparent", color: !previewMode ? GRAY[800] : GRAY[600], fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: !previewMode ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>Editor</button>
                    <button onClick={() => setPreviewMode(true)} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: previewMode ? TEAL : "transparent", color: previewMode ? "white" : GRAY[600], fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: previewMode ? `0 1px 3px ${TEAL}80` : "none" }}>Preview</button>
                </div>
            </div>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

                {/* Left: Templates */}
                <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800] }}>Library</div>
                    {templates.map((t, i) => (
                        <div key={i} style={{ background: "white", borderRadius: 12, padding: 16, border: `1px solid ${GRAY[200]}`, cursor: "pointer", borderLeft: i === 0 ? `4px solid ${TEAL}` : `1px solid ${GRAY[200]}` }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800], marginBottom: 8 }}>{t.name}</div>
                            <div style={{ fontSize: 12, color: GRAY[500], display: "flex", justifyContent: "space-between" }}>
                                <span>{t.fields} fields</span>
                                <span>{t.submissions} submissions</span>
                            </div>
                        </div>
                    ))}
                    <button style={{ padding: "12px", borderRadius: 8, border: `1px dashed ${TEAL}`, background: TEAL_LIGHT, color: TEAL, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Plus size={16} /> New Blank Form</button>
                </div>

                {/* Center: Canvas */}
                <div style={{ flex: 1, background: "white", borderRadius: 12, padding: 40, border: `1px solid ${GRAY[200]}`, minHeight: 600 }}>

                    <div style={{ background: TEAL_LIGHT, padding: "16px 20px", borderRadius: 8, marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
                        <Sparkles size={20} color={TEAL} />
                        <span style={{ fontSize: 14, color: TEAL, fontWeight: 600 }}>Describe your form in plain English and AI will auto-build it!</span>
                    </div>

                    <h1 style={{ fontSize: 24, fontWeight: 700, coler: GRAY[800], textAlign: "center", marginBottom: 32 }}>New Patient Intake</h1>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {fields.map((field, i) => (
                            !previewMode ? (
                                <div key={field.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", border: `1px solid ${GRAY[200]}`, borderRadius: 8, background: GRAY[50] }}>
                                    <GripVertical size={16} color={GRAY[400]} style={{ cursor: "grab" }} />
                                    <div style={{ width: 40, height: 40, background: "white", borderRadius: 8, border: `1px solid ${GRAY[200]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <field.icon size={18} color={GRAY[600]} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800], marginBottom: 4 }}>{field.label}</div>
                                        <div style={{ fontSize: 12, color: GRAY[500] }}>{field.type} Field</div>
                                    </div>
                                    <div style={{ display: "flex", gap: 12 }}>
                                        <button style={{ background: "none", border: "none", cursor: "pointer", color: GRAY[500] }}><Edit3 size={16} /></button>
                                        <button style={{ background: "none", border: "none", cursor: "pointer", color: RED }}><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ) : (
                                <div key={field.id} style={{ marginBottom: 16 }}>
                                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: GRAY[700], marginBottom: 8 }}>{field.label}</label>
                                    {field.type === "Textarea" ? (
                                        <textarea rows={3} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${GRAY[300]}`, boxSizing: "border-box" }} />
                                    ) : field.type === "Checkbox" ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" /> <span style={{ fontSize: 14, color: GRAY[600] }}>Yes</span></div>
                                    ) : (
                                        <input type="text" placeholder={`Enter ${field.label.toLowerCase()}...`} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${GRAY[300]}`, boxSizing: "border-box" }} />
                                    )}
                                </div>
                            )
                        ))}
                    </div>

                    {!previewMode && (
                        <div style={{ marginTop: 24, textAlign: "center" }}>
                            <button style={{ padding: "12px 24px", borderRadius: 8, border: `1px dashed ${GRAY[400]}`, background: "transparent", color: GRAY[500], fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}><Plus size={16} /> Add Field</button>
                        </div>
                    )}
                    {previewMode && (
                        <button style={{ width: "100%", marginTop: 24, padding: "14px", borderRadius: 8, border: "none", background: TEAL, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Submit Intake Form</button>
                    )}

                </div>

                {/* Right: Palette */}
                {!previewMode && (
                    <div style={{ width: 280, background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800], marginBottom: 16 }}>Form Elements</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {palette.map(p => (
                                <div key={p.type} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px", background: GRAY[50], border: `1px solid ${GRAY[200]}`, borderRadius: 8, cursor: "grab" }}>
                                    <p.icon size={20} color={GRAY[600]} />
                                    <span style={{ fontSize: 12, fontWeight: 500, color: GRAY[700] }}>{p.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════
// 8. ANALYTICS
// ═══════════════════════════════════════════
function AnalyticsPage({ currentUI, setUI }) {
    const MIX = [
        { name: "Preventive", value: 35, color: TEAL },
        { name: "Restorative", value: 28, color: "#22c55e" },
        { name: "Endodontic", value: 15, color: ORANGE },
        { name: "Prosthetic", value: 12, color: PURPLE },
        { name: "Surgical", value: 10, color: RED },
    ];

    const PROS = [
        { name: "Dr. Williams", prod: 18200 }, { name: "Dr. Park", prod: 15800 },
        { name: "RDH Martinez", prod: 8400 }, { name: "RDH Lee", prod: 7600 }
    ];

    return (
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <SectionHeader title="Practice Analytics" subtitle="Production tracking and AI-surfaced opportunities" />

            {/* Stats */}
            <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
                <StatCard icon={Wallet} label="Monthly Production" value="$49,800" />
                <StatCard icon={Users} label="Avg Daily Patients" value="18.4" />
                <StatCard icon={CheckCircle} label="Treatment Acceptance" value="73%" color={TEAL} />
                <StatCard icon={Repeat} label="Recall Rate" value="68%" color={ORANGE} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                {/* Bar Chart Container */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 24px 0" }}>Provider Production</h3>
                    <div style={{ height: 280 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={PROS} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={GRAY[200]} />
                                <XAxis type="number" tick={{ fontSize: 12, fill: GRAY[500] }} axisLine={false} tickLine={false} />
                                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: GRAY[800], fontWeight: 500 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: GRAY[50] }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="prod" fill={TEAL} radius={[0, 4, 4, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart Container */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 0 0" }}>Procedure Mix</h3>
                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <ResponsiveContainer width="50%" height="100%">
                            <PieChart>
                                <Pie data={MIX} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                                    {MIX.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ flex: 1, paddingLeft: 20 }}>
                            {MIX.map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color }} />
                                        <span style={{ fontSize: 14, color: GRAY[700], fontWeight: 500 }}>{item.name}</span>
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: GRAY[800] }}>{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Opportunity Insights */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: 8 }}><Sparkles size={20} color={TEAL} /> AI Weekly Insights</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                    <div style={{ padding: 16, background: GRAY[50], borderRadius: 8, border: `1px solid ${GRAY[200]}` }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><TrendingUp size={16} color={TEAL} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800], marginBottom: 4 }}>Production Trend</div>
                        <div style={{ fontSize: 13, color: GRAY[500], lineHeight: 1.5 }}>Hygiene production is up 12% week-over-week. Keep prioritizing re-care scheduling.</div>
                    </div>
                    <div style={{ padding: 16, background: GRAY[50], borderRadius: 8, border: `1px solid ${GRAY[200]}` }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><Users size={16} color={ORANGE} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800], marginBottom: 4 }}>Recare Gap Detected</div>
                        <div style={{ fontSize: 13, color: GRAY[500], lineHeight: 1.5 }}>42 active patients are overdue for hygiene. Launching a voice campaign is recommended.</div>
                    </div>
                    <div style={{ padding: 16, background: GRAY[50], borderRadius: 8, border: `1px solid ${GRAY[200]}` }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><CheckCircle size={16} color={PURPLE} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800], marginBottom: 4 }}>High-Value Acceptance</div>
                        <div style={{ fontSize: 13, color: GRAY[500], lineHeight: 1.5 }}>Case acceptance for implants (D6010) is below target at 40%. Consider offering financing.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Handle missing Repeat icon locally
function Repeat(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>; }

// ═══════════════════════════════════════════
// 9. INTEGRATIONS
// ═══════════════════════════════════════════
function IntegrationsPage({ currentUI, setUI }) {
    const APPS = [
        { name: "Dexis Imaging", cat: "Imaging", status: "connected", icon: "🔬", desc: "Intraoral sensors and panoramic imaging" },
        { name: "Carestream", cat: "Imaging", status: "connected", icon: "📷", desc: "CBCT and 2D imaging systems" },
        { name: "Delta Dental", cat: "Insurance", status: "connected", icon: "🛡️", desc: "Eligibility verification and claims" },
        { name: "Twilio", cat: "Communications", status: "connected", icon: "💬", desc: "SMS/MMS patient messaging" },
        { name: "Stripe", cat: "Payments", status: "connected", icon: "💳", desc: "Payment processing and terminals" },
    ];

    const AVAIL = [
        { name: "Google Business", cat: "Marketing", status: "available", icon: "⭐", desc: "Review management and booking" },
        { name: "Pearl AI", cat: "AI/Imaging", status: "available", icon: "🧠", desc: "Second-opinion pathology detection" },
    ];

    return (
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <SectionHeader title="Integrations & API" subtitle="Connect Intelident to your existing practice software" />

            {/* API Key */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Developer API Key</h3>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ flex: 1, background: GRAY[50], padding: "12px 16px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, fontFamily: "monospace", fontSize: 14, color: GRAY[800], letterSpacing: 2 }}>
                        sk_live_intl_******************************q9P
                    </div>
                    <button style={{ padding: "12px 24px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, background: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Copy size={16} /> Copy</button>
                    <button style={{ padding: "12px 24px", borderRadius: 8, border: "none", background: GRAY[800], color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Regenerate</button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                {/* Connected Apps */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 20px 0" }}>Connected Integrations</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {APPS.map((app, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: i < APPS.length - 1 ? `1px solid ${GRAY[100]}` : "none" }}>
                                <div style={{ width: 44, height: 44, borderRadius: 10, background: GRAY[50], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                                    {app.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: GRAY[800] }}>{app.name}</span>
                                        <Badge text={app.cat} color={GRAY[500]} />
                                    </div>
                                    <div style={{ fontSize: 12, color: GRAY[500] }}>{app.desc}</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: TEAL }}>
                                    <CheckCircle size={14} /> Connected
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Webhooks */}
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Webhook Configuration</h3>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY[700], marginBottom: 8 }}>Endpoint URL</label>
                        <input type="text" defaultValue="https://api.mypractice.com/webhooks/intelident" style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, outline: "none", fontSize: 14, boxSizing: "border-box", marginBottom: 16 }} />

                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY[700], marginBottom: 12 }}>Subscribed Events</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: GRAY[700] }}><input type="checkbox" defaultChecked /> appointment.created</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: GRAY[700] }}><input type="checkbox" defaultChecked /> patient.updated</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: GRAY[700] }}><input type="checkbox" defaultChecked /> claim.submitted</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: GRAY[700] }}><input type="checkbox" defaultChecked /> payment.received</div>
                        </div>
                        <button style={{ width: "100%", padding: "10px", borderRadius: 8, border: "none", background: TEAL, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Webhook Settings</button>
                    </div>

                    {/* Available */}
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Available Integrations</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {AVAIL.map((app, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 10, background: GRAY[50], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                                        {app.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800], marginBottom: 2 }}>{app.name}</div>
                                        <div style={{ fontSize: 12, color: GRAY[500] }}>{app.desc}</div>
                                    </div>
                                    <button style={{ padding: "6px 16px", borderRadius: 6, border: `1px solid ${GRAY[200]}`, background: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Connect</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════
// MAIN COMPONENT & STATE MANAGER
// ═══════════════════════════════════════════
export default function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [currentUI, setUI] = useState("UI1");
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleNavigate = (page) => {
        setCurrentPage(page);
        setSelectedPatient(null);
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setCurrentPage("patient-detail");
    };

    const renderPage = () => {
        // Top-level switch for experimental UI toggling
        if (currentUI === "UI2") {
            return (
                <div style={{ padding: 40, background: "white", borderRadius: 12, textAlign: "center", border: `1px solid ${GRAY[200]}` }}>
                    <h2>UI2 Design Template</h2>
                    <p style={{ color: GRAY[500] }}>Any future UI designs you request will be built and loaded here. Click UI1 in the top right to return.</p>
                    <TopGreeting currentUI={currentUI} setUI={setUI} />
                </div>
            );
        }

        // Default UI1 Routing
        switch (currentPage) {
            case "dashboard": return <DashboardPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
            case "patients": return <PatientListPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
            case "patient-detail": return selectedPatient ? <PatientDetailPage currentUI={currentUI} setUI={setUI} patient={selectedPatient} onBack={() => { setSelectedPatient(null); setCurrentPage("dashboard"); }} /> : <DashboardPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
            case "schedule": return <SchedulerPage currentUI={currentUI} setUI={setUI} />;
            case "notes": return <AiNotesPage currentUI={currentUI} setUI={setUI} />;
            case "voice": return <VoiceAgentPage currentUI={currentUI} setUI={setUI} />;
            case "forms": return <FormBuilderPage currentUI={currentUI} setUI={setUI} />;
            case "analytics": return <AnalyticsPage currentUI={currentUI} setUI={setUI} />;
            case "integrations": return <IntegrationsPage currentUI={currentUI} setUI={setUI} />;
            default: return <DashboardPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
        }
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: PAGE_BG, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
            <Sidebar currentPage={currentPage === "patient-detail" ? "dashboard" : currentPage} onNavigate={handleNavigate} />
            <main style={{ flex: 1, marginLeft: 260, padding: "32px 40px", maxWidth: 1400 }}>
                {renderPage()}
            </main>
        </div>
    );
}
