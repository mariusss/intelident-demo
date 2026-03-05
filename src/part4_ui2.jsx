import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, AreaChart, Area } from "recharts";
import {
    LayoutDashboard, Users, Calendar, FileText, BarChart3, Settings, Search, Bell, Phone, Mail, Filter, ChevronDown, Stethoscope, MessageSquare, Clipboard, PhoneCall, Globe, Copy, Play, Square, Plus, Trash2, GripVertical, Download, Eye, File, Activity, UsersRound, CalendarCheck, Wallet, ArrowDownToLine, MoreHorizontal, Clock, CheckCircle, Shield, Sparkles, TrendingUp, Type, CalendarDays, AlignLeft, ListChecks, Hash, CircleDot, Edit3, Repeat, Mic, ArrowRight, Loader2
} from "lucide-react";

// ==========================================
// GEOVEA DESIGN CONSTANTS (UI2)
// ==========================================
export const GEO_BG = "#F4F5F7";
export const GEO_WHITE = "#FFFFFF";
export const GEO_GREEN = "#00B67A";
export const GEO_YELLOW = "#FFD100";
export const GEO_BLACK = "#1C1E23";
export const GEO_TEXT_MAIN = "#1C1E23";
export const GEO_TEXT_MUTED = "#8A8D93";
export const GEO_SHADOW = "0px 8px 30px rgba(0,0,0,0.04)";
export const GEO_RADIUS = "28px";
export const GEO_PILL = "9999px";

// ==========================================
// UI2: SHARED COMPONENTS
// ==========================================

