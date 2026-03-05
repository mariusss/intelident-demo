const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

// Dashboard Stat Cards - remove fixed width of 240
code = code.replace(
    '        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, width: 240, flexShrink: 0 }}>',
    '        <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, flex: 1, minWidth: 200 }}>'
);

// Top greeting - remove fixed display:flex so it can stack via our CSS class
code = code.replace(
    '        <div className="stack-on-mobile mobile-margin-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>\n            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>',
    '        <div className="stack-on-mobile mobile-margin-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>\n            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>'
);

// Patient Detail - Top Action Row needs to wrap
code = code.replace(
    '            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>',
    '            <div className="stack-on-mobile" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, gap: 16 }}>'
);

// Patient Detail - Contact buttons container
code = code.replace(
    '                <div style={{ display: "flex", gap: 16 }}>',
    '                <div className="stack-on-mobile" style={{ display: "flex", gap: 16, width: "100%" }}>'
);

// Patient Detail - The 4 small info boxes (DOB, Phone, Email)
code = code.replace(
    '                    <div style={{ display: "flex", gap: 40, marginTop: 16 }}>',
    '                    <div className="stack-on-mobile" style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>'
);

fs.writeFileSync(appPath, code);
console.log("Secondary mobile layout bleed fixes applied.");
