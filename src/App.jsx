import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, AreaChart, Area } from "recharts";
import {
    LayoutDashboard, Users, Calendar, FileText, BarChart3, Settings, Search, Bell, Phone, Mail, Filter, ChevronDown, Stethoscope, MessageSquare, Clipboard, PhoneCall, Globe, Copy, Play, Square, Plus, Trash2, GripVertical, Download, Eye, File, Activity, UsersRound, CalendarCheck, Wallet, ArrowDownToLine, MoreHorizontal, Clock, Check, CheckCircle, Shield, Sparkles, TrendingUp, Type, CalendarDays, AlignLeft, ListChecks, Hash, CircleDot, Edit3, Repeat, Camera, Image as ImageIcon, Mic, ArrowRight, Loader2, Menu, X, BadgePercent, AlertTriangle, FileHeart, XOctagon, ExternalLink
} from "lucide-react";

// ═══════════════════════════════════════════
// BRAND CONSTANTS (UI1)
// ═══════════════════════════════════════════
const TEAL = "#28a78d";
const TEAL_LIGHT = "#e9f6f2";
const SB_BG = "#ffffff";
const PAGE_BG = "#f8f9fa";
const RED = "#E74C3C";
const ORANGE = "#F39C12";
const PURPLE = "#8B5CF6";
const GRAY = {
    50: "#F8FAFC", 100: "#F1F5F9", 200: "#E2E8F0", 300: "#CBD5E1",
    400: "#94A3B8", 500: "#64748B", 600: "#475569", 700: "#334155", 800: "#1f2937"
};