export function SidebarUI2({ currentPage, onNavigate, isExpanded, setIsExpanded }) {

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "patients", icon: Users, label: "Patients" },
        { id: "schedule", icon: Calendar, label: "Schedule" },
        { id: "recall", icon: CalendarCheck, label: "Recall" },
        { id: "notes", icon: FileText, label: "AI Notes" },
        { id: "billing", icon: Wallet, label: "Billing" },
        { id: "voice", icon: PhoneCall, label: "Voice Agent" },
        { id: "analytics", icon: BarChart3, label: "Analytics" },
    ];
    const toolItems = [
        { id: "settings", icon: Settings, label: "Settings" },
        { id: "forms", icon: Clipboard, label: "Forms" },
        { id: "integrations", icon: Globe, label: "Integrations" },
    ];

    return (
        <div style={{
            width: isExpanded ? 240 : 80,
            height: "calc(100vh - 40px)",
            background: GEO_WHITE,
            borderRadius: 40,
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            left: 20,
            top: 20,
            boxShadow: GEO_SHADOW,
            padding: "30px 0",
            zIndex: 100,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden"
        }}>
            {/* Logo row */}
            <div style={{ paddingBottom: 40, width: "100%", display: "flex", alignItems: "center" }}>
                <div style={{ width: 80, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                    <Activity size={24} color={GEO_GREEN} />
                </div>
                <span style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, opacity: isExpanded ? 1 : 0, whiteSpace: "nowrap", transition: "opacity 0.2s" }}>Intelident.ai</span>
            </div>

            {/* Menu Links */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, width: "100%", padding: isExpanded ? "0 20px" : "0 15px", transition: "padding 0.3s" }}>
                {menuItems.map((item) => {
                    const active = currentPage === item.id;
                    return (
                        <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                            width: "100%", height: 50, borderRadius: 25, border: "none",
                            background: active ? GEO_BG : "transparent", color: active ? GEO_BLACK : GEO_TEXT_MUTED,
                            display: "flex", alignItems: "center", justifyContent: "flex-start",
                            cursor: "pointer", transition: "all 0.2s", padding: 0, overflow: "hidden"
                        }}>
                            <div style={{ width: 50, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                <item.icon size={22} color={active ? GEO_BLACK : GEO_TEXT_MUTED} />
                            </div>
                            <span style={{ fontSize: 15, fontWeight: 600, opacity: isExpanded ? 1 : 0, whiteSpace: "nowrap", transition: "opacity 0.2s" }}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}

                <div style={{ width: isExpanded ? "calc(100% - 40px)" : 30, height: 1, background: "#E5E7EB", margin: "10px auto", transition: "all 0.3s" }} />

                {toolItems.map(item => {
                    const active = currentPage === item.id;
                    return (
                        <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                            width: "100%", height: 50, borderRadius: 25, border: "none",
                            background: active ? GEO_BG : "transparent", color: active ? GEO_BLACK : GEO_TEXT_MUTED,
                            display: "flex", alignItems: "center", justifyContent: "flex-start",
                            cursor: "pointer", transition: "all 0.2s", padding: 0, overflow: "hidden"
                        }}>
                            <div style={{ width: 50, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                <item.icon size={22} color={active ? GEO_BLACK : GEO_TEXT_MUTED} />
                            </div>
                            <span style={{ fontSize: 15, fontWeight: 600, opacity: isExpanded ? 1 : 0, whiteSpace: "nowrap", transition: "opacity 0.2s" }}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Expand Toggle */}
            <div style={{ marginTop: "auto", width: "100%", display: "flex", paddingBottom: 10 }}>
                <div style={{ width: 80, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                    <button onClick={() => setIsExpanded(!isExpanded)} style={{
                        width: 40, height: 40, borderRadius: 20, border: `1px solid #E5E7EB`, background: "white",
                        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>
                        <ChevronDown size={20} color={GEO_TEXT_MAIN} style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(-90deg)", transition: "transform 0.3s" }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export function TopGreetingUI2() {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
                <h1 style={{ fontSize: 28, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Good Morning, Dr. Cifor!</h1>
                <p style={{ color: GEO_TEXT_MUTED, margin: "8px 0 0 0", fontSize: 16 }}>Here is your schedule for today.</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 24, background: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: GEO_SHADOW, cursor: "pointer" }}>
                    <Bell size={20} color={GEO_TEXT_MAIN} />
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 24, background: GEO_BLACK, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: GEO_SHADOW }}>
                    DW
                </div>
            </div>
        </div>
    );
}

export function StatCardUI2({ icon: Icon, title, value, change, isPositive }) {
    return (
        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: GEO_SHADOW, flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: GEO_BLACK, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={GEO_WHITE} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 500, color: GEO_TEXT_MAIN }}>{title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: GEO_TEXT_MAIN, lineHeight: 1 }}>{value}</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: isPositive ? GEO_GREEN : GEO_TEXT_MUTED, marginBottom: 4 }}>{change}</span>
            </div>
        </div>
    );
}

// ==========================================
// UI2: DASHBOARD PAGE
// ==========================================
export function DashboardPageUI2({ currentUI, setUI, onNavigatePage, onSelectPatient, WEEKLY_PRODUCTION, SCHEDULE_DATA, PATIENT_DATA }) {
    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />

            {/* Stat Cards - Geovea Style */}
            <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
                <StatCardUI2 icon={UsersRound} title="Total Patients" value="1,842" change="+15%" isPositive={true} />
                <StatCardUI2 icon={CalendarCheck} title="Appointments" value="14" change="+10%" isPositive={true} />
                <StatCardUI2 icon={Wallet} title="MTD Production" value="$52.4k" change="+28%" isPositive={true} />
            </div>

            {/* AI Insights Panel */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Sparkles size={20} color={GEO_GREEN} />
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>AI Practice Insights</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                    <div onClick={() => onNavigatePage("patients")} style={{ background: GEO_WHITE, borderRadius: 16, padding: 20, boxShadow: GEO_SHADOW, border: `1px solid #E5E7EB`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column", gap: 12 }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = GEO_SHADOW; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: "#FFF0F0", color: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center" }}><Wallet size={18} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, lineHeight: 1.4 }}>8 patients have unaccepted treatment worth $12,400</div>
                        <div style={{ marginTop: "auto", fontSize: 12, fontWeight: 700, color: "#FF3B30", display: "flex", alignItems: "center", gap: 4 }}>Review Treatment Plans <ArrowRight size={12} /></div>
                    </div>

                    <div onClick={() => onNavigatePage("billing")} style={{ background: GEO_WHITE, borderRadius: 16, padding: 20, boxShadow: GEO_SHADOW, border: `1px solid #E5E7EB`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column", gap: 12 }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = GEO_SHADOW; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: "#FFF9E6", color: "#FFD100", display: "flex", alignItems: "center", justifyContent: "center" }}><Clipboard size={18} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, lineHeight: 1.4 }}>3 insurance claims are 30+ days with no response</div>
                        <div style={{ marginTop: "auto", fontSize: 12, fontWeight: 700, color: "#D4AF37", display: "flex", alignItems: "center", gap: 4 }}>Check Claims Status <ArrowRight size={12} /></div>
                    </div>

                    <div onClick={() => onNavigatePage("recall")} style={{ background: GEO_WHITE, borderRadius: 16, padding: 20, boxShadow: GEO_SHADOW, border: `1px solid #E5E7EB`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column", gap: 12 }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = GEO_SHADOW; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: "#F0F4FF", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}><CalendarCheck size={18} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, lineHeight: 1.4 }}>14 hygiene recalls due this week — 6 not contacted</div>
                        <div style={{ marginTop: "auto", fontSize: 12, fontWeight: 700, color: "#007AFF", display: "flex", alignItems: "center", gap: 4 }}>Send AI Reminders <ArrowRight size={12} /></div>
                    </div>

                    <div onClick={() => onNavigatePage("schedule")} style={{ background: GEO_WHITE, borderRadius: 16, padding: 20, boxShadow: GEO_SHADOW, border: `1px solid #E5E7EB`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column", gap: 12 }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = GEO_SHADOW; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: "#E8F5E9", color: GEO_GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}><Stethoscope size={18} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, lineHeight: 1.4 }}>Dr. Cifor's schedule has 2 slots open tomorrow</div>
                        <div style={{ marginTop: "auto", fontSize: 12, fontWeight: 700, color: GEO_GREEN, display: "flex", alignItems: "center", gap: 4 }}>Suggest Waitlist <ArrowRight size={12} /></div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>

                {/* Area Chart - Geovea Style */}
                <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                        <h3 style={{ fontSize: 20, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Overview</h3>
                    </div>
                    <div style={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={WEEKLY_PRODUCTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="geoColorRes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={GEO_GREEN} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={GEO_GREEN} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="geoColorHyg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={GEO_YELLOW} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={GEO_YELLOW} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: GEO_TEXT_MUTED }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: GEO_TEXT_MUTED }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ borderRadius: 16, border: "none", boxShadow: GEO_SHADOW }}
                                    itemStyle={{ fontSize: 14, fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="restorative" stroke={GEO_GREEN} strokeWidth={3} fillOpacity={1} fill="url(#geoColorRes)" />
                                <Area type="monotone" dataKey="hygiene" stroke={GEO_YELLOW} strokeWidth={3} fillOpacity={1} fill="url(#geoColorHyg)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Appointment List - Geovea Style */}
                <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 24px 0" }}>Upcoming Appointments</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {[
                            { time: "9:00 AM", name: "Sarah Chen", sub: "Hygiene", initial: "SC" },
                            { time: "9:30 AM", name: "Marcus Rivers", sub: "Crown Prep", initial: "MR" },
                            { time: "11:30 AM", name: "Maria Gonzalez", sub: "Hygiene", initial: "MG" },
                            { time: "1:00 PM", name: "Linda Tran", sub: "Composite Fill", initial: "LT" },
                        ].map((apt, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", borderRadius: 16, background: GEO_BG, cursor: "pointer", transition: "all 0.2s" }} onClick={() => onNavigatePage("patients")}>
                                <div style={{ width: 44, height: 44, borderRadius: 22, background: GEO_BLACK, color: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14 }}>
                                    {apt.initial}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{apt.name}</div>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4 }}>{apt.sub}</div>
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN }}>{apt.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Patient List - Geovea Style */}
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, marginTop: 24, overflowX: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patient Directory</h3>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, background: GEO_BG, color: GEO_TEXT_MAIN, border: "none", padding: "8px 16px", borderRadius: GEO_PILL, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        View All
                    </button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: `2px solid ${GEO_BG}` }}>
                            <th style={{ padding: "12px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Patient</th>
                            <th style={{ padding: "12px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Age / DOB</th>
                            <th style={{ padding: "12px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Insurance</th>
                            <th style={{ padding: "12px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PATIENT_DATA.slice(0, 5).map(p => (
                            <tr key={p.id} style={{ borderBottom: `1px solid ${GEO_BG}`, cursor: "pointer", transition: "background 0.2s" }} onClick={() => onSelectPatient(p)}>
                                <td style={{ padding: "12px 8px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 18, background: p.status === "Overdue" ? "#FFF3E0" : GEO_BG, color: p.status === "Overdue" ? "#E65100" : GEO_TEXT_MAIN, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>
                                            {p.avatar}
                                        </div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN }}>{p.name}</div>
                                    </div>
                                </td>
                                <td style={{ padding: "12px 8px", fontSize: 13, color: GEO_TEXT_MAIN }}>{p.age} yrs <span style={{ color: GEO_TEXT_MUTED, fontSize: 12, display: "block" }}>{p.dob}</span></td>
                                <td style={{ padding: "12px 8px", fontSize: 13, color: GEO_TEXT_MAIN }}>{p.insurance}</td>
                                <td style={{ padding: "12px 8px" }}>
                                    <span style={{
                                        padding: "4px 10px", borderRadius: GEO_PILL, fontSize: 11, fontWeight: 600,
                                        background: p.status === "Active" ? "#E8F5E9" : p.status === "Overdue" ? "#FFF3E0" : "#EBEEF2",
                                        color: p.status === "Active" ? GEO_GREEN : p.status === "Overdue" ? "#E65100" : GEO_TEXT_MUTED
                                    }}>{p.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ==========================================
// UI2: PATIENT LIST PAGE
// ==========================================
export function PatientListPageUI2({ currentUI, setUI, onNavigatePage, onSelectPatient, PATIENT_DATA }) {
    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patients Directory</h2>
                    <div style={{ display: "flex", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", background: GEO_BG, borderRadius: GEO_PILL, padding: "8px 16px" }}>
                            <Search size={18} color={GEO_TEXT_MUTED} style={{ marginRight: 8 }} />
                            <input type="text" placeholder="Search patients..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, color: GEO_TEXT_MAIN, width: 200 }} />
                        </div>
                        <button style={{ display: "flex", alignItems: "center", gap: 8, background: GEO_BLACK, color: GEO_WHITE, border: "none", padding: "10px 20px", borderRadius: GEO_PILL, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>

                <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid ${GEO_BG}` }}>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Patient</th>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Age / DOB</th>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Insurance</th>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PATIENT_DATA.map(p => (
                                <tr key={p.id} style={{ borderBottom: `1px solid ${GEO_BG}`, cursor: "pointer", transition: "background 0.2s" }} onClick={() => onSelectPatient(p)}>
                                    <td style={{ padding: "16px 8px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 20, background: p.status === "Overdue" ? "#FFF3E0" : GEO_BG, color: p.status === "Overdue" ? "#E65100" : GEO_TEXT_MAIN, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14 }}>
                                                {p.avatar}
                                            </div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{p.name}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 8px", fontSize: 14, color: GEO_TEXT_MAIN }}>{p.age} yrs <span style={{ color: GEO_TEXT_MUTED, fontSize: 13, display: "block" }}>{p.dob}</span></td>
                                    <td style={{ padding: "16px 8px", fontSize: 14, color: GEO_TEXT_MAIN }}>{p.insurance}</td>
                                    <td style={{ padding: "16px 8px" }}>
                                        <span style={{
                                            padding: "6px 12px", borderRadius: GEO_PILL, fontSize: 12, fontWeight: 600,
                                            background: p.status === "Active" ? "#E8F5E9" : p.status === "Overdue" ? "#FFF3E0" : "#EBEEF2",
                                            color: p.status === "Active" ? GEO_GREEN : p.status === "Overdue" ? "#E65100" : GEO_TEXT_MUTED
                                        }}>{p.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// UI2: AI NOTES PAGE
// ==========================================
export function AiNotesPageUI2({ currentUI, setUI }) {
    const [note, setNote] = useState("");
    const [generating, setGenerating] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setNote("");
        const draft = "SOAP NOTE:\n\nS: Patient presents for routine hygiene exam. Reports no pain or sensitivity.\nO: Visual exam reveals generalized mild plaque. Gums pink and healthy. No visible caries.\nA: Generalized gingivitis, mild.\nP: Prophylaxis completed. Patient instructed on proper flossing technique. Recare set for 6 months.";
        let i = 0;
        const interval = setInterval(() => {
            setNote(prev => prev + draft.charAt(i));
            i++;
            if (i > draft.length - 1) {
                clearInterval(interval);
                setGenerating(false);
            }
        }, 15);
    };

    return (
        <div style={{ padding: "20px 40px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />

            <div style={{ display: "flex", gap: 30, flex: 1, minHeight: 600, marginTop: 16 }}>
                {/* AI Assistant Chat Panel */}
                <div style={{ flex: 1, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid #E5E7EB` }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: GEO_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Sparkles size={22} color={GEO_GREEN} />
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN }}>AI Dictation Assistant</div>
                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 2 }}>Voice-to-clinical notes intelligence</div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 24, paddingRight: 8 }}>
                        {/* User Message */}
                        <div style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
                            <div style={{ background: GEO_BG, padding: "16px 20px", borderRadius: "20px 20px 4px 20px", fontSize: 15, color: GEO_TEXT_MAIN, lineHeight: 1.5, border: `1px solid #E5E7EB` }}>
                                Generate a SOAP note for Sarah Chen's hygiene visit today.
                            </div>
                            <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, marginTop: 6, textAlign: "right" }}>Dr. Cifor • 9:41 AM</div>
                        </div>

                        {/* AI Message */}
                        <div style={{ alignSelf: "flex-start", maxWidth: "90%", display: "flex", gap: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 16, background: GEO_GREEN, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4 }}>
                                <Sparkles size={16} color={GEO_WHITE} />
                            </div>
                            <div>
                                <div style={{ background: GEO_WHITE, border: `1px solid #E5E7EB`, padding: "16px 20px", borderRadius: "4px 20px 20px 20px", fontSize: 15, color: GEO_TEXT_MAIN, lineHeight: 1.5, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                                    I'd be happy to generate a SOAP note for Sarah. I have analyzed the appointment data and your clinical dictation.
                                    {!note && !generating && (
                                        <div style={{ marginTop: 16 }}>
                                            <button onClick={handleGenerate} style={{ padding: "10px 16px", background: GEO_BG, border: `1px solid #E5E7EB`, borderRadius: 8, fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
                                                <Sparkles size={14} color={GEO_GREEN} /> Review Draft
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, marginTop: 6 }}>Intelident AI • 9:41 AM</div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div style={{ marginTop: 24, padding: "12px 16px", background: GEO_WHITE, border: `1px solid #E5E7EB`, borderRadius: 16, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: GEO_BG, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `1px solid #E5E7EB` }}>
                            <Mic size={18} color={GEO_TEXT_MAIN} />
                        </div>
                        <input type="text" placeholder="Type or dictate clinical notes..." style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: GEO_TEXT_MAIN, background: "transparent" }} />
                        <button onClick={handleGenerate} style={{ width: 36, height: 36, borderRadius: 10, background: GEO_BLACK, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.1s" }}
                            onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
                            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                            <ArrowRight size={16} color={GEO_WHITE} />
                        </button>
                    </div>
                </div>

                {/* Results Panel */}
                <div style={{ flex: 1, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Clinical Documentation</h3>
                        <div style={{ padding: "4px 12px", background: "#E8F5E9", color: GEO_GREEN, borderRadius: GEO_PILL, fontSize: 13, fontWeight: 600 }}>SOAP Note</div>
                    </div>

                    <div style={{ flex: 1, background: GEO_BG, borderRadius: 16, padding: 32, fontSize: 15, color: GEO_TEXT_MAIN, lineHeight: 1.6, whiteSpace: "pre-wrap", overflowY: "auto", fontFamily: note ? "monospace" : "inherit", border: `1px solid #E5E7EB`, position: 'relative' }}>
                        {generating && !note ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 12, color: GEO_TEXT_MUTED, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                <Loader2 size={24} className="lucide-spin" style={{ animation: "spin 2s linear infinite" }} /> Generating notes...
                            </div>
                        ) : note ? note : <span style={{ color: GEO_TEXT_MUTED }}>Your AI generated clinical notes will appear here...</span>}
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
                        <button style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
                            onMouseOver={e => e.currentTarget.style.background = GEO_BG}
                            onMouseOut={e => e.currentTarget.style.background = GEO_WHITE}>
                            <Copy size={16} /> Copy Text
                        </button>
                        <button style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: GEO_GREEN, fontSize: 14, fontWeight: 600, color: GEO_WHITE, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0, 182, 122, 0.2)", transition: "opacity 0.2s" }}
                            onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
                            onMouseOut={e => e.currentTarget.style.opacity = "1"}>
                            <File size={16} /> Export to PMS
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

// Export the remaining placeholder pages for UI2 so the app doesn't crash
export function PlaceholderPageUI2({ currentUI, setUI, title }) {
    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 60, boxShadow: GEO_SHADOW, textAlign: "center" }}>
                <h2 style={{ fontSize: 28, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 16 }}>{title}</h2>
                <p style={{ fontSize: 16, color: GEO_TEXT_MUTED, maxWidth: 400, margin: "0 auto" }}>This section is currently being adapted to the new Geovea aesthetic design language. Please check back later.</p>
            </div>
        </div>
    );
}

// Geovea UI2 Extra Pages

export function SchedulerPageUI2({ currentUI, setUI, SCHEDULE_DATA }) {
    // Override local SCHEDULE_DATA for 3 providers specifically for this task
    const ENHANCED_SCHEDULE = {
        ...SCHEDULE_DATA,
        providers: [
            { name: "Dr. Camelia Cifor", img: "/doctors.png", pos: "18.5% 12%" },
            { name: "Dr. Alberto Vargas", img: "/doctors.png", pos: "52% 12%" },
            { name: "Dr. Lisa Mayeda", img: "/doctors.png", pos: "84% 12%" }
        ],
        appointments: [
            ...SCHEDULE_DATA.appointments,
            // Add a couple appointments for provider 2 (Dr. Mayeda)
            { provider: 2, start: 2, duration: 4, patient: "William Davis", type: "Implant Surgery", color: "#6366f1" },
            { provider: 2, start: 8, duration: 2, patient: "Amanda Lewis", type: "Crown Seat", color: "#28a78d" },
            { provider: 2, start: 13, duration: 3, patient: "Robert Kim", type: "Endo Retreat", color: "#f39c12" }
        ]
    };

    const numProviders = ENHANCED_SCHEDULE.providers.length;

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
                            <div style={{ width: 60, flexShrink: 0, borderRight: `1px solid #E5E7EB` }}></div>
                            {ENHANCED_SCHEDULE.providers.map((p, i) => (
                                <div key={p.name} style={{ flex: 1, padding: "20px 16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", borderRight: i < numProviders - 1 ? `1px solid #E5E7EB` : "none" }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: 32, marginBottom: 12, border: "2px solid white", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        backgroundImage: `url('${p.img}')`, backgroundSize: "1100% auto", backgroundPosition: p.pos, backgroundRepeat: "no-repeat"
                                    }} />
                                    <div style={{ fontWeight: 700, fontSize: 16, color: GEO_TEXT_MAIN, marginBottom: 4 }}>{p.name}</div>
                                    <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, fontWeight: 600 }}>Dentist</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ height: "600px", overflowY: "auto", position: "relative" }}>
                            {ENHANCED_SCHEDULE.hours.map((hour, idx) => (
                                <div key={hour} style={{ display: "flex", height: "60px", borderBottom: `1px solid #F3F4F6` }}>
                                    <div style={{ width: 60, flexShrink: 0, padding: "8px", fontSize: 11, color: GEO_TEXT_MUTED, textAlign: "right", borderRight: `1px solid #E5E7EB`, fontWeight: 500 }}>
                                        {hour}
                                    </div>
                                    {Array.from({ length: numProviders }).map((_, i) => (
                                        <div key={i} style={{ flex: 1, borderRight: i < numProviders - 1 ? `1px solid #E5E7EB` : "none" }}></div>
                                    ))}
                                </div>
                            ))}

                            {ENHANCED_SCHEDULE.appointments.map((apt, i) => (
                                <div key={i} style={{
                                    position: "absolute",
                                    top: `${apt.start * 60}px`,
                                    left: `calc(60px + (100% - 60px) * ${apt.provider} / ${numProviders})`,
                                    width: `calc((100% - 60px) / ${numProviders})`,
                                    height: `${apt.duration * 60 - 4}px`,
                                    background: apt.color === "#28a78d" || apt.color === "#00B67A" ? "#E8F5E9" : apt.color === "#f39c12" || apt.color === "#EA580C" ? "#FFF3E0" : apt.color === "#e74c3c" || apt.color === "#F43F5E" ? "#FEE2E2" : `${apt.color}15`,
                                    borderLeft: `4px solid ${apt.color === "#28a78d" ? GEO_GREEN : apt.color}`,
                                    borderRadius: 6,
                                    margin: "2px",
                                    padding: "8px 12px",
                                    display: "flex", flexDirection: "column",
                                    overflow: "hidden",
                                    boxSizing: "border-box"
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
                            {ENHANCED_SCHEDULE.gaps.map((gap, i) => (
                                <div key={i} style={{ background: "white", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                                        <Clock size={12} /> {gap.time} · {ENHANCED_SCHEDULE.providers[gap.provider]?.name || ENHANCED_SCHEDULE.providers[gap.provider]}
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
    const [activeTab, setActiveTab] = useState("practice");

    const tabs = [
        { id: "practice", label: "Practice Info", icon: "🏥" },
        { id: "users", label: "Users & Roles", icon: "👥" },
        { id: "audit", label: "HIPAA Audit Log", icon: "📋" },
        { id: "notifications", label: "Notifications", icon: "🔔" },
        { id: "billing", label: "Billing Prefs", icon: "💳" }
    ];

    return (
        <div style={{ padding: "20px 40px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>System Settings</h2>
            </div>

            <div style={{ display: "flex", gap: 32, flex: 1 }}>
                <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 20px",
                                borderRadius: 16, border: "none", cursor: "pointer", textAlign: "left",
                                background: activeTab === tab.id ? GEO_BLACK : "transparent",
                                color: activeTab === tab.id ? GEO_WHITE : GEO_TEXT_MAIN,
                                fontWeight: 600, fontSize: 15, transition: "all 0.2s"
                            }}
                            onMouseOver={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "#F4F5F7" }}
                            onMouseOut={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "transparent" }}
                        >
                            <span style={{ fontSize: 20 }}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ flex: 1, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 40, boxShadow: GEO_SHADOW }}>
                    {activeTab === "practice" && (
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: "0 0 32px 0" }}>Practice Information</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8 }}>Practice Name</label>
                                    <input type="text" defaultValue="Intelident Dental Associates" style={{ width: "100%", padding: 14, borderRadius: 12, border: `1px solid #E5E7EB`, fontSize: 15, color: GEO_TEXT_MAIN, background: "#F9FAFB", outline: "none", boxSizing: "border-box" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8 }}>Tax ID (TIN)</label>
                                    <input type="text" defaultValue="XX-XXXX420" style={{ width: "100%", padding: 14, borderRadius: 12, border: `1px solid #E5E7EB`, fontSize: 15, color: GEO_TEXT_MAIN, background: "#F9FAFB", outline: "none", boxSizing: "border-box" }} />
                                </div>
                                <div style={{ gridColumn: "span 2" }}>
                                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8 }}>Primary Address</label>
                                    <input type="text" defaultValue="420 Smile Avenue, Suite 100, Beverly Hills, CA 90210" style={{ width: "100%", padding: 14, borderRadius: 12, border: `1px solid #E5E7EB`, fontSize: 15, color: GEO_TEXT_MAIN, background: "#F9FAFB", outline: "none", boxSizing: "border-box" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, marginBottom: 8 }}>Phone Number</label>
                                    <input type="text" defaultValue="(555) 123-4567" style={{ width: "100%", padding: 14, borderRadius: 12, border: `1px solid #E5E7EB`, fontSize: 15, color: GEO_TEXT_MAIN, background: "#F9FAFB", outline: "none", boxSizing: "border-box" }} />
                                </div>
                            </div>
                            <button style={{ marginTop: 32, padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: GEO_GREEN, color: GEO_WHITE, fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 12px rgba(0, 182, 122, 0.2)" }}>Save Changes</button>
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>Users & Roles</h3>
                                <button style={{ padding: "10px 20px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: GEO_WHITE, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>+ Add User</button>
                            </div>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Name</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Role</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Status</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Last Login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: `1px solid #F4F5F7` }}>
                                        <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>Dr. Alexandru Cifor</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>Administrator</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_GREEN, fontWeight: 600 }}>Active</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>Just now</td>
                                    </tr>
                                    <tr style={{ borderBottom: `1px solid #F4F5F7` }}>
                                        <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>Sarah Jenkins</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>Front Desk Mgr</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_GREEN, fontWeight: 600 }}>Active</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>2 hours ago</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "audit" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                                <div>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>HIPAA Audit Log</h3>
                                    <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>Immutable record of PHI access</div>
                                </div>
                                <button style={{ padding: "10px 20px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, color: GEO_TEXT_MAIN, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Export CSV</button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 16, border: `1px solid #E5E7EB`, borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontFamily: "monospace" }}>Oct 25 10:42:01</div>
                                    <div style={{ padding: "4px 10px", background: "#E8F5E9", color: GEO_GREEN, borderRadius: 6, fontSize: 12, fontWeight: 700 }}>READ</div>
                                    <div style={{ fontSize: 14, color: GEO_TEXT_MAIN }}>Dr. Cifor accessed chart for patient <span style={{ fontWeight: 600 }}>Emma Watson</span></div>
                                </div>
                                <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 16, border: `1px solid #E5E7EB`, borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, fontFamily: "monospace" }}>Oct 25 09:15:33</div>
                                    <div style={{ padding: "4px 10px", background: "#E3F2FD", color: "#007AFF", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>UPDATE</div>
                                    <div style={{ fontSize: 14, color: GEO_TEXT_MAIN }}>System processed 835 ERA response for <span style={{ fontWeight: 600 }}>Michael Ross</span></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: "0 0 32px 0" }}>Notification Preferences</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: `1px solid #F4F5F7` }}>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 600, color: GEO_TEXT_MAIN }}>New End-of-Day Insights</div>
                                        <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>Receive AI summary of daily production when practice closes.</div>
                                    </div>
                                    <div style={{ width: 44, height: 24, borderRadius: 12, background: GEO_GREEN, position: "relative", cursor: "pointer" }}>
                                        <div style={{ width: 20, height: 20, borderRadius: 10, background: GEO_WHITE, position: "absolute", top: 2, right: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: `1px solid #F4F5F7` }}>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 600, color: GEO_TEXT_MAIN }}>Urgent Claim Denials</div>
                                        <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>Instant push notification when high-value ($500+) claim is denied.</div>
                                    </div>
                                    <div style={{ width: 44, height: 24, borderRadius: 12, background: GEO_GREEN, position: "relative", cursor: "pointer" }}>
                                        <div style={{ width: 20, height: 20, borderRadius: 10, background: GEO_WHITE, position: "absolute", top: 2, right: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "billing" && (
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: "0 0 32px 0" }}>Billing Preferences</h3>
                            <div style={{ background: "#F9FAFB", padding: 24, borderRadius: 16, border: `1px solid #E5E7EB`, marginBottom: 32 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: GEO_TEXT_MAIN, textTransform: "uppercase", marginBottom: 16 }}>Clearinghouse Integration</div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 8, background: GEO_WHITE, border: `1px solid #E5E7EB`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏥</div>
                                        <div>
                                            <div style={{ fontSize: 16, fontWeight: 600, color: GEO_TEXT_MAIN }}>Change Healthcare</div>
                                            <div style={{ fontSize: 13, color: GEO_GREEN, fontWeight: 600, marginTop: 4 }}>Connected API</div>
                                        </div>
                                    </div>
                                    <button style={{ padding: "8px 16px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, color: GEO_TEXT_MAIN, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Configure</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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



export function PatientDetailPageUI2({ patient, onBack, currentUI, setUI, TIMELINE_EVENTS, MEDICAL_HISTORY }) {
    const [activeTab, setActiveTab] = React.useState("Timeline");
    const [xrayFullscreen, setXrayFullscreen] = React.useState(null);
    const tabs = ["Timeline", "Medical History", "Treatment Plan", "Imaging & X-Rays", "Intake Forms", "Documents", "Insurance"];

    // Default mock data
    const safeTimeline = TIMELINE_EVENTS || [
        { date: "Oct 12, 2025", title: "Prophylaxis & Exam", provider: "Dr. Cifor / RDH Martinez", notes: "Routine cleaning completed. Patient reports mild sensitivity on upper right.", codes: ["D0120", "D1110"] }
    ];

    const safeMedHistory = MEDICAL_HISTORY || {
        vitals: { bp: "120/80", pulse: "72 bpm", weight: "165 lbs", height: "5'10\"" },
        conditions: [{ name: "Mild Hypertension", status: "Active", since: "2021", notes: "Controlled with medication" }],
        medications: [{ name: "Lisinopril 10mg", frequency: "Daily", purpose: "Blood pressure", prescriber: "PCP" }],
        family: "Father had cardiovascular disease.", social: "Social drinker, non-smoker.", surgeries: ["Appendectomy (2015)"]
    };

    const XRAYS = [
        {
            id: 1,
            title: "Panoramic Radiograph (Panorex)",
            date: "September 12, 2025",
            type: "2D Imaging",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/PAN_TEETH.jpg",
            notes: "Dr. Cifor: Impacted third molars (#1, 16, 17, 32) present. Mesioangular impaction on lower right (#32) approaching the mandibular nerve. Discussed extraction risks vs monitoring with patient. Will re-evaluate at next hygiene visit. Otherwise, bone levels appear stable across both arches."
        },
        {
            id: 2,
            title: "Bilateral Bitewings (4 Films)",
            date: "March 04, 2025",
            type: "Intraoral X-Ray",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/ZELLFAZE_MN01_MP08_010.JPG",
            notes: "Dr. Cifor: Slight decalcification on #14 mesial, but does not penetrate the DEJ. No active carious lesions detected interproximally. Recommend fluoride varnish application today and monitor. Margins on existing restorations #3 and #19 remain intact."
        }
    ];

    const FORMS = [
        {
            id: "f1", title: "New Patient Registration", date: "Jan 10, 2024", status: "Signed",
            preview: [{ label: "Full Legal Name", value: patient.name }, { label: "Date of Birth", value: patient.dob }, { label: "Phone Number", value: patient.phone }, { label: "Emergency Contact", value: "Spouse - (555) 998-1122" }]
        },
        {
            id: "f2", title: "HIPAA Privacy Notice & Consent", date: "Jan 10, 2024", status: "Signed",
            preview: [{ label: "Notice Acknowledged", value: "Yes" }, { label: "Authorized Release", value: "Spouse" }, { label: "Contact Preference", value: "Text Message & Email" }, { label: "Signature", value: "[Electronically Signed via iPad]" }]
        },
        {
            id: "f3", title: "Medical History Update 2025", date: "Sep 12, 2025", status: "Signed",
            preview: [{ label: "Changes to Health?", value: "No" }, { label: "Current Medications", value: safeMedHistory.medications.map(m => m.name).join(", ") }, { label: "Allergies", value: patient.allergies ? patient.allergies.join(", ") : "None reported" }, { label: "Blood Pressure (Self Reported)", value: "Normal / Controlled" }]
        }
    ];

    const DOCUMENTS = [
        { id: 1, name: "New Patient Intake Form", format: "PDF", date: "2025-09-10", size: "245 KB", category: "Forms" },
        { id: 2, name: "HIPAA Consent Form", format: "PDF", date: "2025-09-10", size: "120 KB", category: "Consent" },
        { id: 3, name: "Panoramic X-Ray", format: "DICOM", date: "2025-09-10", size: "8.2 MB", category: "Imaging" },
        { id: 4, name: "BWX Series", format: "DICOM", date: "2026-02-28", size: "12.4 MB", category: "Imaging" },
    ];

    const MOCK_TREATMENT_PLAN = [
        { id: "tx1", code: "D2740", description: "Crown - Porcelain/Ceramic (#19)", tooth: "19", fee: "$1,250", insEst: "$625", patEst: "$625", status: "Proposed" },
        { id: "tx2", code: "D2950", description: "Core Buildup, Including Any Pins", tooth: "19", fee: "$250", insEst: "$200", patEst: "$50", status: "Proposed" },
        { id: "tx3", code: "D1110", description: "Prophylaxis - Adult", tooth: "All", fee: "$110", insEst: "$110", patEst: "$0", status: "Accepted" }
    ];

    const MOCK_INSURANCE = {
        primary: { payer: patient.insurance || "Delta Dental PPO", group: "482093B", subId: "W0938481A", max: "$2,000", used: "$450", remaining: "$1,550", ded: "$50", dedMet: "Yes", renewal: "Jan 1" },
        dependents: [{ name: "Emma Chen", relation: "Child", dob: "2015-04-12" }]
    };

    return (
        <div style={{ padding: "20px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <button onClick={onBack} style={{ background: "none", border: "none", color: "#1C1E23", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, margin: 0, padding: 0 }}>
                        ← Back to Patients
                    </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ background: "#FFFFFF", borderRadius: "9999px", padding: 4, display: "flex", boxShadow: "0px 8px 30px rgba(0,0,0,0.04)" }}>
                        <button onClick={() => setUI("UI1")} style={{ padding: "8px 20px", borderRadius: "9999px", border: "none", background: currentUI === "UI1" ? "#1C1E23" : "transparent", color: currentUI === "UI1" ? "white" : "#8A8D93", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>UI1</button>
                        <button onClick={() => setUI("UI2")} style={{ padding: "8px 20px", borderRadius: "9999px", border: "none", background: currentUI === "UI2" ? "#1C1E23" : "transparent", color: currentUI === "UI2" ? "white" : "#8A8D93", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>UI2</button>
                    </div>
                </div>
            </div>

            {/* Patient Hero Profile */}
            <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <div style={{ width: 80, height: 80, borderRadius: 40, background: patient.status === "Overdue" ? "#FFF3E0" : "#F4F5F7", color: patient.status === "Overdue" ? "#E65100" : "#1C1E23", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 28, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}>
                        {patient.avatar}
                    </div>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1C1E23", margin: 0 }}>{patient.name}</h1>
                            <span style={{ background: patient.status === "Active" ? "#E8F5E9" : "#FFF3E0", color: patient.status === "Active" ? "#00B67A" : "#E65100", padding: "6px 12px", borderRadius: "9999px", fontSize: 12, fontWeight: 700 }}>{patient.status}</span>
                        </div>
                        <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#8A8D93", fontWeight: 500 }}>
                            <span>{patient.age} yrs · DOB: {patient.dob}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} /> {patient.phone}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={14} /> {patient.email}</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ background: "#F4F5F7", borderRadius: 16, padding: "12px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 12, color: "#8A8D93", fontWeight: 600, textTransform: "uppercase" }}>Primary Provider</span>
                        <span style={{ fontSize: 15, color: "#1C1E23", fontWeight: 700 }}>{patient.provider}</span>
                    </div>
                    <div style={{ background: "#F4F5F7", borderRadius: 16, padding: "12px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 12, color: "#8A8D93", fontWeight: 600, textTransform: "uppercase" }}>Insurance Payer</span>
                        <span style={{ fontSize: 15, color: "#1C1E23", fontWeight: 700 }}>{patient.insurance}</span>
                    </div>
                </div>
            </div>

            {/* Premium Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32, background: "#FFFFFF", padding: 8, borderRadius: "20px", boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", width: "fit-content" }}>
                {tabs.map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} style={{
                        padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s",
                        background: activeTab === t ? "#1C1E23" : "transparent", color: activeTab === t ? "white" : "#8A8D93",
                    }}>{t}</button>
                ))}
            </div>

            {/* Timeline Tab */}
            {activeTab === "Timeline" && (
                <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1E23", marginBottom: 32, marginTop: 0 }}>Clinical Timeline</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {safeTimeline.map((ev, i) => (
                            <div key={i} style={{ display: "flex", gap: 24, position: "relative" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 22, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                                        <Stethoscope size={20} color="#00B67A" />
                                    </div>
                                    {i < safeTimeline.length - 1 && <div style={{ position: "absolute", top: 44, bottom: -24, left: 21, width: 2, background: "#E5E7EB", zIndex: 1 }} />}
                                </div>
                                <div style={{ flex: 1, paddingBottom: 40 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                        <div style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23" }}>{ev.title}</div>
                                        <div style={{ fontSize: 14, color: "#8A8D93", fontWeight: 600 }}>{ev.date}</div>
                                    </div>
                                    <div style={{ display: "inline-block", background: "#F4F5F7", color: "#1C1E23", padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{ev.provider}</div>
                                    <p style={{ fontSize: 15, color: "#545963", lineHeight: 1.6, margin: "0 0 16px 0" }}>{ev.notes}</p>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {ev.codes.map(c => (
                                            <span key={c} style={{ border: "1px solid #E5E7EB", color: "#8A8D93", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Medical History Tab */}
            {activeTab === "Medical History" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: 0 }}>Patient Vitals</h3>
                            <button style={{ color: "#00B67A", background: "none", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Edit3 size={16} /> Edit</button>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div style={{ background: "#F4F5F7", padding: "20px", borderRadius: 16 }}>
                                <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 600, marginBottom: 4 }}>Blood Pressure</div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: "#1C1E23" }}>{safeMedHistory.vitals.bp}</div>
                            </div>
                            <div style={{ background: "#F4F5F7", padding: "20px", borderRadius: 16 }}>
                                <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 600, marginBottom: 4 }}>Pulse</div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: "#1C1E23" }}>{safeMedHistory.vitals.pulse}</div>
                            </div>
                            <div style={{ background: "#F4F5F7", padding: "20px", borderRadius: 16 }}>
                                <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 600, marginBottom: 4 }}>Weight</div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: "#1C1E23" }}>{safeMedHistory.vitals.weight}</div>
                            </div>
                            <div style={{ background: "#F4F5F7", padding: "20px", borderRadius: 16 }}>
                                <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 600, marginBottom: 4 }}>Height</div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: "#1C1E23" }}>{safeMedHistory.vitals.height}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: "0 0 24px 0" }}>Active Conditions</h3>
                            {safeMedHistory.conditions.map((c, i) => (
                                <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < safeMedHistory.conditions.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                        <span style={{ fontWeight: 700, fontSize: 16, color: "#1C1E23" }}>{c.name}</span>
                                        <span style={{ background: c.status === "Active" ? "#FFF3E0" : "#E8F5E9", color: c.status === "Active" ? "#E65100" : "#00B67A", padding: "4px 12px", borderRadius: "9999px", fontSize: 12, fontWeight: 700 }}>{c.status}</span>
                                    </div>
                                    <div style={{ fontSize: 14, color: "#545963", lineHeight: 1.5 }}>Since {c.since} — {c.notes}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: "0 0 24px 0" }}>Current Medications</h3>
                            {safeMedHistory.medications.map((m, i) => (
                                <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < safeMedHistory.medications.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                                    <div style={{ fontWeight: 700, fontSize: 16, color: "#1C1E23", marginBottom: 4 }}>{m.name}</div>
                                    <div style={{ fontSize: 14, color: "#545963", lineHeight: 1.5 }}>{m.frequency} · For {m.purpose} ({m.prescriber})</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ gridColumn: "1 / -1", background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: "0 0 24px 0" }}>Family & Social Baseline</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                            <div style={{ background: "#F4F5F7", padding: 24, borderRadius: 16 }}>
                                <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Family History</div>
                                <div style={{ fontSize: 15, color: "#1C1E23", lineHeight: 1.6 }}>{safeMedHistory.family}</div>
                            </div>
                            <div style={{ background: "#F4F5F7", padding: 24, borderRadius: 16 }}>
                                <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Social History</div>
                                <div style={{ fontSize: 15, color: "#1C1E23", lineHeight: 1.6 }}>{safeMedHistory.social}</div>
                            </div>
                            <div style={{ background: "#F4F5F7", padding: 24, borderRadius: 16 }}>
                                <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Surgical History</div>
                                <div style={{ fontSize: 15, color: "#1C1E23", lineHeight: 1.6 }}>{safeMedHistory.surgeries.join(", ")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Imaging & X-Rays Tab */}
            {activeTab === "Imaging & X-Rays" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    {XRAYS.map(xray => (
                        <div key={xray.id} style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB", display: "flex", gap: 40 }}>
                            <div style={{ width: 400, flexShrink: 0 }}>
                                <div onClick={() => setXrayFullscreen(xray.imageUrl)} style={{ width: "100%", height: 260, borderRadius: 16, overflow: "hidden", background: "#111", position: "relative", border: "4px solid #F4F5F7", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer" }}>
                                    <img src={xray.imageUrl} alt={xray.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9, transition: "opacity 0.2s" }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.9} />
                                    <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "6px 12px", borderRadius: 8, color: "white", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, pointerEvents: "none" }}>
                                        <Camera size={12} /> {xray.type}
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <div>
                                        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1C1E23", margin: "0 0 6px 0" }}>{xray.title}</h3>
                                        <div style={{ fontSize: 14, color: "#8A8D93", fontWeight: 500 }}>Captured on {xray.date}</div>
                                    </div>
                                    <button style={{ padding: "10px", borderRadius: 12, border: "1px solid #E5E7EB", background: "#F4F5F7", color: "#1C1E23", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Download size={18} />
                                    </button>
                                </div>
                                <div style={{ flex: 1, background: "#FFF5F0", borderRadius: 16, padding: 24, border: "1px solid #FFEDD5" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                        <div style={{ width: 24, height: 24, borderRadius: 12, background: "#EA580C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <FileText size={12} color="white" />
                                        </div>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: "#EA580C" }}>Clinical Analysis</span>
                                    </div>
                                    <p style={{ fontSize: 15, color: "#1C1E23", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                        {xray.notes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Intake Forms Tab */}
            {activeTab === "Intake Forms" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                    {FORMS.map(form => (
                        <div key={form.id} style={{ background: "#FFFFFF", borderRadius: "24px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 16, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FileText size={24} color="#00B67A" />
                                </div>
                                <span style={{ background: "#F4F5F7", color: "#1C1E23", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{form.status}</span>
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: "0 0 6px 0" }}>{form.title}</h3>
                            <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 500, marginBottom: 24 }}>Completed {form.date}</div>

                            <div style={{ flex: 1, background: "#F4F5F7", borderRadius: 12, padding: 16, marginBottom: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                                {form.preview.map((row, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: i < form.preview.length - 1 ? "1px solid #E5E7EB" : "none", paddingBottom: i < form.preview.length - 1 ? 8 : 0 }}>
                                        <span style={{ fontSize: 12, color: "#8A8D93", fontWeight: 600 }}>{row.label}</span>
                                        <span style={{ fontSize: 12, color: "#1C1E23", fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            <button style={{ width: "100%", padding: "12px", borderRadius: "9999px", border: "1px solid #E5E7EB", background: "white", color: "#1C1E23", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}>
                                <File size={16} /> View Full PDF
                            </button>
                        </div>
                    ))}

                    {/* Add New Form Card */}
                    <div style={{ background: "transparent", borderRadius: "24px", padding: 32, border: "2px dashed #D1D5DB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border 0.2s" }}>
                        <div style={{ width: 56, height: 56, borderRadius: 28, background: "#F4F5F7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                            <Plus size={24} color="#8A8D93" />
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#8A8D93", margin: "0" }}>Assign New Form</h3>
                    </div>
                </div>
            )}

            {/* Documents Tab */}
            {activeTab === "Documents" && (
                <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1E23", margin: 0 }}>Document Library</h2>
                        <button style={{ background: "#1C1E23", color: "white", border: "none", padding: "10px 20px", borderRadius: 12, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}><Plus size={16} /> Upload Document</button>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                        {["All", "Forms", "Imaging", "Consent"].map(cat => (
                            <button key={cat} style={{ padding: "8px 16px", borderRadius: "9999px", border: "1px solid #E5E7EB", background: cat === "All" ? "#F4F5F7" : "white", color: "#1C1E23", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{cat}</button>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {DOCUMENTS.map((doc, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: i < DOCUMENTS.length - 1 ? "1px solid #E5E7EB" : "none", transition: "background 0.2s", borderRadius: 12, cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <FileText size={20} color="#00B67A" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1E23", marginBottom: 4 }}>{doc.name}</div>
                                        <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 500 }}>{doc.format} • {doc.size} • Added {doc.date}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <div style={{ background: "#F4F5F7", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#8A8D93" }}>{doc.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Treatment Plan Tab */}
            {activeTab === "Treatment Plan" && (
                <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1E23", margin: 0 }}>Proposed Treatment</h2>
                        <div style={{ padding: "8px 16px", borderRadius: "9999px", background: "#FFF5F0", color: "#EA580C", fontSize: 13, fontWeight: 700 }}>Total Patient Portion: $675.00</div>
                    </div>

                    <div style={{ borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ background: "#F4F5F7" }}>
                                    <th style={{ padding: "16px", fontSize: 13, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase" }}>Code</th>
                                    <th style={{ padding: "16px", fontSize: 13, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase" }}>Description</th>
                                    <th style={{ padding: "16px", fontSize: 13, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase" }}>Tooth</th>
                                    <th style={{ padding: "16px", fontSize: 13, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase" }}>Fee</th>
                                    <th style={{ padding: "16px", fontSize: 13, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase" }}>Ins Est</th>
                                    <th style={{ padding: "16px", fontSize: 13, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase" }}>Pat Est</th>
                                    <th style={{ padding: "16px", fontSize: 13, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_TREATMENT_PLAN.map((tx, i) => (
                                    <tr key={tx.id} style={{ borderTop: "1px solid #E5E7EB", background: i % 2 === 0 ? "white" : "#F9FAFB" }}>
                                        <td style={{ padding: "16px", fontSize: 14, color: "#1C1E23", fontWeight: 600 }}>{tx.code}</td>
                                        <td style={{ padding: "16px", fontSize: 14, color: "#545963", fontWeight: 500 }}>{tx.description}</td>
                                        <td style={{ padding: "16px", fontSize: 14, color: "#1C1E23", fontWeight: 600 }}>{tx.tooth}</td>
                                        <td style={{ padding: "16px", fontSize: 14, color: "#1C1E23", fontWeight: 500 }}>{tx.fee}</td>
                                        <td style={{ padding: "16px", fontSize: 14, color: "#00B67A", fontWeight: 600 }}>{tx.insEst}</td>
                                        <td style={{ padding: "16px", fontSize: 14, color: "#EA580C", fontWeight: 700 }}>{tx.patEst}</td>
                                        <td style={{ padding: "16px" }}>
                                            <span style={{ padding: "4px 10px", borderRadius: "9999px", fontSize: 12, fontWeight: 700, background: tx.status === "Accepted" ? "#E8F5E9" : "#F4F5F7", color: tx.status === "Accepted" ? "#00B67A" : "#8A8D93" }}>{tx.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Insurance Tab */}
            {activeTab === "Insurance" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1C1E23", margin: 0 }}>{MOCK_INSURANCE.primary.payer}</h2>
                                <span style={{ background: "#E8F5E9", color: "#00B67A", padding: "4px 12px", borderRadius: "9999px", fontSize: 12, fontWeight: 700 }}>Primary Active</span>
                            </div>
                            <div style={{ fontSize: 14, color: "#8A8D93", fontWeight: 500 }}>Group: {MOCK_INSURANCE.primary.group} • Subscriber ID: {MOCK_INSURANCE.primary.subId}</div>
                        </div>
                        <button style={{ background: "#F4F5F7", color: "#1C1E23", border: "none", padding: "10px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Edit3 size={16} /> Update Policy</button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                        <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                            <div style={{ fontSize: 14, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Annual Maximum</div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: "#1C1E23", marginBottom: 16 }}>{MOCK_INSURANCE.primary.max}</div>
                            <div style={{ width: "100%", height: 8, background: "#F4F5F7", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                                <div style={{ width: "22%", height: "100%", background: "#00B67A", borderRadius: 4 }}></div>
                            </div>
                        </div>

                        <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                            <div style={{ fontSize: 14, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Deductible</div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: "#1C1E23", marginBottom: 16 }}>{MOCK_INSURANCE.primary.ded}</div>
                            <div style={{ background: "#E8F5E9", color: "#00B67A", padding: "8px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}><CheckCircle size={16} /> Met for year</div>
                        </div>

                        <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                            <div style={{ fontSize: 14, color: "#8A8D93", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Renewal Plan</div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: "#1C1E23", marginBottom: 16 }}>{MOCK_INSURANCE.primary.renewal}</div>
                            <div style={{ fontSize: 13, color: "#8A8D93", fontWeight: 500, lineHeight: 1.5 }}>Benefits reset annually on January 1st. Standard waiting periods may apply to major restorative.</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen X-Ray Modal */}
            {xrayFullscreen && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }} onClick={() => setXrayFullscreen(null)}>
                    <img src={xrayFullscreen} alt="X-Ray Fullscreen" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 12, boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()} />
                    <button onClick={() => setXrayFullscreen(null)} style={{ position: "absolute", top: 32, right: 32, background: "white", color: "#1C1E23", border: "none", width: 48, height: 48, borderRadius: 24, fontSize: 24, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>✕</button>
                </div>
            )}
        </div>
    );
}

// ==========================================
// UI2: BILLING & CLAIMS MODULE
// ==========================================
export function BillingPageUI2({ currentUI, setUI }) {
    const [view, setView] = useState("claims"); // "claims", "aging", "claim-detail"
    const [selectedClaim, setSelectedClaim] = useState(null);

    // Mock Data for Claims
    const MOCK_CLAIMS = [
        { id: "CLM-9021", patient: "Sarah Chen", provider: "Dr. Cifor", date: "Oct 24, 2023", codes: "D1110, D0274", billed: "$210.00", insEst: "$180.00", status: "Denied", statusColor: "#FF3B30", aiNote: "Missing Tooth number on D2740 (Crown). Add tooth number to the claim and resubmit." },
        { id: "CLM-9022", patient: "Michael Ross", provider: "Dr. Vargas", date: "Oct 24, 2023", codes: "D2740", billed: "$1,200.00", insEst: "$600.00", status: "Needs Attention", statusColor: "#FFD100" },
        { id: "CLM-9023", patient: "Emma Watson", provider: "Dr. Mayeda", date: "Oct 23, 2023", codes: "D0120, D1110", billed: "$150.00", insEst: "$150.00", status: "Paid", statusColor: "#00B67A" },
        { id: "CLM-9024", patient: "James Smith", provider: "Dr. Cifor", date: "Oct 23, 2023", codes: "D2391", billed: "$250.00", insEst: "$200.00", status: "Submitted", statusColor: "#007AFF" },
        { id: "CLM-9025", patient: "Olivia Jones", provider: "Dr. Vargas", date: "Oct 22, 2023", codes: "D4341 x2", billed: "$500.00", insEst: "$400.00", status: "Pending", statusColor: "#8A8D93" },
    ];

    const MOCK_AGING = [
        { patient: "John Doe", current: "$0.00", over30: "$150.00", over60: "$0.00", over90: "$0.00", total: "$150.00" },
        { patient: "Jane Smith", current: "$45.00", over30: "$0.00", over60: "$200.00", over90: "$0.00", total: "$245.00" },
        { patient: "Bob Brown", current: "$0.00", over30: "$0.00", over60: "$0.00", over90: "$850.00", total: "$850.00" }
    ];

    return (
        <div style={{ padding: "20px 40px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, marginBottom: 32 }}>
                <div style={{ display: "flex", gap: 16 }}>
                    <button onClick={() => setView("claims")} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: view === "claims" || view === "claim-detail" ? GEO_BLACK : GEO_WHITE, color: view === "claims" || view === "claim-detail" ? GEO_WHITE : GEO_TEXT_MAIN, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", boxShadow: view === "claims" || view === "claim-detail" ? "0 8px 16px rgba(0,0,0,0.15)" : GEO_SHADOW }}>Claims Tracker</button>
                    <button onClick={() => setView("aging")} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: view === "aging" ? GEO_BLACK : GEO_WHITE, color: view === "aging" ? GEO_WHITE : GEO_TEXT_MAIN, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", boxShadow: view === "aging" ? "0 8px 16px rgba(0,0,0,0.15)" : GEO_SHADOW }}>Aging Report</button>
                </div>
                {view === "claims" && (
                    <div style={{ display: "flex", gap: 12 }}>
                        <div style={{ background: GEO_WHITE, borderRadius: GEO_PILL, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: `1px solid #E5E7EB` }}>
                            <Filter size={16} color={GEO_TEXT_MUTED} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN }}>Filter</span>
                        </div>
                        <button style={{ padding: "10px 24px", borderRadius: GEO_PILL, border: "none", background: GEO_GREEN, color: GEO_WHITE, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0, 182, 122, 0.2)" }}>
                            Submit Selected (3)
                        </button>
                    </div>
                )}
            </div>

            {view === "claims" && (
                <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, flex: 1 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: "0 0 24px 0" }}>Recent Claims</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>ID</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Patient</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Provider</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Date</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>CDT Codes</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Billed Amount</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Ins Est</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Status</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "right", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_CLAIMS.map((claim, idx) => (
                                <tr key={idx} style={{ borderBottom: `1px solid #F4F5F7`, cursor: "pointer", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#F9FAFB"} onMouseOut={e => e.currentTarget.style.background = "transparent"} onClick={() => { setSelectedClaim(claim); setView("claim-detail"); }}>
                                    <td style={{ padding: "20px 0", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN }}>{claim.id}</td>
                                    <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{claim.patient}</td>
                                    <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{claim.provider}</td>
                                    <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{claim.date}</td>
                                    <td style={{ padding: "20px 0", fontSize: 14, fontFamily: "monospace", color: GEO_TEXT_MAIN }}>{claim.codes}</td>
                                    <td style={{ padding: "20px 0", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN }}>{claim.billed}</td>
                                    <td style={{ padding: "20px 0", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN }}>{claim.insEst}</td>
                                    <td style={{ padding: "20px 0" }}>
                                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: GEO_PILL, fontSize: 12, fontWeight: 600, color: claim.statusColor, background: `${claim.statusColor}15` }}>
                                            <CircleDot size={12} fill={claim.statusColor} /> {claim.status}
                                        </div>
                                    </td>
                                    <td style={{ padding: "20px 0", textAlign: "right" }}>
                                        <button style={{ background: "transparent", border: "none", cursor: "pointer", color: GEO_TEXT_MUTED }}><MoreHorizontal size={20} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {view === "claim-detail" && selectedClaim && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button onClick={() => setView("claims")} style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid #E5E7EB`, background: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.1s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
                            <ArrowDownToLine size={20} color={GEO_TEXT_MAIN} style={{ transform: "rotate(90deg)" }} />
                        </button>
                        <div>
                            <h2 style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>Claim {selectedClaim.id}</h2>
                            <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>{selectedClaim.patient} • {selectedClaim.date}</div>
                        </div>
                        <div style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: GEO_PILL, fontSize: 14, fontWeight: 700, color: selectedClaim.statusColor, background: `${selectedClaim.statusColor}15` }}>
                            <CircleDot size={14} fill={selectedClaim.statusColor} /> {selectedClaim.status}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 30 }}>
                        <div style={{ flex: 2, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 24px 0" }}>Procedure Line Items</h3>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Code</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Description</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "right", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: `1px solid #F4F5F7` }}>
                                        <td style={{ padding: "16px 0", fontSize: 14, fontFamily: "monospace", color: GEO_TEXT_MAIN }}>D2740</td>
                                        <td style={{ padding: "16px 0", fontSize: 14, color: GEO_TEXT_MAIN }}>Crown - porcelain/ceramic</td>
                                        <td style={{ padding: "16px 0", fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, textAlign: "right" }}>{selectedClaim.billed}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                            {selectedClaim.status === "Denied" && (
                                <div style={{ background: "#FFF0F0", border: `1px solid #FF3B30`, borderRadius: GEO_RADIUS, padding: 32, position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.1 }}><Shield size={120} color="#FF3B30" /></div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                        <Sparkles size={20} color="#FF3B30" />
                                        <span style={{ fontSize: 18, fontWeight: 700, color: "#FF3B30" }}>AI Denial Analysis</span>
                                    </div>
                                    <div style={{ fontSize: 15, color: "#1C1E23", lineHeight: 1.6, fontWeight: 500 }}>
                                        {selectedClaim.aiNote}
                                    </div>
                                    <button style={{ marginTop: 24, padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: "#FF3B30", color: "#FFFFFF", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center", boxShadow: "0 4px 12px rgba(255, 59, 48, 0.3)" }}>
                                        <Edit3 size={16} /> Edit & Resubmit
                                    </button>
                                </div>
                            )}

                            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                                <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 24px 0" }}>Status Timeline</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <div style={{ display: "flex", gap: 16 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: 6, background: selectedClaim.statusColor, marginTop: 4, outline: `4px solid ${selectedClaim.statusColor}20` }} />
                                        <div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{selectedClaim.status}</div>
                                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4 }}>Oct 25, 2023 10:45 AM</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: 16 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: 6, background: GEO_BG, marginTop: 4 }} />
                                        <div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>Submitted via Clearinghouse</div>
                                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4 }}>Oct 24, 2023 5:30 PM</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: 16 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: 6, background: GEO_BG, marginTop: 4 }} />
                                        <div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>Claim Created</div>
                                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4 }}>Oct 24, 2023 4:15 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {view === "aging" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
                        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.02)", border: `1px solid #E5E7EB` }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Current (0-30 days)</div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: GEO_TEXT_MAIN, marginTop: 12 }}>$4,500</div>
                        </div>
                        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.02)", border: `1px solid #E5E7EB` }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>31-60 Days</div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: GEO_TEXT_MAIN, marginTop: 12 }}>$1,250</div>
                        </div>
                        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.02)", border: `1px solid #E5E7EB` }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>61-90 Days</div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: "#FFD100", marginTop: 12 }}>$850</div>
                        </div>
                        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.02)", border: `1px solid #E5E7EB` }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>90+ Days</div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: "#FF3B30", marginTop: 12 }}>$1,420</div>
                        </div>
                    </div>

                    <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: "0 0 24px 0" }}>Patient Balances</h3>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                                    <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Patient</th>
                                    <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Current</th>
                                    <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>31-60</th>
                                    <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>61-90</th>
                                    <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>90+</th>
                                    <th style={{ padding: "0 0 16px 0", textAlign: "right", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Total Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_AGING.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: `1px solid #F4F5F7` }}>
                                        <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{row.patient}</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{row.current}</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{row.over30}</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{row.over60}</td>
                                        <td style={{ padding: "20px 0", fontSize: 14, color: "#FF3B30", fontWeight: 600 }}>{row.over90}</td>
                                        <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 700, color: GEO_TEXT_MAIN, textAlign: "right" }}>{row.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// ==========================================
// UI2: RECALL & REACTIVATION MODULE
// ==========================================
export function RecallPageUI2({ currentUI, setUI }) {
    const [view, setView] = useState("recall"); // "recall", "reactivation"
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [aiDraftMessage, setAiDraftMessage] = useState("");
    const [contactMethod, setContactMethod] = useState("sms");

    const MOCK_RECALLS = {
        dueThisMonth: [
            { id: "R1", name: "Sarah Chen", lastVisit: "Apr 15, 2023", method: "sms", status: "Not Contacted" },
            { id: "R2", name: "David Kim", lastVisit: "Apr 22, 2023", method: "email", status: "Sent (2 days ago)" }
        ],
        overdue1to3: [
            { id: "R3", name: "Emma Watson", lastVisit: "Jan 10, 2023", method: "sms", status: "Given Up" },
            { id: "R4", name: "James Smith", lastVisit: "Feb 05, 2023", method: "email", status: "Not Contacted" }
        ],
        overdue3plus: [
            { id: "R5", name: "Olivia Jones", lastVisit: "Aug 12, 2022", method: "sms", status: "Not Contacted" },
            { id: "R6", name: "Jackson White", lastVisit: "Jun 02, 2022", method: "email", status: "Given Up" }
        ]
    };

    const MOCK_REACTIVATION = [
        { id: "RE1", name: "Michael Ross", lastVisit: "Mar 15, 2021", status: "Not Contacted", lastContact: "Never" },
        { id: "RE2", name: "Sophia Lewis", lastVisit: "Jul 22, 2021", status: "Sent", lastContact: "Yesterday" },
        { id: "RE3", name: "William Davis", lastVisit: "Oct 10, 2020", status: "Opened", lastContact: "2 hours ago" },
        { id: "RE4", name: "Isabella Martinez", lastVisit: "Dec 05, 2019", status: "Booked", lastContact: "Today 9:00 AM" }
    ];

    const openContactModal = (patient) => {
        setSelectedPatient(patient);
        setAiDraftMessage(`Hi ${patient.name.split(" ")[0]},\n\nIt's been a while since your last visit on ${patient.lastVisit}. Dr. Cifor wanted us to reach out and make sure you're doing well. We have some openings next week if you'd like to schedule your routine hygiene exam.\n\nReply YES to book or call us at (555) 123-4567.\n\nBest,\nIntelident Dental`);
        setAiModalOpen(true);
    };

    const RecallColumn = ({ title, patients, color }) => (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, borderBottom: `2px solid ${color}20` }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: GEO_TEXT_MAIN }}>{title}</h4>
                <div style={{ padding: "4px 10px", borderRadius: GEO_PILL, background: `${color}15`, color: color, fontSize: 13, fontWeight: 700 }}>{patients.length}</div>
            </div>
            {patients.map(p => (
                <div key={p.id} style={{ background: GEO_WHITE, borderRadius: 20, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.02)", border: `1px solid #E5E7EB` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: GEO_TEXT_MAIN }}>{p.name}</div>
                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4 }}>Last Visit: {p.lastVisit}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: p.status === "Not Contacted" ? GEO_TEXT_MUTED : (p.status.includes("Sent") ? GEO_GREEN : "#FFD100") }}>
                            <CircleDot size={12} fill={p.status === "Not Contacted" ? GEO_TEXT_MUTED : (p.status.includes("Sent") ? GEO_GREEN : "#FFD100")} /> {p.status}
                        </div>
                    </div>
                    <button onClick={() => openContactModal(p)} style={{ width: "100%", padding: "10px", borderRadius: GEO_PILL, border: `1px solid ${GEO_BLACK}`, background: "transparent", color: GEO_BLACK, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s", display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                        <Sparkles size={16} /> AI Contact Draft
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ padding: "20px 40px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, marginBottom: 32 }}>
                <div style={{ display: "flex", gap: 16 }}>
                    <button onClick={() => setView("recall")} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: view === "recall" ? GEO_BLACK : GEO_WHITE, color: view === "recall" ? GEO_WHITE : GEO_TEXT_MAIN, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", boxShadow: view === "recall" ? "0 8px 16px rgba(0,0,0,0.15)" : GEO_SHADOW }}>Recalls (Active)</button>
                    <button onClick={() => setView("reactivation")} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: view === "reactivation" ? GEO_BLACK : GEO_WHITE, color: view === "reactivation" ? GEO_WHITE : GEO_TEXT_MAIN, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", boxShadow: view === "reactivation" ? "0 8px 16px rgba(0,0,0,0.15)" : GEO_SHADOW }}>Reactivation (12m+)</button>
                </div>
            </div>

            {view === "recall" && (
                <div style={{ display: "flex", gap: 32, flex: 1, overflowX: "auto", paddingBottom: 24 }}>
                    <RecallColumn title="Due This Month" patients={MOCK_RECALLS.dueThisMonth} color={GEO_GREEN} />
                    <RecallColumn title="Overdue 1-3 Months" patients={MOCK_RECALLS.overdue1to3} color={"#FFD100"} />
                    <RecallColumn title="Overdue 3+ Months" patients={MOCK_RECALLS.overdue3plus} color={"#FF3B30"} />
                </div>
            )}

            {view === "reactivation" && (
                <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, flex: 1 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: "0 0 24px 0" }}>Patient Reactivation Campaigns</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Patient</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Last Visit</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Last Contact</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Campaign Status</th>
                                <th style={{ padding: "0 0 16px 0", textAlign: "right", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_REACTIVATION.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: `1px solid #F4F5F7` }}>
                                    <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{row.name}</td>
                                    <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{row.lastVisit}</td>
                                    <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{row.lastContact}</td>
                                    <td style={{ padding: "20px 0" }}>
                                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: GEO_PILL, fontSize: 12, fontWeight: 600, color: row.status === "Booked" ? GEO_GREEN : (row.status === "Opened" ? "#007AFF" : (row.status === "Sent" ? "#FFD100" : GEO_TEXT_MUTED)), background: `${row.status === "Booked" ? GEO_GREEN : (row.status === "Opened" ? "#007AFF" : (row.status === "Sent" ? "#FFD100" : GEO_TEXT_MUTED))}15` }}>
                                            <CircleDot size={12} fill={row.status === "Booked" ? GEO_GREEN : (row.status === "Opened" ? "#007AFF" : (row.status === "Sent" ? "#FFD100" : GEO_TEXT_MUTED))} /> {row.status}
                                        </div>
                                    </td>
                                    <td style={{ padding: "20px 0", textAlign: "right" }}>
                                        <button style={{ padding: "8px 16px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, color: GEO_TEXT_MAIN, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = GEO_BG} onMouseOut={e => e.currentTarget.style.background = GEO_WHITE}>
                                            <Mail size={14} /> 1-Click Send
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {aiModalOpen && selectedPatient && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }} onClick={() => setAiModalOpen(false)}>
                    <div style={{ background: GEO_WHITE, borderRadius: 32, padding: 40, width: "100%", maxWidth: 600, boxShadow: "0 24px 48px rgba(0,0,0,0.2)", position: "relative" }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setAiModalOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: GEO_BG, border: "none", width: 36, height: 36, borderRadius: 18, fontSize: 18, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${GEO_GREEN}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Sparkles size={22} color={GEO_GREEN} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN }}>AI Outreach Draft</h3>
                                <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>For {selectedPatient.name} (Last Visit: {selectedPatient.lastVisit})</div>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                            <button onClick={() => setContactMethod("sms")} style={{ flex: 1, padding: "12px", borderRadius: 12, border: `2px solid ${contactMethod === "sms" ? GEO_BLACK : 'transparent'}`, background: GEO_BG, fontWeight: 600, fontSize: 14, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "border 0.2s" }}>
                                <Phone size={16} /> SMS Text
                            </button>
                            <button onClick={() => setContactMethod("email")} style={{ flex: 1, padding: "12px", borderRadius: 12, border: `2px solid ${contactMethod === "email" ? GEO_BLACK : 'transparent'}`, background: GEO_BG, fontWeight: 600, fontSize: 14, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "border 0.2s" }}>
                                <Mail size={16} /> Email
                            </button>
                        </div>

                        <textarea value={aiDraftMessage} onChange={(e) => setAiDraftMessage(e.target.value)} style={{ width: "100%", height: 180, padding: 20, borderRadius: 16, border: `1px solid #E5E7EB`, background: GEO_WHITE, fontSize: 15, fontFamily: "inherit", color: GEO_TEXT_MAIN, lineHeight: 1.6, resize: "none", boxSizing: "border-box", marginBottom: 24, outline: "none" }} />

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button onClick={() => setAiModalOpen(false)} style={{ padding: "14px 28px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, fontWeight: 600, fontSize: 15, color: GEO_TEXT_MAIN, cursor: "pointer" }}>Cancel</button>
                            <button onClick={() => setAiModalOpen(false)} style={{ padding: "14px 28px", borderRadius: GEO_PILL, border: "none", background: GEO_GREEN, fontWeight: 600, fontSize: 15, color: GEO_WHITE, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0, 182, 122, 0.2)" }}>
                                Send {contactMethod === "sms" ? "Message" : "Email"} <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
