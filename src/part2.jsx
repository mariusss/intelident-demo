
// ═══════════════════════════════════════════
// SIDEBAR (UI1)
// ═══════════════════════════════════════════
function Sidebar({ currentPage, onNavigate }) {
    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "patients", icon: Users, label: "Patients" },
        { id: "schedule", icon: Calendar, label: "Appointments" },
        { id: "notes", icon: FileText, label: "AI Notes" },
        { id: "voice", icon: PhoneCall, label: "Voice Agent" },
        { id: "analytics", icon: BarChart3, label: "Analytics" },
    ];
    const toolItems = [
        { id: "settings", icon: Settings, label: "Settings" },
        { id: "forms", icon: Clipboard, label: "Forms" },
        { id: "integrations", icon: Globe, label: "Integrations" },
    ];

    return (
        <div style={{ width: 260, background: SB_BG, borderRight: `1px solid ${GRAY[200]}`, height: "100vh", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, zIndex: 100 }}>
            <div style={{ padding: "24px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Activity size={18} color={TEAL} style={{ transform: "rotate(45deg)" }} />
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: GRAY[800] }}>Intelident</span>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
                    {menuItems.map((item) => {
                        const active = currentPage === item.id;
                        return (
                            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, border: "none",
                                background: active ? GRAY[50] : "transparent", color: active ? GRAY[800] : GRAY[500],
                                fontWeight: active ? 600 : 500, fontSize: 14, cursor: "pointer", textAlign: "left",
                                boxShadow: active ? `inset 0 0 0 1px ${GRAY[200]}` : "none",
                            }}>
                                <item.icon size={18} color={active ? GRAY[800] : GRAY[500]} />
                                {item.label}
                            </button>
                        )
                    })}
                </div>

                <div style={{ fontSize: 12, fontWeight: 600, color: GRAY[400], padding: "0 16px", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Tools</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {toolItems.map(item => {
                        const active = currentPage === item.id;
                        return (
                            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 8, border: "none",
                                background: active ? GRAY[50] : "transparent", color: active ? GRAY[800] : GRAY[500],
                                fontWeight: active ? 600 : 500, fontSize: 14, cursor: "pointer", textAlign: "left",
                                boxShadow: active ? `inset 0 0 0 1px ${GRAY[200]}` : "none",
                            }}>
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div style={{ padding: "20px" }}>
                <div style={{ background: GRAY[50], borderRadius: 12, padding: "20px", marginBottom: 20 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: "white" }}>
                        <span style={{ fontSize: 18 }}>👑</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: GRAY[800], marginBottom: 4 }}>Upgrade to premium</div>
                    <div style={{ fontSize: 12, color: GRAY[500], marginBottom: 16, lineHeight: 1.5 }}>Upgrade for advanced clinical AI features</div>
                    <button style={{ width: "100%", padding: "10px", borderRadius: 8, border: "none", background: "#111827", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        Upgrade plan
                    </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${GRAY[200]}`, paddingTop: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: TEAL }}>
                        DW
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800] }}>Dr. Williams</div>
                        <div style={{ fontSize: 12, color: GRAY[500] }}>General Dentist</div>
                    </div>
                    <ChevronDown size={16} color={GRAY[500]} style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════
// 1. DASHBOARD
// ═══════════════════════════════════════════
function DashboardPage({ onNavigate, currentUI, setUI }) {
    return (
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <SectionHeader title="Dashboard" subtitle="Overview of all of your patients and clinic production" />

            {/* Stats Row */}
            <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
                <StatCard icon={UsersRound} label="Total Patients" value="1,842" change="+15%" changeType="up" />
                <StatCard icon={CalendarCheck} label="Appointments Today" value="14" change="+10%" changeType="up" />
                <StatCard icon={Wallet} label="MTD Production" value="$52,400" change="+28%" changeType="up" />
                <StatCard icon={Activity} label="Treatment Plans" value="112" change="+12%" changeType="up" />
            </div>

            {/* Middle Row: Charts & List */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>

                {/* Chart */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: 0 }}>Overview</h3>
                        <MoreHorizontal size={20} color={GRAY[500]} style={{ cursor: "pointer" }} />
                    </div>

                    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: GRAY[500] }}>
                            <div style={{ width: 12, height: 3, background: TEAL, borderRadius: 2 }} />
                            Hygiene / Preventive
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: GRAY[500] }}>
                            <div style={{ width: 12, height: 3, background: GRAY[500], borderRadius: 2, opacity: 0.3 }} />
                            Treatment / Restorative
                        </div>
                    </div>

                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={WEEKLY_PRODUCTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorHosp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={TEAL} stopOpacity={0.1} />
                                        <stop offset="95%" stopColor={TEAL} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={GRAY[500]} stopOpacity={0.05} />
                                        <stop offset="95%" stopColor={GRAY[500]} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={GRAY[200]} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: GRAY[500] }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: GRAY[500] }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ borderRadius: 8, border: `1px solid ${GRAY[200]}`, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                    itemStyle={{ fontSize: 13, fontWeight: 600 }}
                                    labelStyle={{ fontSize: 12, color: GRAY[500], marginBottom: 4 }}
                                />
                                <Area type="monotone" dataKey="hospitalized" stroke={TEAL} strokeWidth={2} fillOpacity={1} fill="url(#colorHosp)" />
                                <Area type="monotone" dataKey="outpatients" stroke={GRAY[500]} strokeWidth={2} strokeOpacity={0.3} fillOpacity={1} fill="url(#colorOut)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Appointment List */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: 0 }}>Appointment list</h3>
                        <MoreHorizontal size={20} color={GRAY[500]} style={{ cursor: "pointer" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", maxHeight: 300 }}>
                        {SCHEDULE_DATA.appointments.slice(0, 6).map((apt, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <Avatar initials={apt.patient.substring(0, 2).toUpperCase()} size={36} color={TEAL} />
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800] }}>{apt.patient}</div>
                                        <div style={{ fontSize: 12, color: GRAY[500] }}>{apt.type}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: 12, color: GRAY[500] }}>Today</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800] }}>{SCHEDULE_DATA.hours[apt.start]}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PatientTable onNavigate={onNavigate} patients={PATIENTS} title="Patient list" />
        </div>
    );
}

// ═══════════════════════════════════════════
// PATIENT TABLE COMPONENT (Used in multiple places)
// ═══════════════════════════════════════════
function PatientTable({ onNavigate, patients, title }) {
    return (
        <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
            {title && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: 0 }}>{title}</h3>
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ position: "relative", width: 280 }}>
                    <Search size={16} color={GRAY[500]} style={{ position: "absolute", left: 12, top: 10 }} />
                    <input
                        type="text" placeholder="Search..."
                        style={{ width: "100%", padding: "10px 12px 10px 36px", border: `1px solid ${GRAY[200]}`, borderRadius: 8, outline: "none", fontSize: 14, boxSizing: "border-box" }}
                    />
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, background: "white", color: GRAY[800], fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                        <Filter size={14} /> Filter
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, background: "white", color: GRAY[800], fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                        All status <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ width: 40, padding: "12px 0", textAlign: "left", borderBottom: `1px solid ${GRAY[200]}` }}>
                            <input type="checkbox" style={{ accentColor: TEAL }} />
                        </th>
                        {["Name", "Gender", "Date of Birth", "Age", "Department", "Insurance"].map(h => (
                            <th key={h} style={{ padding: "16px 0", fontSize: 13, fontWeight: 500, color: GRAY[500], textAlign: "left", borderBottom: `1px solid ${GRAY[200]}` }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {patients.map((p, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${GRAY[200]}`, cursor: "pointer" }} onClick={() => onNavigate(p)} onMouseOver={e => e.currentTarget.style.background = GRAY[50]} onMouseOut={e => e.currentTarget.style.background = "white"}>
                            <td style={{ padding: "16px 0" }}>
                                <input type="checkbox" style={{ accentColor: TEAL }} onClick={e => e.stopPropagation()} />
                            </td>
                            <td style={{ padding: "16px 0" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <Avatar initials={p.avatar} size={32} />
                                    <span style={{ fontSize: 14, fontWeight: 600, color: GRAY[800] }}>{p.name}</span>
                                    {p.status === "Overdue" && <Badge text="Overdue" color={ORANGE} />}
                                </div>
                            </td>
                            <td style={{ padding: "16px 0", fontSize: 14, color: GRAY[800], fontWeight: 500 }}>{p.gender}</td>
                            <td style={{ padding: "16px 0", fontSize: 14, color: GRAY[800], fontWeight: 500 }}>{p.dob}</td>
                            <td style={{ padding: "16px 0", fontSize: 14, color: GRAY[800], fontWeight: 500 }}>{p.age} years old</td>
                            <td style={{ padding: "16px 0", fontSize: 14, color: GRAY[800], fontWeight: 500 }}>{p.dept}</td>
                            <td style={{ padding: "16px 0", fontSize: 14, color: GRAY[800], fontWeight: 500 }}>{p.insurance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ═══════════════════════════════════════════
// 2. PATIENT LIST PAGE
// ═══════════════════════════════════════════
function PatientListPage({ currentUI, setUI, onNavigate }) {
    return (
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <SectionHeader title="Patient Directory" subtitle="Manage and search all registered patients" />
            <PatientTable onNavigate={onNavigate} patients={PATIENTS} />
        </div>
    );
}

// ═══════════════════════════════════════════
// 3. PATIENT DETAIL
// ═══════════════════════════════════════════
function PatientDetailPage({ patient, onBack, currentUI, setUI }) {
    const [activeTab, setActiveTab] = useState("Timeline");
    const tabs = ["Timeline", "Medical History", "Treatment Plan", "Documents", "Insurance"];

    return (
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <button onClick={onBack} style={{ background: "none", border: "none", color: TEAL, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", gap: 4 }}>
                ← Back to Dashboard
            </button>

            {/* Patient Header */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <Avatar initials={patient.avatar} size={64} color={TEAL} />
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                            <h2 style={{ fontSize: 22, fontWeight: 700, color: GRAY[800], margin: 0 }}>{patient.name}</h2>
                            <Badge text={patient.status} color={patient.status === "Active" ? TEAL : ORANGE} />
                        </div>
                        <div style={{ display: "flex", gap: 24, fontSize: 13, color: GRAY[500], marginBottom: 12 }}>
                            <span>Age {patient.age} · DOB: {patient.dob}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Phone size={12} /> {patient.phone}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Mail size={12} /> {patient.email}</span>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ background: GRAY[50], border: `1px solid ${GRAY[200]}`, borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>
                                <span style={{ color: GRAY[400] }}>Insurance: </span>
                                <span style={{ color: GRAY[700], fontWeight: 600 }}>{patient.insurance}</span>
                            </div>
                            <div style={{ background: GRAY[50], border: `1px solid ${GRAY[200]}`, borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>
                                <span style={{ color: GRAY[400] }}>Provider: </span>
                                <span style={{ color: GRAY[700], fontWeight: 600 }}>{patient.provider}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                {tabs.map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} style={{
                        padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.15s",
                        background: activeTab === t ? TEAL : "white", color: activeTab === t ? "white" : GRAY[600],
                        boxShadow: activeTab !== t ? `0 1px 3px rgba(0,0,0,0.08)` : "none",
                    }}>{t}</button>
                ))}
            </div>

            {activeTab === "Timeline" && (
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: GRAY[800], marginBottom: 20 }}>Clinical Timeline</div>
                    {TIMELINE_EVENTS.map((ev, i) => (
                        <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 20, marginBottom: 20, borderBottom: i < TIMELINE_EVENTS.length - 1 ? `1px solid ${GRAY[100]}` : "none" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: TEAL_LIGHT }}>
                                    <Stethoscope size={16} color={TEAL} />
                                </div>
                                {i < TIMELINE_EVENTS.length - 1 && <div style={{ width: 2, flex: 1, background: GRAY[200], marginTop: 8 }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: GRAY[800] }}>{ev.title}</div>
                                    <div style={{ fontSize: 12, color: GRAY[400] }}>{ev.date}</div>
                                </div>
                                <div style={{ fontSize: 12, color: TEAL, marginBottom: 6 }}>{ev.provider}</div>
                                <div style={{ fontSize: 13, color: GRAY[600], lineHeight: 1.6 }}>{ev.notes}</div>
                                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                                    {ev.codes.map(c => <Badge key={c} text={c} color={GRAY[500]} />)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "Medical History" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Vitals</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div style={{ background: GRAY[50], padding: 12, borderRadius: 8 }}>
                                <div style={{ fontSize: 12, color: GRAY[500] }}>Blood Pressure</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: GRAY[800] }}>{MEDICAL_HISTORY.vitals.bp}</div>
                            </div>
                            <div style={{ background: GRAY[50], padding: 12, borderRadius: 8 }}>
                                <div style={{ fontSize: 12, color: GRAY[500] }}>Pulse</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: GRAY[800] }}>{MEDICAL_HISTORY.vitals.pulse}</div>
                            </div>
                            <div style={{ background: GRAY[50], padding: 12, borderRadius: 8 }}>
                                <div style={{ fontSize: 12, color: GRAY[500] }}>Weight</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: GRAY[800] }}>{MEDICAL_HISTORY.vitals.weight}</div>
                            </div>
                            <div style={{ background: GRAY[50], padding: 12, borderRadius: 8 }}>
                                <div style={{ fontSize: 12, color: GRAY[500] }}>Height</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: GRAY[800] }}>{MEDICAL_HISTORY.vitals.height}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Active Conditions</h3>
                        {MEDICAL_HISTORY.conditions.map((c, i) => (
                            <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${GRAY[100]}` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <span style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</span>
                                    <Badge text={c.status} color={c.status === "Active" ? RED : TEAL} />
                                </div>
                                <div style={{ fontSize: 12, color: GRAY[500] }}>Since {c.since} — {c.notes}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Current Medications</h3>
                        {MEDICAL_HISTORY.medications.map((m, i) => (
                            <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${GRAY[100]}` }}>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                                <div style={{ fontSize: 12, color: GRAY[500] }}>{m.frequency} · For {m.purpose} ({m.prescriber})</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: GRAY[800], margin: "0 0 16px 0" }}>Family & Social Baseline</h3>
                        <div style={{ fontSize: 13, color: GRAY[700], marginBottom: 16 }}><strong>Family:</strong> {MEDICAL_HISTORY.family}</div>
                        <div style={{ fontSize: 13, color: GRAY[700], marginBottom: 16 }}><strong>Social:</strong> {MEDICAL_HISTORY.social}</div>
                        <div style={{ fontSize: 13, color: GRAY[700] }}><strong>Surgeries:</strong> {MEDICAL_HISTORY.surgeries.join(", ")}</div>
                    </div>
                </div>
            )}

            {activeTab === "Treatment Plan" && (
                <div style={{ background: "white", borderRadius: 12, padding: 40, border: `1px solid ${GRAY[200]}`, textAlign: "center", color: GRAY[500] }}>
                    Treatment plan table visualization ready for data injection.
                </div>
            )}

            {activeTab === "Documents" && (
                <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        {["All", "Forms", "Imaging", "Consent"].map(cat => (
                            <button key={cat} style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${GRAY[200]}`, background: "white", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>{cat}</button>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {DOCUMENTS.map((doc, i) => (
                            <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, border: `1px solid ${GRAY[200]}`, display: "flex", gap: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 8, background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <doc.icon size={20} color={TEAL} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600 }}>{doc.name}</div>
                                        <Badge text={doc.format} color={GRAY[500]} />
                                    </div>
                                    <div style={{ fontSize: 12, color: GRAY[400], marginBottom: 12 }}>Uploaded {doc.date} · {doc.size}</div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: GRAY[100], fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Download size={14} /> Download</button>
                                        <button style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: TEAL_LIGHT, color: TEAL, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Eye size={14} /> View</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "Insurance" && (
                <div style={{ background: "white", borderRadius: 12, padding: 40, border: `1px solid ${GRAY[200]}`, textAlign: "center", color: GRAY[500] }}>
                    Insurance verification API endpoints connected. Eligibility table pending.
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════
// 4. SMART SCHEDULER
// ═══════════════════════════════════════════
function SchedulerPage({ currentUI, setUI }) {
    return (
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <SectionHeader title="Smart Scheduler" subtitle="Multi-provider view with AI gap detection" />

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                {/* Calendar Grid */}
                <div style={{ flex: 1, background: "white", borderRadius: 12, border: `1px solid ${GRAY[200]}`, overflow: "hidden" }}>
                    <div style={{ display: "flex", background: GRAY[50], borderBottom: `1px solid ${GRAY[200]}` }}>
                        <div style={{ width: 60, borderRight: `1px solid ${GRAY[200]}` }}></div>
                        {SCHEDULE_DATA.providers.map((p, i) => (
                            <div key={p} style={{ flex: 1, padding: "16px", textAlign: "center", fontWeight: 600, fontSize: 14, borderRight: i === 0 ? `1px solid ${GRAY[200]}` : "none" }}>{p}</div>
                        ))}
                    </div>

                    <div style={{ height: "600px", overflowY: "auto", position: "relative" }}>
                        {SCHEDULE_DATA.hours.map((hour, idx) => (
                            <div key={hour} style={{ display: "flex", height: "60px", borderBottom: `1px solid ${GRAY[100]}` }}>
                                <div style={{ width: 60, padding: "8px", fontSize: 11, color: GRAY[500], textAlign: "right", borderRight: `1px solid ${GRAY[200]}` }}>
                                    {hour}
                                </div>
                                <div style={{ flex: 1, borderRight: `1px solid ${GRAY[200]}` }}></div>
                                <div style={{ flex: 1 }}></div>
                            </div>
                        ))}

                        {/* Render Appointments */}
                        {SCHEDULE_DATA.appointments.map((apt, i) => (
                            <div key={i} style={{
                                position: "absolute",
                                top: `${apt.start * 60}px`,
                                left: `calc(60px + ${apt.provider * 50}%)`,
                                width: "calc(50% - 60px)",
                                height: `${apt.duration * 60 - 4}px`,
                                background: `${apt.color}15`,
                                borderLeft: `4px solid ${apt.color}`,
                                borderRadius: 4,
                                margin: "2px 8px",
                                padding: "8px 12px",
                                display: "flex", flexDirection: "column",
                                overflow: "hidden"
                            }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: GRAY[800], whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{apt.patient}</span>
                                <span style={{ fontSize: 11, fontWeight: 600, color: apt.color }}>{apt.type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Gap Detection Panel */}
                <div style={{ width: 320, background: TEAL_LIGHT, borderRadius: 12, padding: 20, border: `1px solid rgba(40,167,141,0.2)` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <Activity size={20} color={TEAL} />
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: TEAL, margin: 0 }}>AI Gap Detection</h3>
                    </div>
                    <p style={{ fontSize: 13, color: GRAY[700], marginBottom: 20, lineHeight: 1.5 }}>Intelident found 2 opportunities to optimize today's schedule based on live waitlists and overdue recalls.</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {SCHEDULE_DATA.gaps.map((gap, i) => (
                            <div key={i} style={{ background: "white", borderRadius: 8, padding: 16, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: GRAY[500], marginBottom: 8 }}>{gap.time} · {SCHEDULE_DATA.providers[gap.provider]}</div>
                                <div style={{ fontSize: 13, color: GRAY[800], marginBottom: 16, lineHeight: 1.4 }}>{gap.suggestion}</div>
                                <button style={{ width: "100%", padding: "8px", borderRadius: 6, border: "none", background: TEAL, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Fix Schedule Gap</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════
// 5. AI CLINICAL NOTES
// ═══════════════════════════════════════════
function AiNotesPage({ currentUI, setUI }) {
    const [generating, setGenerating] = useState(false);
    const [noteText, setNoteText] = useState("");

    const handleGenerate = () => {
        setGenerating(true);
        setNoteText("");
        const targetText = `SUBJECTIVE:
Patient James Okafor, 45-year-old male, presents for scheduled extraction of tooth #32 (lower right third molar). Patient reports intermittent pain and swelling in the area over the past 3 weeks. Pain rated 4/10 at rest, 7/10 with chewing. No fever or drainage reported. Medical history reviewed — no changes since last visit. No known drug allergies.

OBJECTIVE:
Extraoral exam: No swelling, lymphadenopathy, or asymmetry noted. TMJ — normal ROM, no clicking or deviation.
Intraoral exam: Tooth #32 — partially erupted, distal caries extending subgingivally. Soft tissue inflammation noted distal to #31. Periapical radiograph shows mesioangular impaction.

ASSESSMENT:
1. Partially impacted tooth #32 with distal caries — non-restorable
2. Localized pericoronitis, mild

PLAN:
1. Surgical extraction of #32 (D7230) performed under local anesthesia (2 carpules 2% lidocaine 1:100K epi)
2. Post-op instructions provided: written and verbal. Rx: Amoxicillin 500mg TID x7 days
3. Follow-up in 7 days for post-op check`;

        let i = 0;
        const interval = setInterval(() => {
            setNoteText(targetText.slice(0, i));
            i += 8; // Speed of generation
            if (i > targetText.length) {
                clearInterval(interval);
                setGenerating(false);
                setNoteText(targetText);
            }
        }, 10);
    };

    return (
        <div>
            <TopGreeting currentUI={currentUI} setUI={setUI} />
            <SectionHeader title="AI Clinical Notes" subtitle="Automatic, code-compliant SOAP note generation" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>
                {/* Left Input Panel */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}` }}>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY[700], marginBottom: 8 }}>Select Patient</label>
                        <select style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, outline: "none", fontSize: 14 }}>
                            <option>James Okafor (10:00 AM)</option>
                            <option>Sarah Chen (8:00 AM)</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY[700], marginBottom: 8 }}>Procedure Codes Performed</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                            <Badge text="D7230 Extraction" color={TEAL} />
                            <Badge text="D0220 Intraoral Image" color={TEAL} />
                            <Badge text="+ Add Code" color={GRAY[500]} />
                        </div>
                        <input type="text" placeholder="Search codes..." style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, outline: "none", fontSize: 14, boxSizing: "border-box" }} />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GRAY[700], marginBottom: 8 }}>Voice or Text Dictation (Optional)</label>
                        <textarea
                            rows={4}
                            defaultValue="Patient James Okafor, lower right wisdom tooth extraction. Had pain for 3 weeks, 7/10. Used 2 carpules lidocaine with epi. Prescribed amoxicillin 500mg."
                            style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, outline: "none", fontSize: 14, resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                    </div>

                    <button onClick={handleGenerate} disabled={generating} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: generating ? GRAY[400] : TEAL, color: "white", fontSize: 14, fontWeight: 600, cursor: generating ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Activity size={18} /> {generating ? "Generating..." : "Generate SOAP Note"}
                    </button>
                </div>

                {/* Right Output Panel */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, border: `1px solid ${GRAY[200]}`, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, borderBottom: `1px solid ${GRAY[100]}`, paddingBottom: 16 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: GRAY[800], margin: 0 }}>Generated Note</h3>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${GRAY[200]}`, background: "white", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Copy size={14} /> Copy</button>
                        </div>
                    </div>

                    <div style={{ flex: 1, background: GRAY[50], borderRadius: 8, padding: 20, whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.6, color: GRAY[800], fontFamily: "'SF Mono', Consolas, monospace", minHeight: 400 }}>
                        {noteText || <span style={{ color: GRAY[400] }}>Awaiting generation...</span>}
                    </div>

                    {noteText.length > 500 && !generating && (
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                            <button style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "#111827", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                                Approve & Sign to EHR
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
