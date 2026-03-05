import React, { useState } from 'react';
import { Phone, Mail, FileText, File, Download, Search, Image as ImageIcon, CheckCircle, Activity, Camera, Plus, Edit3, Trash2, Stethoscope, ChevronDown } from 'lucide-react';

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
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 }}>
                                <span style={{ color: "#8A8D93" }}>Used: <span style={{ color: "#1C1E23" }}>{MOCK_INSURANCE.primary.used}</span></span>
                                <span style={{ color: "#00B67A" }}>Remaining: {MOCK_INSURANCE.primary.remaining}</span>
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
