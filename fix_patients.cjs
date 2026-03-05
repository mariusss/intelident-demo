const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

// 1. Patient List Page - Fix Toolbar Row & remove outer card margin on mobile
code = code.replace(
    '<div style={{ padding: "20px 40px" }}>\n            <TopGreetingUI2',
    '<div className="mobile-no-padding-main" style={{ padding: "20px 40px" }}>\n            <TopGreetingUI2'
);

code = code.replace(
    '<div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>\n                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>\n                    <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patients Directory</h2>\n                    <div style={{ display: "flex", gap: 12 }}>\n                        <div style={{ display: "flex", alignItems: "center", background: GEO_BG, borderRadius: GEO_PILL, padding: "8px 16px" }}>\n                            <Search size={18} color={GEO_TEXT_MUTED} style={{ marginRight: 8 }} />\n                            <input type="text" placeholder="Search patients..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, color: GEO_TEXT_MAIN, width: 200 }} />\n                        </div>\n                        <button style={{ display: "flex", alignItems: "center", gap: 8, background: GEO_BLACK, color: GEO_WHITE, border: "none", padding: "10px 20px", borderRadius: GEO_PILL, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>\n                            <Filter size={16} /> Filter\n                        </button>\n                    </div>\n                </div>\n\n                <div style={{ width: "100%", overflowX: "auto" }}>\n                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>',
    `<div className="mobile-no-padding-card" style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>
                <div className="stack-on-mobile mobile-margin-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, gap: 16 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patients Directory</h2>
                    <div style={{ display: "flex", gap: 12, width: "100%", overflowX: "auto", paddingBottom: 4 }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "center", background: GEO_BG, borderRadius: GEO_PILL, padding: "8px 16px", minWidth: 150 }}>
                            <Search size={18} color={GEO_TEXT_MUTED} style={{ marginRight: 8 }} />
                            <input type="text" placeholder="Search patients..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, color: GEO_TEXT_MAIN, width: "100%" }} />
                        </div>
                        <button style={{ display: "flex", alignItems: "center", gap: 8, background: GEO_BLACK, color: GEO_WHITE, border: "none", padding: "10px 20px", borderRadius: GEO_PILL, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>

                <div className="table-scroll-mobile" style={{ width: "100%", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 600 }}>`
);

// 2. Dashboard Page - Patient Preview Table
code = code.replace(
    '            {/* Patient List - Geovea Style */}\n            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, marginTop: 24, overflowX: "auto" }}>\n                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>\n                    <h3 style={{ fontSize: 20, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patient Directory</h3>\n                    <button style={{ display: "flex", alignItems: "center", gap: 8, background: GEO_BG, color: GEO_TEXT_MAIN, border: "none", padding: "8px 16px", borderRadius: GEO_PILL, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>\n                        View All\n                    </button>\n                </div>\n                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>',
    `            {/* Patient List - Geovea Style */}
            <div className="mobile-no-padding-card" style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, marginTop: 24 }}>
                <div className="stack-on-mobile mobile-margin-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: GEO_TEXT_MAIN, margin: 0 }}>Patient Directory</h3>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, background: GEO_BG, color: GEO_TEXT_MAIN, border: "none", padding: "8px 16px", borderRadius: GEO_PILL, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        View All
                    </button>
                </div>
                <div className="table-scroll-mobile" style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 600 }}>`
);

// We need to add a closing div after the table if we just added a wrapper
code = code.replace(
    '                            </tr>\n                        ))}\n                    </tbody>\n                </table>\n            </div>\n        </div>',
    '                            </tr>\n                        ))}\n                    </tbody>\n                </table>\n                </div>\n            </div>\n        </div>'
);

fs.writeFileSync(appPath, code);
console.log("Patient Layouts Updated");
