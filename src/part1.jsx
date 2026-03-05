import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, AreaChart, Area } from "recharts";
import {
    LayoutDashboard, Users, Calendar, FileText, BarChart3, Settings, Search, Bell, Phone, Mail, Filter, ChevronDown, Stethoscope, MessageSquare, Clipboard, PhoneCall, Globe, Copy, Play, Square, Plus, Trash2, GripVertical, Download, Eye, File, Activity, UsersRound, CalendarCheck, Wallet, ArrowDownToLine, MoreHorizontal, Clock, CheckCircle, Shield, Sparkles, TrendingUp, Type, CalendarDays, AlignLeft, ListChecks, Hash, CircleDot, Edit3, Repeat, Mic, ArrowRight, Loader2
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
    { id: 1, name: "Sarah Chen", age: 34, dob: "1991-08-14", phone: "(555) 234-0011", email: "sarah.chen@email.com", insurance: "Delta Dental PPO", lastVisit: "2026-02-15", nextAppt: "2026-03-12", balance: 0, status: "Active", allergies: ["Penicillin"], provider: "Dr. Williams", avatar: "SC", gender: "Female", dept: "Orthodontics" },
    { id: 2, name: "Marcus Rivera", age: 52, dob: "1973-11-22", phone: "(555) 678-2233", email: "m.rivera@email.com", insurance: "MetLife DHMO", lastVisit: "2026-02-20", nextAppt: "2026-03-05", balance: 245, status: "Active", allergies: [], provider: "Dr. Williams", avatar: "MR", gender: "Male", dept: "General" },
    { id: 3, name: "Emily Watson", age: 28, dob: "1997-04-03", phone: "(555) 321-5567", email: "ewatson@email.com", insurance: "Cigna Dental", lastVisit: "2026-01-18", nextAppt: null, balance: 0, status: "Overdue", allergies: ["Latex"], provider: "Dr. Park", avatar: "EW", gender: "Female", dept: "Surgery" },
    { id: 4, name: "James Okafor", age: 45, dob: "1980-09-30", phone: "(555) 445-8890", email: "james.ok@email.com", insurance: "Aetna DMO", lastVisit: "2026-02-28", nextAppt: "2026-04-01", balance: 120, status: "Active", allergies: [], provider: "Dr. Park", avatar: "JO", gender: "Male", dept: "Surgery" },
    { id: 5, name: "Linda Tran", age: 61, dob: "1964-12-07", phone: "(555) 112-7744", email: "l.tran@email.com", insurance: "Medicare", lastVisit: "2026-02-10", nextAppt: "2026-03-10", balance: 0, status: "Active", allergies: ["Codeine", "NSAIDs"], provider: "Dr. Williams", avatar: "LT", gender: "Female", dept: "General" },
    { id: 6, name: "Robert Kim", age: 38, dob: "1987-06-19", phone: "(555) 890-3311", email: "rkim87@email.com", insurance: "Guardian Dental", lastVisit: "2026-01-05", nextAppt: null, balance: 380, status: "Overdue", allergies: [], provider: "Dr. Park", avatar: "RK", gender: "Male", dept: "General" },
    { id: 7, name: "Maria Gonzalez", age: 41, dob: "1984-03-25", phone: "(555) 567-9922", email: "mgonzalez@email.com", insurance: "Delta Dental PPO", lastVisit: "2026-02-22", nextAppt: "2026-03-22", balance: 0, status: "Active", allergies: [], provider: "Dr. Williams", avatar: "MG", gender: "Female", dept: "General" },
    { id: 8, name: "David Patel", age: 55, dob: "1970-07-11", phone: "(555) 234-6688", email: "d.patel@email.com", insurance: "United Healthcare", lastVisit: "2026-02-01", nextAppt: "2026-03-15", balance: 75, status: "Active", allergies: ["Sulfa drugs"], provider: "Dr. Park", avatar: "DP", gender: "Male", dept: "Periodontics" },
];