// ═══════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════
const PATIENTS = [
    { id: 1, name: "Sarah Chen", age: 34, dob: "1991-08-14", phone: "(555) 234-0011", email: "sarah.chen@email.com", insurance: "Delta Dental PPO", lastVisit: "2026-02-15", nextAppt: "2026-03-12", nextApptTime: "9:00 AM", balance: 0, status: "Active", allergies: ["Penicillin"], provider: "Dr. Cifor", photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Female", dept: "Orthodontics" },
    { id: 2, name: "Marcus Rivera", age: 52, dob: "1973-11-22", phone: "(555) 678-2233", email: "m.rivera@email.com", insurance: "MetLife DHMO", lastVisit: "2026-02-20", nextAppt: "2026-03-04", nextApptTime: "9:30 AM", balance: 245, status: "Active", allergies: [], provider: "Dr. Cifor", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Male", dept: "General" },
    { id: 3, name: "Emily Watson", age: 28, dob: "1997-04-03", phone: "(555) 321-5567", email: "ewatson@email.com", insurance: "Cigna Dental", lastVisit: "2026-01-18", nextAppt: null, nextApptTime: null, balance: 0, status: "Overdue", allergies: ["Latex"], provider: "Dr. Vargas", photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Female", dept: "Surgery" },
    { id: 4, name: "James Okafor", age: 45, dob: "1980-09-30", phone: "(555) 445-8890", email: "james.ok@email.com", insurance: "Aetna DMO", lastVisit: "2026-02-28", nextAppt: "2026-04-01", nextApptTime: "11:00 AM", balance: 120, status: "Active", allergies: [], provider: "Dr. Vargas", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Male", dept: "Surgery" },
    { id: 5, name: "Linda Tran", age: 61, dob: "1964-12-07", phone: "(555) 112-7744", email: "l.tran@email.com", insurance: "Medicare", lastVisit: "2026-02-10", nextAppt: "2026-03-10", nextApptTime: "1:00 PM", balance: 0, status: "Active", allergies: ["Codeine", "NSAIDs"], provider: "Dr. Cifor", photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Female", dept: "General" },
    { id: 6, name: "Robert Kim", age: 38, dob: "1987-06-19", phone: "(555) 890-3311", email: "rkim87@email.com", insurance: "Guardian Dental", lastVisit: "2026-01-05", nextAppt: null, nextApptTime: null, balance: 380, status: "Overdue", allergies: [], provider: "Dr. Vargas", photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Male", dept: "General" },
    { id: 7, name: "Maria Gonzalez", age: 41, dob: "1984-03-25", phone: "(555) 567-9922", email: "mgonzalez@email.com", insurance: "Delta Dental PPO", lastVisit: "2026-02-22", nextAppt: "2026-03-22", nextApptTime: "11:30 AM", balance: 0, status: "Active", allergies: [], provider: "Dr. Cifor", photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Female", dept: "General" },
    { id: 8, name: "David Patel", age: 55, dob: "1970-07-11", phone: "(555) 234-6688", email: "d.patel@email.com", insurance: "United Healthcare", lastVisit: "2026-02-01", nextAppt: "2026-03-15", nextApptTime: "2:00 PM", balance: 75, status: "Active", allergies: ["Sulfa drugs"], provider: "Dr. Vargas", photoUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Male", dept: "Periodontics" },
    { id: 9, name: "Ashley Johnson", age: 29, dob: "1996-02-28", phone: "(555) 881-2244", email: "ajohnson@email.com", insurance: "MetLife DHMO", lastVisit: "2026-01-12", nextAppt: "2026-04-10", nextApptTime: "10:00 AM", balance: 50, status: "Active", allergies: [], provider: "Dr. Cifor", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Female", dept: "Endodontics" },
    { id: 10, name: "Michael Brown", age: 68, dob: "1957-10-04", phone: "(555) 334-9090", email: "mbrown@email.com", insurance: "Medicare", lastVisit: "2026-02-05", nextAppt: "2026-03-25", nextApptTime: "1:30 PM", balance: 0, status: "Active", allergies: ["Aspirin"], provider: "Dr. Vargas", photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", gender: "Male", dept: "Prosthodontics" },
];

const WEEKLY_PRODUCTION = [
    { day: "Mon", hygiene: 16, restorative: 10 },
    { day: "Tue", hygiene: 18, restorative: 14 },
    { day: "Wed", hygiene: 14, restorative: 12 },
    { day: "Thu", hygiene: 15, restorative: 16 },
    { day: "Fri", hygiene: 19, restorative: 15 },
];

const SCHEDULE_DATA = {
    providers: ["Dr. Cifor", "Dr. Vargas"],
    hours: ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30"],
    appointments: [
        { provider: 0, start: 0, duration: 2, patient: "Sarah Chen", type: "Hygiene", color: TEAL },
        { provider: 0, start: 3, duration: 3, patient: "Marcus Rivera", type: "Crown Prep", color: "#22c55e" },
        { provider: 0, start: 7, duration: 2, patient: "Maria Gonzalez", type: "Hygiene", color: TEAL },
        { provider: 0, start: 10, duration: 2, patient: "Linda Tran", type: "Composite Fill", color: "#22c55e" },
        { provider: 0, start: 14, duration: 3, patient: "Ashley Johnson", type: "Root Canal", color: ORANGE },
        { provider: 1, start: 0, duration: 3, patient: "James Okafor", type: "Extraction", color: RED },
        { provider: 1, start: 4, duration: 2, patient: "Thomas Wright", type: "Hygiene", color: TEAL },
        { provider: 1, start: 7, duration: 2, patient: "David Patel", type: "Perio SRP", color: ORANGE },
        { provider: 1, start: 12, duration: 2, patient: "Michael Brown", type: "Denture Adj", color: "#22c55e" },
        { provider: 1, start: 15, duration: 3, patient: "Emily Watson", type: "Implant Consult", color: PURPLE },
    ],
    gaps: [
        { provider: 0, time: "12:00 PM", suggestion: "AI suggests: Move waitlist patient Robert Kim (D2740 Crown) — matches provider availability and production goal." },
        { provider: 1, time: "9:00 AM", suggestion: "AI suggests: Schedule Emily Watson for overdue hygiene (D1110) — patient contacted, confirmed availability." },
    ]
};

const TIMELINE_EVENTS = [
    {
        date: "Feb 28, 2026",
        time: "10:00 AM",
        type: "Visit",
        title: "Periodic Exam & BWX",
        provider: "Dr. Vargas",
        notes: "4 BWX taken. No new caries detected. Discussed crown on #19.",
        codes: ["D0120", "D0274"],
        aiNote: {
            title: "SOAP Note Auto-Generated",
            provider: "AI Assistant",
            notes: "Clinical note generated from procedure codes and approved by Dr. Vargas."
        }
    },
    {
        date: "Jan 15, 2026",
        time: "2:30 PM",
        type: "Visit",
        title: "Prophylaxis & Fluoride",
        provider: "RDH Martinez",
        notes: "Adult prophy completed. Light calculus LL anteriors. Fluoride varnish applied. Patient reports sensitivity #14.",
        codes: ["D1110", "D1206"]
    },
];

const MEDICAL_HISTORY = {
    conditions: [
        { name: "Hypertension", status: "Active", since: "2018", notes: "Controlled with medication" },
        { name: "Type 2 Diabetes", status: "Active", since: "2020", notes: "HbA1c 6.8% (last checked Jan 2026)" },
    ],
    medications: [
        { name: "Lisinopril 10mg", frequency: "Once daily", prescriber: "Dr. Mitchell", purpose: "Hypertension" },
        { name: "Metformin 500mg", frequency: "Twice daily", prescriber: "Dr. Mitchell", purpose: "Type 2 Diabetes" },
    ],
    vitals: { bp: "128/82", pulse: "72 bpm", weight: "185 lbs", height: "5'10\"", lastUpdated: "Feb 28, 2026" },
    surgeries: ["Appendectomy (2005)", "Wisdom teeth extraction (2000)"],
    family: "Father: heart disease (MI at 58). Mother: Type 2 diabetes. No cancer history.",
    social: "Non-smoker. Occasional alcohol (2-3 drinks/week). No recreational drug use."
};

const DOCUMENTS = [
    { id: 1, name: "New Patient Intake Form", format: "PDF", date: "2025-09-10", size: "245 KB", category: "Forms", icon: File },
    { id: 2, name: "HIPAA Consent Form", format: "PDF", date: "2025-09-10", size: "120 KB", category: "Consent", icon: FileText },
    { id: 3, name: "Panoramic X-Ray", format: "DICOM", date: "2025-09-10", size: "8.2 MB", category: "Imaging", icon: Eye },
    { id: 4, name: "BWX Series", format: "DICOM", date: "2026-02-28", size: "12.4 MB", category: "Imaging", icon: Eye },
];


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

export function SidebarUI2({ currentPage, onNavigate, isExpanded, setIsExpanded, isMobileMenuOpen, setIsMobileMenuOpen, voiceEscalationCount }) {

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "patients", icon: Users, label: "Patients" },
        { id: "chart", icon: Stethoscope, label: "Clinical Chart" },
        { id: "schedule", icon: Calendar, label: "Schedule" },
        { id: "reactivation", icon: CalendarCheck, label: "Reactivation" },
        { id: "communications", icon: MessageSquare, label: "Communications" },
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

    const mobileSidebarClass = isMobileMenuOpen ? "sidebar-mobile open" : "sidebar-mobile";

    return (
        <>
            {/* Mobile Backdrop overlay */}
            {isMobileMenuOpen && (
                <div
                    className="show-on-mobile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", zIndex: 999 }}
                />
            )}

            <div className={mobileSidebarClass} style={{
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
                zIndex: 1000,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden"
            }}>
                {/* Logo row */}
                <div
                    onClick={() => onNavigate("dashboard")}
                    style={{ paddingBottom: 40, width: "100%", display: "flex", alignItems: "center", cursor: "pointer" }}
                >
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
                                cursor: "pointer", transition: "all 0.2s", padding: 0, overflow: "hidden", position: "relative"
                            }}>
                                <div style={{ width: 50, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                    <item.icon size={22} color={active ? GEO_BLACK : GEO_TEXT_MUTED} />
                                </div>
                                <span style={{ fontSize: 15, fontWeight: 600, opacity: isExpanded ? 1 : 0, whiteSpace: "nowrap", transition: "opacity 0.2s", display: "flex", alignItems: "center", gap: 8 }}>
                                    {item.label}
                                    {item.id === "voice" && isExpanded && voiceEscalationCount > 0 && (
                                        <div style={{ background: "#EF4444", color: "white", fontSize: 11, fontWeight: 800, minWidth: 20, height: 20, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>{voiceEscalationCount}</div>
                                    )}
                                </span>
                                {item.id === "voice" && !isExpanded && voiceEscalationCount > 0 && (
                                    <div style={{ position: "absolute", top: 12, right: 12, width: 8, height: 8, borderRadius: 4, background: "#EF4444" }} />
                                )}
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
        </>
    );
}

export function MobileHeaderUI2({ isMobileMenuOpen, setIsMobileMenuOpen, onNavigate }) {
    return (
        <header className="show-on-mobile-header" style={{
            display: "none", // Overridden by CSS media query
            width: "100%",
            background: "#FFFFFF",
            padding: "16px 20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            position: "sticky",
            top: 0,
            zIndex: 900,
            boxSizing: "border-box"
        }}>
            <div
                onClick={() => onNavigate("dashboard")}
                style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            >
                <Activity size={24} color="#00B67A" />
                <span style={{ fontSize: 20, fontWeight: 700, color: "#1C1E23" }}>Intelident.ai</span>
            </div>
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "-8px" }}
            >
                <Menu size={28} color="#1C1E23" />
            </button>
        </header>
    );
}

export function TopGreetingUI2({ isMobileMenuOpen, setIsMobileMenuOpen, subtitle }) {
    return (
        <div className="hide-on-mobile mobile-margin-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div>
                    <h1 className="title-mobile" style={{ fontSize: 28, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Good Morning, Dr. Cifor!</h1>
                    <p style={{ color: GEO_TEXT_MUTED, margin: "8px 0 0 0", fontSize: 16 }}>{subtitle || "Here is your schedule for today."}</p>
                </div>
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
export function DashboardPageUI2({ onNavigatePage, onSelectPatient, WEEKLY_PRODUCTION, SCHEDULE_DATA, PATIENT_DATA, isMobileMenuOpen, setIsMobileMenuOpen, voiceEscalationCount }) {
    const upcomingAppointments = React.useMemo(() => {
        return SCHEDULE_DATA.appointments.map(apt => {
            const time = SCHEDULE_DATA.hours[apt.start] + (apt.start < 8 ? " AM" : " PM");
            const matchedRecord = PATIENT_DATA.find(p => p.name === apt.patient);
            const providerName = SCHEDULE_DATA.providers[apt.provider];
            return {
                time: time,
                name: apt.patient,
                sub: apt.type,
                initial: apt.patient.split(" ").map(n => n[0]).join(""),
                photoUrl: matchedRecord?.photoUrl,
                provider: providerName,
                fullRecord: matchedRecord,
                startIdx: apt.start
            };
        }).sort((a, b) => a.startIdx - b.startIdx);
    }, [SCHEDULE_DATA, PATIENT_DATA]);

    return (
        <div className="main-content-mobile" style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Here is your practice overview." />

            {/* Revenue Command Center - 8 Metrics (Phase 2) */}
            <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, marginBottom: 16, marginTop: 0 }}>Revenue Command Center</h3>
                <div className="grid-stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    {/* Financial Block */}
                    <div className="geo-tooltip-container" data-tooltip="Month-To-Date Production: Gross revenue produced by all completed dental procedures so far this month." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>MTD Production <BadgePercent size={14} color={GEO_GREEN} /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>$142,500</div>
                        <div style={{ fontSize: 12, color: GEO_GREEN, fontWeight: 600, marginTop: 4 }}>+12% vs last month</div>
                    </div>

                    <div className="geo-tooltip-container" data-tooltip="Collection Ratio: Percentage of produced revenue successfully collected from patients and insurance. Target is 98%." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>Collection Ratio <Wallet size={14} color={GEO_TEXT_MAIN} /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>96.2%</div>
                        <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, fontWeight: 500, marginTop: 4 }}>Target: 98%</div>
                    </div>

                    <div className="geo-tooltip-container" data-tooltip="Accounts Receivable > 30 Days: Late payments stuck in insurance processing or unpaid patient bills." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>AR &gt; 30 Days <AlertTriangle size={14} color="#FF3B30" /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FF3B30" }}>$48,250</div>
                        <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, fontWeight: 500, marginTop: 4 }}>124 outstanding claims</div>
                    </div>

                    <div className="geo-tooltip-container" data-tooltip="Unscheduled Treatment: Dollar value of diagnosed procedures that patients have not yet booked appointments for." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>Unscheduled Tx <FileHeart size={14} color={GEO_YELLOW} /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>$312,000</div>
                        <div style={{ fontSize: 12, color: GEO_GREEN, fontWeight: 600, marginTop: 4 }}>$45k accepted this week</div>
                    </div>

                    {/* Operational Block */}
                    <div className="geo-tooltip-container" data-tooltip="Case Acceptance: Percentage of proposed treatment value that patients agree to proceed with." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>Case Acceptance <CheckCircle size={14} color={GEO_GREEN} /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>68%</div>
                        <div style={{ fontSize: 12, color: GEO_GREEN, fontWeight: 600, marginTop: 4 }}>+5% with AI Financing</div>
                    </div>

                    <div className="geo-tooltip-container" data-tooltip="Hygiene Production: Revenue generated specifically by cleanings & exams. Healthy practices target 33% of total revenue." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>Hygiene Production <Stethoscope size={14} color={GEO_TEXT_MAIN} /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>$38,400</div>
                        <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, fontWeight: 500, marginTop: 4 }}>26% of total (Target: 33%)</div>
                    </div>

                    <div className="geo-tooltip-container" data-tooltip="New Patients Month-To-Date: Total number of new patients acquired this month." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>New Patients (MTD) <UsersRound size={14} color={GEO_TEXT_MAIN} /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>42</div>
                        <div style={{ fontSize: 12, color: GEO_GREEN, fontWeight: 600, marginTop: 4 }}>+8 from AI Web Agent</div>
                    </div>

                    <div className="geo-tooltip-container" data-tooltip="Cancellation Rate: Percentage of appointments cancelled within 24-48 hours. Intelident AI automatically backfills these slots." style={{ background: GEO_WHITE, padding: 20, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}`, cursor: "help" }}>
                        <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>Cancellation Rate <XOctagon size={14} color={GEO_TEXT_MAIN} /></div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN }}>4.2%</div>
                        <div style={{ fontSize: 12, color: GEO_GREEN, fontWeight: 600, marginTop: 4 }}>Auto-backfilled: 88%</div>
                    </div>
                </div>
            </div>

            {/* AI Assistants Quick Nav */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>AI Assistants</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }} className="dashboard-grid">
                    {[
                        { title: "Smart Scheduler", value: "84%", trend: "+12.5%", color: "#3B82F6", target: "schedule", tooltip: "Percentage of calendar blocks optimized autonomously" },
                        { title: "Treatment Acceptance", value: "$42k", trend: "+$4k", color: "#F59E0B", target: "patients", tooltip: "Revenue secured via generated financing plans" },
                        { title: "Voice Agent", value: "94%", trend: "Resolved", color: "#00B67A", target: "voice", badge: voiceEscalationCount > 0 ? voiceEscalationCount : null, tooltip: "Percentage of inbound calls resolved without human intervention" },
                        { title: "Reactivations", value: "28", trend: "Scheduled", color: "#8B5CF6", target: "reactivation", tooltip: "Overdue patients successfully scheduled this month" }
                    ].map((metric, i) => (
                        <div key={i} className="geo-tooltip-container" data-tooltip={metric.tooltip} onClick={() => onNavigatePage(metric.target)} style={{ display: "flex", flexDirection: "column", background: GEO_WHITE, borderRadius: 24, padding: "24px", border: `1px solid #E5E7EB`, position: "relative", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={e => e.currentTarget.style.transform = "none"}>
                            <div style={{ color: GEO_TEXT_MUTED, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                {metric.title}
                                {metric.badge && (
                                    <div style={{ background: "#EF4444", color: "white", fontSize: 11, fontWeight: 800, minWidth: 20, height: 20, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>{metric.badge}</div>
                                )}
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: GEO_TEXT_MAIN, marginTop: 8 }}>{metric.value}</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: metric.color, marginTop: 4 }}>{metric.trend}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Sparkles size={20} color={GEO_GREEN} />
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>AI Practice Insights</h3>
                </div>
                <div className="grid-stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <div onClick={() => onNavigatePage("schedule")} style={{ background: GEO_WHITE, borderRadius: 16, padding: 20, boxShadow: GEO_SHADOW, border: `1px solid #E5E7EB`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column", gap: 12 }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = GEO_SHADOW; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: "#FFF0F0", color: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center" }}><Calendar size={18} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, lineHeight: 1.4 }}>Tuesday underbooked by 18% (missing hygiene production target)</div>
                        <div style={{ marginTop: "auto", fontSize: 12, fontWeight: 700, color: "#FF3B30", display: "flex", alignItems: "center", gap: 4 }}>Auto-Fill from Waitlist <ArrowRight size={12} /></div>
                    </div>

                    <div onClick={() => onNavigatePage("recall")} style={{ background: GEO_WHITE, borderRadius: 16, padding: 20, boxShadow: GEO_SHADOW, border: `1px solid #E5E7EB`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column", gap: 12 }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = GEO_SHADOW; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: "#FFF9E6", color: "#FFD100", display: "flex", alignItems: "center", justifyContent: "center" }}><Clock size={18} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, lineHeight: 1.4 }}>$48,000 in unscheduled treatment aging &gt; 30 days</div>
                        <div style={{ marginTop: "auto", fontSize: 12, fontWeight: 700, color: "#D4AF37", display: "flex", alignItems: "center", gap: 4 }}>Run Auto-Reactivation <ArrowRight size={12} /></div>
                    </div>

                    <div onClick={() => onNavigatePage("patients/high-value")} style={{ background: GEO_WHITE, borderRadius: 16, padding: 20, boxShadow: GEO_SHADOW, border: `1px solid #E5E7EB`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column", gap: 12 }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = GEO_SHADOW; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: "#E8F5E9", color: GEO_GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={18} /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, lineHeight: 1.4 }}>3 high-value cases likely to accept with custom follow-up</div>
                        <div style={{ marginTop: "auto", fontSize: 12, fontWeight: 700, color: GEO_GREEN, display: "flex", alignItems: "center", gap: 4 }}>Auto-Send Financing Options <ArrowRight size={12} /></div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid-stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>

                {/* Area Chart - Geovea Style */}
                <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                    <div className="stack-on-mobile" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, gap: 16 }}>
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
                <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 24px 0", flexShrink: 0 }}>Upcoming Appointments</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", maxHeight: 320, paddingRight: 4 }}>
                        {upcomingAppointments.map((apt, i) => {
                            return (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", borderRadius: 16, background: GEO_BG, cursor: "pointer", transition: "all 0.2s", flexShrink: 0 }} onClick={() => apt.fullRecord ? onSelectPatient(apt.fullRecord) : onNavigatePage("patients")}>
                                    {apt.photoUrl ? (
                                        <img src={apt.photoUrl} alt={apt.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
                                    ) : (
                                        <div style={{ width: 44, height: 44, borderRadius: 22, background: GEO_BLACK, color: GEO_WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14 }}>
                                            {apt.initial}
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN, display: "flex", alignItems: "center", gap: 6 }}>
                                            {apt.name}
                                            <span style={{ fontSize: 11, background: "#E8F5E9", color: GEO_GREEN, padding: "2px 6px", borderRadius: 4 }}>{apt.provider}</span>
                                        </div>
                                        <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4 }}>{apt.sub}</div>
                                    </div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN }}>{apt.time}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Patient Directory Removed */}
        </div>
    );
}

// ==========================================
// UI2: PATIENT LIST PAGE
// ==========================================
export function PatientListPageUI2({ currentUI, setUI, onNavigatePage, onSelectPatient, PATIENT_DATA, isMobileMenuOpen, setIsMobileMenuOpen, currentPath }) {
    const isHighValue = (currentPath || window.location.pathname).includes('/patients/high-value');
    const displayPatients = isHighValue ? PATIENT_DATA.slice(0, 3) : PATIENT_DATA;
    const [financingModalOpen, setFinancingModalOpen] = useState(false);
    const [selectedFinancingPatient, setSelectedFinancingPatient] = useState(null);

    return (
        <div className="mobile-no-padding-main" style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle={isHighValue ? "Review patients with high-probability treatment plans." : "Manage your active and overdue patients."} />
            <div className="mobile-no-padding-card" style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div className="stack-on-mobile mobile-margin-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, gap: 16 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>{isHighValue ? "High-Value Follow-Ups" : "Patients Directory"}</h2>
                        {isHighValue && <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4 }}>Showing 3 patients highly likely to accept financing.</div>}
                    </div>
                    <div style={{ display: "flex", gap: 12, width: "100%", overflowX: "auto", paddingBottom: 4 }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "center", background: GEO_BG, borderRadius: GEO_PILL, padding: "8px 16px", minWidth: 150 }}>
                            <Search size={18} color={GEO_TEXT_MUTED} style={{ marginRight: 8 }} />
                            <input type="text" placeholder="Search patients..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, color: GEO_TEXT_MAIN, width: "100%" }} />
                        </div>
                        <button onClick={() => isHighValue ? onNavigatePage("patients") : onNavigatePage("patients/high-value")} style={{ display: "flex", alignItems: "center", gap: 8, background: isHighValue ? "#DCFCE7" : GEO_BG, color: isHighValue ? GEO_GREEN : GEO_TEXT_MAIN, border: `1px solid ${isHighValue ? GEO_GREEN : 'transparent'}`, padding: "10px 16px", borderRadius: GEO_PILL, fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", boxSizing: "border-box" }} onMouseOver={e => e.currentTarget.style.background = isHighValue ? "#bbf7d0" : "#E5E7EB"} onMouseOut={e => e.currentTarget.style.background = isHighValue ? "#DCFCE7" : GEO_BG}>
                            <Sparkles size={16} /> {isHighValue ? "Viewing High-Value" : "Show High-Value"}
                        </button>
                        <button onClick={() => isHighValue ? onNavigatePage("patients") : alert("Filters opening...")} style={{ display: "flex", alignItems: "center", gap: 8, background: isHighValue ? GEO_GREEN : GEO_BLACK, color: GEO_WHITE, border: "none", padding: "10px 20px", borderRadius: GEO_PILL, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                            <Filter size={16} /> {isHighValue ? "Clear Filter" : "Filter"}
                        </button>
                    </div>
                </div>

                <div className="table-scroll-mobile" style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 600 }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid ${GEO_BG}` }}>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Patient</th>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Age / DOB</th>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Insurance</th>
                                <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase" }}>Status</th>
                                {isHighValue && <th style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textTransform: "uppercase", textAlign: "right" }}>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {displayPatients.map(p => (
                                <tr key={p.id} style={{ borderBottom: `1px solid ${GEO_BG}`, cursor: "pointer", transition: "background 0.2s" }} onClick={() => onSelectPatient(p)}>
                                    <td style={{ padding: "16px 8px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            {p.photoUrl ? (
                                                <img src={p.photoUrl} alt={p.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
                                            ) : (
                                                <div style={{ width: 40, height: 40, borderRadius: 20, background: p.status === "Overdue" ? "#FFF3E0" : GEO_BG, color: p.status === "Overdue" ? "#E65100" : GEO_TEXT_MAIN, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14 }}>
                                                    {p.avatar}
                                                </div>
                                            )}
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
                                    {isHighValue && (
                                        <td style={{ padding: "16px 8px", textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => { setSelectedFinancingPatient(p); setFinancingModalOpen(true); }} style={{ padding: "8px 16px", borderRadius: GEO_PILL, border: `1px solid ${GEO_GREEN}`, background: "#F0FDF4", color: GEO_GREEN, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#DCFCE7"} onMouseOut={e => e.currentTarget.style.background = "#F0FDF4"}>
                                                <Sparkles size={14} /> Send Financing
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {financingModalOpen && selectedFinancingPatient && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }} onClick={() => setFinancingModalOpen(false)}>
                    <div style={{ background: GEO_WHITE, borderRadius: 32, padding: 40, width: "100%", maxWidth: 600, boxShadow: "0 24px 48px rgba(0,0,0,0.2)", position: "relative" }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setFinancingModalOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: GEO_BG, border: "none", width: 36, height: 36, borderRadius: 18, fontSize: 18, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${GEO_GREEN}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Sparkles size={22} color={GEO_GREEN} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN }}>Auto-Send Financing Options</h3>
                                <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>For {selectedFinancingPatient.name}</div>
                            </div>
                        </div>

                        <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 20, fontSize: 14, color: "#334155", lineHeight: 1.6, border: "1px solid #E2E8F0", marginBottom: 24 }}>
                            <p style={{ margin: "0 0 12px 0" }}>Hi {selectedFinancingPatient.name.split(" ")[0]}! Dr. Cifor wanted me to follow up regarding the treatment we discussed. Getting this taken care of soon will prevent further complications.</p>
                            <div style={{ background: "#f1f5f9", padding: 12, borderRadius: 8, display: "flex", justifyContent: "space-between", margin: "16px 0", fontWeight: 600 }}>
                                <span>Estimated Out-of-Pocket:</span>
                                <span style={{ color: "#0f172a" }}>$675.00</span>
                            </div>
                            <p style={{ margin: 0 }}>Would you like to break this into 4 easy monthly payments of <strong>$168.75</strong> using our financing partner?</p>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button onClick={() => setFinancingModalOpen(false)} style={{ padding: "14px 28px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, fontWeight: 600, fontSize: 15, color: GEO_TEXT_MAIN, cursor: "pointer" }}>Cancel</button>
                            <button onClick={() => setFinancingModalOpen(false)} style={{ padding: "14px 28px", borderRadius: GEO_PILL, border: "none", background: GEO_GREEN, fontWeight: 600, fontSize: 15, color: GEO_WHITE, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0, 182, 122, 0.2)" }}>
                                Send via SMS <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ==========================================
// UI2: AI NOTES PAGE
// ==========================================
export function AiNotesPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
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
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Generate and review clinical notes." />

            <div className="stack-on-mobile" style={{ display: "flex", gap: 30, flex: 1, minHeight: 600, marginTop: 16 }}>
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
export function PlaceholderPageUI2({ currentUI, setUI, title, isMobileMenuOpen, setIsMobileMenuOpen }) {
    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="This module is under construction." />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 60, boxShadow: GEO_SHADOW, textAlign: "center" }}>
                <h2 style={{ fontSize: 28, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 16 }}>{title}</h2>
                <p style={{ fontSize: 16, color: GEO_TEXT_MUTED, maxWidth: 400, margin: "0 auto" }}>This section is currently being adapted to the new Geovea aesthetic design language. Please check back later.</p>
            </div>
        </div>
    );
}

// Geovea UI2 Extra Pages

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



export function VoiceAgentPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen, escalations, setEscalations, handleMarkDone }) {
    const [callActive, setCallActive] = React.useState(false);
    const [transcriptIndex, setTranscriptIndex] = React.useState(0);

    const fullTranscript = [
        { speaker: "ai", text: "Thank you for calling Smile Dental Group. This is Ava, your AI scheduling assistant. How can I help you today?" },
        { speaker: "patient", text: "Hi, I'd like to schedule an appointment as a new patient. My tooth is hurting." },
        { speaker: "ai", text: "I'm so sorry to hear you're experiencing pain! Let's get you in right away. May I have your first and last name?" },
        { speaker: "patient", text: "It's Daniel Reyes." },
        { speaker: "ai", text: "Thank you, Daniel. I have an emergency exam opening today at 2:00 PM with Dr. Cifor, or tomorrow at 9:00 AM. Do either of those work for you?" },
        { speaker: "patient", text: "Today at 2:00 PM would be great." },
        { speaker: "ai", text: "Wonderful. I have you booked for 2:00 PM today. Since you are a new patient, I've just sent a text message to this number with a link to our secure Intake Forms so you don't have to fill paper out in the waiting room." },
        { speaker: "patient", text: "Got the text. I'll fill it out now." },
        { speaker: "ai", text: "Perfect! We look forward to seeing you at 2:00 PM, Daniel. Feel better!" }
    ];

    React.useEffect(() => {
        let interval;
        let timeout;
        if (callActive) {
            interval = setInterval(() => {
                setTranscriptIndex(prev => {
                    if (prev < fullTranscript.length) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        timeout = setTimeout(() => {
                            setCallActive(false);
                        }, 2000);
                        return prev;
                    }
                });
            }, 2000);
        }
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [callActive, fullTranscript.length]);

    const handleStartCall = () => {
        setTranscriptIndex(0);
        setCallActive(true);
    };

    const transcript = fullTranscript.slice(0, transcriptIndex);

    return (
        <div style={{ padding: "20px 40px" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Review and configure AI patient communications." />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Voice Agent Insights</h2>
                        <p style={{ color: GEO_TEXT_MUTED, margin: "4px 0 0 0", fontSize: 14 }}>Live call monitoring and AI resolution analytics</p>
                    </div>
                </div>

                <div className="stack-on-mobile" style={{ display: "flex", gap: 20, marginBottom: 32 }}>
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

                <div className="stack-grid-mobile" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, paddingBottom: 40 }}>
                    <div style={{ background: GEO_WHITE, borderRadius: 24, padding: 32, border: `1px solid #E5E7EB`, display: "flex", flexDirection: "column", height: 600, boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid #F3F4F6` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <div style={{ position: "relative" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 24, background: callActive ? "#EF4444" : "#F4F5F7", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                                        <Phone color={callActive ? "white" : GEO_TEXT_MUTED} size={20} />
                                    </div>
                                    {callActive && <div style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, background: "#EF4444", borderRadius: 7, border: "2px solid white", animation: "pulse 2s infinite" }} />}
                                </div>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: GEO_TEXT_MAIN, fontFamily: "monospace" }}>+1 (555) 019-8372</div>
                                    <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                        {callActive ? <><span style={{ color: "#EF4444", fontWeight: 700 }}>LIVE</span> • Patient caller</> : "Ready for incoming calls"}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {!callActive ? (
                                    <button onClick={handleStartCall} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}><Play size={16} fill="currentColor" /> Monitor Next Call</button>
                                ) : (
                                    <button onClick={() => setCallActive(false)} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: "#EF4444", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Square size={16} fill="currentColor" /> End Simulation</button>
                                )}
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20, paddingRight: 12 }}>
                            {transcript.length === 0 && !callActive && (
                                <div style={{ margin: "auto", textAlign: "center", color: GEO_TEXT_MUTED, fontSize: 15, background: "#F9FAFB", padding: 32, borderRadius: 16, border: "1px dashed #E5E7EB" }}>
                                    <Mic size={32} color="#D1D5DB" style={{ marginBottom: 12 }} />
                                    <div>Waiting for incoming call...</div>
                                </div>
                            )}
                            {transcript.map((msg, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.speaker === "ai" ? "flex-start" : "flex-end", maxWidth: "85%", alignSelf: msg.speaker === "ai" ? "flex-start" : "flex-end", animation: "fadeIn 0.4s ease-out" }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: GEO_TEXT_MUTED, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 6 }}>
                                        {msg.speaker === "ai" ? <><Sparkles size={12} color={GEO_GREEN} /> Ava (AI)</> : "Caller"}
                                    </div>
                                    <div style={{ padding: "16px 20px", borderRadius: 20, borderBottomLeftRadius: msg.speaker === "ai" ? 6 : 20, borderBottomRightRadius: msg.speaker === "patient" ? 6 : 20, background: msg.speaker === "ai" ? GEO_BG : "#E8F5E9", color: msg.speaker === "ai" ? GEO_TEXT_MAIN : GEO_GREEN, fontSize: 15, lineHeight: 1.6, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 24, height: 600 }}>
                        <div style={{ background: GEO_WHITE, borderRadius: 24, padding: 32, border: `1px solid #E5E7EB`, boxShadow: "0 8px 30px rgba(0,0,0,0.04)", flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>Autonomous Actions</h3>
                                {callActive && transcript.length > 0 && <span style={{ padding: "4px 10px", background: "#F0FDF4", color: "#00B67A", borderRadius: "9999px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}><Activity size={12} className="lucide-spin" /> Processing</span>}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px", background: transcript.length > 2 ? "#F0FDF4" : "#F9FAFB", borderRadius: 16, color: transcript.length > 2 ? GEO_GREEN : GEO_TEXT_MUTED, border: `1px solid ${transcript.length > 2 ? '#86EFAC' : '#F3F4F6'}`, transition: "all 0.3s" }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 16, background: transcript.length > 2 ? GEO_GREEN : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <UsersRound size={16} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 15 }}>Caller Authenticated</div>
                                        <div style={{ fontSize: 13, marginTop: 4, display: transcript.length > 2 ? "block" : "none" }}>Created New Patient Profile: Daniel Reyes</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px", background: transcript.length > 5 ? "#F0FDF4" : "#F9FAFB", borderRadius: 16, color: transcript.length > 5 ? GEO_GREEN : GEO_TEXT_MUTED, border: `1px solid ${transcript.length > 5 ? '#86EFAC' : '#F3F4F6'}`, transition: "all 0.3s" }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 16, background: transcript.length > 5 ? GEO_GREEN : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <CalendarCheck size={16} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 15 }}>Schedule Intent Parsed</div>
                                        <div style={{ fontSize: 13, marginTop: 4, display: transcript.length > 5 ? "block" : "none" }}>Confirmed 'Emergency Exam' block at 2:00 PM</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px", background: transcript.length > 6 ? "#EFF6FF" : "#F9FAFB", borderRadius: 16, color: transcript.length > 6 ? "#3B82F6" : GEO_TEXT_MUTED, border: `1px solid ${transcript.length > 6 ? '#BFDBFE' : '#F3F4F6'}`, transition: "all 0.3s" }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 16, background: transcript.length > 6 ? "#3B82F6" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <FileText size={16} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 15, color: transcript.length > 6 ? "#1D4ED8" : "inherit" }}>Forms Automation Dispatched</div>
                                        <div style={{ fontSize: 13, marginTop: 4, display: transcript.length > 6 ? "block" : "none", color: "#2563EB", fontWeight: 600 }}>Sent 'New Patient Intake Packet' via SMS.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ESCALATION QUEUE */}
                    <div style={{ marginTop: 40, paddingTop: 40, borderTop: `1px solid #E5E7EB` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
                                    Requires Human Action
                                    {escalations.length > 0 && (
                                        <span style={{ background: "#FEE2E2", color: "#DC2626", padding: "4px 8px", borderRadius: 12, fontSize: 13, fontWeight: 800 }}>{escalations.length} Callbacks Pending</span>
                                    )}
                                </h3>
                                <p style={{ color: GEO_TEXT_MUTED, margin: "4px 0 0 0", fontSize: 14 }}>Calls that failed automated resolution (e.g. Clinical advice, complex finances)</p>
                            </div>
                        </div>

                        <div className="table-scroll-mobile">
                            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                                <thead>
                                    <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Time</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Patient</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Category</th>
                                        <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>AI Summary context</th>
                                        <th style={{ padding: "0 16px 16px 0", textAlign: "right", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {escalations.map((escalation) => (
                                        <tr key={escalation.id} style={{ borderBottom: `1px solid #F4F5F7`, transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#F9FAFB"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                                            <td style={{ padding: "24px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{escalation.time}</td>
                                            <td style={{ padding: "24px 0" }}>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{escalation.patientName}</div>
                                                <div style={{ fontSize: 13, color: GEO_TEXT_MUTED, marginTop: 4, fontFamily: "monospace" }}>{escalation.phone}</div>
                                            </td>
                                            <td style={{ padding: "24px 0" }}>
                                                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: GEO_PILL, fontSize: 12, fontWeight: 700, background: escalation.bgColor, color: escalation.color }}>
                                                    <escalation.icon size={12} fill="currentColor" /> {escalation.type}
                                                </span>
                                            </td>
                                            <td style={{ padding: "24px 0", fontSize: 14, color: GEO_TEXT_MAIN, maxWidth: 350, lineHeight: 1.5 }}>
                                                {escalation.summary}
                                            </td>
                                            <td style={{ padding: "24px 16px 24px 0", textAlign: "right" }}>
                                                <button onClick={() => handleMarkDone(escalation.id)} style={{ padding: "8px 16px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, color: GEO_TEXT_MAIN, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#F3F4F6"} onMouseOut={e => e.currentTarget.style.background = GEO_WHITE}>
                                                    <Check size={14} /> Done
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {escalations.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ padding: "40px 0", textAlign: "center", color: GEO_TEXT_MUTED, fontSize: 15 }}>
                                                <CheckCircle size={32} color={GEO_GREEN} style={{ marginBottom: 16 }} />
                                                <div style={{ fontWeight: 600, color: GEO_TEXT_MAIN }}>You're all caught up!</div>
                                                <div>SOAP NOTE:</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

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


export function FormBuilderPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [previewMode, setPreviewMode] = React.useState(() => {
        const path = window.location.pathname.replace(/^\//, '');
        return path === 'forms/preview';
    });

    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname.replace(/^\//, '');
            setPreviewMode(path === 'forms/preview');
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const togglePreviewMode = (preview) => {
        setPreviewMode(preview);
        window.history.pushState(null, '', preview ? `/forms/preview` : `/forms`);
    };

    const [promptText, setPromptText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [editingFieldId, setEditingFieldId] = useState(null);

    // Drag and Drop Refs
    const dragItem = React.useRef(null);
    const dragOverItem = React.useRef(null);
    const [draggedPaletteItem, setDraggedPaletteItem] = useState(null);
    const [activeDropIndex, setActiveDropIndex] = useState(null);

    const [fields, setFields] = React.useState([
        { id: 1, type: "Text", label: "Full Name", icon: Type },
        { id: 2, type: "Date", label: "Date of Birth", icon: CalendarDays },
        { id: 3, type: "Phone", label: "Phone Number", icon: Phone },
        { id: 4, type: "Email", label: "Email Address", icon: Mail },
        { id: 5, type: "Textarea", label: "Chief Complaint", icon: AlignLeft },
        { id: 6, type: "Checkbox", label: "Known Allergies", icon: ListChecks },
    ]);

    const handleAddField = (type, icon) => {
        setFields([...fields, { id: Date.now(), type, label: `New ${type}`, icon }]);
    };

    const handleDeleteField = (id) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const handleUpdateLabel = (id, newLabel) => {
        setFields(fields.map(f => f.id === id ? { ...f, label: newLabel } : f));
    };

    const handleSort = () => {
        let _fields = [...fields];
        if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
            const draggedItemContent = _fields.splice(dragItem.current, 1)[0];

            let targetIndex = dragOverItem.current;
            if (dragItem.current < dragOverItem.current) {
                targetIndex -= 1;
            }

            _fields.splice(targetIndex, 0, draggedItemContent);
            setFields(_fields);
        }
        dragItem.current = null;
        dragOverItem.current = null;
        setActiveDropIndex(null);
    };

    const handleCanvasDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedPaletteItem) {
            const newField = { id: Date.now(), type: draggedPaletteItem.type, label: `New ${draggedPaletteItem.type}`, icon: draggedPaletteItem.icon };

            if (dragOverItem.current !== null) {
                // Insert at specific hovered index
                let _fields = [...fields];
                _fields.splice(dragOverItem.current, 0, newField);
                setFields(_fields);
            } else {
                // Append to end if dropped in empty space
                setFields([...fields, newField]);
            }

            setDraggedPaletteItem(null);
            dragOverItem.current = null;
            setActiveDropIndex(null);
        }
    };

    const handleAIGenerate = (e) => {
        if (e.key === 'Enter' && promptText.trim()) {
            setIsGenerating(true);
            setFields([]);
            setTimeout(() => {
                const text = promptText.toLowerCase();
                let newFields = [];

                if (text.includes("medical") || text.includes("history")) {
                    newFields = [
                        { id: Date.now() + 1, type: "Text", label: "Patient Full Name", icon: Type },
                        { id: Date.now() + 2, type: "Date", label: "Date of Birth", icon: CalendarDays },
                        { id: Date.now() + 3, type: "Text", label: "Primary Care Physician", icon: Type },
                        { id: Date.now() + 4, type: "Phone", label: "Physician Phone Number", icon: Phone },
                        { id: Date.now() + 5, type: "Checkbox", label: "Are you currently under the care of a physician?", icon: ListChecks },
                        { id: Date.now() + 6, type: "Textarea", label: "If yes, please explain:", icon: AlignLeft },
                        { id: Date.now() + 7, type: "Checkbox", label: "Have you had any serious illness or operations?", icon: ListChecks },
                        { id: Date.now() + 8, type: "Checkbox", label: "Do you use tobacco products?", icon: ListChecks },
                        { id: Date.now() + 9, type: "Textarea", label: "Please list all current medications", icon: AlignLeft },
                        { id: Date.now() + 10, type: "Checkbox", label: "Allergic to Penicillin", icon: ListChecks },
                        { id: Date.now() + 11, type: "Checkbox", label: "Allergic to Latex", icon: ListChecks },
                        { id: Date.now() + 12, type: "Signature", label: "Patient Signature", icon: Edit3 }
                    ];
                } else {
                    newFields = [
                        { id: Date.now() + 1, type: "Text", label: "Patient Full Name", icon: Type },
                        { id: Date.now() + 2, type: "Date", label: "Date of Birth", icon: CalendarDays },
                        ...text.includes("emergency") ? [
                            { id: Date.now() + 3, type: "Text", label: "Emergency Contact Name", icon: Type },
                            { id: Date.now() + 4, type: "Phone", label: "Emergency Contact Phone", icon: Phone }
                        ] : [],
                        ...text.includes("hipaa") || text.includes("consent") ? [
                            { id: Date.now() + 5, type: "Checkbox", label: "I acknowledge receipt of HIPAA Notice of Privacy Practices", icon: ListChecks },
                            { id: Date.now() + 6, type: "Signature", label: "Patient Signature", icon: Edit3 }
                        ] : [
                            { id: Date.now() + 7, type: "Textarea", label: "Reason for Visit", icon: AlignLeft }
                        ]
                    ];
                }

                setFields(newFields);
                setIsGenerating(false);
                setPromptText("");
            }, 1200);
        }
    };

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
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Build and review patient intake forms." />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patient Forms</h2>
                        <div style={{ fontSize: 14, color: GEO_TEXT_MUTED, marginTop: 4 }}>Drag and drop builder for digital patient intake</div>
                    </div>
                    <div style={{ display: "flex", background: GEO_BG, borderRadius: GEO_PILL, padding: 4, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}>
                        <button onClick={() => togglePreviewMode(false)} style={{ padding: "10px 24px", borderRadius: GEO_PILL, border: "none", background: !previewMode ? GEO_WHITE : "transparent", color: !previewMode ? GEO_BLACK : GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: !previewMode ? "0 2px 8px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}>Editor</button>
                        <button onClick={() => togglePreviewMode(true)} style={{ padding: "10px 24px", borderRadius: GEO_PILL, border: "none", background: previewMode ? GEO_BLACK : "transparent", color: previewMode ? GEO_WHITE : GEO_TEXT_MUTED, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>Preview</button>
                    </div>
                </div>

                <div className="stack-on-mobile" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    {/* Left: Templates */}
                    <div className="full-width-mobile" style={{ width: 280, display: "flex", flexDirection: "column", gap: 16 }}>
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
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleCanvasDrop}
                        onDragLeave={() => setActiveDropIndex(null)}
                        style={{ flex: 1, background: GEO_WHITE, borderRadius: 16, padding: 40, border: `1px solid #E5E7EB`, minHeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
                    >
                        <div style={{ background: GEO_WHITE, padding: "8px 20px", borderRadius: GEO_PILL, marginBottom: 32, display: "flex", alignItems: "center", gap: 12, border: "2px solid #EA580C", transition: "all 0.2s", opacity: isGenerating ? 0.7 : 1, boxShadow: "0 4px 12px rgba(234, 88, 12, 0.15)" }}>
                            {isGenerating ? <Loader2 size={20} color="#EA580C" className="spin" /> : <Sparkles size={20} color="#EA580C" />}
                            <input
                                type="text"
                                value={promptText}
                                onChange={e => setPromptText(e.target.value)}
                                onKeyDown={handleAIGenerate}
                                disabled={isGenerating}
                                placeholder="Describe your form in plain English and AI will auto-build it! (Press Enter)"
                                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 15, color: GEO_TEXT_MAIN, fontWeight: 600, width: "100%", padding: "12px 0" }}
                            />
                        </div>

                        <h1 style={{ fontSize: 26, fontWeight: 700, color: GEO_TEXT_MAIN, textAlign: "center", marginBottom: 32 }}>New Patient Intake</h1>

                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {isGenerating && <div style={{ textAlign: "center", padding: 40, color: GEO_TEXT_MUTED }}><Loader2 size={32} className="spin" style={{ marginBottom: 16 }} /><div>AI is generating form fields...</div></div>}

                            {!isGenerating && !previewMode && (
                                <div
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); dragOverItem.current = 0; setActiveDropIndex(0); }}
                                    style={{
                                        height: activeDropIndex === 0 ? 44 : 8,
                                        width: "100%",
                                        borderRadius: 12,
                                        border: activeDropIndex === 0 ? "2px dashed #EA580C" : "1px solid transparent",
                                        background: activeDropIndex === 0 ? "#FFF5F0" : "transparent",
                                        transition: "all 0.2s",
                                        marginBottom: activeDropIndex === 0 ? 8 : 0
                                    }}
                                />
                            )}
                            {!isGenerating && fields.map((field, index) => (
                                !previewMode ? (
                                    <React.Fragment key={field.id}>
                                        <div
                                            draggable
                                            onDragStart={(e) => { dragItem.current = index; e.dataTransfer.effectAllowed = "move"; }}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); dragOverItem.current = index; setActiveDropIndex(index); }}
                                            style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", border: `1px solid #E5E7EB`, borderRadius: 12, background: GEO_BG, cursor: "grab", transition: "transform 0.1s", position: "relative", opacity: dragItem.current === index ? 0.4 : 1 }}
                                        >
                                            <GripVertical size={16} color={GEO_TEXT_MUTED} style={{ cursor: "grab" }} />
                                            <div style={{ width: 40, height: 40, background: GEO_WHITE, borderRadius: 12, border: `1px solid #E5E7EB`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                                                <field.icon size={18} color={GEO_TEXT_MAIN} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                {editingFieldId === field.id ? (
                                                    <input
                                                        type="text"
                                                        value={field.label}
                                                        onChange={e => handleUpdateLabel(field.id, e.target.value)}
                                                        onBlur={() => setEditingFieldId(null)}
                                                        onKeyDown={e => e.key === 'Enter' && setEditingFieldId(null)}
                                                        autoFocus
                                                        style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 2, width: "100%", padding: "4px 8px", border: `1px solid #E5E7EB`, borderRadius: 6, outline: "none" }}
                                                    />
                                                ) : (
                                                    <div style={{ fontSize: 14, fontWeight: 600, color: GEO_TEXT_MAIN, marginBottom: 2 }}>{field.label}</div>
                                                )}
                                                <div style={{ fontSize: 12, color: GEO_TEXT_MUTED, fontWeight: 500 }}>{field.type} Field</div>
                                            </div>
                                            <div className="stack-on-mobile" style={{ display: "flex", gap: 12 }}>
                                                <button onClick={() => setEditingFieldId(field.id)} style={{ background: "none", border: "none", cursor: "pointer", color: GEO_TEXT_MUTED }}><Edit3 size={18} /></button>
                                                <button onClick={() => handleDeleteField(field.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={18} /></button>
                                            </div>
                                        </div>

                                        <div
                                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); dragOverItem.current = index + 1; setActiveDropIndex(index + 1); }}
                                            style={{
                                                height: activeDropIndex === index + 1 ? 44 : 8,
                                                width: "100%",
                                                borderRadius: 12,
                                                border: activeDropIndex === index + 1 ? "2px dashed #EA580C" : "1px solid transparent",
                                                background: activeDropIndex === index + 1 ? "#FFF5F0" : "transparent",
                                                transition: "all 0.2s",
                                                marginTop: activeDropIndex === index + 1 ? 8 : 0,
                                                marginBottom: activeDropIndex === index + 1 ? 8 : 0
                                            }}
                                        />
                                    </React.Fragment>
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

                        {previewMode && (
                            <button style={{ width: "100%", marginTop: 32, padding: "16px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: GEO_WHITE, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Submit Intake Form</button>
                        )}
                    </div>

                    {/* Right: Palette */}
                    {!previewMode && (
                        <div className="full-width-mobile" style={{ width: 280, background: GEO_WHITE, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: GEO_TEXT_MAIN, marginBottom: 16 }}>Form Elements</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {palette.map(p => (
                                    <div
                                        key={p.type}
                                        draggable
                                        onDragStart={() => setDraggedPaletteItem(p)}
                                        onDragEnd={() => { setDraggedPaletteItem(null); dragOverItem.current = null; }}
                                        onClick={() => handleAddField(p.type, p.icon)}
                                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "16px 8px", background: GEO_BG, border: `1px solid transparent`, borderRadius: 12, cursor: "grab", transition: "all 0.2s" }}
                                        onMouseOver={e => e.currentTarget.style.borderColor = GEO_TEXT_MUTED}
                                        onMouseOut={e => e.currentTarget.style.borderColor = "transparent"}
                                    >
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

export function SettingsPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [activeTab, setActiveTab] = useState(() => {
        const path = window.location.pathname.replace(/^\//, '');
        const parts = path.split('/');
        if (parts.length > 1 && parts[0] === 'settings') {
            const tabsList = ["practice", "users", "audit", "notifications", "billing"];
            return tabsList.includes(parts[1]) ? parts[1] : "practice";
        }
        return "practice";
    });

    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname.replace(/^\//, '');
            const parts = path.split('/');
            if (parts.length > 1 && parts[0] === 'settings') {
                const tabsList = ["practice", "users", "audit", "notifications", "billing"];
                if (tabsList.includes(parts[1])) setActiveTab(parts[1]);
            } else if (parts.length === 1 && parts[0] === 'settings') {
                setActiveTab("practice");
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        window.history.pushState(null, '', `/settings/${tabId}`);
    };

    const tabs = [
        { id: "practice", label: "Practice Info", icon: "🏥" },
        { id: "users", label: "Users & Roles", icon: "👥" },
        { id: "audit", label: "HIPAA Audit Log", icon: "📋" },
        { id: "notifications", label: "Notifications", icon: "🔔" },
        { id: "billing", label: "Billing Prefs", icon: "💳" }
    ];

    return (
        <div style={{ padding: "20px 40px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Manage practice preferences and configurations." />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>System Settings</h2>
            </div>

            <div style={{ display: "flex", gap: 32, flex: 1 }}>
                <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
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

export function IntegrationsPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
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
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Connect with third-party dental software." />
            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Integrations & API</h2>
                        <p style={{ color: GEO_TEXT_MUTED, margin: "4px 0 0 0", fontSize: 14 }}>Connect Intelident to your existing practice software</p>
                    </div>
                </div>

                <div style={{ background: GEO_BG, borderRadius: 16, padding: 24, border: `1px solid #E5E7EB`, marginBottom: 32 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: GEO_TEXT_MAIN, margin: "0 0 16px 0" }}>Developer API Key</h3>
                    <div className="stack-on-mobile" style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div className="full-width-mobile" style={{ flex: 1, background: GEO_WHITE, padding: "16px 20px", borderRadius: 12, border: `1px solid #E5E7EB`, fontFamily: "monospace", fontSize: 15, color: GEO_TEXT_MAIN, letterSpacing: 1, fontWeight: 500, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", wordBreak: "break-all" }}>
                            sk_live_intl_******************************q9P
                        </div>
                        <button style={{ padding: "16px 28px", borderRadius: GEO_PILL, border: `1px solid #E5E7EB`, background: GEO_WHITE, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}><Copy size={18} /> Copy</button>
                    </div>
                </div>

                <div className="stack-grid-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
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



export function PatientDetailPageUI2({ patient, onBack, currentUI, setUI, TIMELINE_EVENTS, MEDICAL_HISTORY, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const tabs = ["Timeline", "Medical History", "Treatment Plan", "Imaging & X-Rays", "Intake Forms", "Documents", "Insurance"];

    const defaultExplanation = `Hi ${patient.name.split(' ')[0]}! Dr. Cifor wanted me to follow up regarding the porcelain crown we discussed for tooth 19. Getting this taken care of soon will prevent further decay and the need for a more painful (and costly!) root canal later on.\n\nWe have automatically verified your Delta Dental PPO benefits. Great news! They cover 50% of major restorative work.\n\nYour estimated out-of-pocket: $675.00\n\nWould you like to break this into 4 easy monthly payments of $168.75 using our financing partner?`;

    const [explanationGenerating, setExplanationGenerating] = React.useState(false);
    const [explanationText, setExplanationText] = React.useState(defaultExplanation);
    const [editPromptOpen, setEditPromptOpen] = React.useState(false);
    const [customPrompt, setCustomPrompt] = React.useState("Make the tone more empathetic and emphasize the clinical urgency to prevent root canal. Include the $168.75 monthly payment option.");

    const handleRegenerateExplanation = () => {
        setExplanationGenerating(true);
        setEditPromptOpen(false);
        const draft = `Hello ${patient.name.split(' ')[0]}, this is Dr. Cifor's AI assistant. Based on your updated clinical notes, taking care of the porcelain crown on tooth 19 is becoming urgent to avoid a root canal.\n\nYour insurance will cover 50%, leaving a $675.00 out-of-pocket estimate.\n\nTo make this easier, we can offer 4 monthly payments of $168.75. Would you like me to send you the secure payment plan link?`;

        let i = 0;
        setExplanationText("");
        const interval = setInterval(() => {
            i++;
            setExplanationText(draft.substring(0, i));
            if (i >= draft.length) {
                clearInterval(interval);
                setExplanationGenerating(false);
            }
        }, 15);
    };

    const [activeTab, setActiveTab] = React.useState(() => {
        const path = window.location.pathname.replace(/^\//, '');
        const parts = path.split('/');
        if (parts.length > 2 && parts[0] === 'patients') {
            const decodedTab = decodeURIComponent(parts[2]).replace(/-/g, ' ');
            const resolvedTab = tabs.find(t => t.toLowerCase() === decodedTab.toLowerCase());
            return resolvedTab || "Timeline";
        }
        return "Timeline";
    });

    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname.replace(/^\//, '');
            const parts = path.split('/');
            if (parts.length > 2 && parts[0] === 'patients') {
                const decodedTab = decodeURIComponent(parts[2]).replace(/-/g, ' ');
                const resolvedTab = tabs.find(t => t.toLowerCase() === decodedTab.toLowerCase());
                if (resolvedTab) setActiveTab(resolvedTab);
            } else if (parts.length === 2 && parts[0] === 'patients') {
                setActiveTab("Timeline");
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        const nameSlug = patient.name.replace(/\s+/g, '-');
        const urlSafeTab = encodeURIComponent(tabName.toLowerCase().replace(/\s+/g, '-'));
        window.history.pushState(null, '', `/patients/${nameSlug}/${urlSafeTab}`);
    };

    const [xrayFullscreen, setXrayFullscreen] = React.useState(null);

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
        <div className="patient-hero-container" style={{ padding: "16px 40px" }}>
            <div className="hero-back-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <button className="hero-back-button" onClick={onBack} style={{ background: "none", border: "none", color: "#1C1E23", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, margin: 0, padding: 0 }}>
                    ← Back to Patients
                </button>
            </div>

            {/* Patient Hero Profile */}
            <div className="hero-profile-container" style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <img
                        src={patient.photoUrl}
                        alt={patient.name}
                        className="hero-avatar-img"
                        style={{ objectFit: "cover", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", flexShrink: 0 }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <h1 className="hero-name-row" style={{ fontWeight: 700, color: "#1C1E23", margin: 0 }}>{patient.name}</h1>
                            <span style={{ background: patient.status === "Active" ? "#E8F5E9" : "#FFF3E0", color: patient.status === "Active" ? "#00B67A" : "#E65100", padding: "4px 10px", borderRadius: "9999px", fontSize: 11, fontWeight: 700 }}>{patient.status}</span>
                        </div>
                        <div style={{ color: "#8A8D93", fontSize: 14, fontWeight: 500 }}>
                            {patient.age} yrs · DOB: {patient.dob}
                        </div>
                    </div>
                </div>

                <div className="hero-contact-row">
                    <div className="hero-contact-item">
                        <Phone size={16} /> {patient.phone}
                    </div>
                    <div className="hero-contact-item">
                        <Mail size={16} /> {patient.email}
                    </div>
                </div>

                <div className="hero-provider-row">
                    <div className="hero-provider-card">
                        <span className="hero-provider-label">Primary Provider</span>
                        <span className="hero-provider-value">{patient.provider}</span>
                    </div>
                    <div className="hero-provider-card">
                        <span className="hero-provider-label">Insurance Payer</span>
                        <span className="hero-provider-value">{patient.insurance}</span>
                    </div>
                </div>
            </div>

            {/* Premium Tabs */}
            <div className="mobile-tab-scroll-container" style={{ width: "100%", overflowX: "auto", marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 8, padding: "0 20px", width: "max-content" }}>
                    {tabs.map(t => (
                        <button key={t} onClick={() => handleTabClick(t)} style={{
                            padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
                            background: activeTab === t ? "#1C1E23" : "transparent", color: activeTab === t ? "white" : "#8A8D93",
                        }}>{t}</button>
                    ))}
                </div>
            </div>

            {/* Timeline Tab */}
            {activeTab === "Timeline" && (
                <div className="mobile-no-padding-card" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1E23", marginBottom: 32, marginTop: 0 }}>Clinical Timeline</h2>

                    {patient.nextAppt && (
                        <div style={{ background: "#F0FDF4", border: `1px dashed ${GEO_GREEN}`, borderRadius: GEO_RADIUS, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32, boxShadow: "0 4px 12px rgba(0,182,122,0.05)" }}>
                            <div style={{ background: GEO_GREEN, color: "white", width: 40, height: 40, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Calendar size={18} />
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: GEO_GREEN, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Upcoming Appointment Confirmed</div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{new Date(patient.nextAppt).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "long", day: "numeric" })} {patient.nextApptTime && `at ${patient.nextApptTime}`} <span style={{ color: GEO_TEXT_MUTED, fontWeight: 500, marginLeft: 6 }}>• with {patient.provider}</span></div>
                            </div>
                        </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {safeTimeline.map((ev, i) => (
                            <div key={i} style={{ display: "flex", gap: 24, position: "relative" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 22, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                                        <Stethoscope size={20} color="#00B67A" />
                                    </div>
                                </div>
                                <div style={{ flex: 1, paddingBottom: 40 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                                        <div>
                                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1C1E23", margin: "0 0 4px 0" }}>{ev.title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: GEO_GREEN }}>{ev.provider}</div>
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "#8A8D93", textAlign: "right" }}>
                                            {ev.date}
                                            {ev.time && <div style={{ fontSize: 12, marginTop: 2 }}>{ev.time}</div>}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 14, color: "#4B5563", margin: "0 0 16px 0", lineHeight: 1.5 }}>{ev.notes}</p>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {ev.codes.map(c => <span key={c} style={{ border: "1px solid #E5E7EB", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, color: "#8A8D93" }}>{c}</span>)}
                                    </div>

                                    {/* Nested AI SOAP Note */}
                                    {ev.aiNote && (
                                        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px dashed #E5E7EB" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                                                <div>
                                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1C1E23", margin: "0 0 4px 0" }}>{ev.aiNote.title}</h3>
                                                    <div style={{ fontSize: 13, fontWeight: 600, color: GEO_GREEN }}>{ev.aiNote.provider}</div>
                                                </div>
                                                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", color: GEO_GREEN, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: "6px 12px", borderRadius: GEO_RADIUS, border: `1px solid ${GEO_GREEN}` }}>
                                                    <ExternalLink size={14} /> View Note
                                                </button>
                                            </div>
                                            <p style={{ fontSize: 14, color: "#4B5563", margin: "0", lineHeight: 1.5 }}>{ev.aiNote.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Medical History Tab */}
            {activeTab === "Medical History" && (
                <div className="grid-stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <div className="mobile-no-padding-card" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: 0 }}>Patient Vitals</h3>
                            <button style={{ color: "#00B67A", background: "none", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Edit3 size={16} /> Edit</button>
                        </div>
                        <div className="grid-stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
                        <div className="mobile-no-padding-card" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
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
                        <div className="mobile-no-padding-card" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: "0 0 24px 0" }}>Current Medications</h3>
                            {safeMedHistory.medications.map((m, i) => (
                                <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < safeMedHistory.medications.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                                    <div style={{ fontWeight: 700, fontSize: 16, color: "#1C1E23", marginBottom: 4 }}>{m.name}</div>
                                    <div style={{ fontSize: 14, color: "#545963", lineHeight: 1.5 }}>{m.frequency} · For {m.purpose} ({m.prescriber})</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mobile-no-padding-card" style={{ gridColumn: "1 / -1", background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C1E23", margin: "0 0 24px 0" }}>Family & Social Baseline</h3>
                        <div className="stack-on-mobile" style={{ display: "flex", gap: 24 }}>
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
                        <div key={xray.id} className="stack-on-mobile mobile-no-padding-card" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB", display: "flex", gap: 40 }}>
                            <div style={{ width: "100%", maxWidth: 500, flexShrink: 0 }}>
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
                <div className="stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
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
                <div className="mobile-no-padding-card" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
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
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div className="mobile-no-padding-card" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1E23", margin: 0 }}>Proposed Treatment</h2>
                                <span className="geo-tooltip-container" data-tooltip="Based on past history, remaining insurance maximum, and current out-of-pocket costs, this patient is highly likely to accept treatment if financing is offered." style={{ padding: "4px 12px", background: "#F0FDF4", color: "#00B67A", borderRadius: "9999px", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, cursor: "help", border: "1px solid #bbf7d0" }}>
                                    <Sparkles size={14} /> 78% Likelihood - Needs Financing
                                </span>
                            </div>
                            <div style={{ padding: "8px 16px", borderRadius: "9999px", background: "#FFF5F0", color: "#EA580C", fontSize: 13, fontWeight: 700 }}>Patient Portion: $675.00</div>
                        </div>

                        <div style={{ borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", marginBottom: 32 }}>
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

                        {/* Acceptance Automation Grid */}
                        <div className="stack-grid-mobile" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>

                            {/* AI Financial Presentation */}
                            <div style={{ background: "#F8FAFC", borderRadius: 20, padding: 24, border: "1px solid #E2E8F0" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 14, background: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <MessageSquare size={14} color="white" />
                                    </div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#0f172a" }}>AI Explanation Preview (Patient Facing)</h3>
                                </div>
                                <div style={{ background: "white", borderRadius: 12, padding: 20, fontSize: 14, color: "#334155", lineHeight: 1.6, border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", whiteSpace: "pre-wrap", minHeight: 180 }}>
                                    {explanationText}
                                    {explanationGenerating && <span style={{ display: "inline-block", width: 4, height: 14, background: "#0ea5e9", marginLeft: 2, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />}
                                </div>
                                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                                    <button onClick={handleRegenerateExplanation} disabled={explanationGenerating} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: explanationGenerating ? "#e2e8f0" : "#0ea5e9", color: explanationGenerating ? "#94a3b8" : "white", fontWeight: 600, cursor: explanationGenerating ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}><Play size={14} /> {explanationGenerating ? "Generating..." : "Generate New Explanation"}</button>
                                    <button onClick={() => setEditPromptOpen(true)} disabled={explanationGenerating} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1px solid #cbd5e1", background: "white", color: explanationGenerating ? "#94a3b8" : "#475569", fontWeight: 600, cursor: explanationGenerating ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}><Edit3 size={14} /> Edit Prompt</button>
                                </div>
                            </div>

                            {/* Automation Timeline */}
                            <div style={{ background: "white", borderRadius: 20, padding: 24, border: "1px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#0f172a" }}>Automation Sequence</h3>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Auto-Follow-Up Enabled</span>
                                        <div style={{ width: 44, height: 24, borderRadius: 12, background: "#10b981", position: "relative", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 2px" }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10, background: "white", position: "absolute", right: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ position: "relative", paddingLeft: 24, flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                                    <div style={{ position: "absolute", left: 7, top: 4, bottom: 4, width: 2, background: "#e2e8f0" }} />

                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", left: -24, top: 2, width: 16, height: 16, borderRadius: 8, background: "#10b981", border: "3px solid white", boxShadow: "0 0 0 1px #10b981" }} />
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Day 1: Send Educational Video</div>
                                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Sent via SMS (Today, 10:45 AM)</div>
                                    </div>

                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", left: -24, top: 2, width: 16, height: 16, borderRadius: 8, background: "white", border: "2px solid #cbd5e1" }} />
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Day 3: Financing Options</div>
                                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>System will auto-send text with 4-month payment link.</div>
                                    </div>

                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", left: -24, top: 2, width: 16, height: 16, borderRadius: 8, background: "white", border: "2px solid #cbd5e1" }} />
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Day 7: Task Front Desk</div>
                                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Agent will task front desk to call patient if link unopened.</div>
                                    </div>
                                </div>
                            </div>

                        </div>
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
                    <div className="stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
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

            {/* Edit Prompt Modal */}
            {editPromptOpen && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }} onClick={() => setEditPromptOpen(false)}>
                    <div style={{ background: "#FFFFFF", borderRadius: 32, padding: 40, width: "100%", maxWidth: 600, boxShadow: "0 24px 48px rgba(0,0,0,0.2)", position: "relative" }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setEditPromptOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "#F4F5F7", border: "none", width: 36, height: 36, borderRadius: 18, fontSize: 18, color: "#1C1E23", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0ea5e920", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Edit3 size={22} color="#0ea5e9" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1C1E23" }}>Edit AI Prompt</h3>
                                <div style={{ fontSize: 14, color: "#8A8D93", marginTop: 4 }}>Customize instructions for the financial explainer.</div>
                            </div>
                        </div>

                        <textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} style={{ width: "100%", height: 120, padding: 16, borderRadius: 12, border: "1px solid #E2E8F0", background: "#F8FAFC", fontSize: 14, fontFamily: "inherit", color: "#334155", lineHeight: 1.5, resize: "none", boxSizing: "border-box", marginBottom: 24, outline: "none", transition: "border 0.2s" }} onFocus={e => e.currentTarget.style.border = "1px solid #0ea5e9"} onBlur={e => e.currentTarget.style.border = "1px solid #E2E8F0"} />

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button onClick={() => setEditPromptOpen(false)} style={{ padding: "14px 28px", borderRadius: 9999, border: "1px solid #E5E7EB", background: "#FFFFFF", fontWeight: 600, fontSize: 15, color: "#1C1E23", cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleRegenerateExplanation} style={{ padding: "14px 28px", borderRadius: 9999, border: "none", background: "#0ea5e9", fontWeight: 600, fontSize: 15, color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(14, 165, 233, 0.2)" }}>
                                <Sparkles size={16} /> Apply & Regenerate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ==========================================
// UI2: BILLING & CLAIMS MODULE
// ==========================================
export function BillingPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [mockClaims] = useState([
        { id: "CLM-9021", patient: "Sarah Chen", provider: "Dr. Cifor", date: "Oct 24, 2023", codes: "D1110, D0274", billed: "$210.00", status: "Denied" },
        { id: "CLM-9022", patient: "Michael Ross", provider: "Dr. Vargas", date: "Oct 24, 2023", codes: "D2740", billed: "$1,200.00", status: "Needs Attention" }
    ]);

    const [runningEligibility, setRunningEligibility] = useState(false);
    const [eligibilityDone, setEligibilityDone] = useState(false);
    const [showAppeal, setShowAppeal] = useState(false);
    const [appealStage, setAppealStage] = useState(0);

    return (
        <div style={{ padding: "20px 40px" }}>
            {typeof window !== 'undefined' && window.TopGreetingUI2 && <window.TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Insurance Automation Enhancements" />}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 24, marginBottom: 24 }}>
                {/* Panel A: AI Eligibility Check */}
                <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px 0" }}>AI Eligibility Check</h3>
                    <div style={{ background: "#F9FAFB", padding: 16, borderRadius: 12, marginBottom: 16 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>James Smith</div>
                        <div style={{ fontSize: 13, color: "#6B7280" }}>Carrier: Delta Dental</div>
                        <div style={{ fontSize: 13, color: "#6B7280" }}>Max: $2,000 <span style={{ color: "#EF4444" }}>(Used: $1,800)</span> Remaining: $200</div>
                        <div style={{ fontSize: 13, color: "#6B7280" }}>Verification: 1.2s • AI Confidence: <span style={{ color: "#10B981", fontWeight: 700 }}>99%</span></div>
                    </div>
                    {!eligibilityDone ? (
                        <button onClick={() => { setRunningEligibility(true); setTimeout(() => setEligibilityDone(true), 2000) }} style={{ width: "100%", padding: "10px", background: "#111827", color: "white", borderRadius: 9999, border: "none", cursor: "pointer" }}>
                            {runningEligibility ? "Running..." : "Run for All Today's Patients"}
                        </button>
                    ) : (
                        <div style={{ color: "#10B981", fontWeight: 700, textAlign: "center" }}>All Patients Verified</div>
                    )}
                </div>

                {/* Panel B: AI Co-Pay Predictor */}
                <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px 0" }}>Predicted Patient Responsibility</h3>
                        <span style={{ background: "#ECFDF5", color: "#10B981", padding: "4px 8px", borderRadius: 9999, fontSize: 12, fontWeight: 700 }}>98% Accuracy</span>
                    </div>
                    <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ color: "#6B7280", borderBottom: "1px solid #E5E7EB", textAlign: "left" }}>
                                <th style={{ paddingBottom: 8 }}>Patient</th>
                                <th style={{ paddingBottom: 8 }}>Proc</th>
                                <th style={{ paddingBottom: 8 }}>Billed</th>
                                <th style={{ paddingBottom: 8 }}>Ins Est</th>
                                <th style={{ paddingBottom: 8 }}>AI Co-Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                                <td style={{ padding: "8px 0", fontWeight: 600 }}>J. Doe</td>
                                <td style={{ padding: "8px 0" }}>D2740</td>
                                <td style={{ padding: "8px 0" }}>$1200</td>
                                <td style={{ padding: "8px 0" }}>$600</td>
                                <td style={{ padding: "8px 0", fontWeight: 700, color: "#10B981" }} title="AI Calculation: Billed - Historical Payer Allowable - Remaining Deductible = Co-Pay">$600</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "8px 0", fontWeight: 600 }}>M. Lee</td>
                                <td style={{ padding: "8px 0" }}>D1110</td>
                                <td style={{ padding: "8px 0" }}>$150</td>
                                <td style={{ padding: "8px 0" }}>$150</td>
                                <td style={{ padding: "8px 0", fontWeight: 700, color: "#10B981" }} title="AI Calculation: Preventative covered at 100% historical average = $0">$0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Panel C: AI Denial Fighter */}
                <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px 0", color: "#EF4444" }}>Denied Claim: CLM-9021</h3>
                    <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Reason: Missing Tooth Number (D2740)</div>
                    <button onClick={() => setShowAppeal(true)} style={{ width: "100%", padding: "10px", background: "#FEF2F2", color: "#EF4444", borderRadius: 9999, border: "1px solid #FECACA", fontWeight: 700, cursor: "pointer" }}>Auto-Appeal</button>

                    {showAppeal && (
                        <div style={{ position: "absolute", top: 120, right: 40, width: 400, background: "white", padding: 24, borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.2)", zIndex: 10 }}>
                            <h4 style={{ margin: "0 0 12px 0" }}>AI Generated Appeal Letter</h4>
                            <div style={{ fontSize: 12, background: "#F9FAFB", padding: 12, borderRadius: 8, marginBottom: 16, fontFamily: "monospace" }}>
                                "To Whom It May Concern: We are appealing the denial for claim CLM-9021. AI Charting identified Tooth #19 in original clinical notes..."
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 16 }}>
                                <span style={{ color: appealStage >= 1 ? "#10B981" : "inherit" }}>Drafted</span> →
                                <span style={{ color: appealStage >= 2 ? "#10B981" : "inherit" }}>Submitted</span> →
                                <span>Under Review</span> →
                                <span>Paid</span>
                            </div>
                            <button onClick={() => { setAppealStage(1); setTimeout(() => setAppealStage(2), 1500) }} style={{ width: "100%", padding: "10px", background: "#10B981", color: "white", borderRadius: 9999, border: "none", cursor: "pointer" }}>
                                {appealStage === 2 ? "Submitted!" : "Send Appeal"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Claims Table (Placeholder) */}
            <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 24px 0" }}>Claims Table</h3>
                <div style={{ color: "#6B7280", fontSize: 14 }}>[Existing Claims Table Data]</div>
            </div>
        </div>
    );
}

// ----------------------------------------------------
// RECALL COMPONENT
// ----------------------------------------------------


export function RecallPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [patients, setPatients] = useState([
        { id: 1, name: "Sarah Chen", overdue: "2 Months", expanded: false, toggled: false },
        { id: 2, name: "David Kim", overdue: "6 Months", expanded: false, toggled: true }
    ]);

    const handleToggle = (id) => {
        setPatients(patients.map(p => p.id === id ? { ...p, toggled: !p.toggled, expanded: !p.toggled } : p));
    };

    return (
        <div style={{ padding: "20px 40px", height: "100%" }}>
            {typeof window !== 'undefined' && window.TopGreetingUI2 && <window.TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Reactivation Page" />}

            <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginTop: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 24px 0" }}>Patient Reactivation List</h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ color: "#6B7280", fontSize: 13, textTransform: "uppercase", borderBottom: "2px solid #F3F4F6", textAlign: "left" }}>
                            <th style={{ padding: "0 0 16px 0" }}>Patient</th>
                            <th style={{ padding: "0 0 16px 0" }}>Overdue</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "right" }}>AI Auto-Sequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(p => (
                            <React.Fragment key={p.id}>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                                    <td style={{ padding: "20px 0", fontWeight: 600 }}>{p.name}</td>
                                    <td style={{ padding: "20px 0", color: "#EF4444", fontWeight: 600 }}>{p.overdue}</td>
                                    <td style={{ padding: "20px 0", textAlign: "right" }}>
                                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 13, fontWeight: 600, color: p.toggled ? "#10B981" : "#6B7280" }}>{p.toggled ? "Active" : "Off"}</span>
                                            <div onClick={() => handleToggle(p.id)} style={{ width: 44, height: 24, borderRadius: 12, background: p.toggled ? "#10B981" : "#E5E7EB", position: "relative", cursor: "pointer", transition: "0.2s" }}>
                                                <div style={{ width: 20, height: 20, borderRadius: 10, background: "white", position: "absolute", top: 2, left: p.toggled ? 22 : 2, transition: "0.2s" }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {p.expanded && (
                                    <tr style={{ background: "#F9FAFB" }}>
                                        <td colSpan="3" style={{ padding: 24, borderBottom: "1px solid #E5E7EB" }}>
                                            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Multi-Step Outreach Plan (AI Generated)</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                                                <div style={{ width: 24, height: 24, borderRadius: 12, background: "#10B981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>1</div>
                                                <div style={{ flex: 1, fontSize: 13 }}><strong>Tomorrow:</strong> Initial SMS</div>
                                                <button style={{ padding: "6px 12px", borderRadius: 9999, border: "1px solid #10B981", color: "#10B981", background: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>AI Preview</button>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                                                <div style={{ width: 24, height: 24, borderRadius: 12, background: "#3B82F6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>2</div>
                                                <div style={{ flex: 1, fontSize: 13 }}><strong>In 3 days:</strong> Email Follow-up</div>
                                                <button style={{ padding: "6px 12px", borderRadius: 9999, border: "1px solid #3B82F6", color: "#3B82F6", background: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>AI Preview</button>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                                <div style={{ width: 24, height: 24, borderRadius: 12, background: "#F59E0B", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>3</div>
                                                <div style={{ flex: 1, fontSize: 13 }}><strong>Next Week:</strong> Final SMS + Call Option</div>
                                                <button style={{ padding: "6px 12px", borderRadius: 9999, border: "1px solid #F59E0B", color: "#F59E0B", background: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>AI Preview</button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export function ClinicalChartPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [activeTab, setActiveTab] = useState("tooth");
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [teeth, setTeeth] = useState(() => {
        const initial = {};
        for (let i = 1; i <= 32; i++) initial[i] = { status: "Healthy", condition: "" };
        // Demo data
        initial[19] = { status: "Proposed", condition: "Crown - PFM" };
        initial[3] = { status: "Watch", condition: "Early Caries" };
        initial[14] = { status: "Proposed", condition: "DO Composite" };
        initial[1] = { status: "Missing", condition: "Extracted" };
        initial[16] = { status: "Missing", condition: "Extracted" };
        initial[17] = { status: "Missing", condition: "Extracted" };
        initial[32] = { status: "Missing", condition: "Extracted" };
        initial[8] = { status: "Existing", condition: "Veneer" };
        initial[9] = { status: "Existing", condition: "Veneer" };
        return initial;
    });

    const [perioScores, setPerioScores] = useState(() => {
        const initial = {};
        for (let i = 1; i <= 32; i++) initial[i] = [3, 2, 3]; // Default healthy buccal
        // Add some demo pockets
        initial[19] = [4, 5, 4];
        initial[14] = [5, 6, 4];
        initial[3] = [3, 4, 3];
        return initial;
    });

    const [generating, setGenerating] = useState(false);
    const [note, setNote] = useState("");

    const [analyzingXray, setAnalyzingXray] = useState(false);
    const [xrayAnalyzed, setXrayAnalyzed] = useState(false);

    const handleToothClick = (num) => {
        setSelectedTooth(selectedTooth === num ? null : num);
    };

    const handleStatusChange = (num, status) => {
        setTeeth(prev => ({ ...prev, [num]: { ...prev[num], status } }));
        setSelectedTooth(null);
    };

    const getToothColor = (status) => {
        switch (status) {
            case "Healthy": return GEO_GREEN;
            case "Existing": return "#3B82F6"; // Blue
            case "Proposed": return "#EF4444"; // Red
            case "Missing": return "#94A3B8"; // Grey
            case "Watch": return "#F59E0B"; // Yellow
            default: return GEO_BG;
        }
    };

    const getPerioColor = (score) => {
        if (score >= 6) return "#EF4444";
        if (score >= 4) return "#F59E0B";
        return GEO_GREEN;
    };

    const handleGenerate = () => {
        setGenerating(true);
        setNote("");
        const draft = `CLINICAL DICTATION & TREATMENT PLAN:

Findings:
- Tooth #19: Lingual cusp fracture observed. High risk of complete structural failure.
- Tooth #14: Disto-occlusal radiolucency consistent with progressive caries.
- Tooth #3: Deep occlusal pit, monitoring for decay.

Recommended Treatment Plan:
1. D2740 - Crown (Porcelain/Ceramic) on Tooth #19 to prevent further fracture.
2. D2392 - Resin-based composite (Two surfaces, posterior) on Tooth #14.

AI Confidence: 96% match with standard of care protocols.`;

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

    const handleAnalyzeXray = () => {
        setAnalyzingXray(true);
        setTimeout(() => {
            setAnalyzingXray(false);
            setXrayAnalyzed(true);
        }, 2000);
    };

    // Tooth SVGs (Simplified representation)
    const renderToothChart = () => {
        const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
        const lowerArch = Array.from({ length: 16 }, (_, i) => 32 - i);

        const ToothNode = ({ num }) => {
            const data = teeth[num];
            const isSelected = selectedTooth === num;
            return (
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: GEO_TEXT_MUTED }}>{num}</div>
                    <div
                        onClick={() => handleToothClick(num)}
                        style={{
                            width: 32, height: 40, borderRadius: "6px 6px 16px 16px",
                            background: data.status === "Healthy" ? GEO_WHITE : `${getToothColor(data.status)}15`,
                            border: `2px solid ${isSelected ? GEO_BLACK : getToothColor(data.status)}`,
                            cursor: "pointer", transition: "all 0.2s",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                            transform: isSelected ? "scale(1.1)" : "scale(1)"
                        }}
                    >
                        {data.status === "Missing" ? <X size={16} color={getToothColor(data.status)} /> : null}
                    </div>

                    {/* Popup */}
                    {isSelected && (
                        <div style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)", background: GEO_WHITE, borderRadius: 12, padding: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 100, width: 160, border: `1px solid ${GEO_BG}` }}>
                            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: GEO_TEXT_MAIN, textAlign: "center" }}>Tooth #{num}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {["Healthy", "Existing", "Proposed", "Watch", "Missing"].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(num, status)}
                                        style={{
                                            background: "transparent", border: "none", padding: "6px 8px", borderRadius: 6, fontSize: 13, fontWeight: 600,
                                            color: data.status === status ? getToothColor(status) : GEO_TEXT_MAIN,
                                            backgroundColor: data.status === status ? `${getToothColor(status)}10` : "transparent",
                                            cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 6
                                        }}
                                        onMouseOver={e => e.currentTarget.style.backgroundColor = GEO_BG}
                                        onMouseOut={e => e.currentTarget.style.backgroundColor = data.status === status ? `${getToothColor(status)}10` : "transparent"}
                                    >
                                        <div style={{ width: 8, height: 8, borderRadius: 4, background: getToothColor(status) }} />
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center", width: "100%", padding: "20px 0" }}>
                {/* Upper Arch */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
                    {upperArch.map(num => <ToothNode key={num} num={num} />)}
                </div>
                {/* Lower Arch */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
                    {lowerArch.map(num => <ToothNode key={num} num={num} />)}
                </div>

                {/* Legend */}
                <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
                    {[
                        { label: "Healthy", color: GEO_GREEN },
                        { label: "Existing", color: "#3B82F6" },
                        { label: "Proposed", color: "#EF4444" },
                        { label: "Watch", color: "#F59E0B" },
                        { label: "Missing", color: "#94A3B8" }
                    ].map(leg => (
                        <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED }}>
                            <div style={{ width: 12, height: 12, borderRadius: 2, border: `2px solid ${leg.color}`, background: `${leg.color}20` }} />
                            {leg.label}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderPerioChart = () => {
        const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
        const lowerArch = Array.from({ length: 16 }, (_, i) => 32 - i);

        const PerioRow = ({ arch }) => (
            <div style={{ display: "flex", gap: 4, justifyContent: "center", width: "100%" }}>
                {arch.map(num => {
                    const scores = perioScores[num] || [3, 3, 3];
                    return (
                        <div key={num} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: GEO_TEXT_MUTED }}>{num}</div>
                            <div style={{ display: "flex", gap: 2 }}>
                                {scores.map((s, i) => (
                                    <div key={i} style={{ width: 16, height: 24, fontSize: 11, fontWeight: 700, color: GEO_WHITE, background: getPerioColor(s), display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center", width: "100%", padding: "20px 0" }}>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textAlign: "center", marginBottom: 8 }}>Upper Buccal</div>
                    <PerioRow arch={upperArch} />
                </div>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: GEO_TEXT_MUTED, textAlign: "center", marginBottom: 8 }}>Lower Buccal</div>
                    <PerioRow arch={lowerArch} />
                </div>

                <div style={{ background: "#F8FAFC", padding: 16, borderRadius: 12, width: "100%", border: `1px solid ${GEO_BG}`, marginTop: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: GEO_TEXT_MAIN, fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                        <TrendingUp size={16} color={GEO_GREEN} /> AI Perio Trend Analysis
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: GEO_TEXT_MUTED, lineHeight: 1.5 }}>
                        Patient shows <strong>0.3mm average reduction</strong> in pocket depths compared to previous exam (6 months ago). Areas of concern remain at #14 (Disto-buccal 6mm) and #19 (Mesio-buccal 5mm). Recommended: Focused scaling and localized antibiotic delivery.
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="mobile-no-padding-main" style={{ padding: "20px 40px", flex: 1, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Examining Sarah Chen (ID: 00192)" />

            <div className="stack-on-mobile" style={{ display: "flex", gap: 24, flex: 1 }}>

                {/* LEFT PANEL: Charts */}
                <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${GEO_BG}`, paddingBottom: 16 }}>
                            <div style={{ display: "flex", gap: 16 }}>
                                <button onClick={() => setActiveTab("tooth")} style={{ background: "transparent", border: "none", fontSize: 18, fontWeight: 700, color: activeTab === "tooth" ? GEO_TEXT_MAIN : GEO_TEXT_MUTED, cursor: "pointer", position: "relative", padding: "0 4px" }}>
                                    Tooth Chart
                                    {activeTab === "tooth" && <div style={{ position: "absolute", bottom: -17, left: 0, right: 0, height: 3, background: GEO_GREEN, borderRadius: "3px 3px 0 0" }} />}
                                </button>
                                <button onClick={() => setActiveTab("perio")} style={{ background: "transparent", border: "none", fontSize: 18, fontWeight: 700, color: activeTab === "perio" ? GEO_TEXT_MAIN : GEO_TEXT_MUTED, cursor: "pointer", position: "relative", padding: "0 4px" }}>
                                    Perio Chart
                                    {activeTab === "perio" && <div style={{ position: "absolute", bottom: -17, left: 0, right: 0, height: 3, background: GEO_GREEN, borderRadius: "3px 3px 0 0" }} />}
                                </button>
                            </div>
                            <div style={{ display: "flex", gap: 12 }}>
                                <button style={{ padding: "8px 16px", borderRadius: GEO_PILL, border: `1px solid ${GEO_BG}`, background: GEO_BG, fontSize: 13, fontWeight: 600, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                    <Clock size={14} /> History
                                </button>
                                <button style={{ padding: "8px 16px", borderRadius: GEO_PILL, border: `1px solid ${GEO_BG}`, background: GEO_WHITE, fontSize: 13, fontWeight: 600, color: GEO_TEXT_MAIN, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                    <ImageIcon size={14} /> Layout
                                </button>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {activeTab === "tooth" ? renderToothChart() : renderPerioChart()}
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: AI Assists */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

                    {/* AI Diagnostic Assist (X-Ray) */}
                    <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: GEO_SHADOW }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${GEO_GREEN}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Sparkles size={16} color={GEO_GREEN} />
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>AI Diagnostic Assist</h3>
                        </div>

                        <div style={{ width: "100%", height: 180, background: "#1a1a1a", borderRadius: 12, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, border: `2px solid ${GEO_BG}` }}>
                            {/* Fake X-Ray Background */}
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.6, backgroundImage: "linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222), linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222)", backgroundSize: "10px 10px", backgroundPosition: "0 0, 5px 5px" }} />
                            <div style={{ width: "80%", height: "60%", border: "2px solid #555", borderRadius: "100px / 50px", opacity: 0.5 }} />

                            {/* Analysis Overlay */}
                            {xrayAnalyzed && (
                                <>
                                    <div style={{ position: "absolute", top: "40%", left: "30%", width: 24, height: 24, border: "2px solid #EF4444", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ position: "absolute", top: -10, right: -10, width: 16, height: 16, background: "#EF4444", color: "white", fontSize: 10, fontWeight: 800, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>1</div>
                                    </div>
                                    <div style={{ position: "absolute", top: "50%", right: "25%", width: 30, height: 20, border: "2px solid #F59E0B", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ position: "absolute", top: -10, right: -10, width: 16, height: 16, background: "#F59E0B", color: "white", fontSize: 10, fontWeight: 800, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>2</div>
                                    </div>
                                    <div style={{ position: "absolute", bottom: "20%", left: "45%", width: 40, height: 10, border: "2px dashed #94A3B8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ position: "absolute", top: -10, right: -10, width: 16, height: 16, background: "#94A3B8", color: "white", fontSize: 10, fontWeight: 800, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>3</div>
                                    </div>
                                </>
                            )}

                            {!xrayAnalyzed && !analyzingXray && (
                                <button onClick={handleAnalyzeXray} style={{ zIndex: 10, padding: "10px 20px", borderRadius: GEO_PILL, border: `1px solid rgba(255,255,255,0.2)`, background: "rgba(0,0,0,0.6)", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", gap: 8 }}>
                                    <ImageIcon size={16} /> Analyze Panorex
                                </button>
                            )}
                            {analyzingXray && (
                                <div style={{ zIndex: 10, padding: "10px 20px", borderRadius: GEO_PILL, border: `1px solid rgba(0, 182, 122, 0.4)`, background: "rgba(0, 182, 122, 0.1)", color: GEO_GREEN, fontSize: 14, fontWeight: 600, backdropFilter: "blur(4px)", display: "flex", alignItems: "center", gap: 8 }}>
                                    <Loader2 size={16} className="lucide-spin" style={{ animation: "spin 2s linear infinite" }} /> Running AI Models...
                                </div>
                            )}
                        </div>

                        {xrayAnalyzed && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#FEF2F2", padding: 12, borderRadius: 8 }}>
                                    <div style={{ width: 20, height: 20, background: "#EF4444", color: "white", fontSize: 11, fontWeight: 800, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#991B1B" }}>Tooth #19 — Periapical Radiolucency</div>
                                        <div style={{ fontSize: 12, color: "#B91C1C", marginTop: 2 }}>72% confidence line • Probable failing endo or acute infection.</div>
                                    </div>
                                    <div style={{ padding: "2px 6px", background: "#EF4444", color: "white", borderRadius: 4, fontSize: 10, fontWeight: 700, marginLeft: "auto" }}>URGENT</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#FFFBEB", padding: 12, borderRadius: 8 }}>
                                    <div style={{ width: 20, height: 20, background: "#F59E0B", color: "white", fontSize: 11, fontWeight: 800, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>Tooth #14 — Interproximal Caries</div>
                                        <div style={{ fontSize: 12, color: "#B45309", marginTop: 2 }}>85% confidence • Distal surface encoaching on DEJ.</div>
                                    </div>
                                    <div style={{ padding: "2px 6px", background: "#FDE68A", color: "#92400E", borderRadius: 4, fontSize: 10, fontWeight: 700, marginLeft: "auto" }}>WATCH</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#F8FAFC", padding: 12, borderRadius: 8 }}>
                                    <div style={{ width: 20, height: 20, background: "#94A3B8", color: "white", fontSize: 11, fontWeight: 800, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>3</div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>Bone Loss Pattern</div>
                                        <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>68% confidence • Moderate generalized horizontal.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Dictation */}
                    <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 24, boxShadow: GEO_SHADOW, flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${GEO_GREEN}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Mic size={16} color={GEO_GREEN} />
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>AI Dictation & Notes</h3>
                        </div>

                        <div style={{ flex: 1, background: GEO_BG, borderRadius: 12, padding: 16, fontSize: 14, color: GEO_TEXT_MAIN, lineHeight: 1.6, whiteSpace: "pre-wrap", overflowY: "auto", fontFamily: note ? "monospace" : "inherit", border: `1px solid ${GEO_BG}`, position: 'relative' }}>
                            {generating && !note ? (
                                <div style={{ display: "flex", alignItems: "center", gap: 12, color: GEO_TEXT_MUTED, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                    <Loader2 size={24} className="lucide-spin" style={{ animation: "spin 2s linear infinite" }} /> Transcribing...
                                </div>
                            ) : note ? note : <span style={{ color: GEO_TEXT_MUTED }}>"Tooth 19 has a cracked cusp, recommend full coverage crown..."</span>}
                        </div>

                        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                            <div style={{ flex: 1, background: GEO_BG, borderRadius: GEO_PILL, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 4, background: "#EF4444", animation: "pulse 2s infinite" }} />
                                <span style={{ fontSize: 14, color: GEO_TEXT_MUTED }}>Listening...</span>
                            </div>
                            <button onClick={handleGenerate} style={{ padding: "10px 20px", borderRadius: GEO_PILL, border: "none", background: GEO_GREEN, fontSize: 14, fontWeight: 600, color: GEO_WHITE, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0, 182, 122, 0.2)" }}>
                                <FileText size={16} /> Generate Tx Plan
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

// ==========================================
// UI2: COMMUNICATIONS HUB PAGE
// ==========================================
export function CommunicationsHubPageUI2({ currentUI, setUI, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [activeTab, setActiveTab] = useState("inbox");
    const [selectedChat, setSelectedChat] = useState(1);

    // Campaign Gen States
    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [promptText, setPromptText] = useState("");
    const [generatingCampaign, setGeneratingCampaign] = useState(false);
    const [campaignReady, setCampaignReady] = useState(false);

    const INBOX_DATA = [
        { id: 1, name: "David Kim", lastMsg: "Yes, I can make the 2pm on Thursday.", date: "10:42 AM", unread: false, aiFlag: false },
        { id: 2, name: "Sarah Chen", lastMsg: "My temporary crown just fell off while eating lunch!!", date: "9:15 AM", unread: true, aiFlag: true },
        { id: 3, name: "Michael Ross", lastMsg: "Can we push my cleaning to next month?", date: "Yesterday", unread: true, aiFlag: false },
        { id: 4, name: "Emma Watson", lastMsg: "Thanks for the appointment reminder.", date: "Tuesday", unread: false, aiFlag: false }
    ];

    const CAMPAIGN_DATA = [
        { name: "Unscheduled Treatment (Hi-Value)", trigger: "Treatment > $1000, Unscheduled > 30 days", audience: 142, conversion: "18.5%", status: "Active" },
        { name: "Overdue Hygiene (6+ months)", trigger: "No future appt, Last appt > 6mo", audience: 308, conversion: "12.2%", status: "Active" },
        { name: "End of Year Benefits Reminder", trigger: "Remaining Max > $500, Appt in Nov/Dec", audience: 410, conversion: "N/A", status: "Draft" },
    ];

    const NO_SHOW_DATA = [
        { name: "Amanda Knox", appt: "Tomorrow, 2:00 PM", score: "94%", risk: "High", insight: "Has cancelled last 2 appointments with <24h notice. Unconfirmed." },
        { name: "James Smith", appt: "Today, 4:30 PM", score: "88%", risk: "High", insight: "Late arrival history. Usually responds to SMS 1 hour prior." },
        { name: "Olivia Jones", appt: "Friday, 9:00 AM", score: "62%", risk: "Medium", insight: "Confirmed via email, but has a 10% historical no-show rate." }
    ];

    const handleGenerateCampaign = () => {
        setGeneratingCampaign(true);
        setTimeout(() => {
            setGeneratingCampaign(false);
            setCampaignReady(true);
        }, 3000);
    };

    const renderInbox = () => (
        <div style={{ display: "flex", flex: 1, height: "100%", overflow: "hidden", background: GEO_WHITE, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, border: `1px solid ${GEO_BG}` }}>
            {/* Thread List */}
            <div style={{ width: 320, borderRight: `1px solid ${GEO_BG}`, display: "flex", flexDirection: "column" }}>
                <div style={{ padding: 20, borderBottom: `1px solid ${GEO_BG}` }}>
                    <input type="text" placeholder="Search patients or messages..." style={{ width: "100%", padding: "10px 16px", borderRadius: GEO_PILL, border: `1px solid ${GEO_BG}`, background: "#F9FAFB", outline: "none", boxSizing: "border-box", fontSize: 14 }} />
                </div>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {INBOX_DATA.map(chat => (
                        <div key={chat.id} onClick={() => setSelectedChat(chat.id)} style={{ padding: 20, borderBottom: `1px solid ${GEO_BG}`, cursor: "pointer", background: selectedChat === chat.id ? "#F9FAFB" : "transparent", display: "flex", gap: 12, transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#F9FAFB"} onMouseOut={e => e.currentTarget.style.background = selectedChat === chat.id ? "#F9FAFB" : "transparent"}>
                            <div style={{ width: 44, height: 44, borderRadius: 22, background: GEO_BG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: GEO_TEXT_MUTED, flexShrink: 0 }}>
                                {chat.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div style={{ flex: 1, overflow: "hidden" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "center" }}>
                                    <span style={{ fontWeight: chat.unread ? 700 : 600, color: GEO_TEXT_MAIN, fontSize: 15 }}>{chat.name}</span>
                                    <span style={{ fontSize: 12, color: GEO_TEXT_MUTED }}>{chat.date}</span>
                                </div>
                                <div style={{ fontSize: 13, color: chat.unread ? GEO_TEXT_MAIN : GEO_TEXT_MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: chat.unread ? 600 : 400 }}>{chat.lastMsg}</div>
                                {chat.aiFlag && (
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 12, background: "#FEF2F2", color: "#EF4444", fontSize: 11, fontWeight: 700, marginTop: 8 }}>
                                        <AlertTriangle size={12} /> AI URGENCY FLAG
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Thread */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F9FAFB" }}>
                <div style={{ padding: "20px 32px", borderBottom: `1px solid ${GEO_BG}`, background: GEO_WHITE, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 24, background: GEO_BG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: GEO_TEXT_MUTED }}>
                            {INBOX_DATA.find(c => c.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 18, color: GEO_TEXT_MAIN }}>{INBOX_DATA.find(c => c.id === selectedChat)?.name}</div>
                            <div style={{ fontSize: 13, color: GEO_TEXT_MUTED }}>Patient ID: 59912 • Last Visit: 2 mos ago</div>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, padding: 32, overflowY: "auto", display: "flex", flexDirection: "column", gap: 24 }}>
                    {selectedChat === 2 ? (
                        <>
                            <div style={{ alignSelf: "flex-end", maxWidth: "70%", background: GEO_BLACK, color: "white", padding: "12px 16px", borderRadius: "16px 16px 4px 16px", fontSize: 15, lineHeight: 1.5 }}>
                                Hi Sarah, this is Intelident.ai calling to confirm your appointment for next Wednesday.
                            </div>
                            <div style={{ alignSelf: "flex-start", maxWidth: "70%", background: GEO_WHITE, color: GEO_TEXT_MAIN, padding: "12px 16px", borderRadius: "16px 16px 16px 4px", fontSize: 15, lineHeight: 1.5, border: `1px solid ${GEO_BG}`, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                                Yes, confirmed.
                            </div>
                            <div style={{ alignSelf: "flex-start", maxWidth: "70%", background: GEO_WHITE, color: GEO_TEXT_MAIN, padding: "12px 16px", borderRadius: "16px 16px 16px 4px", fontSize: 15, lineHeight: 1.5, border: `1px solid #FECACA`, boxShadow: "0 4px 12px rgba(239, 68, 68, 0.1)" }}>
                                Wait actually, my temporary crown just fell off while eating lunch!! What should I do? It kind of hurts.
                            </div>
                            <div style={{ alignSelf: "flex-end", maxWidth: "70%", background: "#F0FDF4", color: GEO_TEXT_MAIN, padding: "12px 16px", borderRadius: "16px 16px 4px 16px", fontSize: 15, lineHeight: 1.5, border: `1px solid #BBF7D0` }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: GEO_GREEN, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}><Sparkles size={12} /> AI DRAFT SUGGESTION</div>
                                Oh no! We need to get you in as soon as possible to re-cement it and protect the tooth. Dr. Cifor has an emergency opening today at 3:30 PM. Does that work for you?
                            </div>
                        </>
                    ) : (
                        <div style={{ alignSelf: "center", color: GEO_TEXT_MUTED, fontSize: 14 }}>Select a thread to view history.</div>
                    )}
                </div>

                <div style={{ padding: 24, background: GEO_WHITE, borderTop: `1px solid ${GEO_BG}` }}>
                    <div style={{ display: "flex", gap: 12 }}>
                        <input type="text" placeholder="Type a message..." defaultValue={selectedChat === 2 ? "Oh no! We need to get you in as soon as possible to re-cement it and protect the tooth. Dr. Cifor has an emergency opening today at 3:30 PM. Does that work for you?" : ""} style={{ flex: 1, padding: "14px 20px", borderRadius: GEO_PILL, border: `1px solid ${GEO_BG}`, background: "#F9FAFB", outline: "none", fontSize: 15, color: GEO_TEXT_MAIN }} />
                        <button style={{ width: 48, height: 48, borderRadius: 24, background: GEO_GREEN, border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0, 182, 122, 0.2)" }}>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCampaigns = () => (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>Active Drip Sequences</h3>
                <button onClick={() => setShowCampaignModal(true)} style={{ padding: "10px 20px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: GEO_WHITE, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Plus size={16} /> New AI Campaign
                </button>
            </div>

            <div className="mobile-no-padding-card" style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
                    <thead>
                        <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Campaign Name</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Trigger Logic</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Audience Size</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Conversion</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Status</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "right", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CAMPAIGN_DATA.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: `1px solid #F4F5F7` }}>
                                <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{row.name}</td>
                                <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MUTED }}>{row.trigger}</td>
                                <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{row.audience} pts</td>
                                <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_GREEN }}>{row.conversion}</td>
                                <td style={{ padding: "20px 0" }}>
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: GEO_PILL, fontSize: 12, fontWeight: 600, color: row.status === "Active" ? GEO_GREEN : GEO_TEXT_MUTED, background: `${row.status === "Active" ? GEO_GREEN : GEO_TEXT_MUTED}15` }}>
                                        <CircleDot size={12} fill={row.status === "Active" ? GEO_GREEN : GEO_TEXT_MUTED} /> {row.status}
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

            {showCampaignModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
                    <div style={{ background: GEO_WHITE, borderRadius: 24, width: 700, maxWidth: "90%", padding: 40, position: "relative", boxShadow: "0 24px 48px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", maxHeight: "90vh" }}>
                        <button onClick={() => { setShowCampaignModal(false); setCampaignReady(false); setPromptText(""); }} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", cursor: "pointer", padding: 8, borderRadius: "50%" }}>
                            <X size={20} color={GEO_TEXT_MUTED} />
                        </button>

                        <h2 style={{ fontSize: 24, fontWeight: 700, color: GEO_TEXT_MAIN, margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: 12 }}>
                            <Sparkles size={24} color={GEO_GREEN} /> AI Text-to-Campaign Builder
                        </h2>
                        <p style={{ margin: "0 0 24px 0", fontSize: 15, color: GEO_TEXT_MUTED }}>Describe the patients you want to reach and the goal of the outreach.</p>

                        {!campaignReady ? (
                            <>
                                <textarea value={promptText} onChange={e => setPromptText(e.target.value)} placeholder="e.g., Send a promo to patients who had Invisalign consults but never moved forward. Offer them $500 off if they start before December 31st." style={{ width: "100%", height: 120, padding: 16, borderRadius: 12, border: `1px solid ${GEO_BG}`, background: "#F9FAFB", outline: "none", fontSize: 15, fontFamily: "inherit", resize: "none", boxSizing: "border-box", marginBottom: 24 }} />

                                <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
                                    <button disabled={generatingCampaign || !promptText} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: GEO_GREEN, fontWeight: 600, fontSize: 15, color: GEO_WHITE, cursor: (generatingCampaign || !promptText) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, opacity: (generatingCampaign || !promptText) ? 0.5 : 1 }} onClick={handleGenerateCampaign}>
                                        {generatingCampaign ? <><Loader2 size={18} className="lucide-spin" style={{ animation: "spin 2s linear infinite" }} /> Generating AI Audience & Copy...</> : <><Sparkles size={18} /> Generate Campaign</>}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>
                                <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 20, border: `1px solid ${GEO_BG}` }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: GEO_TEXT_MUTED, textTransform: "uppercase", marginBottom: 8 }}>Target Audience Discovered</div>
                                    <div style={{ fontSize: 24, fontWeight: 800, color: GEO_TEXT_MAIN, display: "flex", alignItems: "center", gap: 12 }}>
                                        314 Patients <span style={{ fontSize: 13, fontWeight: 600, padding: "4px 8px", background: "#DBEAFE", color: "#1D4ED8", borderRadius: 12 }}>Invisalign Consult without Tx</span>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: GEO_TEXT_MUTED, textTransform: "uppercase", marginBottom: 8 }}>Generated SMS Sequence</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        <div style={{ background: GEO_WHITE, padding: 16, borderRadius: 12, border: `1px solid ${GEO_BG}` }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: GEO_GREEN, marginBottom: 4 }}>Message 1 (Send Tomorrow at 10 AM)</div>
                                            <div style={{ fontSize: 15, color: GEO_TEXT_MAIN }}>"Hi [First Name], it's Dr. Cifor's office! We're offering $500 off Invisalign treatment if you start before Dec 31st. Want me to send over the details?"</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 12 }}>
                                    <button onClick={() => { setShowCampaignModal(false); setCampaignReady(false); setPromptText(""); }} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: `1px solid ${GEO_TEXT_MUTED}`, background: "transparent", fontWeight: 600, fontSize: 15, color: GEO_TEXT_MUTED, cursor: "pointer" }}>Cancel</button>
                                    <button style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, fontWeight: 600, fontSize: 15, color: GEO_WHITE, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => { setShowCampaignModal(false); setCampaignReady(false); setPromptText(""); }}>
                                        <Play size={18} /> Launch Campaign
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const renderNoShow = () => (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: GEO_TEXT_MAIN, margin: 0 }}>No-Show Prevention AI</h3>
                <div style={{ fontSize: 14, color: GEO_TEXT_MUTED }}>Analyzing next 72 hours of appointments...</div>
            </div>

            <div className="mobile-no-padding-card" style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
                    <thead>
                        <tr style={{ borderBottom: `2px solid #F4F5F7` }}>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Patient</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Appointment</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Flight Risk Score</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "left", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>AI Insight Context</th>
                            <th style={{ padding: "0 0 16px 0", textAlign: "right", color: GEO_TEXT_MUTED, fontSize: 13, textTransform: "uppercase", fontWeight: 700 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NO_SHOW_DATA.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: `1px solid #F4F5F7` }}>
                                <td style={{ padding: "20px 0", fontSize: 15, fontWeight: 600, color: GEO_TEXT_MAIN }}>{row.name}</td>
                                <td style={{ padding: "20px 0", fontSize: 14, color: GEO_TEXT_MAIN, fontWeight: 600 }}>{row.appt}</td>
                                <td style={{ padding: "20px 0" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: row.risk === "High" ? "#EF4444" : "#F59E0B" }}>{row.score}</div>
                                        <div style={{ width: 60, height: 6, background: GEO_BG, borderRadius: 3, overflow: "hidden" }}>
                                            <div style={{ width: row.score, height: "100%", background: row.risk === "High" ? "#EF4444" : "#F59E0B" }} />
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: "20px 0", fontSize: 13, color: GEO_TEXT_MUTED, maxWidth: 300, lineHeight: 1.5 }}>{row.insight}</td>
                                <td style={{ padding: "20px 0", textAlign: "right" }}>
                                    <button style={{ padding: "8px 16px", borderRadius: GEO_PILL, border: "none", background: GEO_BLACK, color: GEO_WHITE, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                        <Shield size={14} /> Send Human Touch
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="mobile-no-padding-main" style={{ padding: "20px 40px", flex: 1, display: "flex", flexDirection: "column", boxSizing: "border-box", height: "calc(100vh - 40px)" }}>
            <TopGreetingUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} subtitle="Manage patient conversations and automated campaigns." />

            <div className="stack-on-mobile" style={{ display: "flex", gap: 16, marginBottom: 24, marginTop: 12 }}>
                <button onClick={() => setActiveTab("inbox")} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: activeTab === "inbox" ? GEO_BLACK : GEO_WHITE, color: activeTab === "inbox" ? GEO_WHITE : GEO_TEXT_MAIN, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", boxShadow: activeTab === "inbox" ? "0 8px 16px rgba(0,0,0,0.15)" : GEO_SHADOW, display: "flex", alignItems: "center", gap: 8 }}>
                    <MessageSquare size={16} /> Inbox
                </button>
                <button onClick={() => setActiveTab("campaigns")} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: activeTab === "campaigns" ? GEO_BLACK : GEO_WHITE, color: activeTab === "campaigns" ? GEO_WHITE : GEO_TEXT_MAIN, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", boxShadow: activeTab === "campaigns" ? "0 8px 16px rgba(0,0,0,0.15)" : GEO_SHADOW, display: "flex", alignItems: "center", gap: 8 }}>
                    <Megaphone size={16} /> Automated Campaigns
                </button>
                <button onClick={() => setActiveTab("noshow")} style={{ padding: "12px 24px", borderRadius: GEO_PILL, border: "none", background: activeTab === "noshow" ? GEO_BLACK : GEO_WHITE, color: activeTab === "noshow" ? GEO_WHITE : GEO_TEXT_MAIN, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", boxShadow: activeTab === "noshow" ? "0 8px 16px rgba(0,0,0,0.15)" : GEO_SHADOW, display: "flex", alignItems: "center", gap: 8 }}>
                    <ShieldAlert size={16} /> No-Show Prevention
                </button>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                {activeTab === "inbox" && renderInbox()}
                {activeTab === "campaigns" && renderCampaigns()}
                {activeTab === "noshow" && renderNoShow()}
            </div>
        </div>
    );
}

export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [currentPage, setCurrentPage] = useState(() => {
        const path = window.location.pathname.replace(/^\//, '');
        const parts = path.split('/');
        const base = parts[0];
        if (base === 'patients' && parts.length > 1) {
            return "patient-detail";
        }
        return base || "dashboard";
    });
    const [selectedPatient, setSelectedPatient] = useState(() => {
        const path = window.location.pathname.replace(/^\//, '');
        const parts = path.split('/');
        if (parts[0] === 'patients' && parts.length > 1) {
            const patientName = decodeURIComponent(parts[1]).replace(/-/g, ' ');
            const patient = PATIENTS.find(p => p.name.toLowerCase() === patientName.toLowerCase());
            return patient || null;
        }
        return null;
    });
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
            const path = window.location.pathname.replace(/^\//, '');
            const parts = path.split('/');
            const base = parts[0];

            if (base === 'patients' && parts.length > 1) {
                const patientName = decodeURIComponent(parts[1]).replace(/-/g, ' ');
                const patient = PATIENTS.find(p => p.name.toLowerCase() === patientName.toLowerCase());
                setSelectedPatient(patient || null);
                setCurrentPage(patient ? "patient-detail" : "patients");
            } else {
                setSelectedPatient(null);
                setCurrentPage(base || "dashboard");
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleNavigate = (page) => {
        const newBase = page.split('/')[0];
        const newPath = `/${page === 'dashboard' ? '' : page}`;
        if (window.location.pathname !== newPath) {
            window.history.pushState(null, '', newPath);
            setCurrentPath(newPath);
            setCurrentPage(newBase);
            window.dispatchEvent(new Event('popstate'));
        }
        setSelectedPatient(null);
        setIsMobileMenuOpen(false); // Close mobile menu on navigate
    };

    const [escalations, setEscalations] = React.useState([
        {
            id: 1,
            time: "10:42 AM",
            patientName: "Lisa Vander",
            phone: "+1 (555) 293-1102",
            type: "Clinical Escalation",
            color: "#DC2626",
            bgColor: "#FEF2F2",
            icon: Shield,
            summary: "Patient reporting severe thermal sensitivity on tooth #19 (recent crown seating). AI terminated scheduling sequence due to medical triage requirement."
        },
        {
            id: 2,
            time: "11:15 AM",
            patientName: "Robert Chen",
            phone: "+1 (555) 840-9921",
            type: "Financial Dispute",
            color: "#D97706",
            bgColor: "#FFFBEB",
            icon: Wallet,
            summary: "Caller became frustrated regarding a $150 balance discrepancy from their last hygiene visit. EOB shows deductible applied. AI transferred to front desk."
        },
        {
            id: 3,
            time: "01:30 PM",
            patientName: "Amanda Knox",
            phone: "+1 (555) 722-4018",
            type: "Complex Routing",
            color: "#374151",
            bgColor: "#F3F4F6",
            icon: Calendar,
            summary: "Needs to coordinate a 3-provider full mouth reconstruction block (Oral Surgeon -> Prosthodontist). AI halted scheduling to prevent blocking overlap."
        }
    ]);

    const handleMarkDone = (id) => {
        setEscalations(prev => prev.filter(e => e.id !== id));
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        const nameSlug = patient.name.replace(/\s+/g, '-').toLowerCase();
        window.history.pushState(null, '', `/patients/${nameSlug}/timeline`);
        setCurrentPage("patient-detail");
    };

    const renderPage = () => {
        switch (currentPage) {
            case "chart": return <ClinicalChartPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "communications": return <CommunicationsHubPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "dashboard": return <DashboardPageUI2 onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} WEEKLY_PRODUCTION={WEEKLY_PRODUCTION} SCHEDULE_DATA={SCHEDULE_DATA} PATIENT_DATA={PATIENTS} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} voiceEscalationCount={escalations.length} />;
            case "patients": return <PatientListPageUI2 onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} PATIENT_DATA={PATIENTS} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} currentPath={currentPath} />;
            case "patient-detail": return selectedPatient ? <PatientDetailPageUI2 patient={selectedPatient} onBack={() => { setSelectedPatient(null); setCurrentPage("patients"); window.history.pushState(null, '', '/patients'); setCurrentPath('/patients'); }} TIMELINE_EVENTS={TIMELINE_EVENTS} MEDICAL_HISTORY={MEDICAL_HISTORY} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} /> : <DashboardPageUI2 onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} WEEKLY_PRODUCTION={WEEKLY_PRODUCTION} SCHEDULE_DATA={SCHEDULE_DATA} PATIENT_DATA={PATIENTS} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} voiceEscalationCount={escalations.length} />;
            case "schedule": return <SmartSchedulerPageUI2 PATIENT_DATA={PATIENTS} onSelectPatient={handleSelectPatient} onNavigatePage={handleNavigate} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "notes": return <AiNotesPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "voice": return <VoiceAgentPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} escalations={escalations} setEscalations={setEscalations} handleMarkDone={handleMarkDone} />;
            case "analytics": return <AnalyticsPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "reactivation": return <RecallPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "forms": return <FormBuilderPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "integrations": return <IntegrationsPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "billing": return <BillingPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "settings": return <SettingsPageUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            default: return <PlaceholderPageUI2 title={currentPage.toUpperCase()} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: GEO_BG, fontFamily: "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <SidebarUI2 currentPage={currentPage === "patient-detail" ? "dashboard" : currentPage} onNavigate={handleNavigate} isExpanded={isExpanded} setIsExpanded={setIsExpanded} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} voiceEscalationCount={escalations.length} />
            <MobileHeaderUI2 isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} onNavigate={handleNavigate} />
            <div style={{ display: "flex", flex: 1, width: "100%" }}>
                <main className="main-content-mobile" style={{ flex: 1, marginLeft: isExpanded ? 280 : 120, padding: "32px 40px", transition: "all 0.3s", boxSizing: "border-box", maxWidth: "100vw", display: "flex", flexDirection: "column" }}>
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}