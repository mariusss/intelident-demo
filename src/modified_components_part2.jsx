import React, { useState } from 'react';

// ----------------------------------------------------
// BILLING COMPONENT
// ----------------------------------------------------
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