const WEEKLY_PRODUCTION = [
    { day: "Mon", hospitalized: 110, outpatients: 90 },
    { day: "Tue", hospitalized: 125, outpatients: 100 },
    { day: "Wed", hospitalized: 90, outpatients: 80 },
    { day: "Thu", hospitalized: 130, outpatients: 120 },
    { day: "Fri", hospitalized: 115, outpatients: 110 },
];

const SCHEDULE_DATA = {
    providers: ["Dr. Williams", "Dr. Park"],
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
    { date: "Feb 28, 2026", type: "Visit", title: "Periodic Exam & BWX", provider: "Dr. Park", notes: "4 BWX taken. No new caries detected. Discussed crown on #19.", codes: ["D0120", "D0274"] },
    { date: "Feb 28, 2026", type: "AI Note", title: "SOAP Note Auto-Generated", provider: "AI Assistant", notes: "Clinical note generated from procedure codes and approved by Dr. Park.", codes: [] },
    { date: "Jan 15, 2026", type: "Visit", title: "Prophylaxis & Fluoride", provider: "RDH Martinez", notes: "Adult prophy completed. Light calculus LL anteriors. Fluoride varnish applied. Patient reports sensitivity #14.", codes: ["D1110", "D1206"] },
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

// ═══════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════
function Avatar({ initials, size = 36, color = TEAL }) {
    return (
        <div style={{ width: size, height: size, borderRadius: "50%", background: `${color}15`, color: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 600, flexShrink: 0 }}>
            {initials}
        </div>
    );
}

function Badge({ text, color = TEAL }) {
    return (
        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, background: `${color}15`, color: color, fontSize: 11, fontWeight: 600 }}>{text}</span>
    );
}

function StatCard({ icon: Icon, label, value, change, changeType, color = TEAL }) {
    const isUp = changeType === "up";
    return (
        <div style={{ background: "white", borderRadius: 12, padding: "20px", display: "flex", flexDirection: "column", flex: 1, border: `1px solid ${GRAY[200]}`, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${GRAY[200]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={20} color={GRAY[800]} />
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: GRAY[500], marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: GRAY[800] }}>{value}</div>
                    </div>
                </div>
                {change && (
                    <div style={{ background: isUp ? TEAL_LIGHT : `${RED}15`, color: isUp ? TEAL : RED, padding: "4px 8px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                        {change}
                    </div>
                )}
            </div>
            <div style={{ marginTop: "auto", borderTop: `1px solid ${GRAY[200]}`, paddingTop: 12 }}>
                <a href="#" style={{ color: TEAL, fontSize: 13, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>See details →</a>
            </div>
        </div>
    );
}

function SectionHeader({ title, subtitle }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: GRAY[800], margin: "0 0 4px 0" }}>{title}</h2>
                <div style={{ fontSize: 14, color: GRAY[500] }}>{subtitle}</div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, border: `1px solid ${GRAY[200]}`, background: "white", color: GRAY[800], fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                    <ArrowDownToLine size={16} /> Export
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, border: "none", background: TEAL, color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                    <Plus size={16} /> Create new
                </button>
            </div>
        </div>
    );
}

function TopGreeting({ currentUI, setUI }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 24 }}>☀️</span>
                <h1 style={{ fontSize: 20, fontWeight: 600, color: GRAY[800], margin: 0 }}>Good Morning, Dr. Williams!</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* The Toggle The User Requested */}
                <div style={{ display: "flex", background: GRAY[200], borderRadius: 8, padding: 4 }}>
                    <button onClick={() => setUI("UI1")} style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: currentUI === "UI1" ? "white" : "transparent", color: currentUI === "UI1" ? TEAL : GRAY[600], fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: currentUI === "UI1" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>UI1</button>
                    <button onClick={() => setUI("UI2")} style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: currentUI === "UI2" ? "white" : "transparent", color: currentUI === "UI2" ? TEAL : GRAY[600], fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: currentUI === "UI2" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>UI2</button>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${GRAY[200]}`, display: "flex", alignItems: "center", justifyContent: "center", background: "white", cursor: "pointer" }}>
                    <Bell size={20} color={GRAY[800]} />
                </div>
            </div>
        </div>
    );
}
